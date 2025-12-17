/**
 * Pexels Image Downloader
 *
 * Scans `articles-ai/` for JSON files, downloads a relevant image from Pexels
 * based on the article title or keyword, saves it to `articles-ai/images/`,
 * and updates the JSON file with the new image path.
 *
 * Usage: bun scripts/download-pexels-images.ts
 */

import * as fs from "fs";
import * as path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const ARTICLES_DIR = path.join(process.cwd(), "articles-ai");
const IMAGES_DIR = path.join(ARTICLES_DIR, "images");
const PEXELS_API_URL = "https://api.pexels.com/v1/search";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Article {
    title: string;
    featured_image?: string;
    seo?: {
        focus_keyword?: string;
    };
    [key: string]: any;
}

interface PexelsPhoto {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
        portrait: string;
        landscape: string;
        tiny: string;
    };
    alt: string;
}

interface PexelsResponse {
    total_results: number;
    page: number;
    per_page: number;
    photos: PexelsPhoto[];
    next_page?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getApiKey(): string {
    const key = process.env.PEXELS_API_KEY;
    if (!key) {
        throw new Error("Missing PEXELS_API_KEY in .env");
    }
    return key;
}

async function searchPexels(query: string): Promise<PexelsPhoto | null> {
    const apiKey = getApiKey();
    const url = new URL(PEXELS_API_URL);
    url.searchParams.append("query", query);
    url.searchParams.append("per_page", "1");
    // url.searchParams.append("orientation", "landscape"); // Optional preference

    try {
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: apiKey,
            },
        });

        if (!response.ok) {
            console.error(`[PEXELS] API Error (${response.status}): ${await response.text()}`);
            return null;
        }

        const data = (await response.json()) as PexelsResponse;
        if (data.photos && data.photos.length > 0) {
            return data.photos[0];
        }
        return null;
    } catch (error) {
        console.error(`[PEXELS] Request failed:`, error);
        return null;
    }
}

async function downloadImage(url: string, destPath: string): Promise<boolean> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`[DOWNLOAD] Failed to fetch image (${response.status})`);
            return false;
        }

        const buffer = await response.arrayBuffer();
        fs.writeFileSync(destPath, Buffer.from(buffer));
        return true;
    } catch (error) {
        console.error(`[DOWNLOAD] Error saving file:`, error);
        return false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("  Pexels Image Downloader");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log();

    // Ensure images directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
        console.log(`[INIT] Creating images directory: ${IMAGES_DIR}`);
        fs.mkdirSync(IMAGES_DIR, { recursive: true });
    }

    // Get all JSON files
    if (!fs.existsSync(ARTICLES_DIR)) {
        console.error(`[ERROR] Directory not found: ${ARTICLES_DIR}`);
        process.exit(1);
    }

    const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
    console.log(`[INFO] Found ${files.length} article files.`);
    console.log();

    for (const file of files) {
        const filePath = path.join(ARTICLES_DIR, file);
        let article: Article;

        try {
            article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch (e) {
            console.error(`[ERROR] Failed to parse ${file}`);
            continue;
        }

        const filenameBase = path.parse(file).name; // e.g., 'article-slug'

        // Define target image path (save as .jpg by default for simplicity, or keep original extension if known)
        // We'll use .jpg for downloaded photos usually
        const targetImageFilename = `${filenameBase}.jpg`;
        const targetImagePathRelative = `images/${targetImageFilename}`;
        const targetImagePathAbsolute = path.join(IMAGES_DIR, targetImageFilename);

        // Check if image already exists & is valid in JSON
        // Condition: File exists on disk AND JSON points to it (or similar)
        // Adjust logic: if JSON already has a path that EXISTS, skip.
        let alreadyHasImage = false;
        if (article.featured_image) {
            const existingPath = path.join(ARTICLES_DIR, article.featured_image);
            if (fs.existsSync(existingPath)) {
                console.log(`[SKIP] ${file}: Already has valid image (${article.featured_image})`);
                alreadyHasImage = true;
            }
        }

        if (alreadyHasImage) continue;

        // Prepare search query
        const query = article.seo?.focus_keyword || article.title;
        console.log(`[SEARCH] ${file}: Querying "${query}"...`);

        const photo = await searchPexels(query);
        if (!photo) {
            console.warn(`[WARN] No photos found for "${query}"`);
            continue;
        }

        // Use 'large' or 'landscape' for better quality/size balance
        const downloadUrl = photo.src.large2x || photo.src.original;
        console.log(`[FOUND] Photo ID ${photo.id} by ${photo.photographer}`);

        // Download
        const success = await downloadImage(downloadUrl, targetImagePathAbsolute);
        if (success) {
            console.log(`[SAVED] Saved to ${targetImagePathRelative}`);

            // Update JSON
            article.featured_image = targetImagePathRelative;
            fs.writeFileSync(filePath, JSON.stringify(article, null, 2), "utf-8");
            console.log(`[UPDATE] Updated ${file}`);
        }

        // Polite delay
        await new Promise(r => setTimeout(r, 1000));
        console.log();
    }

    console.log("Done.");
}

main().catch(console.error);
