# Meta Description Not Pushed to WordPress - Analysis & Fix

## Issue Summary

The `push-to-wp.ts` script was not successfully pushing Yoast SEO meta descriptions (and other SEO fields) to WordPress posts.

## Root Cause

**Yoast SEO meta fields are not exposed to the WordPress REST API by default.**

The script was attempting to update Yoast SEO fields using:
```typescript
updateData.meta = {
    _yoast_wpseo_title: seo.meta_title,
    _yoast_wpseo_metadesc: seo.meta_description,
    _yoast_wpseo_focuskw: seo.focus_keyword,
};
```

However, WordPress REST API does not allow updating arbitrary post meta fields unless they are explicitly registered using `register_rest_field()` or `register_post_meta()` with `show_in_rest: true`.

## Solution Implemented

### 1. WordPress Setup Required ⚠️

You must add code to your WordPress site to register Yoast SEO fields with the REST API.

**See detailed instructions in:** `docs/wordpress-yoast-seo-setup.md`

**Quick summary:**
- Add PHP code to your theme's `functions.php` or create a custom plugin
- The code registers `_yoast_wpseo_title`, `_yoast_wpseo_metadesc`, and `_yoast_wpseo_focuskw` fields
- This makes these fields readable and writable via REST API

### 2. Script Updated

The `push-to-wp.ts` script has been updated to:

1. **Use direct field assignment** instead of the `meta` object:
   ```typescript
   updateData._yoast_wpseo_title = seo.meta_title || "";
   updateData._yoast_wpseo_metadesc = seo.meta_description || "";
   updateData._yoast_wpseo_focuskw = seo.focus_keyword || "";
   ```

2. **Better error handling**: If Yoast fields fail, the script will:
   - Show a warning message
   - Retry without SEO fields (to at least set featured image, categories, tags)
   - Reference the setup documentation

3. **Verification**: After updating, the script verifies if SEO fields were successfully set

## How to Fix

### Step 1: Update WordPress (REQUIRED)

Follow the instructions in `docs/wordpress-yoast-seo-setup.md` to add the required PHP code to your WordPress site.

### Step 2: Test the Fix

1. Choose an article that was already pushed (e.g., `analisis-roi-properti-pemula.json`)
2. Set `"pushed": false` in the JSON file
3. Run the script:
   ```bash
   bun scripts/push-to-wp.ts
   ```
4. Check the WordPress post to verify the meta description is set

### Step 3: Verify in WordPress

1. Go to the post in WordPress admin
2. Scroll down to the Yoast SEO section
3. Verify that:
   - SEO title is set
   - Meta description is set
   - Focus keyword is set

## Expected Behavior After Fix

When the script runs successfully, you should see:
```
[META] Processing 2 categories...
[META] Processing 5 tags...
[META] Updated post with 2 categories, 5 tags, and SEO meta
[META] ✓ SEO meta verified successfully
```

If WordPress is not configured, you'll see:
```
[WARN] Yoast SEO fields may not be registered in WordPress REST API.
[WARN] See docs/wordpress-yoast-seo-setup.md for setup instructions.
[WARN] Post created but SEO meta may not be set.
```

## Files Modified

1. ✅ `scripts/push-to-wp.ts` - Updated to use correct REST API field approach
2. ✅ `docs/wordpress-yoast-seo-setup.md` - WordPress setup instructions (NEW)
3. ✅ `docs/meta-description-fix.md` - This analysis document (NEW)

## Next Steps

1. **Implement WordPress changes** (see `docs/wordpress-yoast-seo-setup.md`)
2. **Test with one article** to verify it works
3. **Re-push articles** if needed by setting `pushed: false`

## Alternative Solutions Considered

1. ❌ **Use WPGraphQL mutations** - Yoast SEO WPGraphQL addon is read-only
2. ❌ **Direct database updates** - Not recommended, bypasses WordPress hooks
3. ✅ **Register REST fields** - Clean, official WordPress approach (CHOSEN)

## References

- [WordPress REST API Handbook - Custom Fields](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)
- [Yoast SEO Meta Fields](https://developer.yoast.com/customization/apis/metadata-api/)
