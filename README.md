# Khanim Azimli Portfolio

**Repository:** `khanimazimli/khanim_azimli`
**Live site:** https://khanimazimli.github.io/khanim_azimli/
**Entry point:** `index.html`
**Deployment:** GitHub Pages (static, no build step)

## Deploy

GitHub Pages is configured under Settings → Pages → Source: *Deploy from a
branch* → `main` / `(root)`. Changes merged into `main` are published to the
live site automatically. `.nojekyll` makes GitHub Pages serve all files as-is.

No npm, Node or build tools are needed. Everything is plain HTML, CSS,
JavaScript, images, video and self-hosted web fonts.

## Structure

```
index.html                     Homepage (Selected work incl. Geometry of Trade, Before/After, PowerPoint, Publishing, About, Tools, Contact)
publishing.html                Editorial & educational publishing case
powerpoint-rebuilt.html        PowerPoint, Rebuilt · 01 From Complexity to Control
powerpoint-rebuilt/            02 AI, Prioritized · 03 The Pipeline Is Growing (pages, images, downloads)
404.html                       Not-found page
assets/                        CSS, JS, fonts, images, video, live interactive projects, PPTX downloads
assets/live/                   Self-contained interactive HTML projects (opened from case studies)
assets/og/                     Open Graph preview images (1200×630)
```

## Notes

- The site is served from the `/khanim_azimli/` subpath. Internal links and
  asset paths are relative, so they work there without changes. The only
  absolute URLs are the Open Graph `og:url` / `og:image` tags and the
  404 page's "Back to the portfolio" link, which all use
  `https://khanimazimli.github.io/khanim_azimli/` (or `/khanim_azimli/`).
- Fonts are self-hosted WOFF2 files. Archivo, Bodoni Moda, IBM Plex Mono,
  Inter Tight and Source Serif 4 are licensed under the SIL Open Font License.
  Satoshi is from Fontshare (Indian Type Foundry Free Font License), which
  permits use and embedding on websites.
- Consulting redesigns are independent exercises on public reports and are
  not affiliated with the original publishers.
- Media is optimised for a small package: images are WebP capped at 1600 px
  wide, videos re-encoded, and images embedded in the live HTML projects
  converted to WebP.
