/**
 * WordPress Content Sanitizer
 * 
 * Utilities for sanitizing WordPress HTML content to prevent
 * SEO leakage to WordPress domain URLs.
 */

// WordPress domains to rewrite (add all hostinger subdomains used)
const WP_DOMAIN_PATTERN = /https?:\/\/[^\/]*hostingersite\.com/g;
const FRONTEND_DOMAIN = 'https://tapropertindo.com';

/**
 * Rewrites all WordPress domain URLs in HTML content to frontend domain.
 * 
 * Use cases:
 * - Internal links in article content
 * - Image src attributes
 * - Any href pointing to WordPress
 * 
 * @param html - Raw HTML content from WordPress
 * @returns Sanitized HTML with frontend domain URLs
 */
export function sanitizeWordPressUrls(html: string): string {
    if (!html) return '';

    return html.replace(WP_DOMAIN_PATTERN, FRONTEND_DOMAIN);
}

/**
 * Rewrites WordPress post ID URLs (/?p=123) to proper article slugs.
 * 
 * Note: This requires a mapping of post IDs to slugs, which isn't always
 * available. For now, we remove these malformed URLs.
 * 
 * @param html - Raw HTML content
 * @returns HTML with post ID URLs removed or rewritten
 */
export function sanitizePostIdUrls(html: string): string {
    if (!html) return '';

    // Remove /?p=ID format links (they won't work on frontend anyway)
    return html.replace(/href=["'][^"']*\/?\?p=\d+["']/g, 'href="#"');
}

/**
 * Full content sanitization pipeline.
 * Applies all sanitization rules to WordPress content.
 * 
 * @param html - Raw HTML content from WordPress
 * @returns Fully sanitized HTML safe for frontend rendering
 */
export function sanitizeWordPressContent(html: string): string {
    if (!html) return '';

    let sanitized = html;

    // Step 1: Rewrite all WordPress domain URLs
    sanitized = sanitizeWordPressUrls(sanitized);

    // Step 2: Handle /?p=ID format URLs
    sanitized = sanitizePostIdUrls(sanitized);

    return sanitized;
}

/**
 * Get the frontend URL for a WordPress image.
 * Used for og:image and other meta tags.
 * 
 * @param wpImageUrl - WordPress image URL
 * @returns Frontend-safe image URL
 */
export function getFrontendImageUrl(wpImageUrl: string | undefined): string | undefined {
    if (!wpImageUrl) return undefined;
    return wpImageUrl.replace(WP_DOMAIN_PATTERN, FRONTEND_DOMAIN);
}
