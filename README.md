# Khanim Azimli Portfolio

**Project:** Khanim Azimli Portfolio
**Entry point:** `index.html`
**Deployment:** GitHub Pages (static, no build step)

## Deploy

1. Upload the contents of this folder to the root of a GitHub repository
   (for a user site, name the repository `khanimazimli.github.io`).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. The site is served from `index.html`. `.nojekyll` makes GitHub Pages serve
   all files as-is.

No npm, Node or build tools are needed. Everything is plain HTML, CSS,
JavaScript, images, video and self-hosted web fonts.

## Structure

```
index.html                     Homepage (Selected work, Before/After, PowerPoint, Publishing, About, Tools, Contact)
publishing.html                Editorial & educational publishing case
powerpoint-rebuilt.html        PowerPoint, Rebuilt · 01 From Complexity to Control
powerpoint-rebuilt/            02 AI, Prioritized · 03 The Pipeline Is Growing (pages, images, downloads)
404.html                       Not-found page
assets/                        CSS, JS, fonts, images, video, live interactive projects, PPTX downloads
assets/live/                   Self-contained interactive HTML projects (opened from case studies)
assets/og/                     Open Graph preview images (1200×630)
```

## Notes

- Open Graph tags use absolute URLs on `https://khanimazimli.github.io/`.
  If the site is published under a different address (e.g. a project
  repository or custom domain), update the `og:image` / `og:url` values.
- Fonts are self-hosted WOFF2 files. Archivo, Bodoni Moda, IBM Plex Mono,
  Inter Tight and Source Serif 4 are licensed under the SIL Open Font License.
  Satoshi is from Fontshare (Indian Type Foundry Free Font License), which
  permits use and embedding on websites.
- Consulting redesigns are independent exercises on public reports and are
  not affiliated with the original publishers.
