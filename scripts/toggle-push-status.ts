/**
 * Article Push Status Toggler
 * 
 * Toggles the 'pushed' boolean in article JSON files within articles-ai/
 * 
 * Usage:
 *   bun scripts/toggle-push-status.ts [filename-or-slug]
 *   bun scripts/toggle-push-status.ts all
 *   bun scripts/toggle-push-status.ts reset-all
 * 
 * If no argument is provided, it lists all articles and their statuses.
 */

import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const ARTICLES_DIR = path.join(process.cwd(), "articles-ai");

interface Article {
    title: string;
    slug: string;
    pushed: boolean;
    wp_uri?: string;
}

/**
 * Toggle the status of a single file.
 */
function toggleFile(filename: string, forceStatus?: boolean, hardReset: boolean = false): boolean {
    const filePath = path.join(ARTICLES_DIR, filename);
    if (!fs.existsSync(filePath)) {
        // Try with .json extension if not provided
        if (!filename.endsWith(".json")) {
            return toggleFile(filename + ".json", forceStatus, hardReset);
        }
        console.error(`[ERROR] File not found: ${filename}`);
        return false;
    }

    try {
        const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        if (hardReset) {
            content.pushed = false;
            delete content.wp_uri;
            delete content.wp_media_id;
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");
            console.log(`\x1b[31m🔥 HARD RESET\x1b[0m ${filename}: Removed all WP metadata.`);
            return true;
        }

        const oldStatus = !!content.pushed;
        const newStatus = forceStatus !== undefined ? forceStatus : !oldStatus;

        content.pushed = newStatus;

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2), "utf-8");

        const statusIcon = newStatus ? "✅" : "❌";
        const statusText = newStatus ? "PUSHED" : "NOT PUSHED";
        console.log(`${statusIcon} ${filename}: ${oldStatus ? "PUSHED" : "NOT PUSHED"} -> ${statusText}`);

        if (!newStatus && content.wp_uri) {
            console.log(`   (Note: WP post still exists at ${content.wp_uri})`);
        }

        return true;
    } catch (error) {
        console.error(`[ERROR] Failed to process ${filename}:`, error instanceof Error ? error.message : error);
        return false;
    }
}

/**
 * Main entry point.
 */
async function main() {
    if (!fs.existsSync(ARTICLES_DIR)) {
        console.error(`[ERROR] Articles directory not found: ${ARTICLES_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith(".json"));
    const arg = process.argv[2];

    if (arg === "all") {
        console.log("Toggling ALL articles...");
        files.forEach(f => toggleFile(f));
        return;
    }

    if (arg === "reset-all") {
        console.log("Resetting ALL articles to NOT PUSHED...");
        files.forEach(f => toggleFile(f, false));
        return;
    }

    if (arg === "hard-reset") {
        console.log("\n\x1b[41m\x1b[37m  DANGER: HARD RESET ALL ARTICLES  \x1b[0m\n");
        files.forEach(f => toggleFile(f, false, true));
        console.log("\nDone. All articles are back to local-only state.");
        return;
    }

    if (arg) {
        toggleFile(arg);
        return;
    }

    // List all and interactive mode
    console.log("\n═══════════════════════════════════════════════════════════════");
    console.log("  Article Push Status Manager");
    console.log("═══════════════════════════════════════════════════════════════\n");

    const articles: { filename: string; title: string; pushed: boolean }[] = [];

    files.forEach((file, index) => {
        try {
            const content = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8"));
            articles.push({
                filename: file,
                title: content.title || "No Title",
                pushed: !!content.pushed
            });

            const statusIcon = content.pushed ? "✅" : "❌";
            const indexStr = (index + 1).toString().padStart(2, " ");
            console.log(`${indexStr}. [${statusIcon}] ${file}`);
        } catch (e) {
            console.log(`XX. [?] ${file} (Invalid JSON)`);
        }
    });

    console.log("\nCommands:");
    console.log(" - Enter number(s) to toggle (e.g. '1' or '1,2,3')");
    console.log(" - Type 'all' to toggle everything");
    console.log(" - Type 'reset' to set all to NOT PUSHED");
    console.log(" - Press Enter to exit");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("\nChoice: ", (answer) => {
        const choice = answer.trim().toLowerCase();

        if (choice === "all") {
            files.forEach(f => toggleFile(f));
        } else if (choice === "reset") {
            files.forEach(f => toggleFile(f, false));
        } else if (choice === "") {
            // Exit
        } else {
            const indices = choice.split(/[, ]+/).map(s => parseInt(s.trim()) - 1);
            indices.forEach(idx => {
                if (articles[idx]) {
                    toggleFile(articles[idx].filename);
                } else {
                    console.log(`[WARN] Invalid index: ${idx + 1}`);
                }
            });
        }

        rl.close();
    });
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
