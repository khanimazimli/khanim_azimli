# ARTI_INVENTORY

Transfer inventory for the ARTİ email work, prepared for a Claude session that will add it to the Email Campaigns page of https://khanimazimli.github.io/khanim_azimli/

Prepared: 29 October 2026, from `~/Downloads/02 Karyera/Portfolio/E-Mail Design/ARTI` (305 MB, 87 files). The original folder was copied only, never changed.

## 1. Packages

| File | Size | Contents |
|---|---|---|
| `ARTI_01.zip` | about 23 MB (exact byte size is in the Desktop copy of this file) | Both ARTİ emails (HTML + images), new full-length screenshots, original PDF publications, page previews of the PDFs, series overview page, this inventory |

One package was enough. `ARTI_02.zip` and `ARTI_03.zip` were not needed.

Unzipped structure (folder names kept from the original so the relative links inside the HTML still work):

```
ARTI_01/
  ARTI_INVENTORY.md
  ARTI_Portfolio_Series/
    index.html                       series overview page (links to both emails with ../)
  ARTI_Email_v2/                     Issue 01 · June 2022
    email.html                       main HTML email
    preview.html                     desktop + mobile side-by-side preview
    images/                          9 images used by email.html
    assets/arti-beynelxalq-tehsil-icmali-iyun-2022.pdf
    screenshots/desktop_full.jpg|.webp
    screenshots/mobile_full.jpg|.webp
    original_pdf_pages/iyun-2022-p-01..07.jpg
  ARTI_Email_02_Noyabr_2022/         Issue 02 · November 2022
    email.html                       main HTML email
    email_gmail_final.html           Gmail test-send variant (hosted image URLs)
    preview.html
    images/                          7 images used by email.html
    assets/arti-beynelxalq-tehsil-icmali-noyabr-2022.pdf
    screenshots/desktop_full.jpg|.webp
    screenshots/mobile_full.jpg|.webp
    original_pdf_pages/noyabr-2022-p-01..11.jpg
```

## 2. What the work is

Facts below are taken only from the files themselves (series page, preview pages, HTML, PDF metadata). No dates, results or metrics were added.

- Client: ARTİ, Azərbaycan Respublikasının Təhsil İnstitutu (Education Institute of the Republic of Azerbaijan).
- Publication: "Beynəlxalq Təhsil İcmalı", a research digest.
- Originals: Khanim designed the June 2022 and November 2022 issues in InDesign; they were distributed as PDF publications.
- HTML emails: portfolio adaptations of those two issues, built in 2026. They were never sent to ARTİ's recipients. Article facts, statistics and source links come from the original issues. (Source: `ARTI_Portfolio_Series/index.html`, both `preview.html` files.)
- No send dates, open rates, click rates or other performance data exist in the folder. None should be shown on the site.

## 3. Campaigns

### Issue 01 · ARTİ / June 2022 (`ARTI_Email_v2/`)

| Item | Detail |
|---|---|
| HTML title | Beynəlxalq Təhsil İcmalı · İyun 2022 · ARTİ |
| Preheader | Erkən təhsil, müəllim inkişafı, formativ qiymətləndirmə və Avropada əsas səriştələr: İyun sayı. |
| Hero headline | Təhsildə dünya təcrübəsi: dörd tədqiqat, bir icmal |
| Topics (from series page) | Early childhood staff (OECD), cluster-based teacher development (World Bank), formative assessment, EU key competences |
| Composition (from series page) | Centered hero, icon columns, alternating image/text, full-bleed photo band |
| Build | 600 px table layout, inline CSS, stacks below 620 px, Raleway with Arial fallback, VML backgrounds for Outlook, Campaign Monitor tags `<webversion>`, `<preferences>`, `<unsubscribe>` |
| Images (all present) | `hero.jpg` 1200×880, `a01-erken-tehsil.jpg` 560×440, `a02-muellim-inkisafi.jpg` 560×440, `a03-band.jpg` 1200×640, `a04-seristeler.jpg` 560×440, `arti-logo.png` 240×214, `icon-book.png` / `icon-check.png` / `icon-people.png` 96×96 |
| Original PDF | `assets/arti-beynelxalq-tehsil-icmali-iyun-2022.pdf`, 6.2 MB, 7 PDF pages (cover + 6 two-page spreads = 13 printed pages), InDesign 17.4, exported 7 Dec 2022 |
| Screenshots | `desktop_full` 1360×7556 (680 px viewport, 2x); `mobile_full` 750×10138 (375 px viewport, 2x) |
| PDF previews | `original_pdf_pages/iyun-2022-p-01.jpg` (cover, 993×1404), `p-02` to `p-07` (spreads, 1985×1404) |
| External links | arti.edu.az, oecd.org, blogs.worldbank.org, doi.org, redined.educacion.gob.es |

### Issue 02 · ARTİ / November 2022 (`ARTI_Email_02_Noyabr_2022/`)

