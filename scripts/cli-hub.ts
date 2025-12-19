/**
 * CLI Script Hub
 * 
 * An interactive menu to run various scripts in the scripts/ directory.
 */

import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";
import * as readline from "readline";

// Define the available scripts and their descriptions
const SCRIPT_DEFS = [
    {
        name: "Push Articles to WordPress",
        file: "push-to-wp.ts",
        desc: "Upload JSON articles and images to WordPress draft posts."
    },
    {
        name: "Toggle Push Status",
        file: "toggle-push-status.ts",
        desc: "Manually change the 'pushed' boolean in article JSON files."
    },
    {
        name: "Download Pexels Images",
        file: "download-pexels-images.ts",
        desc: "Fetch stock photos for articles from Pexels API."
    },
    {
        name: "Hard Reset WP Meta",
        file: "toggle-push-status.ts",
        desc: "DANGER: Removes all WP URIs and Media IDs from JSON files.",
        args: ["hard-reset"]
    }
];

const SCRIPTS_DIR = path.join(process.cwd(), "scripts");

async function runScript(filename: string, extraArgs: string[] = []) {
    console.log(`\n🚀 Running: bun scripts/${filename} ${extraArgs.join(" ")}\n`);

    return new Promise((resolve) => {
        const scriptPath = path.join(SCRIPTS_DIR, filename);
        const child = spawn("bun", [`"${scriptPath}"`, ...extraArgs], {
            stdio: "inherit",
            shell: true
        });

        child.on("close", (code) => {
            if (code !== 0) {
                console.error(`\n❌ Script exited with code ${code}`);
            } else {
                console.log(`\n✅ Script finished successfully.`);
            }
            resolve(true);
        });
    });
}

async function main() {
    const files = fs.readdirSync(SCRIPTS_DIR);
    const arg = process.argv[2];

    // Bypass interactive menu if argument is provided
    if (arg) {
        const index = parseInt(arg) - 1;
        if (SCRIPT_DEFS[index]) {
            // Pass all arguments after the index to the script
            const extraArgs = process.argv.slice(3);
            await runScript(SCRIPT_DEFS[index].file, extraArgs);
            process.exit(0);
        } else if (arg !== "0") {
            console.log(`[ERROR] Invalid script index: ${arg}`);
            process.exit(1);
        }
    }

    console.clear();
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("  TAP PROPERTY - AUTOMATION HUB");
    console.log("═══════════════════════════════════════════════════════════════\n");

    SCRIPT_DEFS.forEach((script, index) => {
        console.log(`${index + 1}. \x1b[1m${script.name}\x1b[0m`);
        console.log(`   \x1b[2m${script.desc}\x1b[0m`);
        console.log(`   Path: scripts/${script.file}\n`);
    });

    console.log("0. Exit");
    console.log("\n═══════════════════════════════════════════════════════════════");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("\nSelect a script to run (0-3): ", async (choice) => {
        const index = parseInt(choice.trim()) - 1;

        if (choice === "0") {
            console.log("Goodbye!");
            rl.close();
            process.exit(0);
        }

        if (SCRIPT_DEFS[index]) {
            rl.close();
            const args = SCRIPT_DEFS[index].args || [];
            await runScript(SCRIPT_DEFS[index].file, args);
        } else {
            console.log("Invalid choice.");
            rl.close();
            // Restart the menu
            setTimeout(main, 1000);
        }
    });
}

main().catch(console.error);
