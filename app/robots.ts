import { MetadataRoute } from 'next';

/**
 * Robots.txt configuration for SEO.
 * Allows all crawlers and points to sitemap.
 */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/coming-soon', '/api/'],
            },
        ],
        sitemap: 'https://tapropertindo.com/sitemap.xml',
    };
}
