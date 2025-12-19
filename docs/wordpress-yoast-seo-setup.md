# WordPress Yoast SEO REST API Setup

## Problem
The `push-to-wp.ts` script cannot update Yoast SEO meta fields (meta title, meta description, focus keyword) because these fields are not exposed to the WordPress REST API by default.

## Solution
Add the following code to your WordPress site to register Yoast SEO meta fields with the REST API.

### Method 1: Add to Theme's functions.php (Recommended)

1. Log in to your WordPress admin panel
2. Go to **Appearance → Theme File Editor**
3. Select **functions.php** from the right sidebar
4. Add the following code at the end of the file:

```php
/**
 * Register Yoast SEO meta fields for REST API
 * This allows updating SEO data via REST API
 */
add_action('rest_api_init', function() {
    // Register Yoast SEO Title
    register_rest_field('post', '_yoast_wpseo_title', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_yoast_wpseo_title', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, '_yoast_wpseo_title', sanitize_text_field($value));
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Yoast SEO Title',
            'context' => array('view', 'edit')
        )
    ));

    // Register Yoast SEO Meta Description
    register_rest_field('post', '_yoast_wpseo_metadesc', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_yoast_wpseo_metadesc', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, '_yoast_wpseo_metadesc', sanitize_textarea_field($value));
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Yoast SEO Meta Description',
            'context' => array('view', 'edit')
        )
    ));

    // Register Yoast SEO Focus Keyword
    register_rest_field('post', '_yoast_wpseo_focuskw', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_yoast_wpseo_focuskw', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, '_yoast_wpseo_focuskw', sanitize_text_field($value));
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Yoast SEO Focus Keyword',
            'context' => array('view', 'edit')
        )
    ));
});
```

5. Click **Update File** to save

### Method 2: Create a Custom Plugin (Better for Production)

If you prefer not to modify the theme (recommended for production sites):

1. Create a new file in `wp-content/plugins/` called `yoast-seo-rest-api.php`
2. Add the following code:

```php
<?php
/**
 * Plugin Name: Yoast SEO REST API Extension
 * Description: Exposes Yoast SEO meta fields to WordPress REST API
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

add_action('rest_api_init', function() {
    // Register Yoast SEO Title
    register_rest_field('post', '_yoast_wpseo_title', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_yoast_wpseo_title', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, '_yoast_wpseo_title', sanitize_text_field($value));
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Yoast SEO Title',
            'context' => array('view', 'edit')
        )
    ));

    // Register Yoast SEO Meta Description
    register_rest_field('post', '_yoast_wpseo_metadesc', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_yoast_wpseo_metadesc', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, '_yoast_wpseo_metadesc', sanitize_textarea_field($value));
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Yoast SEO Meta Description',
            'context' => array('view', 'edit')
        )
    ));

    // Register Yoast SEO Focus Keyword
    register_rest_field('post', '_yoast_wpseo_focuskw', array(
        'get_callback' => function($post) {
            return get_post_meta($post['id'], '_yoast_wpseo_focuskw', true);
        },
        'update_callback' => function($value, $post) {
            return update_post_meta($post->ID, '_yoast_wpseo_focuskw', sanitize_text_field($value));
        },
        'schema' => array(
            'type' => 'string',
            'description' => 'Yoast SEO Focus Keyword',
            'context' => array('view', 'edit')
        )
    ));
});
```

3. Go to **Plugins** in WordPress admin
4. Activate the **Yoast SEO REST API Extension** plugin

## Verification

After adding the code, you can verify it's working by:

1. Make a GET request to: `https://your-site.com/wp-json/wp/v2/posts/<post-id>`
2. Check if the response includes `_yoast_wpseo_title`, `_yoast_wpseo_metadesc`, and `_yoast_wpseo_focuskw` fields

## Alternative: Update the Script to Use Different Approach

If you cannot modify WordPress, the script needs to be updated to use a different method. However, this is the cleanest solution.

## Testing

After implementing the WordPress changes:

1. Reset one article's `pushed` status to `false` in the JSON file
2. Run: `bun scripts/push-to-wp.ts`
3. Check the WordPress post to verify the SEO meta description is set correctly
