# TISA · E-mail Campaigns ("You've got mail")

Case study page: `tisa-email-campaigns.html` (portfolio root, next to `publishing.html`).
Not linked from `index.html` yet. The page links back to `index.html#work`, and its URL works on its own.

## Preview

Double-click `tisa-email-campaigns.html`. It works from the folder and on GitHub Pages. No server or build step is needed to view it.
Satoshi is embedded in `assets/case-tisa.css`. The newsletter itself loads Raleway from Google Fonts, exactly as the original email did; offline it falls back to Helvetica/Arial.

## Files

```
tisa-email-campaigns.html             the case study
assets/case-tisa.css                  page styles (all selectors scoped to this page)
assets/case-tisa.js                   inbox timeline, FLIP reader, scroll showcase, archive, production journey, code explorer, four years
assets/case-tisa-data.js              GENERATED: privacy-safe email HTML + real code fragments from the source
assets/case-tisa/
  emails/look-ahead-2021-08-27/
    public.html                       privacy-safe newsletter (the only version the page uses)
    images-public/                    blurred / web-optimised images used by public.html
    manifest.json                     every referenced asset, its source URL and privacy status
  renders/                            2x renders of the privacy-safe newsletter (Four years, Process, inbox thumbnail)
  thumbs/                             archive thumbnails, made from the issue's graphics (never from student photos)
  README.md
_sources/tisa-email-campaigns/look-ahead-2021-08-27/   PRIVATE, do not publish
  source.html                         HTML part of the .eml, untouched
  original.html                       unaltered render with local images, for your own review
  images/                             the 32 original images from Campaign Monitor, byte for byte
  _build/                             build_email.py, build_bundle.py, renders.js, case-tisa.src.css
```

## Page sections

Inbox → The newsletter (scroll showcase) → Archive → Production (Design, HTML/CSS, Responsive testing, Delivery) → The markup → Four years.

Labels on the page: **Original** marks material from the 2021 email (the live newsletter, its images, renders, markup and timestamps). **Reconstruction** marks things drawn for the portfolio (the inbox interface, the block diagram). In the Production tools, chips outlined in navy were used in this issue (verified in the source files: Photoshop metadata on one collage, Campaign Monitor send headers). Grey chips are toolkit and make no claim about this issue.

The Delivery timeline reads its times from the image file names (macOS screenshot names, 20 and 27 Aug 2021) and from the email's send header (09:20 UTC = 13:20 Baku).

## How the email is shown

The page renders `public.html` inside sandboxed iframes (`srcdoc`, `sandbox="allow-same-origin"`, no scripts, no popups, no top navigation). Email styles cannot leak into the page, links inside the email do nothing, and the page can still measure the email to scroll the reader to a story, crop the scroll showcase and highlight parts in the code section.

Changes from the original, all in `public.html`:
1. Image URLs point to local copies instead of Campaign Monitor's CDN.
2. The open-tracking pixel is removed and every link is inert (they were subscriber-specific tracking links).
3. Privacy pass: 12 images with students in them are blurred (11 photographs plus the calendar background). Student names and personal or staff email addresses are covered with bars. `publishing@tisa.az`, the school's inbox in the footer, stays.

Layout, typography, colours, copy and image order are unchanged.

## Asset audit (12 Oct 2026)

| Looked in | Found |
|---|---|
| `Desktop/TISA Weekly Look Ahead - 27 August - Preview.eml` | The one original email: a Campaign Monitor preview send, Fri 27 Aug 2021, 09:20 UTC. Template "The Blueprint". |
| Campaign Monitor CDN | All 32 images referenced by the email, still online. Downloaded in full. |
| `Creative Cloud Files publishing@tisa.az …` | Empty on this Mac (cloud-only placeholder). |
| `Desktop`, `Downloads`, `04 Şəxsi & Karyera/Khanim Azimli` | No other TISA email files, exports or email screenshots. |

**Genuinely missing:**
- Tour TISA and every other promotional or announcement email (no .eml, export or screenshot found).
- Further issues of the Weekly Look Ahead.
- Four share-button images referenced only by unused CSS in the template (`fblike@2x.png`, `tweet@2x.png`, `lishare@2x.png`, `forward@2x.png`). They never appear in the email.
- No evidence was found of Mailchimp use. Mailchimp is listed as a platform at your request, with no project, volume or date attached.

## Accuracy notes

- **Verified in the source:** built in Campaign Monitor's email builder ("The Blueprint" template), sent through Campaign Monitor as a preview on 27 Aug 2021; 34 Outlook/IE conditional blocks, 7 media queries, VML button.
- **Not claimed:** that you hand-coded this HTML (the platform generated it), or that you designed each poster inside the issue. The archive presents the stories as campaigns carried by the issue you designed and produced. If you designed specific graphics (for example Back to School Nights or Break Out Open Mic), say so and a "Designed by me" line can be added to those cards.
- **Skills section** ("Skills I bring to email today") draws on your CV: HTML/CSS in current work for interactive campaign previews.

## Before publishing

1. Do not publish `_sources/`. If the site is deployed from this whole folder, add `_sources/` to `.gitignore` or exclude it from the export.
2. Get TISA's written permission for the school content. Items that stay visible and need sign-off: student artwork (`m4stencils…`), the poster designed by a DP2 student (`Screenshot2021-08-27at08.47.12…`), the staff portrait (`JimStratton…`), the guest speaker screenshot (`Screenshot2021-08-27at13.17.28…`), the contact-details graphic and the AMIS poster (both show a staff email address inside the image).
3. To link it from the portfolio, add one card in `assets/app.js` that points to `tisa-email-campaigns.html` (same pattern as `publishing.html`).

## Adding an email later

1. Put the .eml's HTML part in `_sources/tisa-email-campaigns/<name>/source.html` and its images in `images/`.
2. List any photos with students in `STUDENT_PHOTO` in `_build/build_email.py`, then run
   `python3 _build/build_email.py _sources/tisa-email-campaigns/<name>` and move `public.html`, `images-public/` and `manifest.json` to `assets/case-tisa/emails/<name>/`.
3. Run `python3 _build/build_bundle.py <portfolio root> _sources/tisa-email-campaigns/<name>` to regenerate `assets/case-tisa-data.js` (currently built for one email; for several, extend `TISA_EMAIL` to a map by id).
4. Add the email to `STORIES` in `assets/case-tisa.js` with its category. A Tour TISA entry belongs under "Promotional Campaigns", which appears automatically once it has a real entry.
