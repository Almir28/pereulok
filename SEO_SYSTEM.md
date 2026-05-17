# Pereuloq SEO System

Pereuloq uses a static SEO pipeline for GitHub Pages. The canonical source is:

- article HTML in `posts/`, `politics/`, `sport/`, `en/posts/`, `en/politics/`, `en/sport/`
- editorial cards in `js/main.js`
- politics metadata in `data/politics-feed.json`

Run this command after adding or editing a story:

```bash
node scripts/generate-seo-files.js
```

The generator updates:

- `sitemap.xml`
- `news-sitemap.xml`
- `image-sitemap.xml`
- `data/seo-index.json`

Runtime SEO is handled by:

- `js/meta-generator.js`
- `js/schema.js`
- `js/structured-data.js`
- `js/seo.js`

Every news page should have one `h1`, a clear `meta description`, a canonical URL, one main image with meaningful `alt`, and the shared scripts at the end of the body:

```html
<script src="../js/site-system.js"></script>
<script src="../js/main.js"></script>
<script src="../js/meta-generator.js" defer></script>
<script src="../js/schema.js" defer></script>
<script src="../js/structured-data.js" defer></script>
<script src="../js/seo.js" defer></script>
```

News sitemap only includes recent news, matching Google News best practice. Older articles stay in the regular sitemap and image sitemap.
