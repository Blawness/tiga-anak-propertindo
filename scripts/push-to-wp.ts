/**
 * WordPress Article Publishing Script
 *
 * Reads AI-generated articles from articles-ai/ and pushes them to WordPress as DRAFT posts.
 * Uses REST API for media upload and WPGraphQL for post creation.
 *
 * Usage: bun scripts/push-to-wp.ts
 *
 * Environment variables required:
 * - WP_GRAPHQL_ENDPOINT: WordPress GraphQL endpoint
 * - WP_JWT_TOKEN: JWT token for authentication
 */

import * as fs from "fs";
import * as path from "path";
import { wpGqlWrite } from "../lib/wpgraphql";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ArticleSEO {
    meta_title: string;
    meta_description: string;
    focus_keyword: string;
    secondary_keywords: string[];
    internal_link_opportunities: string[];
}

interface Article {
    title: string;
    slug: string;
    excerpt: string;
    content_html: string;
    categories: string[];
    tags: string[];
    featured_image: string;
    seo: ArticleSEO;
    pushed: boolean;
    wp_uri?: string;
    wp_media_id?: number;
}

interface MediaUploadResponse {
    id: number;
    source_url: string;
}

interface CreatePostMutationResponse {
    createPost: {
        post: {
            id: string;
            databaseId: number;
            uri: string;
            slug: string;
        };
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

const ARTICLES_DIR = path.join(process.cwd(), "articles-ai");

/**
 * Get WordPress REST API base URL from GraphQL endpoint.
 */
function getWpRestBase(): string {
    const graphqlEndpoint = process.env.WP_GRAPHQL_ENDPOINT;
    if (!graphqlEndpoint) {
        throw new Error("Missing WP_GRAPHQL_ENDPOINT environment variable.");
    }
    // Convert https://example.com/graphql to https://example.com/wp-json/wp/v2
    const url = new URL(graphqlEndpoint);
    return `${url.origin}/wp-json/wp/v2`;
}

/**
 * Get JWT token from environment.
 */
function getJwtToken(): string {
    const token = process.env.WP_JWT_TOKEN;
    if (!token) {
        throw new Error("Missing WP_JWT_TOKEN environment variable.");
    }
    return token.trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_FIELDS: (keyof Article)[] = [
    "title",
    "slug",
    "excerpt",
    "content_html",
    "seo",
    "featured_image",
];

/**
 * Validate that an article has all required fields.
 */
function validateArticle(article: Partial<Article>, filename: string): article is Article {
    const missing: string[] = [];

    for (const field of REQUIRED_FIELDS) {
        if (article[field] === undefined || article[field] === null || article[field] === "") {
            missing.push(field);
        }
    }

    // Validate SEO object
    if (article.seo) {
        if (!article.seo.meta_title) missing.push("seo.meta_title");
        if (!article.seo.meta_description) missing.push("seo.meta_description");
        if (!article.seo.focus_keyword) missing.push("seo.focus_keyword");
    }

    if (missing.length > 0) {
        console.error(`[SKIP] ${filename}: Missing required fields: ${missing.join(", ")}`);
        return false;
    }

    return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Media Upload (REST API)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Detect content type from file extension.
 */
function getContentType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
    };
    return mimeTypes[ext] || "application/octet-stream";
}

/**
 * Upload an image to WordPress Media Library via REST API.
 */
async function uploadMedia(imagePath: string): Promise<MediaUploadResponse> {
    const restBase = getWpRestBase();
    const token = getJwtToken();

    // Read image file
    const imageBuffer = fs.readFileSync(imagePath);
    const filename = path.basename(imagePath);
    const contentType = getContentType(filename);

    // Upload via REST API
    const response = await fetch(`${restBase}/media`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": contentType,
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
        body: imageBuffer,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Media upload failed (${response.status}): ${errorText}`);
    }

    const data = await response.json() as MediaUploadResponse;
    return data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Post Creation (WPGraphQL + REST API for featured image)
// ─────────────────────────────────────────────────────────────────────────────

const CREATE_POST_MUTATION = `
    mutation CreateDraftPost(
        $title: String!
        $content: String!
        $excerpt: String!
        $slug: String!
    ) {
        createPost(input: {
            title: $title
            content: $content
            excerpt: $excerpt
            slug: $slug
            status: DRAFT
        }) {
            post {
                id
                databaseId
                uri
                slug
            }
        }
    }
`;

/**
 * Get or create a category by name via REST API.
 */
async function getOrCreateCategory(categoryName: string): Promise<number> {
    const restBase = getWpRestBase();
    const token = getJwtToken();

    // First, try to find existing category
    const searchResponse = await fetch(
        `${restBase}/categories?search=${encodeURIComponent(categoryName)}&per_page=100`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (searchResponse.ok) {
        const categories = await searchResponse.json() as Array<{ id: number; name: string }>;
        const existing = categories.find((cat) => cat.name.toLowerCase() === categoryName.toLowerCase());
        if (existing) {
            return existing.id;
        }
    }

    // Create new category if not found
    const createResponse = await fetch(`${restBase}/categories`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: categoryName,
        }),
    });

    if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create category "${categoryName}" (${createResponse.status}): ${errorText}`);
    }

    const newCategory = await createResponse.json() as { id: number };
    return newCategory.id;
}

/**
 * Get or create a tag by name via REST API.
 */
async function getOrCreateTag(tagName: string): Promise<number> {
    const restBase = getWpRestBase();
    const token = getJwtToken();

    // First, try to find existing tag
    const searchResponse = await fetch(
        `${restBase}/tags?search=${encodeURIComponent(tagName)}&per_page=100`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    );

    if (searchResponse.ok) {
        const tags = await searchResponse.json() as Array<{ id: number; name: string }>;
        const existing = tags.find((tag) => tag.name.toLowerCase() === tagName.toLowerCase());
        if (existing) {
            return existing.id;
        }
    }

    // Create new tag if not found
    const createResponse = await fetch(`${restBase}/tags`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: tagName,
        }),
    });

    if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create tag "${tagName}" (${createResponse.status}): ${errorText}`);
    }

    const newTag = await createResponse.json() as { id: number };
    return newTag.id;
}

/**
 * Update post metadata via REST API.
 * Sets featured image, categories, tags, and SEO meta.
 */
async function updatePostMetadata(
    postId: number,
    mediaId: number,
    categoryIds: number[],
    tagIds: number[],
    seo: ArticleSEO
): Promise<void> {
    const restBase = getWpRestBase();
    const token = getJwtToken();

    const updateData: Record<string, unknown> = {
        featured_media: mediaId,
    };

    // Add categories if any
    if (categoryIds.length > 0) {
        updateData.categories = categoryIds;
    }

    // Add tags if any
    if (tagIds.length > 0) {
        updateData.tags = tagIds;
    }

    // Add Yoast SEO meta if available
    // Yoast SEO uses meta fields: _yoast_wpseo_title, _yoast_wpseo_metadesc, _yoast_wpseo_focuskw
    if (seo) {
        updateData.meta = {
            _yoast_wpseo_title: seo.meta_title || "",
            _yoast_wpseo_metadesc: seo.meta_description || "",
            _yoast_wpseo_focuskw: seo.focus_keyword || "",
        };
    }

    const response = await fetch(`${restBase}/posts/${postId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update post metadata (${response.status}): ${errorText}`);
    }
}

/**
 * Create a draft post in WordPress via WPGraphQL.
 * Uses REST API to set featured image, categories, tags, and SEO meta.
 */
async function createDraftPost(
    article: Article,
    mediaId: number
): Promise<{ uri: string; databaseId: number }> {
    // Step 1: Create the post via GraphQL
    const createData = await wpGqlWrite<CreatePostMutationResponse>(CREATE_POST_MUTATION, {
        title: article.title,
        content: article.content_html,
        excerpt: article.excerpt,
        slug: article.slug,
    });

    const postDatabaseId = createData.createPost.post.databaseId;
    const postUri = createData.createPost.post.uri;

    // Step 2: Get or create categories and tags
    const categoryIds: number[] = [];
    if (article.categories && article.categories.length > 0) {
        console.log(`[META] Processing ${article.categories.length} categories...`);
        for (const categoryName of article.categories) {
            try {
                const categoryId = await getOrCreateCategory(categoryName);
                categoryIds.push(categoryId);
            } catch (error) {
                console.warn(`[WARN] Failed to process category "${categoryName}": ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }

    const tagIds: number[] = [];
    if (article.tags && article.tags.length > 0) {
        console.log(`[META] Processing ${article.tags.length} tags...`);
        for (const tagName of article.tags) {
            try {
                const tagId = await getOrCreateTag(tagName);
                tagIds.push(tagId);
            } catch (error) {
                console.warn(`[WARN] Failed to process tag "${tagName}": ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }

    // Step 3: Update post with featured image, categories, tags, and SEO meta
    await updatePostMetadata(postDatabaseId, mediaId, categoryIds, tagIds, article.seo);
    console.log(`[META] Updated post with ${categoryIds.length} categories, ${tagIds.length} tags, and SEO meta`);

    return {
        uri: postUri,
        databaseId: postDatabaseId,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Processing
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Process a single article file.
 */
async function processArticle(jsonFilePath: string): Promise<boolean> {
    const filename = path.basename(jsonFilePath);

    try {
        // Read and parse JSON
        const rawContent = fs.readFileSync(jsonFilePath, "utf-8");
        const article: Partial<Article> = JSON.parse(rawContent);

        // Skip if already pushed
        if (article.pushed === true) {
            console.log(`[SKIP] ${filename}: Already pushed`);
            return true;
        }

        // Validate required fields
        if (!validateArticle(article, filename)) {
            return false;
        }

        // Resolve featured image path
        const imagePath = path.join(ARTICLES_DIR, article.featured_image);
        if (!fs.existsSync(imagePath)) {
            console.error(`[ERROR] ${filename}: Featured image not found: ${article.featured_image}`);
            return false;
        }

        // Step 1: Upload featured image
        console.log(`[UPLOAD] ${filename}: Uploading featured image...`);
        const mediaResult = await uploadMedia(imagePath);
        console.log(`[UPLOAD] ${filename}: Media ID ${mediaResult.id}`);

        // Step 2: Create draft post
        console.log(`[CREATE] ${filename}: Creating draft post...`);
        const postResult = await createDraftPost(article, mediaResult.id);
        console.log(`[SUCCESS] ${filename}: "${article.title}" → ${postResult.uri}`);

        // Step 3: Update JSON file
        article.pushed = true;
        article.wp_uri = postResult.uri;
        article.wp_media_id = mediaResult.id;

        fs.writeFileSync(jsonFilePath, JSON.stringify(article, null, 2), "utf-8");
        console.log(`[UPDATE] ${filename}: Marked as pushed`);

        return true;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`[ERROR] ${filename}: ${errorMessage}`);
        return false;
    }
}

/**
 * Main entry point.
 */
async function main(): Promise<void> {
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("  WordPress Article Publisher");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log();

    // Check articles directory exists
    if (!fs.existsSync(ARTICLES_DIR)) {
        console.error(`[ERROR] Articles directory not found: ${ARTICLES_DIR}`);
        console.error("Please create the articles-ai/ folder with JSON article files.");
        process.exit(1);
    }

    // Find all JSON files
    const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".json"));

    if (files.length === 0) {
        console.log("[INFO] No JSON files found in articles-ai/");
        return;
    }

    console.log(`[INFO] Found ${files.length} article file(s)`);
    console.log();

    // Process each file
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    for (const file of files) {
        const filePath = path.join(ARTICLES_DIR, file);
        
        try {
            const rawContent = fs.readFileSync(filePath, "utf-8");
            const article: Partial<Article> = JSON.parse(rawContent);

            if (article.pushed === true) {
                skipCount++;
                console.log(`[SKIP] ${file}: Already pushed`);
                continue;
            }

            const success = await processArticle(filePath);
            if (success) {
                successCount++;
            } else {
                failCount++;
            }
        } catch (error) {
            failCount++;
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`[ERROR] ${file}: Failed to parse JSON - ${errorMessage}`);
            
            // If it's a JSON parse error, try to show more context
            if (errorMessage.includes("JSON") || errorMessage.includes("parse")) {
                console.error(`[ERROR] ${file}: Please check the JSON syntax in this file`);
            }
        }
        console.log();
    }

    // Summary
    console.log("═══════════════════════════════════════════════════════════════");
    console.log(`  Summary: ${successCount} pushed, ${skipCount} skipped, ${failCount} failed`);
    console.log("═══════════════════════════════════════════════════════════════");
}

// Run
main().catch((error) => {
    console.error("[FATAL]", error);
    process.exit(1);
});