| Item | Detail |
|---|---|
| HTML title | Beynəlxalq Təhsil İcmalı · Noyabr 2022 · ARTİ |
| Preheader | Direktorların inkişaf ehtiyacları, rəqəmsal savadlılıq, erkən bərabərlik və Şimali Avropada peşə müəllimləri: Noyabr sayı. |
| Hero headline | Liderlik, rəqəmsal savadlılıq və erkən bərabərlik |
| Topics (from series page) | Principals' development needs in Germany, EU guidelines on disinformation, OECD early equity, vocational teachers in Sweden and Finland |
| Composition (from series page) | Bottom-anchored hero, numbered index, stat strip, numbered list, headline-statistic band, comparison table |
| Build | Same system as Issue 01 (600 px tables, inline CSS, Raleway/Arial, VML, Campaign Monitor tags) |
| Images (all present) | `hero.jpg` 1200×1000, `n01-direktorlar.jpg` 1040×520, `n02-reqemsal.jpg` 400×700, `n03-band.jpg` 1200×760, `n04-pese-muellimleri.jpg` 500×560, `n05-closing.jpg` 440×520, `arti-logo.png` 240×214 |
| Original PDF | `assets/arti-beynelxalq-tehsil-icmali-noyabr-2022.pdf`, 5.3 MB, 11 single pages, InDesign 17.2, exported 6 Dec 2022 |
| Screenshots | `desktop_full` 1360×9582 (680 px viewport, 2x); `mobile_full` 750×13050 (375 px viewport, 2x) |
| PDF previews | `original_pdf_pages/noyabr-2022-p-01.jpg` to `p-11.jpg` (993×1404) |
| External links | arti.edu.az, doi.org, data.europa.eu |
| Variant | `email_gmail_final.html`: the Gmail test-send version. Title "[PORTFOLIO TEST] ARTİ — Beynəlxalq Təhsil İcmalı", has a "PORTFOLIO TEST" banner, no PDF buttons, and loads all images from `https://khanimazimli.github.io/email-assets/arti-nov-2022/`. Use `email.html` for the portfolio page. |

## 4. Dependencies and known gaps

| Item | Status |
|---|---|
| Local images and PDFs referenced by every HTML file | All present. Checked by script: 0 missing references. |
| Raleway web font | Loaded from fonts.googleapis.com. Offline, the emails fall back to Arial. Screenshots were rendered with Raleway 400 to 800 loaded. |
| `email_gmail_final.html` images | Remote, on khanimazimli.github.io/email-assets/arti-nov-2022/. Could not be checked from this environment. If those files are not on the live site, this variant shows broken images. |
| Campaign Monitor tags | `<webversion>`, `<preferences>`, `<unsubscribe>` only become links when sent through Campaign Monitor. In a browser they show as plain text. |
| "PDF versiya" buttons | Portfolio-only links to the local PDF in `assets/`. |
| Series page | `ARTI_Portfolio_Series/index.html` embeds the emails with `../ARTI_Email_v2/email.html` and `../ARTI_Email_02_Noyabr_2022/email.html`. Keep the three folders side by side or update those paths. |

## 5. Optimization

- Email images were already web-sized 2x JPGs (28 to 71 KB each). They were kept unchanged to avoid any quality loss.
- PNGs (logo, icons) were recompressed losslessly. Pixel output was verified identical. Icons dropped from 8 to 12.5 KB down to 2 to 6.5 KB.
- Screenshots were newly rendered from the current `email.html` files with headless Chromium. JPG at quality 88 with 4:4:4 chroma (sharp text), plus WebP at quality 86 for the website.
- PDF previews rendered from the PDFs at 120 dpi, JPG quality 84.
- Original PDFs kept byte-identical, because the HTML links to them.

## 6. Excluded from the transfer (still in the original folder)

| Original path | Size | Reason |
|---|---|---|
| `BTI IYUN-20261027T194622Z-1-001.zip` | 117 MB | InDesign source package: `.indd`, `.idml`, fonts, full-resolution licensed stock photos (6 to 21 MB each). Its `BTI Iyun.pdf` is byte-identical to the June PDF included. Its `Noyabr-3.pdf` (13 single pages) is the same June issue exported as single pages, so it is a duplicate of content. |
| `BTI NOV-20261028T055844Z-1-001.zip` | 78 MB | Same kind of source package for November. Its `Noyabr-3.pdf` is byte-identical to the November PDF included. `BTI NOV.pdf` (6 pages) is the same issue exported as spreads. |
| `_bti_nov_audit/` | 84 MB | Unzipped copy of the November source package plus audit renders (`view/`). Replaced by the new PDF previews. |
| `_arti_audit/` | 2.3 MB | Audit renders and contact sheets of the June PDF. Replaced by the new PDF previews. |
| `Kenar fayllar/` | 2 MB | `email.html` is byte-identical to `ARTI_Email_v2/email.html`; screenshots are older versions. |
| `ARTI_Email_v2/desktop_full.png`, `mobile_full.png` | 2 MB | Outdated: made before the last HTML edit, and the desktop image was cut at 1889 px instead of the full email. Replaced. |
| `ARTI_Email_02_Noyabr_2022/desktop_full.png`, `mobile_full.png` | 7.2 MB | Made before the last HTML edit. Replaced. |
| `ARTI_Email_02_Noyabr_2022/email_gmail_test.html` | 42 KB | Same as `email.html` plus the test banner. Test file. |
| `ARTI_Email_02_Noyabr_2022/gmail/` | 0.3 MB | 5 files are exact duplicates of `images/`. `hero-photo.jpg` (1200×640) and `band-photo.jpg` (1200×420) are not referenced by any HTML file. |
| `.DS_Store` | | macOS system file |

No videos were in the ARTI folder.

## 7. Notes for the integrating session

- Do not present the HTML emails as sent campaigns. Use the wording from the series page: portfolio adaptations of PDF issues designed in 2022, never sent.
- Do not add send dates, audience size or performance numbers. None exist.
- Best visuals for cards and thumbnails: the top of `screenshots/desktop_full` (hero), and `original_pdf_pages/*-p-01.jpg` (covers) for the "original vs. adaptation" story.
- For live embeds, use `email.html` in an iframe (600 px desktop, 375 px mobile), as `preview.html` and the series page already do.
