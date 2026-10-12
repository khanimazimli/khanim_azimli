# PASHA Malls · Executive Retail Intelligence (Chapter 02 of email-campaigns.html)

Status: portfolio RECONSTRUCTION. The original issues are no longer available.
Historical (stated by Khanim): monthly executive newsletter for senior management, sent at month end (30th/31st),
covering major shopping malls in eight countries, distributed as HTML email through Mailchimp.
Role and years from the CV: Marketing Specialist, PASHA Malls, 07/2024 to 03/2025.
Illustrative: every market (Sample Markets A-H), brand, store, project and figure inside the email and the charts.

Files
- briefing.html                 email-safe HTML (tables, inline CSS, one media query, Georgia/Arial, no JS). Opens on its own.
- ../case-pasha-data.js         same HTML as a JS string + sample market data (generated, do not edit by hand)
- ../email-campaigns.css / .js  the two-chapter page layer and the PASHA chapter interactions
- Build sources: _sources/email-campaigns/_build/ (build_briefing.py regenerates briefing.html and the data file;
  assemble.py rebuilds email-campaigns.html from tisa-email-campaigns.html + part-intro.html + part-pasha.html)

To change the email: edit build_briefing.py, then from the portfolio root run
  python3 _sources/email-campaigns/_build/build_briefing.py .
