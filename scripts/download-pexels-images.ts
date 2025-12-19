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
import sharp from "sharp";

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
    url.searchParams.append("per_page", "15"); // Fetch more for variety
    url.searchParams.append("orientation", "landscape");

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
            // Pick a random photo from the top results for variety
            const randomIndex = Math.floor(Math.random() * data.photos.length);
            return data.photos[randomIndex];
        }
        return null;
    } catch (error) {
        console.error(`[PEXELS] Request failed:`, error);
        return null;
    }
}

/**
 * Downloads image and converts to WebP using sharp.
 */
async function downloadAndConvertImage(url: string, destPath: string): Promise<boolean> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`[DOWNLOAD] Failed to fetch image (${response.status})`);
            return false;
        }

        const buffer = await response.arrayBuffer();

        // Use sharp to convert to webp with optimal settings
        await sharp(Buffer.from(buffer))
            .webp({ quality: 80, effort: 6 }) // effort 6 for better compression
            .toFile(destPath);

        return true;
    } catch (error) {
        console.error(`[PROCESS] Error processing/saving WebP:`, error instanceof Error ? error.message : error);
        return false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("  Pexels Image Downloader (WebP Edition)");
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

    // Translation & Context Mapping
    // Pexels works better with English keywords and specific context.
    const keywordMap: Record<string, string> = {
        "tanah": "land property real estate",
        "kavling": "divided land plot",
        "girik": "land property document",
        "shm": "property certificate ownership",
        "hgb": "building right permit",
        "investasi": "investment property",
        "properti": "real estate architecture",
        "rumah": "modern house exterior",
        "lahan": "open land terrain",
        "hukum": "legal document agreement",
        "pajak": "tax documents",
        "bangunan": "construction building",
        "infrastruktur": "road construction city infrastructure",
        "roi": "investment growth chart",
        "risiko": "legal dispute document",
        "developer": "housing developer construction",
        "marketing": "property sales agent",
        "lokasi": "map location pin property"
    };

    const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));
    console.log(`[INFO] Found ${files.length} article files.`);
    console.log();

    const forceRefresh = process.argv.includes("--force");

    for (const file of files) {
        const filePath = path.join(ARTICLES_DIR, file);
        let article: Article;

        try {
            article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        } catch (e) {
            console.error(`[ERROR] Failed to parse ${file}`);
            continue;
        }

        const filenameBase = path.parse(file).name;
        const targetImageFilename = `${filenameBase}.webp`; // Always .webp now
        const targetImagePathRelative = `images/${targetImageFilename}`;
        const targetImagePathAbsolute = path.join(IMAGES_DIR, targetImageFilename);

        // Skip if image already exists & is valid in JSON (unless --force)
        if (!forceRefresh && article.featured_image && article.featured_image.endsWith(".webp")) {
            const existingPath = path.join(ARTICLES_DIR, article.featured_image);
            if (fs.existsSync(existingPath)) {
                console.log(`[SKIP] ${file}: Already has WebP image (${article.featured_image})`);
                continue;
            }
        }

        // --- Build Improved Query ---
        let baseQuery = (article.seo?.focus_keyword || article.title).toLowerCase();

        // Translate & Enrich
        let enrichedKeywords: string[] = ["property"]; // Default context

        Object.entries(keywordMap).forEach(([id, en]) => {
            if (baseQuery.includes(id)) {
                enrichedKeywords.push(en);
            }
        });

        // If no keywords matched, try to use the first 3 words of the title as fallback
        if (enrichedKeywords.length === 1) {
            const simpleQuery = baseQuery.split(" ").slice(0, 3).join(" ");
            enrichedKeywords.push(simpleQuery);
        }

        const finalQuery = Array.from(new Set(enrichedKeywords)).join(" ");
        console.log(`[SEARCH] ${file}: Querying Pexels for "${finalQuery}"...`);

        const photo = await searchPexels(finalQuery);
        if (!photo) {
            console.warn(`[WARN] No photos found for "${finalQuery}"`);
            continue;
        }

        // Use 'large2x' for high resolution
        const downloadUrl = photo.src.large2x || photo.src.original;
        console.log(`[FOUND] Photo ID ${photo.id} matching "${photo.alt}"`);

        // Download AND Convert to WebP
        const success = await downloadAndConvertImage(downloadUrl, targetImagePathAbsolute);
        if (success) {
            console.log(`[CONVERTED] Saved as WebP to ${targetImagePathRelative}`);

            // Update JSON
            article.featured_image = targetImagePathRelative;
            fs.writeFileSync(filePath, JSON.stringify(article, null, 2), "utf-8");
            console.log(`[UPDATE] Updated ${file}`);
        }

        // Polite delay
        await new Promise(r => setTimeout(r, 800));
        console.log();
    }

    console.log("Done.");
}

main().catch(console.error);
