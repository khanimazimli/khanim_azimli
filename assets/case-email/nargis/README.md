# NARGIS_INVENTORY

Transfer inventory for the NARGIS email, prepared for a Claude session that will add it to the Email Campaigns page of https://khanimazimli.github.io/khanim_azimli/

Prepared: 29 October 2026, from `~/Downloads/02 Karyera/Portfolio/E-Mail Design/NARGIS` (4.3 MB, 17 files). The original folder was copied only, never changed.

## 1. Package

| File | Size | Contents |
|---|---|---|
| `NARGIS_01.zip` | about 5 MB (exact size in the Desktop copy of this file) | Both HTML versions, 12 local images, new full-length screenshots, this inventory |

One package was enough. `NARGIS_02.zip` was not needed.

```
NARGIS/
  NARGIS_INVENTORY.md
  nargis-the-edit.html              version with images loaded from images.unsplash.com
  NARGIS_Gmail_Test/
    nargis_gmail_test.html          same email with local images (use this one)
    nargis_images/nargis-01..12.jpg
  screenshots/
    desktop_full.jpg|.webp          1360 × 11,476 (680 px viewport, 2x)
    mobile_full.jpg|.webp           750 × 13,778 (375 px viewport, 2x)
```

## 2. What the work is

**Independent portfolio concept. Not a real campaign, never sent, not commissioned by or affiliated with NARGIS Magazine.** The email states this itself:

- Top bar: "Independent portfolio concept · not an official NARGIS email"
- Preheader: "Camel tailoring, couture, the Baku runway and five pieces worth knowing. Independent portfolio concept."
- Footer: "Independent portfolio concept by Khanim Azimli. Not commissioned by or affiliated with NARGIS Magazine. Article titles and links are from nargismagazine.az. Photography: Unsplash, used under the Unsplash License."

| Item | Detail |
|---|---|
| HTML title | NARGIS — The Edit |
| Format | Editorial fashion/lifestyle newsletter, 600 px table layout, stacks on mobile, Raleway with Arial fallback |
| Lead story | "The quiet power of camel" |
| Modules (as rendered) | Masthead and category nav, full-width hero, two-up couture/runway cards, full-width craft story, numbered beauty list, two-up music/art cards, interview link, "The NARGIS Edit" product grid (5 pieces), "The Editor's Three" link list, "Until the next edit" sign-off, footer |
| Links | Real article URLs on nargismagazine.az (mostly `/ru/articles/...`); footer "Manage preferences" and "Unsubscribe" are `#` placeholders |
| Fonts | Raleway 400, 500, 600, 700, 400 italic from fonts.googleapis.com. Screenshots were rendered with Raleway loaded. |

When presenting it on the site, always label it as a concept. Do not add send dates, audience or performance numbers.

## 3. HTML files and image check

| File | Images | Status |
|---|---|---|
| `NARGIS_Gmail_Test/nargis_gmail_test.html` | 12 local paths `nargis_images/nargis-01..12.jpg` | **Verified.** All 12 files present, headless Chromium loaded 12 of 12 with 0 broken. |
| `nargis-the-edit.html` | 12 remote URLs on images.unsplash.com | **Not verified.** Unsplash could not be reached from this environment. Do not assume they load. |

The two HTML files are identical except for the 12 image `src` values (checked by diff). Despite its file name, `nargis_gmail_test.html` has no test banner; it is the clean local version.

## 4. Images (Unsplash, unchanged)

| File | Size (px) | File size | Unsplash photo ID | Alt text (from HTML) |
|---|---|---|---|---|
| nargis-01.jpg | 1200×1500 | 198 KB | photo-1641068638532-22533effdafa | Three women standing close together in camel, stone and ivory coats against a warm wall |
| nargis-02.jpg | 440×586 | 55 KB | photo-1568251188392-ae32f898cb3b | Model in a voluminous black couture gown |
| nargis-03.jpg | 560×746 | 35 KB | photo-1784850126110-ab8d5106d50b | A model walking a runway under a single spotlight |
| nargis-04.jpg | 1200×800 | 162 KB | photo-1548911703-e125500e8214 | Black and white close-up of hands stitching textile |
| nargis-05.jpg | 500×660 | 39 KB | photo-1594125311687-3b1b3eafa9f4 | Minimal glass perfume bottle on a pale stone surface |
| nargis-06.jpg | 640×480 | 27 KB | photo-1682268910219-736cd2aa3295 | Black and white close-up of piano keys |
| nargis-07.jpg | 360×500 | 13 KB | photo-1648330578222-13ca65367087 | Shadow of a woman cast in warm window light |
| nargis-08.jpg | 580×774 | 53 KB | photo-1629511565591-a1d494ad6c58 | Woman in a sharply tailored blazer, representative image |
| nargis-09.jpg | 420×316 | 20 KB | photo-1610136649349-0f646f318053 | Black sunglasses on a white surface, representative image |
| nargis-10.jpg | 420×316 | 18 KB | photo-1638295916768-459f6cf440bc | Square amber perfume bottle, representative image |
| nargis-11.jpg | 500×500 | 54 KB | photo-1772026251816-a6d382c67b3b | Black leather handbag on pale linen, representative image |
| nargis-12.jpg | 500×666 | 47 KB | photo-1774009501393-bac5a0a11afc | Strapless white gown on a mannequin, representative image |

Photo IDs come from `get_nargis_images.command` in the original folder. The images are already web-sized 2x JPGs (quality 75 from Unsplash), so they were not recompressed.

## 5. Excluded

| Original path | Reason |
|---|---|
| `NARGIS/desktop-preview.png` (2.1 MB, 720 × 6764) and `mobile-preview.png` (1.3 MB, 375 × 6902) | Older 1x previews. Byte-identical copies are in `Selected_Email_Work/work/nargis/`. Replaced by new 2x screenshots. |
| `NARGIS/NARGIS_Gmail_Test/get_nargis_images.command` | Download helper script. Photo IDs are listed in section 4. |

## 6. Duplicates in the older portfolio folders (not touched)

| Older location | Same as |
|---|---|
| `Email_Marketing_Portfolio/work/nargis/email.html` | `NARGIS_Gmail_Test/nargis_gmail_test.html` (byte-identical) |
| `Email_Marketing_Portfolio/work/nargis/nargis_images/` | `nargis_images/` (all 12 byte-identical) |
| `Selected_Email_Work/work/nargis/nargis-the-edit.html` | `nargis-the-edit.html` (byte-identical) |
| `Selected_Email_Work/work/nargis/nargis_images/` | `nargis_images/` (all 12 byte-identical) |
| `Selected_Email_Work/work/nargis/desktop-preview.png`, `mobile-preview.png` | the excluded 1x previews (byte-identical) |
| `Email_Marketing_Portfolio/covers/nargis-*.jpg`, `media/nargis-*.jpg` | Crops and stills made from this email for the older portfolio page |

So the package above is the single complete copy of NARGIS; nothing new is missing from the older folders.
