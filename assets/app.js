/* Khanim Azimli · portfolio
   A small static web app. A hash router renders one view at a time:
     #/            Home (entry screen)
     #/work        Work index
     #/case/<slug> Case study (own layer: All work · Prev · Next)
     #/about  #/services  #/contact
   Components: slide viewer with fullscreen, before/after comparison, key moves.
   The art-directed cases (nrf, got, sys, tmf, gai) keep their own page code and identity. No libraries. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = p => `assets/img/${p}-t.webp`;   // 960w
  const F = p => `assets/img/${p}.webp`;     // 2000w
  const pad = n => String(n).padStart(2, '0');
  const ARROW_L = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3L5 8l5 5"/></svg>';
  const ARROW_R = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3l5 5-5 5"/></svg>';
  const TO = '<em>→</em>';
  // some sources are 16:10 exports with a dark frame around the slide: zoom past the frame in 16:9 crops
  const Z = p => /^(pitch\/lead|research\/qapi)/.test(p) ? ' class="z" style="--z:1.115"' : '';

  /* ================================================================
     CONTENT
     kpi / out: figures from the project facts, nothing invented. custom: art-directed case page.
     ================================================================ */
  const P = [
    {
      // featured interactive atlas: home block, case page and transformation study live in case-got.js / case-got.css (the atlas's own ink / cobalt / cyan system)
      id: 'got', custom: 'got', title: 'The World Is Still Trading', cat: 'Interactive Editorial Atlas · Data Storytelling', year: '2026', groups: ['redesign', 'data', 'interactive'],
      card: 'got/s01',
      desc: 'A 10-plate interactive editorial atlas about how global trade routes are being reshaped by geopolitics, AI demand and new manufacturing hubs.',
      live: 'geometry-of-trade-2026-atlas'
    },
    {
      // featured interactive case: home block, case page and transformation study live in case-tmf.js / case-tmf.css (project's own carbon/yellow system)
      id: 'tmf', custom: 'tmf', title: 'Tech Moves Fast', cat: 'Interactive Presentation · Data Storytelling', year: '2026', groups: ['redesign', 'data', 'interactive'],
      card: 'tmf/s01',
      desc: 'A corporate emerging-tech report reframed as a 10-slide human-centered interactive narrative.',
      live: 'Tech-Moves-Fast_EY-Emerging-Tech-Reinterpretation'
    },
    {
      // featured editorial case: custom card (gaiCard) and custom case page (gaiCase)
      id: 'gai', custom: 'gai', title: 'Generative AI & the Future of Work', cat: 'Presentation Redesign · Data Storytelling', year: '2026', groups: ['redesign', 'data', 'interactive'],
      card: 'gai/s01',
      desc: 'Turning a 76-page research report into a 10-slide visual story about how AI is reshaping work.',
      live: 'gai'
    },
    {
      id: 'mel', title: 'Melbourne', cat: 'Consulting Report Redesign', year: '2026', groups: ['redesign'],
      card: 'mel/s01', cover: 'mel/s01', thumbs: ['mel/s02', 'mel/s06'],
      kpi: `56${TO}12`, kpiCap: 'report pages to executive slides',
      desc: 'A 56-page public report transformed into a concise executive presentation.',
      lede: 'BCG’s report on Melbourne as a global cultural destination, redesigned as a 12-slide executive presentation.',
      role: 'Independent redesign · storyline, information design, data visualization',
      deliverables: '12-slide HTML presentation, rebuilt charts, before/after study',
      challenge: 'The summary report runs to 56 pages. The evidence is strong, but it sits in text columns, box grids and charts that all carry the same visual weight, so a reader has to work to find the point of each page.',
      approach: 'I cut it to twelve slides with one message each, led by its key number. Every chart was rebuilt from the source data in a form chosen for the question: a radial ranking, a route map, a rising share flow. A forest, stone and orange system replaced the report template.',
      outcome: 'A 56-page report reduced to twelve slides, each led by one message and one rebuilt chart.',
      out: [[`56${TO}12`, 'report pages became executive slides'], ['1', 'message per slide, led by its key number'], ['38', 'cities placed in one radial ranking']],
      live: 'melbourne',
      ba: [
        ['mel/b02', 'mel/s02', 'Executive summary', 'Original p.4', 'A four-column text page became four findings around one core.'],
        ['mel/b06', 'mel/s06', 'Global ranking', 'Original p.18', 'A map and a table merged into one radial ranking of 38 cities, with 12th as the hero number.'],
        ['mel/b07', 'mel/s07', 'Strengths and weaknesses', 'Original p.22', 'A grid of coloured boxes rebuilt as a route map, one line per dimension.'],
        ['mel/b11', 'mel/s11', 'Strategic priorities', 'Original p.52', 'A box grid replaced by five rings around a cultural core.']
      ],
      slides: [['mel/s01', 'Cover'], ['mel/s03', 'Creative economy'], ['mel/s04', 'Cultural offer'], ['mel/s05', 'Performance index method'], ['mel/s08', 'Infrastructure benchmark'], ['mel/s09', 'Value of cultural visitors'], ['mel/s10', 'Tourism forecast'], ['mel/s12', 'Evaluation framework']],
      note: 'Source: The Boston Consulting Group, Melbourne as a Global Cultural Destination (2017), public summary published by Creative Victoria. Independent redesign exercise, not commissioned by or affiliated with BCG or Creative Victoria.'
    },
    {
      // special issue: breaks the navy/gold system on purpose. Home block (nxCard) + dedicated case (nrfCase), styles in case-nrf.css
      id: 'nrf', custom: 'nrf', title: 'The New Rules of Fashion', cat: 'Editorial Data Storytelling', year: '2026', groups: ['redesign', 'data', 'interactive'],
      card: 'nrf/s01',
      desc: '143 pages of fashion research reframed as a 10-slide editorial narrative.',
      live: 'the-new-rules-of-fashion'
    },
    {
      // featured interactive: own identity (graphite / green / violet). Home block (syCard), Before → After study (tfStudy), case (sysCase), styles in case-sys.css
      id: 'sys', custom: 'sys', title: 'The System Is Waking Up', cat: 'Interactive Presentation · Data Storytelling', year: '2026', groups: ['redesign', 'data', 'interactive'],
      card: 'sys/s01',
      desc: 'Turning a dense technology report into one connected 10-slide interactive system.',
      live: 'tech-trends-2025-the-system-is-waking-up'
    },
    {
      id: 'indo', title: 'Indonesia', cat: 'Data Storytelling · Report Redesign', year: '2026', groups: ['redesign', 'data'],
      card: 'indo/s01', cover: 'indo/s01', thumbs: ['indo/s03', 'indo/s05'],
      kpi: `69${TO}11`, kpiCap: 'report pages to a data story',
      desc: 'A 69-page connectivity case study turned into an archipelago you can read.',
      lede: 'Giga and BCG’s case study on connecting Indonesia’s schools, redesigned as an 11-slide data story.',
      role: 'Independent redesign · art direction, data storytelling, maps',
      deliverables: '11-slide HTML presentation, map system, before/after study',
      challenge: 'The case study is 69 pages of tables and bullet points. Its key finding, that around 19% of schools are still offline and most of them in Papua, appears as one line inside a paragraph.',
      approach: 'The archipelago became the visual identity. The key finding got a slide of its own, data tables became maps and small multiples, and the funding logic became four routes from who pays to who operates.',
      outcome: 'A 69-page case study told in eleven slides, with the key finding given a slide of its own.',
      out: [[`69${TO}11`, 'report pages became a data story'], ['6', 'small multiples replacing six data tables'], ['4', 'funding routes, from who pays to who operates']],
      live: 'indonesia',
      story: [
        ['indo/s03', 'One finding, one slide', 'The ~19% unconnected figure fills half the screen. Papua glows on a dark archipelago, so the reader sees where the gap is before reading a word.'],
        ['indo/s04', 'Geography first', 'Population and school density shown by island group, with six small multiples replacing six data tables.'],
        ['indo/s05', 'From signal to school', 'Three charts merged into one cross-section: as the signal weakens, the need shifts from upgrading quality to funding coverage.'],
        ['indo/s08', 'Four funding routes', 'A text table rebuilt as four routes, each one traced from who funds to who operates.']
      ],
      ba: [
        ['indo/b03', 'indo/s03', 'The connectivity gap', 'Original p.14', 'One finding, one slide.'],
        ['indo/b02', 'indo/s02', 'Country profile', 'Original p.2', 'Bullet boxes replaced by numbers placed around the map.'],
        ['indo/b10', 'indo/s10', 'P&L by region', 'Original p.59', 'Two waterfalls became one chart, with the surplus as the headline number.']
      ],
      slides: [['indo/s01', 'Cover'], ['indo/s02', 'Country profile'], ['indo/s06', 'Regional readiness'], ['indo/s07', 'Technology mix and cost'], ['indo/s09', 'Funding methods by region'], ['indo/s10', 'P&L by region'], ['indo/s11', 'Next steps']],
      note: 'Source: Giga (UNICEF and ITU) in collaboration with BCG, Indonesia case study (2021), public. Independent redesign exercise, not commissioned by or affiliated with the original organizations.'
    },
    {
      id: 'pas', title: 'Personalization at Scale', cat: 'Executive & Strategy Deck', year: '2026', groups: ['exec', 'interactive'],
      card: 'pas/s02', cover: 'pas/s02', thumbs: ['pas/s01', 'pas/s05'],
      kpi: '10', kpiCap: 'slides for a year of programme work',
      desc: 'A year of personalization work, told to leadership in ten slides.',
      lede: 'An executive deck that turns a personalization programme into one story leadership can follow.',
      role: 'Storyline, presentation design, data visualization, HTML build',
      deliverables: '10-slide interactive HTML deck with present mode',
      challenge: 'A year of personalization work was spread across dashboards, plans and campaign sheets. Leadership needed a single view of what had been built, how it works and what it changed.',
      approach: 'One deck in the order leadership asks the questions: roadmap, customer stories, operating model, impact, what comes next. One message per slide, built in HTML so it can be presented live and shared as a link.',
      outcome: 'One deck leadership can follow, presented live and shared as a link.',
      out: [['10', 'slides, in the order leadership asks'], ['5', 'stages and three teams on one operating model'], ['1', 'link to present live and share']],
      live: 'personalization',
      story: [
        ['pas/s01', 'Start with the plan', 'The roadmap opens the deck, so every result that follows has a place on the timeline.'],
        ['pas/s02', 'Show the customer', 'Four customers, four stories. The decision engine sits in the middle and each one sees only the story that fits them.'],
        ['pas/s04', 'Make ownership visible', 'Five stages and three teams on one shared flow: who owns, who supports, who is not involved.'],
        ['pas/s05', 'Lead with impact', 'One headline number, then the evidence underneath it, so the result is never buried in a table.']
      ],
      slides: [['pas/s00', 'Cover'], ['pas/s01', 'Programme roadmap'], ['pas/s02', 'Personalized stories'], ['pas/s04', 'Operating model'], ['pas/s05', 'Impact'], ['pas/s06', 'Impact by journey type'], ['pas/s07', 'Agent-assisted campaigns'], ['pas/s08', 'Journey portfolio']],
      note: 'Portfolio adaptation of an in-house deck. Fictional brand, synthetic data.'
    }
  ];

  /* Work order follows the curated hierarchy: the six selected projects first, then the
     report-redesign cases. Publishing and PowerPoint, Rebuilt are their own HTML pages (EXT). */
  const WORK = ['nrf', 'got', 'sys', 'edu', 'ppt', 'tmf', 'mel', 'indo', 'gai', 'pas'];
  const SLUG = {
    nrf: 'the-new-rules-of-fashion', got: 'the-world-is-still-trading', sys: 'the-system-is-waking-up', tmf: 'tech-moves-fast',
    mel: 'melbourne', indo: 'indonesia', gai: 'generative-ai', pas: 'personalization-at-scale'
  };
  // full titles for the Work index where the case title is a short form
  const LONG = { got: 'The World Is Still Trading. Just Differently.', tmf: 'Tech Moves Fast. People Decide If It Lands.' };
  const EXT = {
    edu: {
      id: 'edu', title: 'Game Changer / Editorial Publishing', cat: 'Editorial & Educational Publishing', year: '2022–2025',
      href: 'publishing.html', img: 'assets/img/edu/home-shelf-t.webp', go: 'View publishing case',
      desc: 'Cambridge’s Game Changer adapted into a national edition for Azerbaijani classrooms, part of a wider print practice: textbooks, yearbooks and theatre.'
    },
    ppt: {
      id: 'ppt', title: 'PowerPoint, Rebuilt.', cat: 'Presentation Redesign · Native PowerPoint', year: '2026',
      href: 'powerpoint-rebuilt.html', img: 'assets/img/ppt/after-05.webp', go: 'View the transformations',
      desc: 'Three ordinary corporate decks rebuilt through hierarchy, storytelling and fully editable PowerPoint design.'
    }
  };
  P.sort((a, b) => WORK.indexOf(a.id) - WORK.indexOf(b.id));
  const PI = Object.fromEntries(P.map((p, i) => [p.id, i]));
  const BY_SLUG = Object.fromEntries(P.map(p => [SLUG[p.id], p.id]));
  const wn = id => pad(WORK.indexOf(id) + 1);           // number shown on the Work index
  const caseHref = id => '#/case/' + SLUG[id];

  // The New Rules of Fashion image helper
  const NI = (p, w) => `assets/img/${p}${w === 't' ? '-t' : ''}.webp`;

  /* ================================================================
     THE SYSTEM IS WAKING UP · interactive report redesign
     Keeps its own identity (graphite, mineral white, signal green, violet, steel).
     Dedicated case (sysCase + initSys). Styles in case-sys.css. Frames are captured from the live HTML.
     ================================================================ */
  const SY_LIVE = 'assets/live/tech-trends-2025-the-system-is-waking-up.html';
  const SI = (p, w) => `assets/img/sys/${p}${w === 't' ? '-t' : ''}.webp`;
  const syImg = (p, alt, sizes, lazy = true, wt = 960, wf = 1920) => `<img src="${SI(p, 't')}" srcset="${SI(p, 't')} ${wt}w, ${SI(p)} ${wf}w" sizes="${sizes}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
  const syLive = (cls, label = 'Open live experience') => `<a class="y-live ${cls || ''}" href="${SY_LIVE}" target="_blank" rel="noopener"><span>${label}</span><i aria-hidden="true">↗</i></a>`;
  const syVid = (name, poster, label, once) => `<video muted${once ? '' : ' loop'} playsinline preload="none" poster="${poster}" aria-label="${label}"><source src="assets/video/sys-${name}.webm" type="video/webm"><source src="assets/video/sys-${name}.mp4" type="video/mp4"></video>`;
  const SY_DISC = 'Independent presentation redesign based on publicly available McKinsey Technology Trends Outlook 2025 research. Not commissioned by or affiliated with McKinsey &amp; Company.';
  // the thirteen trend profiles in the original report (pdf pages), in report order
  const SY_PROFILES = [['01', 'Agentic AI', 14], ['02', 'Artificial intelligence', 21], ['03', 'Semiconductors', 30], ['04', 'Connectivity', 36], ['05', 'Cloud and edge', 44], ['06', 'Immersive reality', 51], ['07', 'Digital trust', 58], ['08', 'Quantum', 66], ['09', 'Robotics', 73], ['10', 'Mobility', 79], ['11', 'Bioengineering', 86], ['12', 'Space', 93], ['13', 'Energy', 100]];
  const SY_STUDIES = [
    { from: 'List', to: 'Topology', before: '13 technologies presented as separate trends.', bimg: 'r02', bsrc: 'Original report · Contents', after: '13 trends.<br>One system.', aimg: 's02', slide: '02',
      copy: 'The redesign reorganises individual trends into Intelligence, Infrastructure and Physical World, then visually maps their connections.' },
    { from: 'Information', to: 'Behaviour', before: 'Agentic AI described through research and statistics.', bimg: 'r14', bsrc: 'Original report · Agentic AI profile, p.12', after: 'Software<br>started acting.', aimg: 's03', slide: '03',
      copy: 'The two figures become oversized moments, and agentic AI is shown doing the work: one execution chain that splits into specialised agents.',
      chips: ['<span class="k">+985%</span>', '<span class="k">$1.1B</span>', '<span class="c">Goal → Plan → Research → Decision → Action → Verify</span>'] },
    { from: 'Multiple examples', to: 'One visual thesis', before: 'Technology convergence explained through separate examples.', bimg: 'r07', bsrc: 'Original report · Combination examples, p.5', after: 'The breakthrough<br>is the combination.', aimg: 's07', slide: '07',
      copy: 'The value moves from individual technologies to how they are orchestrated together.' },
    { from: 'Topic', to: 'Emotional turning point', before: 'Trust treated as another technology consideration.', bimg: 'r58', bsrc: 'Original report · Digital trust profile, p.56', after: 'The more autonomous the system,<br>the more trust matters.', aimg: 's09', slide: '09',
      copy: 'The deck goes quiet. Everything built so far passes through one narrow gate, and when trust fails, the connections fade.' },
    { from: 'Summary', to: 'Resolution', before: 'A technology outlook ends as a collection of trends.', bimg: 'r09', bsrc: 'Original report · Exhibit 2, p.7', after: 'The future is not a tool.<br>It is a system.', aimg: 's10', slide: '10',
      copy: 'The last slide returns to the opening network, now fully connected, and answers the question the cover asked.' }
  ];
  // looping clips play only while visible
  const syPlay = (vids, root) => {
    if (RM) return;
    const vo = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) { if (!v.loop && v.ended) return; v.preload = 'auto'; const pr = v.play(); pr && pr.catch(() => {}); } else v.pause(); }), { root: root || null, threshold: .3 });
    vids.forEach(v => vo.observe(v));
  };

  /* ================================================================
     CASE LAYER
     Every case opens in #case, its own scroll container under a case bar
     (logo · All work · title · Prev / Next). The art-directed pages below observe it as root.
     ================================================================ */
  const cs = $('#case'), cb = $('#cBody');
  const isOpen = () => cs.classList.contains('open');

  /* ================================================================
     GENERATIVE AI · editorial case page
     All copy from the project brief; all figures from the MGI report as used in the deck.
     ================================================================ */
  let scrollFx = [];               // per-frame handlers while a custom case is open
  let scrollRaf = 0;
  const runFx = () => { scrollRaf = 0; scrollFx.forEach(f => f()); };
  cs.addEventListener('scroll', () => { if (scrollFx.length && !scrollRaf) scrollRaf = requestAnimationFrame(runFx); }, { passive: true });
  addEventListener('resize', () => { if (scrollFx.length && isOpen()) runFx(); });
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = t => 1 - Math.pow(1 - t, 3);
  const eio = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  // progress of a pinned section: 0 when its top reaches the bar, 1 when its bottom reaches the viewport bottom
  const pinP = el => { const r = el.getBoundingClientRect(); const top = 68; const run = r.height - (innerHeight - top); return run > 0 ? clamp((top - r.top) / run) : 0; };
  const gimg = (p, alt = '', sizes = '100vw', lazy = true) => `<img src="${T(p)}" srcset="${T(p)} 960w, ${F(p)} 1920w" sizes="${sizes}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
  const K = (n, t) => `<p class="g-k"><span>${n}</span>${t}</p>`;

  const GAI_SLIDES = [
    'Cover', 'The shift has already started', 'Generative AI accelerates automation', 'AI reaches knowledge work first', 'High exposure does not mean disappearance',
    '12 million more work transitions may be needed', 'The future doesn’t arrive evenly', 'The labor market is reweighting', 'Productivity is the upside', 'Human + AI, by design'
  ];
  const gs = n => 'gai/s' + pad(n);

  const gaiCase = i => {
    const nx = P[(i + 1) % P.length];
    const chapters = [
      ['Labor-market shift', 'The scale of change that has already happened.', [1, 2]],
      ['Automation', 'Why generative AI pulls the timeline forward.', [3, 4]],
      ['Human impact', 'Who is exposed, who moves, which work grows.', [5, 6, 7, 8]],
      ['Human + AI', 'Productivity, and a new division of work.', [9, 10]]
    ];
    const tasks = [
      ['Strategy', 'h', .06, .04], ['Sorting', 'a', .50, .00], ['First drafts', 'a', .18, .30], ['Creativity', 'h', .62, .26],
      ['Reporting', 'a', .02, .60], ['Problem solving', 'h', .36, .52], ['Data synthesis', 'a', .64, .66], ['Collaboration', 'h', .22, .86]
    ];
    const loops = [
      ['count', 'Count-up statistics', 'Slide 02', 'The headline number counts up, so the scale lands before the caption.'],
      ['bars', 'Chart growth', 'Slide 08', 'Declining and growing occupations draw from one baseline, in order.'],
      ['reveal', 'Progressive data reveal', 'Slide 06', 'One figure per million transitions, revealed group by group.'],
      ['redistribute', 'Human vs AI task redistribution', 'Slide 09', 'Mixed tasks separate into what people lead and what AI handles.'],
      ['transition', 'Slide transitions', 'Slides 09 → 10', 'The dark story opens into the light finale as the argument resolves.']
    ];
    const pages = Array.from({ length: 76 }, (_, k) => `<i style="--i:${k}"></i>`).join('');
    const tens = Array.from({ length: 10 }, (_, k) => `<span style="--i:${k}"><img src="${T(gs(k + 1))}" alt="" loading="lazy" decoding="async"></span>`).join('');
    return `
    <article class="g">
      <!-- 01 HERO -->
      <section class="g-hero">
        <div class="wrap">
          <div class="g-meta c-in"><span class="gold">${wn(P[i].id)} / ${pad(WORK.length)}</span><span>Independent Presentation Redesign</span><span>Data Storytelling · Motion · HTML</span></div>
          <h1 id="cTitle" class="g-title"><span class="ln"><span>Generative AI</span></span><span class="ln"><span>&amp; the Future of Work</span></span></h1>
          <div class="g-hero-low">
            <div class="g-big c-in d2" aria-label="76 pages of research to 10 slides of visual storytelling">
              <div class="g-num"><b class="o">76</b><i class="g-arr" aria-hidden="true"></i><b>10</b></div>
              <div class="g-numlab"><span>76 pages of research</span><span>10 slides of visual storytelling</span></div>
            </div>
            <div class="g-stack" aria-hidden="true">
              <span class="g-sf a">${gimg(gs(5), '', '40vw', false)}</span>
              <span class="g-sf b">${gimg(gs(3), '', '40vw', false)}</span>
              <span class="g-sf c">${gimg(gs(1), '', '50vw', false)}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- intro / facts -->
      <section class="g-intro">
        <div class="wrap">
          <div class="g-intro-grid">
            <p class="g-lede rv">A presentation redesign based on McKinsey Global Institute’s <span>“Generative AI and the Future of Work in America.”</span></p>
            <div class="g-intro-side rv d1">
              <p>The original research brings together labor-market shifts, automation scenarios, occupational transitions and the changing role of human skills.</p>
              <p>My challenge was to turn that complexity into a story that could be understood quickly, without losing the evidence behind it.</p>
              <a class="link-arrow" href="assets/live/${P[i].live}.html" target="_blank" rel="noopener">Open the live presentation <i>↗</i></a>
            </div>
          </div>
          <dl class="g-facts rv">
            <div><dt>Role</dt><dd>Storytelling · Presentation Design · Data Visualization · Motion · HTML/CSS/JS</dd></div>
            <div><dt>Format</dt><dd>10-slide interactive presentation</dd></div>
            <div><dt>Source</dt><dd>McKinsey Global Institute · July 2023</dd></div>
            <div><dt>Note</dt><dd>Independent redesign. Not commissioned by or affiliated with McKinsey &amp; Company.</dd></div>
          </dl>
        </div>
      </section>

      <!-- statement over the cover -->
      <section class="g-state">
        <div class="wrap">
          <div class="g-cover g-par rv">${gimg(gs(1), 'Cover slide of the redesigned presentation', '(max-width:1440px) 92vw, 1280px')}</div>
          <blockquote class="g-quote rv"><p>When human intelligence meets generative AI, work changes. <span>Not by replacement, but by redesign.</span></p><cite>Cover statement, slide 01</cite></blockquote>
        </div>
      </section>

      <!-- 02 CHALLENGE -->
      <section class="g-sec g-paper">
        <div class="wrap">
          ${K('02', 'The challenge')}
          <h2 class="g-h2 rv">From dense research<br>to a story you can follow.</h2>
          <div class="g-ch">
            <p class="g-ch-a rv">The original research combines labor-market shifts, automation scenarios, occupational transitions and changing skill requirements.</p>
            <div class="g-ch-b rv d1">
              <p>The challenge was not simply to redesign its pages.</p>
              <p class="em">It was to decide what the audience needed to understand first, what could disappear, and what deserved to become a visual moment.</p>
            </div>
          </div>
          <figure class="g-76 rv" aria-label="76 report pages reduced to 10 slides">
            <div class="g-76-col"><b>76</b><span>pages of research</span><div class="g-pages">${pages}</div></div>
            <div class="g-76-mid" aria-hidden="true"><i></i></div>
            <div class="g-76-col s"><b>10</b><span>slides of visual storytelling</span><div class="g-tens">${tens}</div></div>
          </figure>
        </div>
      </section>

      <!-- 03 REPORT VS PRESENTATION -->
      <section class="g-sec g-rvp">
        <div class="wrap">
          ${K('03', 'Original report vs presentation')}
          <div class="g-rep">
            <div class="g-col g-col-rep">
              <span class="g-pg p1 rv"><img src="${T('gai/r27')}" srcset="${T('gai/r27')} 1000w, ${F('gai/r27')} 2000w" sizes="50vw" alt="Original report spread with Exhibit 2" loading="lazy"></span>
              <span class="g-pg p2 rv d1"><img src="${T('gai/r12')}" srcset="${T('gai/r12')} 540w, ${F('gai/r12')} 1080w" sizes="20vw" alt="Original report text page" loading="lazy"></span>
              <span class="g-pg p3 rv d2"><img src="${T('gai/r01')}" srcset="${T('gai/r01')} 540w, ${F('gai/r01')} 1080w" sizes="20vw" alt="Original report cover" loading="lazy"></span>
            </div>
            <ul class="g-tags rv"><li><span>01</span>Research-heavy</li><li><span>02</span>Data-dense</li><li><span>03</span>Built for reading</li></ul>
          </div>
          <p class="g-cap rv">Original report · McKinsey Global Institute, July 2023 · 76 pages</p>
          <div class="g-turn">
            <i class="g-vline rv" aria-hidden="true"></i>
            <h2 class="g-h2 g-turn-h rv">The redesign needed<br><span>to be built for presenting.</span></h2>
          </div>
          <div class="g-rep flip">
            <ul class="g-tags rv"><li><span>01</span>One idea per slide</li><li><span>02</span>Visual first</li><li><span>03</span>Built for presenting</li></ul>
            <div class="g-col g-col-pres">
              <span class="g-sl q1 rv">${gimg(gs(2), 'Slide 02, the shift has already started', '60vw')}</span>
              <span class="g-sl q2 rv d1">${gimg(gs(8), 'Slide 08, the labor market is reweighting', '40vw')}</span>
              <span class="g-sl q3 rv d2">${gimg(gs(7), 'Slide 07, the future does not arrive evenly', '30vw')}</span>
            </div>
          </div>
          <p class="g-cap r rv">Redesign · 10-slide interactive presentation · 16:9</p>
        </div>
      </section>

      <!-- 04 REBUILDING THE STORY -->
      <section class="g-sec g-story-intro">
        <div class="wrap">
          ${K('04', 'Rebuilding the story')}
          <h2 class="g-h2 rv">I rebuilt the story,<br>not the slides.</h2>
          <div class="g-idea rv">
            <span class="g-mini">The central idea</span>
            <p>“AI does not simply replace work. <span>It redesigns how work gets done.”</span></p>
          </div>
        </div>
      </section>
      <section class="g-hs" data-pin>
        <div class="g-pin">
          <div class="wrap g-hs-top">
            <span class="g-mini">Four chapters · ten slides</span>
            <div class="g-line" aria-hidden="true"><i class="g-line-f"></i>${chapters.map((c, k) => `<b style="left:${k / (chapters.length - 1) * 100}%"></b>`).join('')}</div>
          </div>
          <div class="g-track">
            ${chapters.map((c, k) => `
            <div class="g-ch-panel" data-k="${k}">
              <span class="g-ch-ix">${pad(k + 1)}</span>
              <h3>${c[0]}${k < chapters.length - 1 ? ' <em>→</em>' : ''}</h3>
              <p>${c[1]}</p>
              <ol>${c[2].map(n => `<li><span>${pad(n)}</span>${GAI_SLIDES[n - 1]}</li>`).join('')}</ol>
              <div class="g-ch-th n${c[2].length}">${c[2].map(n => `<span><img src="${T(gs(n))}" alt="" loading="lazy" decoding="async"></span>`).join('')}</div>
            </div>`).join('')}
          </div>
        </div>
      </section>
      <section class="g-sec g-rn">
        <div class="wrap">
          <p class="g-xl rv"><span class="mute">Not report <em>→</em> slides.</span><br>Research <em>→</em> narrative.</p>
          <div class="g-rn-copy rv d1">
            <p>Instead of following the report page by page, the presentation reorganizes the research into a ten-part story in which each slide delivers one primary idea.</p>
            <p>The 10-slide experience moves from the scale of labor-market change to automation, vulnerable and growing occupations, productivity potential and, finally, the relationship between human judgment and AI.</p>
          </div>
        </div>
      </section>

      <!-- 05 DATA BECAME VISUAL MOMENTS -->
      <section class="g-sec g-data">
        <div class="wrap">
          ${K('05', 'Data became visual moments')}
          <p class="g-data-int rv">Complex data was translated into animated charts, visual comparisons, progressive reveals and human–AI interaction metaphors, so that every slide communicates one clear idea.</p>
          <div class="g-stat s1 rv"><b><span data-cnt data-to="8.6" data-dec="1">8.6</span>M</b><div><p>occupational shifts<br>2019–2022</p><small>Report: At a glance, p. iv · Slide 02</small></div></div>
          <div class="g-stat s2 rv"><b><span data-cnt data-to="30" data-dec="0">30</span>%</b><div><p>of current work hours<br>could be automated by 2030</p><small>Report: At a glance, p. iv · Slide 03</small></div></div>
          <div class="g-stat s3 rv"><b><span data-cnt data-to="12" data-dec="0">12</span>M</b><div><p>additional occupational<br>transitions by 2030</p><small>Report: pp. 8, 27 · Slide 06</small></div></div>
        </div>
      </section>

      <!-- 06 SELECTED SLIDES -->
      <section class="g-sec g-sel">
        <div class="wrap">
          ${K('06', 'Selected slides')}
          <figure class="g-fig full rv"><div class="g-fr g-par">${gimg(gs(1), 'Slide 01, cover', '(max-width:1440px) 92vw, 1280px')}</div><figcaption><span>01</span>Cover. The theme stated once, in a single image of human and synthetic hands on the same work.</figcaption></figure>
          <figure class="g-fig crop rv"><div class="g-fr">${gimg(gs(2), 'Slide 02, detail of the 8.6M figure', '100vw')}</div><figcaption><span>02</span>Occupational shifts. One number carries the slide; the four categories sit underneath it.</figcaption></figure>
          <div class="g-pair">
            <figure class="g-fig rv"><div class="g-fr g-par">${gimg(gs(3), 'Slide 03, generative AI accelerates automation', '(max-width:820px) 92vw, 46vw')}</div><figcaption><span>03</span>Automation, without and with generative AI, read as one comparison.</figcaption></figure>
            <figure class="g-fig low rv d1"><div class="g-fr g-par">${gimg(gs(8), 'Slide 08, declining and growing occupations', '(max-width:820px) 92vw, 46vw')}</div><figcaption><span>08</span>Declining vs growing occupations on one shared baseline.</figcaption></figure>
          </div>
        </div>
        <figure class="g-fig bleed rv"><div class="g-fr g-par">${gimg(gs(9), 'Slide 09, productivity is the upside', '100vw')}</div><figcaption class="wrap"><span>09</span>Productivity upside. The biggest upside is not less work, it is better work.</figcaption></figure>
        <div class="wrap">
          <figure class="g-fig detail rv"><figcaption><span>09</span>Human leads / AI handles. The task split, shown as two columns of work rather than a chart.</figcaption><div class="g-fr">${gimg(gs(9), 'Slide 09, detail of human leads and AI handles', '70vw')}</div></figure>
          <figure class="g-fig full rv"><div class="g-fr g-par">${gimg(gs(10), 'Slide 10, the future of work is human plus AI, by design', '(max-width:1440px) 92vw, 1280px')}</div><figcaption><span>10</span>The conclusion: human + AI, by design, with four moves to act on.</figcaption></figure>
        </div>
      </section>

      <!-- 07 HUMAN + AI SYSTEM -->
      <section class="g-hx" data-pin>
        <div class="g-pin">
          <div class="wrap g-hx-in">
            <div class="g-hx-head">
              ${K('07', 'Human + AI system')}
              <h2 class="g-h2">Human leads.<br><span>AI handles.</span></h2>
            </div>
            <div class="g-chips">
              <span class="g-col-h h">Human leads</span><span class="g-col-h a">AI handles</span>
              ${tasks.map((t, k) => `<span class="g-chip ${t[1]}" data-k="${k}" data-x="${t[2]}" data-y="${t[3]}">${t[0]}</span>`).join('')}
            </div>
            <p class="g-hx-end">The story ends not with replacement,<br><span>but with redistribution of work.</span></p>
          </div>
        </div>
      </section>

      <!-- 08 MOTION -->
      <section class="g-sec g-mo">
        <div class="wrap">
          ${K('08', 'Motion as explanation')}
          <div class="g-mo-head">
            <h2 class="g-h2 rv">Motion was part<br>of the explanation.</h2>
            <p class="rv d1">Animation was used to reveal relationships and progression, not to decorate the slides.</p>
          </div>
          <div class="g-loops">
            ${loops.map((l, k) => `
            <figure class="g-loop l${k + 1} rv">
              <div class="g-fr"><video muted loop playsinline preload="none" poster="${F('gai/v-' + l[0])}" aria-label="${l[1]}, looping clip from the presentation"><source src="assets/video/gai-${l[0]}.webm" type="video/webm"><source src="assets/video/gai-${l[0]}.mp4" type="video/mp4"></video></div>
              <figcaption><span>${pad(k + 1)}</span><b>${l[1]}</b><small>${l[2]}</small><em>${l[3]}</em></figcaption>
            </figure>`).join('')}
          </div>
        </div>
      </section>

      <!-- 09 DESIGN SYSTEM / ROLE -->
      <section class="g-sec g-sys">
        <div class="wrap">
          ${K('09', 'Design system / role')}
          <div class="g-sys-grid">
            <dl class="rv"><dt>Role</dt><dd>Storytelling</dd><dd>Presentation Design</dd><dd>Data Visualization</dd><dd>Motion</dd><dd>HTML / CSS / JavaScript</dd></dl>
            <dl class="rv d1"><dt>Presentation</dt><dd>10 slides</dd><dd>16:9</dd><dd>Interactive HTML</dd></dl>
            <dl class="rv d2"><dt>Typography</dt><dd class="g-aa">Aa</dd><dd>Satoshi</dd></dl>
            <dl class="rv d2"><dt>Source</dt><dd>McKinsey Global Institute</dd><dd>July 2023</dd></dl>
          </div>
        </div>
      </section>

      <!-- 10 FINAL -->
      <section class="g-end" data-pin>
        <div class="g-pin">
          <div class="wrap g-end-in">
            <p class="g-end-a">The goal wasn’t to make<br>76 pages look better.</p>
            <p class="g-end-b">${'It was to make the argument easier to understand.'.split(' ').map((w, k) => `<span style="--i:${k}">${w}</span>`).join(' ')}</p>
            <div class="g-end-foot">
              <span class="g-mini">Presentation Design · Data Storytelling · Motion</span>
              <a class="link-arrow" href="assets/live/${P[i].live}.html" target="_blank" rel="noopener">Open the live presentation <i>↗</i></a>
            </div>
          </div>
          <p class="wrap g-disc">Independent redesign based on publicly available McKinsey Global Institute research.<br>Not commissioned by or affiliated with McKinsey &amp; Company.</p>
        </div>
      </section>
    </article>
    <button class="c-next" data-goto="${(i + 1) % P.length}">
      <div class="wrap">
        <div><span>Next project</span><b>${nx.title} <i>→</i></b><small>${nx.cat}</small></div>
        <div class="nimg"><img${Z(nx.card)} src="${T(nx.card)}" alt="" loading="lazy" decoding="async"></div>
      </div>
    </button>`;
  };

  const initGai = () => {
    const root = $('.g', cb);
    const mobile = () => matchMedia('(max-width: 900px)').matches;

    // counters
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; co.unobserve(e.target);
      const el = e.target, to = +el.dataset.to, dec = +el.dataset.dec;
      if (RM) { el.textContent = to.toFixed(dec); return; }
      const t0 = performance.now(), dur = 1700;
      const step = now => { const p = clamp((now - t0) / dur); el.textContent = (to * ease(p)).toFixed(dec); if (p < 1) requestAnimationFrame(step); };
      el.textContent = (0).toFixed(dec); requestAnimationFrame(step);
    }), { root: cs, threshold: .6 });
    $$('[data-cnt]', root).forEach(el => { if (!RM) el.textContent = (0).toFixed(+el.dataset.dec); co.observe(el); });

    // looping clips play only while on screen
    const vids = $$('video', root);
    if (!RM) {
      const vo = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) { v.preload = 'auto'; const pr = v.play(); pr && pr.catch(() => {}); } else v.pause(); }), { root: cs, threshold: .35 });
      vids.forEach(v => vo.observe(v));
    }

    if (RM) { root.classList.add('rm'); return; }

    // subtle image depth
    const par = $$('.g-par img', root);
    scrollFx.push(() => {
      const vh = innerHeight;
      par.forEach(im => { const r = im.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; const k = ((r.top + r.height / 2) - vh / 2) / vh; im.style.transform = `translate3d(0,${(k * -3.2).toFixed(2)}%,0) scale(1.07)`; });
    });

    // hero stack drifts slightly as you leave the hero
    const stack = $('.g-stack', root);
    scrollFx.push(() => { const y = Math.min(cs.scrollTop, 900); stack.style.setProperty('--sy', (y * .06).toFixed(1) + 'px'); });

    // 04 horizontal chapters
    const hs = $('.g-hs', root), track = $('.g-track', hs), lineF = $('.g-line-f', hs), nodes = $$('.g-line b', hs), panels = $$('.g-ch-panel', hs);
    scrollFx.push(() => {
      if (mobile()) { track.style.transform = ''; panels.forEach(p => p.classList.add('on')); return; }
      const p = pinP(hs), max = track.scrollWidth - innerWidth;
      const q = eio(p);
      track.style.transform = `translate3d(${(-q * Math.max(0, max)).toFixed(1)}px,0,0)`;
      lineF.style.transform = `scaleX(${q.toFixed(4)})`;
      nodes.forEach((n, k) => n.classList.toggle('on', q >= k / (nodes.length - 1) - .02));
      panels.forEach((pa, k) => pa.classList.toggle('on', q >= k / (panels.length - 1) - .2));
    });

    // 07 tasks sort into two columns
    const hx = $('.g-hx', root), box = $('.g-chips', hx), chips = $$('.g-chip', hx), heads = $$('.g-col-h', hx), endl = $('.g-hx-end', hx);
    scrollFx.push(() => {
      const p = pinP(hx), W = box.clientWidth, H = box.clientHeight;
      const colX = { h: 0, a: mobile() ? .5 : .52 };
      const n = { h: 0, a: 0 };
      chips.forEach((c, k) => {
        const kind = c.classList.contains('h') ? 'h' : 'a';
        const row = n[kind]++;
        const sx = +c.dataset.x, sy = +c.dataset.y, ex = colX[kind], ey = .2 + row * .19;
        const t = eio(clamp((p - .08 - k * .025) / .5));
        const cw = c.offsetWidth, ch = c.offsetHeight;
        const x = (sx + (ex - sx) * t) * W, y = (sy + (ey - sy) * t) * (H - ch);
        c.style.transform = `translate3d(${Math.min(x, W - cw).toFixed(1)}px,${y.toFixed(1)}px,0)`;
        c.classList.toggle('set', t > .55);
      });
      heads.forEach(h => h.classList.toggle('on', p > .4));
      endl.classList.toggle('on', p > .72);
    });

    // 10 final statement
    const end = $('.g-end', root), ea = $('.g-end-a', end), words = $$('.g-end-b span', end), ef = $('.g-end-foot', end);
    scrollFx.push(() => {
      const p = pinP(end);
      ea.style.opacity = (1 - clamp((p - .3) / .3) * .72).toFixed(3);
      words.forEach((w, k) => w.classList.toggle('on', p > .32 + k * .045));
      ef.classList.toggle('on', p > .75);
    });

    runFx();
  };

  /* ================================================================
     THE NEW RULES OF FASHION · special issue case
     Copy from the project brief. Figures as published in the deck (State of Fashion 2026, BoF × McKinsey).
     ================================================================ */
  const fi = (p, alt = '', sizes = '100vw', lazy = true) => `<img src="${NI(p, 't')}" srcset="${NI(p, 't')} 1000w, ${NI(p)} 2000w" sizes="${sizes}" alt="${alt}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
  const FK = (n, t) => `<p class="f-k"><span>${n}</span>${t}</p>`;
  // report chapters in original order; g = narrative shift
  const NRF_THEMES = [['01', 'Tariff Turbulence', 0], ['02', 'Workforce Rewired', 1], ['03', 'The AI Shopper', 2], ['04', 'Jewellery Sparkles', 3], ['05', 'Smart Frames', 2], ['06', 'The Wellbeing Era', 3], ['07', 'Efficiency Unlocked', 1], ['08', 'Resale Sprint', 3], ['09', 'The Elevation Game', 4], ['10', 'Luxury Recalibrated', 4]];
  const NRF_SHIFTS = [['Pressure', 'Slides 02–03', 'nrf/s03'], ['Rewiring', 'Slide 04', 'nrf/s04'], ['New consumer', 'Slides 05–06', 'nrf/s05'], ['New value', 'Slides 07–08', 'nrf/s07'], ['New luxury', 'Slide 09', 'nrf/s09']];
  const NRF_LOOPS = [
    ['compose', 'Typography assembling', 'Slide 01', 'The cover sets itself word by word, like type placed on a page.'],
    ['swap', 'Uncertainty → challenging', 'Slide 02', 'Last year’s word is struck through and replaced.'],
    ['46', '46% reveal', 'Slide 02', 'The figure enters and the tailor’s tape measures it.'],
    ['search', 'AI search interaction', 'Slide 05', 'A query is typed and the coat is read attribute by attribute.'],
    ['4700', '4,700% shock reveal', 'Slide 05', 'The number takes over the page, then settles into the layout.'],
    ['glasses', 'Smart glasses interface', 'Slide 06', 'The lens overlays context, object and navigation.'],
    ['resale', 'Resale garment journey', 'Slide 08', 'One coat travels across three owners.'],
    ['craft', 'Luxury craft reveal', 'Slide 09', 'The leather edge is revealed in macro, stitch by stitch.']
  ];
  const BODICE = `<svg class="f-pattern" viewBox="0 0 420 230" aria-hidden="true">
      <path d="M18 40 L120 18 Q150 52 196 50 L208 20 L360 34 Q372 90 398 120 L402 212 L24 212 Q30 120 18 40 Z" fill="none" stroke="#101010" stroke-width="1.4"/>
      <path d="M30 50 L120 31 Q150 64 197 62 L210 33 L349 46 Q361 98 386 126 L389 200 L36 200 Q41 120 30 50 Z" fill="none" stroke="#101010" stroke-width=".9" stroke-dasharray="5 5"/>
      <path d="M90 110 L330 110 M90 110 l12 -6 M90 110 l12 6 M330 110 l-12 -6 M330 110 l-12 6" fill="none" stroke="#D52B1E" stroke-width="1.2"/>
      <path d="M24 130 l-10 0 M400 160 l10 0 M120 18 l-2 -10" stroke="#101010" stroke-width="1.4"/>
      <text x="210" y="150" text-anchor="middle" font-family="Archivo,Helvetica,Arial,sans-serif" font-size="11" font-weight="600" letter-spacing="3" fill="#101010">FRONT BODICE · CUT 1 · SELF</text>
      <text x="210" y="168" text-anchor="middle" font-family="Archivo,Helvetica,Arial,sans-serif" font-size="10" letter-spacing="2" fill="#55524C">GRAIN LINE ↔ · SS 2026</text>
    </svg>`;

  const nrfCase = i => {
    const nx = P[(i + 1) % P.length], live = `assets/live/${P[i].live}.html`;
    const vis = (n, name, tr) => `<div class="f-vcap"><i>${n}</i><b>${name}</b><span><em>→</em>${tr}</span></div>`;
    const words = (t, cls) => `<p class="${cls}">${t.map(w => `<span><i>${w}</i></span>`).join('')}</p>`;
    return `
    <article class="nf">
      <!-- 00 HERO -->
      <section class="f-hero">
        <div class="wrap f-mast c-in"><span>The New Rules of Fashion</span><span>Special project / Editorial data storytelling</span><span class="f-mast-r"><a class="f-mlive" href="${live}" target="_blank" rel="noopener">Live presentation <i>↗</i></a><span>${wn(P[i].id)} / ${pad(WORK.length)}</span></span></div>
        <h1 id="cTitle" class="f-sr">The New Rules of Fashion, 2026</h1>
        <div class="f-cover" aria-hidden="true">
          <span class="f-cw the">THE NEW</span><span class="f-cw rules">RULES</span><span class="f-cw of">OF FASHION</span><span class="f-cw yr">2026</span>
          ${BODICE}
        </div>
        <div class="wrap"><div class="f-hero-low c-in d3">
          <p class="f-hero-lede">A 143-page industry report turned into a 10-slide fashion narrative.</p>
          <div class="f-masthead">
            <ul aria-label="Disciplines"><li>Presentation design</li><li>Data storytelling</li><li>Editorial art direction</li><li>Motion</li><li>2026</li></ul>
          </div>
          <a class="f-live" href="${live}" target="_blank" rel="noopener"><span class="f-live-t">Open live presentation <i>↗</i></span><small>10-slide interactive HTML experience</small></a>
        </div></div>
      </section>

      <!-- 01 POSITIONING -->
      <section class="f-sec f-pos">
        <div class="wrap">
          ${FK('01', 'The brief')}
          <div class="f-pos-a">
            <h2 class="f-lede rv">A 143-page industry report reframed as a 10-slide editorial narrative.</h2>
            <p class="f-body rv d1">The State of Fashion 2026 explores an industry being reshaped from multiple directions at once: trade disruption, artificial intelligence, new consumer behaviours, resale, wellbeing and a recalibration of luxury.</p>
          </div>
          <div class="f-pos-b">
            <p class="f-small rv">The challenge was not to fit ten industry themes into ten slides.</p>
            <p class="f-big rv d1">It was to find the argument underneath them.</p>
          </div>
          <div class="f-idea">
            <p class="f-mini rv">I reorganised the research around one idea</p>
            <blockquote class="rv d1"><p>Fashion is no longer waiting for stability.</p><p>The brands that win will be the ones that learn to operate <span class="f-red">inside change.</span></p></blockquote>
          </div>
          <div class="f-arc rv">
            <p class="f-mini">The resulting presentation moves through five shifts</p>
            <ol>${NRF_SHIFTS.map(s => `<li>${s[0]}</li>`).join('')}</ol>
          </div>
          <div class="f-pos-c">
            <p class="f-body rv">Data is translated through a visual language native to fashion: garment patterns, product tags, tailoring systems, editorial typography, commerce interfaces and material details.</p>
            <p class="f-goal rv d1">The goal was to make strategy feel like fashion, without making the data feel decorative.</p>
          </div>
        </div>
      </section>

      <!-- LIVE EXPERIENCE -->
      <section class="f-sec f-xp">
        <div class="wrap">
          ${FK('Live', 'The presentation itself')}
          <div class="f-xp-head">
            <h2 class="f-xp-h rv">Experience it<br>as it was designed.</h2>
            <div class="f-xp-side rv d1">
              <p class="f-body">The presentation was designed as a responsive, animated HTML experience, not as a sequence of static images.</p>
              <a class="f-live f-live-sm" href="${live}" target="_blank" rel="noopener"><span class="f-live-t">Open live experience <i>↗</i></span></a>
            </div>
          </div>
          <div class="f-xp-frame rv" data-xp="${live}">
            <div class="f-xp-bar"><span class="f-xp-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="f-xp-url">the-new-rules-of-fashion.html</span><a href="${live}" target="_blank" rel="noopener">Open full experience <i>↗</i></a></div>
            <div class="f-xp-view">
              <img class="f-xp-poster" src="${NI('nrf/s01')}" alt="Opening slide of The New Rules of Fashion" loading="lazy" decoding="async">
              <div class="f-xp-load" aria-hidden="true"><span>Loading the live presentation</span></div>
              <button class="f-xp-shield" type="button" aria-label="Interact with the live presentation preview"><span class="f-xp-cta">Click to interact</span><small>Arrows or on-screen controls move between slides</small></button>
              <a class="f-xp-mob" href="${live}" target="_blank" rel="noopener"><span>Open full experience <i>↗</i></span><small>Best viewed in landscape</small></a>
            </div>
          </div>
          <p class="f-xp-cap rv">Live preview of the actual HTML file. No sound. The page keeps scrolling normally until you choose to interact.</p>
        </div>
      </section>

      <!-- 02 PROCESS -->
      <section class="f-sec f-proc">
        <div class="wrap">
          ${FK('02', 'Information architecture')}
          <h2 class="f-neq rv" aria-label="10 themes is not 10 slides"><span>10 themes</span><b aria-hidden="true">≠</b><span>10 slides</span></h2>
          <p class="f-proc-sub rv d1">I looked for the system underneath them.</p>
        </div>
      </section>
      <section class="f-sort" data-pin>
        <div class="f-pin">
          <div class="wrap f-sort-in" aria-hidden="true">
            <div class="f-sort-head"><span class="a">The report · 10 chapters, in order</span><span class="b">The narrative · 5 shifts</span></div>
            <div class="f-board">
              ${NRF_SHIFTS.map((s, g) => `<div class="f-shift" style="--g:${g}"><b>${s[0]}</b><small>${s[1]}</small><span class="f-fr"><img src="${NI(s[2], 't')}" alt="" loading="lazy" decoding="async"></span></div>`).join('')}
              ${NRF_THEMES.map((t, k) => `<span class="f-th" data-k="${k}" data-g="${t[2]}"><i>${t[0]}</i>${t[1]}</span>`).join('')}
            </div>
            <p class="f-sort-note">Chapter numbers follow The State of Fashion 2026. Groups are the narrative order of the redesign.</p>
          </div>
          <div class="wrap f-sort-static">
            <p class="f-mini">The report · 10 chapters</p>
            <div class="f-ss-list">${NRF_THEMES.map(t => `<span><i>${t[0]}</i>${t[1]}</span>`).join('')}</div>
            <span class="f-ss-arrow" aria-hidden="true">↓</span>
            <p class="f-mini f-red">The narrative · 5 shifts</p>
            ${NRF_SHIFTS.map((s, g) => `<div class="f-ss-g"><b>${s[0]}<small>${s[1]}</small></b>${NRF_THEMES.filter(t => t[2] === g).map(t => `<span><i>${t[0]}</i>${t[1]}</span>`).join('')}</div>`).join('')}
          </div>
        </div>
      </section>

      <!-- 03 VISUAL LANGUAGE -->
      <section class="f-sec f-vis">
        <div class="wrap">
          ${FK('03', 'Visual language')}
          <h2 class="f-h2 rv">Fashion became<br>the visual system.</h2>
          <div class="f-spread">
            <figure class="f-v v1 rv">
              <span class="f-fr a">${fi('nrf/c-cut', 'Slide 03 detail, export volumes drawn as garment pattern pieces', '(max-width:900px) 92vw, 56vw')}</span>
              ${vis('01', 'Trade', 'garment patterns / sourcing labels')}
              <span class="f-fr b">${fi('nrf/c-tags', 'Slide 03 detail, tariff rates on price tags', '(max-width:900px) 66vw, 38vw')}</span>
            </figure>
            <figure class="f-v v2 rv">
              ${vis('02', 'AI<br>shopping', 'fashion product discovery interface')}
              <span class="f-fr">${fi('nrf/c-ui', 'Slide 05 detail, AI search interface reading a coat', '(max-width:900px) 92vw, 72vw')}</span>
            </figure>
            <figure class="f-v v3 rv">
              <span class="f-fr">${fi('nrf/c-glass', 'Slide 06 detail, smart glasses overlay', '(max-width:900px) 92vw, 46vw')}</span>
              ${vis('03', 'Smart frames', 'eyewear as information interface')}
            </figure>
            <figure class="f-v v4 rv d1">
              <span class="f-fr">${fi('nrf/c-kfr', 'Slide 07 detail, Keep, Feel, Reuse', '(max-width:900px) 82vw, 46vw')}</span>
              ${vis('04', 'Value', 'Keep / Feel / Reuse')}
            </figure>
            <figure class="f-v v5 rv">
              <span class="f-fr">${fi('nrf/c-own', 'Slide 08 detail, one coat across three owners', '(max-width:900px) 92vw, 80vw')}</span>
              ${vis('05', 'Resale', 'one garment across multiple owners')}
            </figure>
          </div>
        </div>
        <figure class="f-v f-v6 rv">
          <span class="f-fr">${fi('nrf/c-craft', 'Slide 09 detail, leather edge with fifteen stitches', '100vw')}</span>
          <div class="wrap">${vis('06', 'Luxury', 'material, stitching, craftsmanship')}</div>
        </figure>
      </section>

      <!-- 04 SELECTED MOMENTS -->
      <section class="f-sec f-mom">
        <div class="wrap">
          ${FK('04', 'Selected moments')}
          <h2 class="f-h2 rv">The slides<br>are the work.</h2>
        </div>
        <figure class="f-m bleed rv"><span class="f-fr">${fi('nrf/s01', 'Slide 01, cover: The New Rules of Fashion 2026', '100vw')}</span><figcaption class="wrap"><span>01</span>Cover. The title is set like a magazine masthead, with a bodice pattern piece as the only image.</figcaption></figure>
        <figure class="f-m detail rv"><span class="f-fr">${fi('nrf/c-46', 'Slide 02 detail, 46% at full scale', '100vw')}</span><figcaption class="wrap"><span>02</span>46% of fashion executives expect industry conditions to worsen in 2026. A year earlier: 39%.</figcaption></figure>
        <div class="wrap f-typo rv"><p>Fashion leaders no longer expect volatility to disappear.</p><p>They are learning to operate inside it.</p><cite>Slide 02 · The old playbook no longer works</cite></div>
        <div class="wrap">
          <figure class="f-m rv"><span class="f-fr r169">${fi('nrf/s03', 'Slide 03, trade has redrawn the map', '(max-width:1440px) 92vw, 1280px')}</span><figcaption><span>03</span>Trade has redrawn the map. Pattern pieces are sized by 2024 exports to the US; tariffs sit on price tags.</figcaption></figure>
          <div class="f-pair">
            <figure class="f-m rv"><span class="f-fr r169">${fi('nrf/s04', 'Slide 04, AI is no longer a side project', '(max-width:900px) 92vw, 56vw')}</span><figcaption><span>04</span>Craft, system, hybrid: one curve becomes a stepped grid.</figcaption></figure>
            <figure class="f-m rv d1"><span class="f-fr r169">${fi('nrf/s08', 'Slide 08, the second life is becoming the first choice', '(max-width:900px) 70vw, 38vw')}</span><figcaption><span>08</span>The second life is becoming the first choice.</figcaption></figure>
          </div>
        </div>
        <figure class="f-m bleed rv"><span class="f-fr">${fi('nrf/s07', 'Slide 07, value does not mean cheap anymore', '100vw')}</span><figcaption class="wrap"><span>07</span>Value doesn’t mean cheap anymore. Jewellery, wellbeing and resale read as Keep, Feel, Reuse.</figcaption></figure>
      </section>

      <!-- 05 THE AI SHOPPER -->
      <section class="f-ai" data-pin>
        <div class="f-pin">
          <div class="wrap f-ai-top">${FK('05', 'The AI shopper')}<span class="f-mini">Rule 03 · Design for the AI shopper</span></div>
          <p class="f-ai-num" aria-label="4,700 percent"><span class="f-ai-n">4,700</span><sup>%</sup></p>
          <div class="wrap f-ai-low">
            <p class="f-ai-cap">growth in shopping-related generative AI searches, July 2024 → July 2025.<small>Source: The State of Fashion 2026, ch. 03 The AI Shopper. Search interface and product attributes are illustrative.</small></p>
            <figure class="f-ai-ui"><span class="f-fr"><video muted loop playsinline preload="none" poster="${NI('nrf/v-search')}" aria-label="The AI search interface from slide 05, looping"><source src="assets/video/nrf-search.webm" type="video/webm"><source src="assets/video/nrf-search.mp4" type="video/mp4"></video></span><figcaption><span>05</span>A query, a coat read attribute by attribute, three looks assembled.</figcaption></figure>
          </div>
        </div>
      </section>

      <!-- 06 NEW LUXURY -->
      <section class="f-lux">
        <div class="wrap">
          ${FK('06', 'New luxury')}
          <h2 class="f-lux-a f-slow"><span>Price is not</span><span>prestige.</span></h2>
          <h2 class="f-lux-b f-slow">Craft is.</h2>
        </div>
        <figure class="f-lux-macro f-slow"><span class="f-fr">${fi('nrf/c-stitch', 'Slide 09 macro, stitched leather edge, nine of fifteen stitches in red', '100vw')}</span></figure>
        <div class="wrap f-lux-foot f-slow">
          <p><b>9 of 15</b>Each stitch is one of the 15 largest luxury brands. Red thread: a new creative director appointed in the 12 months since September 2024.</p>
          <p><b>“Expertise and quality.”</b>The No. 1 attribute ultra-high-net-worth customers say epitomises luxury.</p>
          <small>Source: The State of Fashion 2026, ch. 10 Luxury Recalibrated.</small>
        </div>
      </section>

      <!-- 07 MOTION -->
      <section class="f-sec f-mo">
        <div class="wrap">
          ${FK('07', 'Motion')}
          <h2 class="f-h2 rv">Designed to move<br>like an editorial.</h2>
          <div class="f-loops">
            ${NRF_LOOPS.map((l, k) => `
            <figure class="f-loop l${k + 1} rv">
              <span class="f-fr"><video muted loop playsinline preload="none" poster="${NI('nrf/v-' + l[0])}" aria-label="${l[1]}, looping clip recorded from the presentation"><source src="assets/video/nrf-${l[0]}.webm" type="video/webm"><source src="assets/video/nrf-${l[0]}.mp4" type="video/mp4"></video></span>
              <figcaption><span>${pad(k + 1)}</span><b>${l[1]}</b><small>${l[2]}</small><em>${l[3]}</em></figcaption>
            </figure>`).join('')}
          </div>
        </div>
      </section>

      <!-- 08 COLOPHON -->
      <section class="f-sec f-colo">
        <div class="wrap">
          ${FK('08', 'Colophon')}
          <div class="f-colo-grid">
            <dl class="rv"><dt>Role</dt><dd>Storytelling</dd><dd>Information Architecture</dd><dd>Presentation Design</dd><dd>Data Visualisation</dd><dd>Editorial Art Direction</dd><dd>Motion</dd><dd>HTML / CSS / JavaScript</dd></dl>
            <dl class="rv d1"><dt>Format</dt><dd>10-slide interactive presentation</dd><dd>16:9</dd><dd>1920 × 1080</dd></dl>
            <dl class="rv d2"><dt>Source</dt><dd>The State of Fashion 2026</dd><dd>The Business of Fashion × McKinsey &amp; Company</dd></dl>
            <dl class="rv d3"><dt>Type &amp; colour</dt><dd class="aa">Aa</dd><dd>Bodoni Moda · Archivo</dd><dd class="f-sw" aria-label="Ivory, ink, fashion red"><i style="background:#F2EFE8"></i><i style="background:#101010"></i><i style="background:#D52B1E"></i></dd></dl>
          </div>
          <div class="f-colo-foot rv">
            <p class="f-disc"><b>Disclaimer</b>Independent presentation redesign based on publicly available research. Not commissioned by or affiliated with The Business of Fashion or McKinsey &amp; Company.</p>
            <a class="f-link" href="${live}" target="_blank" rel="noopener">Open the live presentation <i>↗</i></a>
          </div>
        </div>
      </section>

      <!-- 09 END SPREAD -->
      <section class="f-end" data-pin>
        <div class="f-pin">
          <div class="wrap f-end-in">
            ${words(['The new rules', 'aren’t about', 'fashion.'], 'f-end-a')}
            ${words(['They’re about', 'adaptation.'], 'f-end-b')}
            <i class="f-end-line" aria-hidden="true"></i>
          </div>
        </div>
      </section>
      <button class="f-next" data-goto="${(i + 1) % P.length}">
        <div class="wrap">
          <b>Next project <i>→</i></b>
          <small>Return to the portfolio<span>${nx.title}</span></small>
        </div>
      </button>
    </article>`;
  };

  // live preview: iframe loads only on desktop-sized screens, near the viewport; a shield keeps page scroll intact until clicked
  const initXp = root => {
    const fr = $('.f-xp-frame', root); if (!fr) return;
    const view = $('.f-xp-view', fr), shield = $('.f-xp-shield', fr);
    const can = () => matchMedia('(min-width: 900px) and (hover: hover)').matches;
    if (!can()) { fr.classList.add('static'); return; }
    let ifr = null;
    const load = () => {
      if (ifr) return;
      ifr = document.createElement('iframe');
      ifr.title = 'The New Rules of Fashion, live presentation preview';
      ifr.setAttribute('tabindex', '-1');
      ifr.setAttribute('allow', 'fullscreen');
      ifr.addEventListener('load', () => fr.classList.add('loaded'));
      fr.classList.add('loading');
      ifr.src = fr.dataset.xp;
      view.insertBefore(ifr, shield);
    };
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { load(); io.disconnect(); } }, { rootMargin: '600px 0px' });
    io.observe(fr);
    shield.addEventListener('click', () => { load(); fr.classList.add('live'); ifr.setAttribute('tabindex', '0'); ifr.focus(); });
    fr.addEventListener('pointerleave', () => { if (!fr.classList.contains('live')) return; fr.classList.remove('live'); ifr && ifr.setAttribute('tabindex', '-1'); });
  };

  const initNrf = () => {
    const root = $('.nf', cb);
    initXp(root);
    const mobile = () => matchMedia('(max-width: 900px)').matches;
    // clips play only while on screen
    const vids = $$('video', root);
    if (!RM) {
      const vo = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) { v.preload = 'auto'; const pr = v.play(); pr && pr.catch(() => {}); } else v.pause(); }), { root: cs, threshold: .35 });
      vids.forEach(v => vo.observe(v));
    }
    // slow reveals for the luxury section
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); so.unobserve(e.target); } }), { root: cs, rootMargin: '0px 0px -18% 0px' });
    $$('.f-slow', root).forEach(el => RM ? el.classList.add('in') : so.observe(el));

    // bar turns ink over the end spread; case background follows into the black spread
    const end = $('.f-end', root), nextB = $('.f-next', root);
    scrollFx.push(() => {
      const r = end.getBoundingClientRect();
      cs.classList.toggle('f-dark', r.top <= 68 && nextB.getBoundingClientRect().bottom > 68);
    });

    if (RM) { root.classList.add('rm'); $$('.f-end p span', root).forEach(s => s.classList.add('on')); runFx(); return; }

    // 02 chapters sort into five shifts
    const sort = $('.f-sort', root), board = $('.f-board', sort), items = $$('.f-th', sort), shifts = $$('.f-shift', sort);
    scrollFx.push(() => {
      if (mobile()) return;
      const p = pinP(sort), W = board.clientWidth, colW = W / 5;
      const rowH = Math.min(52, board.clientHeight / 10.6);
      const head = Math.max(84, board.clientHeight * .17);
      const cnt = [0, 0, 0, 0, 0];
      items.forEach((it, k) => {
        const g = +it.dataset.g, j = cnt[g]++;
        const t = eio(clamp((p - .12 - k * .022) / .42));
        const x = g * colW * t, y = (k * rowH) * (1 - t) + (head + j * rowH) * t;
        it.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      });
      shifts.forEach(s => { s.classList.toggle('on', p > .4); s.classList.toggle('th', p > .7); });
      sort.classList.toggle('done', p > .4);
    });

    // 05 the number takes over the viewport, then makes room for the interface
    const ai = $('.f-ai', root), num = $('.f-ai-num', ai), nEl = $('.f-ai-n', ai), low = $('.f-ai-low', ai);
    const fmt = n => Math.round(n).toLocaleString('en-US');
    scrollFx.push(() => {
      if (mobile()) { num.style.cssText = ''; low.style.cssText = ''; nEl.textContent = '4,700'; return; }
      const p = pinP(ai);
      const a = eio(clamp(p / .42)), b = eio(clamp((p - .55) / .3));
      const vh = innerHeight - 68;
      const s = (.16 + .84 * a) * (1 - .58 * b);
      num.style.setProperty('--s', s.toFixed(4));
      num.style.setProperty('--ty', (-b * vh * .27).toFixed(1) + 'px');
      nEl.textContent = fmt(4700 * ease(clamp(p / .42)));
      low.style.setProperty('--o', clamp((p - .62) / .2).toFixed(3));
    });

    // 09 end spread
    const ea = $('.f-end-a', end), aw = $$('.f-end-a span', end), bw = $$('.f-end-b span', end), line = $('.f-end-line', end);
    scrollFx.push(() => {
      if (mobile()) { [...aw, ...bw].forEach(s => s.classList.add('on')); line.classList.add('on'); return; }
      const p = pinP(end);
      aw.forEach((w, k) => w.classList.toggle('on', p > .02 + k * .05));
      ea.style.opacity = (1 - clamp((p - .38) / .2) * .7).toFixed(3);
      bw.forEach((w, k) => w.classList.toggle('on', p > .42 + k * .08));
      line.classList.toggle('on', p > .66);
    });
    runFx();
  };

  /* ---------- The System Is Waking Up · case page ---------- */
  const SY_ACTS = [['I', 'Individual technologies', 'Slide 01', 's01'], ['II', 'Connected capabilities', 'Slide 02', 's02'], ['III', 'Autonomous systems', 'Slides 03–05', 's03'], ['IV', 'Physical-world impact', 'Slides 06–08', 's07'], ['V', 'The question of control', 'Slides 09–10', 's09']];
  const SY_SLIDES = [['sys/s01', 'Cover · The System Is Waking Up'], ['sys/s02', '13 trends. One system.'], ['sys/s03', 'Software started acting.'], ['sys/s04', 'Intelligence needs infrastructure.'], ['sys/s05', 'Bigger and closer.'], ['sys/s06', 'Intelligence grows a body.'], ['sys/s07', 'The breakthrough is the combination.'], ['sys/s08', 'Capital is moving back in.'], ['sys/s09', 'The more autonomous the system, the more trust matters.'], ['sys/s10', 'The future is not a tool. It is a system.']];
  // hero network: a seeded field, same grammar as the deck cover (disconnected nodes that connect)
  const syHeroNet = () => {
    let seed = 7; const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const W = 1600, H = 900, n = [];
    let tries = 0;
    while (n.length < 46 && tries++ < 6000) { const x = 40 + rnd() * (W - 80), y = 40 + rnd() * (H * .56); if (n.some(m => Math.hypot(m.x - x, m.y - y) < 88)) continue; n.push({ x, y, k: n.length % 7 }); }
    const E = new Set(), out = [];
    n.forEach((a, i) => n.map((b, j) => [Math.hypot(b.x - a.x, b.y - a.y), j]).filter(v => v[1] !== i).sort((p, q) => p[0] - q[0]).slice(0, 2).forEach(([, j]) => { const key = Math.min(i, j) + '-' + Math.max(i, j); if (!E.has(key)) { E.add(key); out.push([i, j]); } }));
    const cx = W * .55, cy = H * .2, dist = p => Math.hypot(p.x - cx, p.y - cy);
    let s = `<svg class="sx-hnet" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin slice" aria-hidden="true">`;
    out.forEach(([a, b]) => { const d = (1.0 + Math.min(dist(n[a]), dist(n[b])) / 520).toFixed(2); s += `<path class="e" pathLength="1" style="--d:${d}s" d="M${n[a].x.toFixed(0)} ${n[a].y.toFixed(0)}L${n[b].x.toFixed(0)} ${n[b].y.toFixed(0)}"/>`; });
    n.forEach(p => {
      const d = (1.25 + dist(p) / 520).toFixed(2), r = p.k === 0 ? 6 : 4.5;
      const shape = p.k % 3 === 1 ? `<rect x="${(p.x - r).toFixed(0)}" y="${(p.y - r).toFixed(0)}" width="${r * 2}" height="${r * 2}"` : p.k % 3 === 2 ? `<path d="M${p.x.toFixed(0)} ${(p.y - r * 1.15).toFixed(0)}L${(p.x + r * 1.05).toFixed(0)} ${(p.y + r * .75).toFixed(0)}L${(p.x - r * 1.05).toFixed(0)} ${(p.y + r * .75).toFixed(0)}Z"` : `<circle cx="${p.x.toFixed(0)}" cy="${p.y.toFixed(0)}" r="${r}"`;
      s += `${shape} class="n"/>${shape} class="n on${p.k === 0 ? ' v' : ''}" style="--d:${d}s"/>`;
    });
    return s + '</svg>';
  };
  const syStudyRow = (s, k) => `
          <div class="sx-st rv">
            <div class="sx-st-l"><span class="n">0${k + 1} · Before → After</span><span class="t"><span>${s.from}</span><em>↓</em>${s.to}</span><p>${s.copy}</p></div>
            <div class="sx-st-r">
              <div class="tfs-pb"><span class="tfs-lab">Before</span><span class="tfs-page"><img src="${SI(s.bimg, 't')}" alt="Original report page: ${s.bsrc.replace('Original report · ', '')}" loading="lazy" decoding="async"></span><p>${s.before}</p><small>${s.bsrc}</small></div>
              <div class="tfs-pa"><span class="tfs-lab g">After · Slide ${s.slide}</span><span class="tfs-fr">${syImg(s.aimg, 'Redesigned slide ' + s.slide, '(max-width:900px) 92vw, 52vw')}</span><p class="tfs-ah">${s.after}</p>${s.chips ? `<div class="tfs-chips">${s.chips.join('')}</div>` : ''}</div>
            </div>
          </div>`;
  const sysCase = i => {
    const nx = P[(i + 1) % P.length];
    const tl = [['Stage ruler', 0.9, 7.6, 'v'], ['Goal → Verify', 1.0, 2.9, 'v'], ['Signal pulse', 4.3, 1.2, 'g'], ['Feedback loop', 4.0, 0.9, 'v'], ['Manager agent', 5.2, 0.7, 'v'], ['Four agents', 6.0, 1.3, 'v'], ['Agent pulses', 7.4, 1.6, 'g'], ['Statement', 9.4, 0.9, 'w']];
    return `
    <article class="sx">
      <div class="sx-curtain" aria-hidden="true"><i></i></div>
      <!-- 00 HERO -->
      <section class="sx-hero">
        ${syHeroNet()}
        <div class="wrap sx-mast c-in"><b>The System Is Waking Up</b><span>Independent interactive redesign</span><span class="r">${syLive('', 'Open live experience')}<span>${wn(P[i].id)} / ${pad(WORK.length)}</span></span></div>
        <div class="wrap sx-hero-in">
          <h1 id="cTitle" aria-label="The System Is Waking Up"><span class="sx-t1" aria-hidden="true">The System is</span><span class="sx-t2" aria-hidden="true">Waking up</span></h1>
          <div class="sx-hero-low">
            <p class="sx-sub">13 technologies.<br><span>One system.</span></p>
            <ul class="sx-meta" aria-label="Project metadata"><li>Interactive presentation</li><li>Data storytelling</li><li>HTML / CSS / JavaScript</li><li>10 slides</li></ul>
          </div>
        </div>
      </section>

      <section class="sx-film">
        <div class="wrap">
          <div class="sx-film-fr rv">${syVid('wake', SI('m01-3'), 'Opening slide recorded from the live HTML: disconnected nodes connect into one system')}</div>
          <p class="sx-cap rv"><span><i>01</i> Cover, recorded from the live HTML. The nodes start disconnected; a signal spreads from one node to the next.</span><span>No video or images inside the deck: SVG, CSS and JavaScript</span></p>
        </div>
      </section>

      <!-- 01 POSITIONING -->
      <section class="sx-sec sx-paper">
        <div class="wrap">
          <p class="sx-k"><span>01</span>The idea</p>
          <div class="sx-pos-grid">
            <h2 class="sx-lede rv">The report contained thirteen technology trends.<span>The redesign looked for the system connecting them.</span></h2>
            <div class="sx-body rv d1">
              <p>Instead of presenting AI, semiconductors, connectivity, robotics, mobility, bioengineering and energy as isolated topics, I rebuilt the material around one idea:</p>
              <p class="em">The future of technology is increasingly combinatorial.</p>
              <p>The result is a 10-slide interactive experience where nodes, systems, signals and connections evolve across the story.</p>
              <p>Every slide builds on the previous one: from individual technologies to connected capabilities, autonomous systems, physical-world impact and trust.</p>
            </div>
          </div>
          <div class="sx-arc rv">
            <p class="sx-k" style="margin-bottom:28px"><span>Arc</span>Five acts · ten slides</p>
            <ol>${SY_ACTS.map(a => `<li><b>${a[1]}</b><small>${a[0]} · ${a[2]}</small><span>${syImg(a[3], '', '(max-width:900px) 46vw, 18vw')}</span></li>`).join('')}</ol>
          </div>
        </div>
      </section>

      <!-- STATEMENT -->
      <section class="sx-sec sx-state">
        <div class="wrap">
          <p class="rv">13 trends<br>were the content.</p>
          <p class="rv d1">The system<br>became <span>the story.</span></p>
        </div>
      </section>

      <!-- 02 FACTS -->
      <section class="sx-sec" style="padding-top:0;border-top:0">
        <div class="wrap">
          <p class="sx-k"><span>02</span>Project</p>
          <dl class="sx-facts rv">
            <div><dt>Role</dt><dd>Information Architecture<br>Presentation Design<br>Data Storytelling<br>Visual Systems<br>Motion Design<br>Interactive HTML</dd></div>
            <div><dt>Format</dt><dd>10-slide interactive presentation<br>16:9 · 1920 × 1080 stage<br>Keyboard, touch and on-screen controls</dd></div>
            <div><dt>Technology</dt><dd>HTML<br>CSS<br>JavaScript<br>SVG</dd></div>
            <div><dt>Source</dt><dd>Technology Trends Outlook 2025<br>McKinsey &amp; Company · July 2025<br>108 pages · 13 trends</dd></div>
          </dl>
          <p class="sx-disc">${SY_DISC}</p>
        </div>
      </section>

      <!-- 03 BEFORE → AFTER -->
      <section class="sx-sec">
        <div class="wrap">
          <p class="sx-k"><span>03</span>Before → After · Report → Interactive experience</p>
          <div class="sx-ba-hero rv">
            <h2 class="tfs-line" style="margin-bottom:clamp(28px,3.6vw,48px)"><span class="a">13 separate trends</span><i class="tfs-arr" style="transform:none" aria-hidden="true"></i><span class="b">One connected <em>system</em></span></h2>
            <div class="tfs-ba" style="grid-template-columns:minmax(0,4.2fr) minmax(0,7.8fr)">
              <figure class="tfs-before"><span class="tfs-lab">Before · The report</span><div class="tfs-pages">${SY_PROFILES.map(p => `<span><img src="assets/img/sys/q${String(p[2]).padStart(3, '0')}-t.webp" alt="" loading="lazy" decoding="async"><i>${p[0]}</i></span>`).join('')}<span class="more">13 separate chapters</span><span class="more">108 pages</span></div><figcaption>Thirteen trend chapters, each with its own scoring charts and statistics.<small>Trend profiles, pp.12–98</small></figcaption></figure>
              <figure class="tfs-after"><span class="tfs-lab g">After · Slide 02</span><span class="tfs-fr">${syImg('s02', 'Slide 02: 13 trends, one system', '(max-width:900px) 92vw, 60vw')}</span><figcaption><b>13 trends. One system.</b> Three regions, one radial topology, and the connections between them.</figcaption></figure>
            </div>
          </div>
          ${SY_STUDIES.map(syStudyRow).join('')}
        </div>
      </section>

      <!-- 04 WHAT CHANGED -->
      <section class="sx-sec sx-paper">
        <div class="wrap">
          <p class="sx-k"><span>04</span>What changed</p>
          <table class="sx-wc rv">
            <tbody>
              <tr><th>Structure</th><td>13 topics</td><td class="ar">→</td><td class="to">One narrative system</td></tr>
              <tr><th>Data</th><td>Statistics</td><td class="ar">→</td><td class="to">Visual moments</td></tr>
              <tr><th>Visual language</th><td>Charts</td><td class="ar">→</td><td class="to">Nodes, signals and systems</td></tr>
              <tr><th>Motion</th><td>Static reading</td><td class="ar">→</td><td class="to">Progressive explanation</td></tr>
              <tr><th>Format</th><td>Report</td><td class="ar">→</td><td class="to">Interactive HTML experience</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 05 BUILT AS A SYSTEM -->
      <section class="sx-sec">
        <div class="wrap">
          <p class="sx-k"><span>05</span>The build</p>
          <div class="sx-build-head">
            <h2 class="sx-h2 rv">Built as<br>a system.</h2>
            <p class="rv d1">The deck was built, not mocked up. One graphic grammar runs through all ten slides: the shape of a node says what kind of part it is, green carries signals, violet carries intelligence. Every animated element has a visible final state.</p>
          </div>
          <div class="sx-bg">
            <figure class="sx-b w5 rv">
              <div class="lab">SVG<span>Node grammar</span></div>
              <span class="im">${syImg('c-node', 'Slide 02 detail: node shapes and labels', '(max-width:900px) 92vw, 36vw', true, 360, 720)}</span>
              <pre aria-label="Excerpt of the glyph function"><b>glyph</b>(p, type, x, y, r)
  circle   <em>// intelligence</em>
  square   <em>// infrastructure</em>
  triangle <em>// physical world</em>
  hexagon  <em>// interface</em></pre>
            </figure>
            <figure class="sx-b w7 rv d1">
              <div class="lab">System map<span>Connection paths</span></div>
              <span class="im">${syImg('c-net', 'Slide 02 topology: three rings with AI amplification lines and cross-dependencies', '(max-width:900px) 92vw, 52vw', true, 800, 1600)}</span>
              <p>Rings expand outward, AI amplification lines draw from the centre, then cross-dependencies arrive and a pulse travels each one. Lines are marked in the deck as an editorial mapping, not measured data.</p>
            </figure>
            <figure class="sx-b w12 rv">
              <div class="lab">Motion<span>Motion states · slide 01</span></div>
              <div class="sx-seq">${[0, 1, 2, 3].map(k => `<span>${syImg('m01-' + k, '', '(max-width:900px) 46vw, 22vw', true, 640, 1280)}<small>${['0.4 s · dormant', '1.9 s · first signals', '3.3 s · propagation', '7.0 s · awake'][k]}</small></span>`).join('')}</div>
              <p>The cover wakes by breadth-first propagation: every connection waits for its distance from the central node, so the signal visibly spreads instead of fading in.</p>
            </figure>
            <figure class="sx-b w7 rv">
              <div class="lab">Animation timing<span>Slide 03 · seconds</span></div>
              <div class="sx-tl">${tl.map(t => `<div class="sx-tl-row"><span>${t[0]}</span><div><i class="${t[3] === 'g' ? 'g' : t[3] === 'w' ? 'w' : ''}" style="--a:${t[1]};--w:${t[2]}"></i></div></div>`).join('')}</div>
              <div class="sx-tl-ax"><span></span><div><span>0</span><span>2</span><span>4</span><span>6</span><span>8</span><span>10 s</span></div></div>
              <p>Delays taken from the deck's own timeline: the chain builds step by step, the manager splits the work, and the statement lands only after the system has organised itself.</p>
            </figure>
            <figure class="sx-b w5 rv d1">
              <div class="lab">Motion<span>Merge sequence · slide 07</span></div>
              <div class="sx-seq" style="grid-template-columns:1fr 1fr">${[0, 1, 2, 3].map(k => `<span>${syImg('m07-' + k, '', '(max-width:900px) 46vw, 18vw', true, 640, 1280)}</span>`).join('')}</div>
              <p>Technologies travel toward each other and merge into the outcome, then an orchestration spine joins the three results.</p>
            </figure>
            <figure class="sx-b w8 rv">
              <div class="lab">Responsive<span>One 1920 × 1080 stage, scaled to fit</span></div>
              <div class="sx-resp">
                <span>${syImg('r-wide', 'The deck on an ultra-wide screen', '(max-width:900px) 92vw, 30vw', true, 960, 1920)}<small>2560 × 1080 · letterboxed</small></span>
                <span>${syImg('r-laptop', 'The deck on a laptop screen', '(max-width:900px) 60vw, 20vw', true, 640, 1280)}<small>1280 × 800</small></span>
                <span>${syImg('r-phone', 'The deck on a phone', '(max-width:900px) 30vw, 8vw', true, 390, 780)}<small>390 × 844</small></span>
              </div>
              <p>The slide is composed once at 1920 × 1080 and scaled to any viewport. Reduced-motion settings jump every slide to its final state.</p>
            </figure>
            <figure class="sx-b w4 rv d1">
              <div class="lab">Interaction<span>Slide controls</span></div>
              <span class="im" style="background:var(--y-g)">${syImg('c-ctrl', 'Slide controls: previous, counter, next, progress chain, replay, fullscreen', '(max-width:900px) 92vw, 28vw', true, 650, 1300)}</span>
              <div class="sx-keys"><span><b>← →</b>Slides</span><span><b>Space</b>Next</span><span><b>R</b>Replay</span><span><b>F</b>Fullscreen</span><span><b>Swipe</b>Touch</span><span><b>09</b>Restore trust</span></div>
              <p>The progress indicator is itself a chain of nodes. Slide 09 has its own control: restore trust and the connections return.</p>
            </figure>
          </div>
        </div>
      </section>

      <!-- 06 LIVE -->
      <section class="sx-sec">
        <div class="wrap">
          <p class="sx-k"><span>06</span>Live experience</p>
          <div class="sx-xp-head">
            <h2 class="sx-h2 rv">Experience<br>the system.</h2>
            <div class="rv d1">
              <p>The project was designed to move, connect and reveal itself over time. It is not a sequence of static screenshots.</p>
              ${syLive()}
            </div>
          </div>
          <div class="sx-xp-frame rv" data-xp="${SY_LIVE}">
            <div class="sx-xp-bar"><span class="sx-xp-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="sx-xp-url">tech-trends-2025-the-system-is-waking-up.html</span><a href="${SY_LIVE}" target="_blank" rel="noopener">Open full experience <i>↗</i></a></div>
            <div class="sx-xp-view">
              <img class="sx-xp-poster" src="${SI('s01')}" alt="Opening slide of The System Is Waking Up" loading="lazy" decoding="async">
              <button class="sx-xp-shield" type="button" aria-label="Interact with the live presentation preview"><span class="sx-xp-cta">Click to interact</span><small>Arrow keys or on-screen controls move between slides</small></button>
              <a class="sx-xp-mob" href="${SY_LIVE}" target="_blank" rel="noopener">${'<span class="y-live"><span>Open live experience</span><i aria-hidden="true">↗</i></span>'}<small>Best viewed in landscape</small></a>
            </div>
          </div>
          <p class="sx-xp-cap rv">Live preview of the actual HTML file, loaded only when this section is near. The page keeps scrolling normally until you choose to interact.</p>
        </div>
      </section>

      <!-- 07 ALL SLIDES -->
      <section class="sx-sec">
        <div class="wrap">
          <p class="sx-k"><span>07</span>All ten slides · final states</p>
          <div class="rv" data-sy-viewer></div>
        </div>
      </section>

      <!-- END -->
      <section class="sx-end">
        <div class="wrap">
          <p class="sx-endp"><span>The future</span><span>is not a tool.</span></p>
          <p class="sx-endp"><span>It is</span><span>a system.</span></p>
          <div class="sx-end-low">
            <span class="y-mono">10-slide interactive experience</span>
            ${syLive()}
            <p class="sx-disc">${SY_DISC}</p>
          </div>
        </div>
      </section>
      <button class="sx-next" data-goto="${(i + 1) % P.length}">
        <div class="wrap"><b>Next project <i>→</i></b><small>${nx.title} · ${nx.cat}</small></div>
      </button>
    </article>`;
  };
  const initSys = () => {
    const root = $('.sx', cb);
    syPlay($$('video', root), cs);
    // live preview: desktop only, loads near the viewport; a shield keeps scrolling intact until clicked
    const fr = $('.sx-xp-frame', root);
    if (fr) {
      const view = $('.sx-xp-view', fr), shield = $('.sx-xp-shield', fr);
      if (!matchMedia('(min-width: 900px) and (hover: hover)').matches) fr.classList.add('static');
      else {
        let ifr = null;
        const load = () => {
          if (ifr) return;
          ifr = document.createElement('iframe');
          ifr.title = 'The System Is Waking Up, live presentation preview';
          ifr.setAttribute('tabindex', '-1'); ifr.setAttribute('allow', 'fullscreen'); ifr.setAttribute('loading', 'lazy');
          ifr.addEventListener('load', () => fr.classList.add('loaded'));
          ifr.src = fr.dataset.xp;
          view.insertBefore(ifr, shield);
        };
        const io2 = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { load(); io2.disconnect(); } }, { root: cs, rootMargin: '500px 0px' });
        io2.observe(fr);
        shield.addEventListener('click', () => { load(); fr.classList.add('live'); ifr.setAttribute('tabindex', '0'); ifr.focus(); });
        fr.addEventListener('pointerleave', () => { if (!fr.classList.contains('live')) return; fr.classList.remove('live'); ifr && ifr.setAttribute('tabindex', '-1'); });
      }
    }
    const vv = $('[data-sy-viewer]', root);
    if (vv) { vv.innerHTML = viewerHTML(SY_SLIDES, 'v-sys'); initViewer(vv.firstElementChild, SY_SLIDES); }
    const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); so.unobserve(e.target); } }), { root: cs, rootMargin: '0px 0px -15% 0px' });
    $$('.sx-end, .sx-b', root).forEach(el => RM ? el.classList.add('in') : so.observe(el));
  };

  /* ================================================================
     COMPONENTS
     ================================================================ */
  const img = (p, sizes, eager, alt = '') => `<img${Z(p)} src="${T(p)}" srcset="${T(p)} 960w, ${F(p)} 2000w" sizes="${sizes}" alt="${alt}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  const typing = el => el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);

  /* ---------- fullscreen slide lightbox (shared by every viewer) ---------- */
  const lbx = $('#lbx'), lbFr = $('.lbx-fr', lbx), lbCap = $('.lbx-cap', lbx), lbCnt = $('.lbx-c', lbx);
  let lbOwner = null, lbReturn = null;
  const lbShow = dir => {
    const k = lbOwner.index(), s = lbOwner.slides[k];
    const old = $('img.on', lbFr), nx = document.createElement('img');
    nx.src = F(s[0]); nx.alt = s[1]; nx.decoding = 'async';
    lbCap.textContent = s[1]; lbCnt.textContent = `${pad(k + 1)} / ${pad(lbOwner.slides.length)}`;
    $$('img:not(.on)', lbFr).forEach(im => im.remove());
    if (!old || RM) { if (old) old.remove(); nx.className = 'on'; lbFr.appendChild(nx); return; }
    nx.className = dir > 0 ? 'from-r' : 'from-l'; lbFr.appendChild(nx);
    const swap = () => requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!nx.isConnected) return;
      old.className = dir > 0 ? 'to-l' : 'to-r'; nx.className = 'on';
      setTimeout(() => old.remove(), 360);
    }));
    nx.decode ? nx.decode().then(swap, swap) : swap();
  };
  const lbOpen = owner => {
    lbOwner = owner; lbReturn = document.activeElement;
    lbFr.innerHTML = ''; lbShow(0);
    lbx.hidden = false; document.documentElement.classList.add('lb-on');
    requestAnimationFrame(() => lbx.classList.add('on'));
    $('.lbx-x', lbx).focus();
  };
  const lbClose = () => {
    if (lbx.hidden) return;
    lbx.classList.remove('on'); document.documentElement.classList.remove('lb-on');
    setTimeout(() => { if (!lbx.classList.contains('on')) { lbx.hidden = true; lbFr.innerHTML = ''; } }, RM ? 0 : 220);
    lbOwner = null;
    lbReturn && lbReturn.focus && lbReturn.focus({ preventScroll: true });
  };
  const lbStep = d => { if (!lbOwner) return; lbOwner.go(lbOwner.index() + d, d); lbShow(d); };
  $('.lbx-x', lbx).addEventListener('click', lbClose);
  $('.lbx-p', lbx).addEventListener('click', () => lbStep(-1));
  $('.lbx-n', lbx).addEventListener('click', () => lbStep(1));
  lbx.addEventListener('click', e => { if ((e.target === lbx || e.target.classList.contains('lbx-st')) && !$('.lbx-st', lbx).dataset.sw) lbClose(); });
  lbx.addEventListener('keydown', e => {          // keep focus inside the dialog
    if (e.key !== 'Tab') return;
    const f = $$('button', lbx), a = f[0], z = f[f.length - 1];
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  });
  const swipe = (el, fn) => {
    let x0 = null, y0 = 0; el.dataset.sw = '';
    el.addEventListener('pointerdown', e => { if (e.button) return; x0 = e.clientX; y0 = e.clientY; });
    el.addEventListener('pointerup', e => {
      if (x0 === null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) { el.dataset.sw = '1'; setTimeout(() => { el.dataset.sw = ''; }, 0); fn(dx < 0 ? 1 : -1); }
    });
    el.addEventListener('pointercancel', () => { x0 = null; });
  };
  swipe($('.lbx-st', lbx), lbStep);

  /* ---------- slide viewer: one large slide, counter, thumbnails, swipe, keys, fullscreen ---------- */
  const FULL_I = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"/></svg>';
  const viewerHTML = (slides, uid) => `
    <div class="sv" id="${uid}" tabindex="0" role="region" aria-roledescription="slide viewer" aria-label="Slides. Left and right arrow keys move between slides.">
      <div class="sv-stage">
        <img class="on" src="${F(slides[0][0])}" alt="${slides[0][1]}" decoding="async">
        <button class="sv-hit l" tabindex="-1" aria-hidden="true"></button><button class="sv-hit r" tabindex="-1" aria-hidden="true"></button>
      </div>
      <div class="sv-bar">
        <p class="sv-cap" aria-live="polite"><span class="sv-n">01</span><b>${slides[0][1]}</b></p>
        <div class="sv-nav"><button class="sv-p" aria-label="Previous slide">${ARROW_L}</button><span class="sv-c"><b>01</b> / ${pad(slides.length)}</span><button class="sv-x" aria-label="Next slide">${ARROW_R}</button></div>
        <button class="sv-full">${FULL_I}<span>View fullscreen</span></button>
      </div>
      <div class="sv-thumbs">${slides.map((s, i) => `<button aria-label="Slide ${i + 1}: ${s[1]}"${i ? '' : ' aria-current="true"'}><img src="${T(s[0])}" alt="" loading="lazy" decoding="async"><span>${pad(i + 1)}</span></button>`).join('')}</div>
    </div>`;
  const viewers = [];
  const initViewer = (el, slides) => {
    const stage = $('.sv-stage', el), capN = $('.sv-n', el), capB = $('.sv-cap b', el), cnt = $('.sv-c b', el), tw = $('.sv-thumbs', el), th = $$('button', tw);
    const n = slides.length; let i = 0;
    const pre = k => { const im = new Image(); im.src = F(slides[(k + n) % n][0]); };
    pre(1);
    const go = (k, dir) => {
      k = ((k % n) + n) % n; if (k === i) return;
      dir = dir || (k > i ? 1 : -1);
      $$('img:not(.on)', stage).forEach(im => im.remove());
      const old = $('img.on', stage), nx = document.createElement('img');
      nx.src = F(slides[k][0]); nx.alt = slides[k][1]; nx.decoding = 'async';
      if (RM) { old && old.remove(); nx.className = 'on'; stage.insertBefore(nx, stage.firstChild); }
      else {
        nx.className = dir > 0 ? 'from-r' : 'from-l'; stage.insertBefore(nx, $('.sv-hit', stage));
        const swap = () => requestAnimationFrame(() => requestAnimationFrame(() => {
          if (!nx.isConnected) return;
          if (old) old.className = dir > 0 ? 'to-l' : 'to-r';
          nx.className = 'on';
          setTimeout(() => old && old.remove(), 380);
        }));
        nx.decode ? nx.decode().then(swap, swap) : swap();
      }
      i = k;
      capN.textContent = pad(k + 1); capB.textContent = slides[k][1]; cnt.textContent = pad(k + 1);
      th.forEach((b, m) => m === k ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current'));
      const b = th[k]; if (b) tw.scrollTo({ left: b.offsetLeft - (tw.clientWidth - b.offsetWidth) / 2, behavior: RM ? 'auto' : 'smooth' });
      pre(k + 1); pre(k - 1);
    };
    const api = { el, slides, index: () => i, go, next: () => go(i + 1, 1), prev: () => go(i - 1, -1) };
    $('.sv-x', el).addEventListener('click', api.next);
    $('.sv-p', el).addEventListener('click', api.prev);
    $('.sv-hit.r', el).addEventListener('click', () => { if (!stage.dataset.sw) api.next(); });
    $('.sv-hit.l', el).addEventListener('click', () => { if (!stage.dataset.sw) api.prev(); });
    th.forEach((b, m) => b.addEventListener('click', () => go(m)));
    $('.sv-full', el).addEventListener('click', () => lbOpen(api));
    stage.addEventListener('dblclick', () => lbOpen(api));
    swipe(stage, d => go(i + d, d));
    el.addEventListener('keydown', e => {
      if (e.target !== el) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); api.next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); api.prev(); }
    });
    viewers.push(api);
    return api;
  };

  /* ---------- before / after: original ↔ redesign, drag to compare ---------- */
  const baLab = s => s.replace(/^Original\s*/, '');
  const baHTML = pairs => `
    <div class="ba-block">
      ${pairs.length > 1 ? `<div class="ba-tabs" role="tablist" aria-label="Comparisons">${pairs.map((p, i) => `<button role="tab" aria-selected="${!i}" tabindex="${i ? -1 : 0}"><span>${pad(i + 1)}</span>${p[2]}</button>`).join('')}</div>` : ''}
      <div class="ba" style="--x:50%">
        <div class="pane"><img class="bf" src="${F(pairs[0][0])}" alt="Original: ${pairs[0][2]}"><img class="aft" src="${F(pairs[0][1])}" alt="Redesign: ${pairs[0][2]}"></div>
        <i class="hd" aria-hidden="true"></i><span class="tg l">Original <em>${baLab(pairs[0][3])}</em></span><span class="tg r">Redesign</span>
        <input type="range" min="0" max="100" value="50" aria-label="Compare original and redesign. Lower values show more of the original.">
      </div>
      <p class="ba-cap" aria-live="polite"><b>${pairs[0][2]}.</b> ${pairs[0][4]}</p>
    </div>`;
  const initBA = (el, pairs) => {
    const ba = $('.ba', el), inp = $('input', ba), pane = $('.pane', ba), bf = $('.bf', ba), af = $('.aft', ba), tl = $('.tg.l em', ba), cap = $('.ba-cap', el);
    const tabs = $$('.ba-tabs button', el);
    const set = () => ba.style.setProperty('--x', inp.value + '%');
    inp.addEventListener('input', set); set();
    const sel = (k, focus) => {
      tabs.forEach((b, n) => { b.setAttribute('aria-selected', n === k); b.tabIndex = n === k ? 0 : -1; });
      if (focus) tabs[k].focus();
      pane.style.opacity = 0;
      const n1 = new Image(), n2 = new Image(); n1.src = F(pairs[k][0]); n2.src = F(pairs[k][1]);
      Promise.all([n1.decode().catch(() => {}), n2.decode().catch(() => {})]).then(() => setTimeout(() => {
        bf.src = n1.src; af.src = n2.src; bf.alt = 'Original: ' + pairs[k][2]; af.alt = 'Redesign: ' + pairs[k][2];
        tl.textContent = baLab(pairs[k][3]);
        cap.innerHTML = `<b>${pairs[k][2]}.</b> ${pairs[k][4]}`;
        inp.value = 50; set(); pane.style.opacity = 1;
      }, RM ? 0 : 140));
    };
    tabs.forEach((b, k) => b.addEventListener('click', () => sel(k)));
    tabs.length && $('.ba-tabs', el).addEventListener('keydown', e => {
      const k = tabs.findIndex(b => b.getAttribute('aria-selected') === 'true');
      if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); sel((k + 1) % tabs.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); sel((k - 1 + tabs.length) % tabs.length, true); }
    });
    inp.addEventListener('keydown', e => e.stopPropagation());
  };

  /* ---------- key moves: the decisions that shaped the deck, one at a time ---------- */
  const movesHTML = (steps, uid) => `
    <div class="km">
      <div class="km-fig"><div class="km-fr">${steps.map((s, i) => `<img class="${i ? '' : 'on'}" src="${T(s[0])}" srcset="${T(s[0])} 960w, ${F(s[0])} 2000w" sizes="(max-width:900px) 92vw, 60vw" alt="${s[1]}"${i ? ' loading="lazy"' : ''} decoding="async">`).join('')}</div></div>
      <div class="km-list" role="tablist" aria-label="Key moves" aria-orientation="vertical">${steps.map((s, i) => `<button role="tab" id="${uid}-${i}" aria-selected="${!i}" tabindex="${i ? -1 : 0}"><span class="km-n">${pad(i + 1)}</span><b>${s[1]}</b><span class="km-t">${s[2]}</span></button>`).join('')}</div>
    </div>`;
  const initMoves = el => {
    const tabs = $$('.km-list button', el), ims = $$('.km-fr img', el);
    const sel = (k, focus) => {
      tabs.forEach((b, n) => { b.setAttribute('aria-selected', n === k); b.tabIndex = n === k ? 0 : -1; });
      ims.forEach((im, n) => im.classList.toggle('on', n === k));
      if (focus) tabs[k].focus();
    };
    tabs.forEach((b, k) => b.addEventListener('click', () => sel(k)));
    $('.km-list', el).addEventListener('keydown', e => {
      const k = tabs.findIndex(b => b.getAttribute('aria-selected') === 'true');
      const d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
      if (!d) return;
      e.preventDefault(); e.stopPropagation(); sel((k + d + tabs.length) % tabs.length, true);
    });
  };

  /* ================================================================
     STANDARD CASE (Melbourne is the prototype; Indonesia and Personalization at Scale share it)
     Hero → The brief → The thinking → Key moves → Original ↔ Redesign → Slides → Outcome → Next
     ================================================================ */
  // the whole deck in slide order, captions taken from the case content
  const deckOf = p => {
    const m = new Map(), add = (k, t) => { if (!m.has(k)) m.set(k, t); };
    (p.slides || []).forEach(s => add(s[0], s[1]));
    (p.ba || []).forEach(b => add(b[1], b[2]));
    (p.story || []).forEach(s => add(s[0], s[1]));
    return [...m].sort((a, b) => a[0].localeCompare(b[0]));
  };
  const sh = (n, t, sub) => `<header class="sc-h"><span class="sc-hn">${n}</span><h2>${t}</h2>${sub ? `<p>${sub}</p>` : ''}</header>`;
  const stdCase = i => {
    const p = P[i], nxp = P[(i + 1) % P.length], deck = deckOf(p);
    const total = +((p.deliverables.match(/(\d+)-slide/) || [])[1]) || deck.length;
    let n = 0; const num = () => pad(++n);
    const live = p.live ? `<a class="sc-live" href="assets/live/${p.live}.html" target="_blank" rel="noopener">Open the live presentation <i aria-hidden="true">↗</i><span class="vh"> (opens in a new tab)</span></a>` : '';
    let h = `
    <article class="sc">
      <header class="sc-hero wrap">
        <p class="sc-k"><span>${wn(p.id)}</span><span>${p.cat}</span><span>${p.year}</span></p>
        <h1 id="cTitle" tabindex="-1">${p.title}</h1>
        <div class="sc-intro">
          <p class="sc-lede">${p.lede}</p>
          <dl class="sc-facts">
            <div><dt>Role</dt><dd>${p.role}</dd></div>
            <div><dt>Deliverables</dt><dd>${p.deliverables}</dd></div>
            <div><dt>Year</dt><dd>${p.year}</dd></div>
          </dl>
          ${live}
        </div>
      </header>
      <figure class="sc-cover wrap"><div class="sc-cf" id="cCover">${img(p.cover, '(max-width:1440px) 92vw, 1280px', true, p.title + ', cover slide')}</div></figure>
      <section class="sc-s wrap">${sh(num(), 'The brief')}<div class="sc-b"><p class="sc-big">${p.challenge}</p></div></section>
      <section class="sc-s wrap">${sh(num(), 'The thinking')}<div class="sc-b"><p class="sc-big">${p.approach}</p></div></section>`;
    if (p.story) h += `<section class="sc-s sc-wide wrap">${sh(num(), 'Key moves', 'The decisions that shaped the deck. Select a move to see the slide.')}<div data-moves></div></section>`;
    if (p.ba) h += `<section class="sc-s sc-wide wrap">${sh(num(), 'Original <i aria-hidden="true">↔</i> Redesign', 'Drag the handle to compare a page of the source report with the slide it became.')}<div data-ba></div></section>`;
    h += `<section class="sc-s sc-wide wrap">${sh(num(), 'Selected slides', `${deck.length === total ? `The full ${total}-slide deck` : `${deck.length} of the ${total} slides`}, one at a time. Use the arrows, your keyboard or swipe, and open any slide fullscreen.`)}<div data-viewer></div></section>`;
    h += `<section class="sc-s wrap">${sh(num(), 'Outcome')}<div class="sc-b"><p class="sc-big">${p.outcome}</p>
          <div class="sc-out">${p.out.map(o => `<div><b>${o[0]}</b><span>${o[1]}</span></div>`).join('')}</div>
          ${p.note ? `<p class="sc-note">${p.note}</p>` : ''}</div></section>
    </article>
    <a class="sc-next" href="${caseHref(nxp.id)}" data-case="${nxp.id}">
      <span class="wrap sc-next-in">
        <span class="sc-next-t"><span class="sc-k"><span>Next project</span><span>${wn(nxp.id)}</span></span><b>${nxp.title} <i aria-hidden="true">→</i></b><small>${nxp.cat}</small></span>
        <span class="sc-next-im">${img(nxp.card, '(max-width:900px) 92vw, 34vw')}</span>
      </span>
    </a>`;
    return h;
  };
  const initStd = i => {
    const p = P[i];
    const mv = $('[data-moves]', cb); if (mv) { mv.innerHTML = movesHTML(p.story, 'km-' + p.id); initMoves(mv); }
    const bv = $('[data-ba]', cb); if (bv) { bv.innerHTML = baHTML(p.ba); initBA(bv, p.ba); }
    const vv = $('[data-viewer]', cb); if (vv) { const d = deckOf(p); vv.innerHTML = viewerHTML(d, 'v-' + p.id); initViewer(vv.firstElementChild, d); }
  };

  /* ================================================================
     CASE LAYER: render · open · close
     ================================================================ */
  const CUSTOM = ['nrf', 'sys', 'tmf', 'got'];
  const cTtl = $('#cTtl'), cPrev = $('#cPrev'), cNext = $('#cNext');
  let cur = -1;
  const reveal = () => {
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { root: cs, rootMargin: '0px 0px -8% 0px' });
    if (RM) $$('.rv', cb).forEach(el => el.classList.add('in')); else $$('.rv', cb).forEach(el => o.observe(el));
  };
  const renderCase = i => {
    const p = P[i], ni = (i + 1) % P.length, pi = (i - 1 + P.length) % P.length;
    scrollFx = []; viewers.length = 0;
    $$('video', cb).forEach(v => v.pause());
    cs.classList.remove('custom', 'std', 'f-dark', ...CUSTOM);
    cs.classList.add(p.custom ? 'custom' : 'std');
    if (CUSTOM.includes(p.custom)) cs.classList.add(p.custom);
    if (p.custom === 'got' && window.GOT) cb.innerHTML = GOT.page(WORK.indexOf(p.id), WORK.length, ni, P[ni]);
    else if (p.custom === 'tmf' && window.TMF) cb.innerHTML = TMF.page(WORK.indexOf(p.id), WORK.length, ni, P[ni]);
    else if (p.custom === 'nrf') cb.innerHTML = nrfCase(i);
    else if (p.custom === 'sys') cb.innerHTML = sysCase(i);
    else if (p.custom === 'gai') cb.innerHTML = gaiCase(i);
    else cb.innerHTML = stdCase(i);
    cTtl.textContent = LONG[p.id] && !p.custom ? LONG[p.id] : p.title;
    cPrev.dataset.case = P[pi].id; cPrev.href = caseHref(P[pi].id); cPrev.setAttribute('aria-label', 'Previous project: ' + P[pi].title);
    cNext.dataset.case = P[ni].id; cNext.href = caseHref(P[ni].id); cNext.setAttribute('aria-label', 'Next project: ' + P[ni].title);
    cs.setAttribute('aria-label', p.title + ', case study');
    reveal();
    cs.scrollTop = 0;
    if (p.custom === 'got' && window.GOT) GOT.init(cb, cs);
    else if (p.custom === 'tmf' && window.TMF) TMF.init(cb, cs);
    else if (p.custom === 'nrf') initNrf();
    else if (p.custom === 'sys') initSys();
    else if (p.custom === 'gai') initGai();
    else initStd(i);
    cur = i;
  };

  // shared-image transition: the clicked preview grows into the case cover, then the case fades in
  let zoomSrc = null;
  const zoomInto = (src, done) => {
    const r0 = src.getBoundingClientRect(), c = $('#cCover', cb);
    if (RM || !r0.width || r0.bottom < 0 || r0.top > innerHeight) { done(); return; }
    const vw = innerWidth, top = 68 + 24;
    let r1 = c ? c.getBoundingClientRect() : null;
    if (!r1 || r1.top > innerHeight) { const w = Math.min(vw - 32, 1280); r1 = { left: (vw - w) / 2, top, width: w, height: w * 9 / 16 }; }
    const z = document.createElement('div'); z.className = 'zoomer';
    z.innerHTML = `<img${src.classList.contains('z') ? ` class="z" style="--z:${src.style.getPropertyValue('--z')}"` : ''} src="${src.currentSrc || src.src}" alt="">`;
    Object.assign(z.style, { left: r0.left + 'px', top: r0.top + 'px', width: r0.width + 'px', height: r0.height + 'px' });
    document.body.appendChild(z);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      z.classList.add('go');
      Object.assign(z.style, { left: r1.left + 'px', top: r1.top + 'px', width: r1.width + 'px', height: r1.height + 'px' });
    }));
    setTimeout(() => { done(); setTimeout(() => { z.classList.add('fade'); setTimeout(() => z.remove(), 220); }, 160); }, 380);
  };
  // move focus to the case title so keyboard and screen-reader users land at the start of the case
  const focusTitle = () => {
    const t = $('#cTitle', cb);
    if (!t) { cs.focus({ preventScroll: true }); return; }
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
    t.focus({ preventScroll: true });
  };
  const openCase = id => {
    const i = PI[id];
    const was = isOpen();
    closeMenu();
    if (was && i === cur) return;
    if (!was) { cs.classList.remove('ready'); renderCase(i); }
    else {
      // case → case: quick cross-fade of the body, bar stays in place
      cs.classList.remove('ready');
      cb.classList.add('swap');
      setTimeout(() => { renderCase(i); cb.classList.remove('swap'); requestAnimationFrame(() => cs.classList.add('ready')); focusTitle(); }, RM ? 0 : 140);
      return;
    }
    const show = () => {
      cs.classList.add('open'); cs.removeAttribute('aria-hidden'); cs.inert = false;
      document.documentElement.classList.add('case-on');
      viewEl.inert = true; siteNav.inert = true;
      requestAnimationFrame(() => cs.classList.add('ready'));
      focusTitle();
    };
    const src = zoomSrc; zoomSrc = null;
    if (src && src.isConnected) zoomInto(src, show); else show();
  };
  const closeCase = () => {
    if (!isOpen()) return;
    lbClose();
    cs.classList.remove('open', 'ready'); cs.setAttribute('aria-hidden', 'true'); cs.inert = true;
    document.documentElement.classList.remove('case-on');
    viewEl.inert = false; siteNav.inert = false;
    scrollFx = []; viewers.length = 0;
    if (document.fullscreenElement) document.exitFullscreen();
    $$('video', cb).forEach(v => v.pause());
    setTimeout(() => { if (!isOpen()) { cb.innerHTML = ''; cs.classList.remove('custom', 'std', 'f-dark', ...CUSTOM); cur = -1; } }, 320);
  };

  /* ================================================================
     VIEWS
     ================================================================ */
  const viewEl = $('#view'), siteNav = $('#sn'), menu = $('#snMenu'), burger = $('#snBurger');
  const MAIL = 'khanimazimli0@gmail.com';
  const LINKEDIN = 'https://www.linkedin.com/in/khanim-azimli-50aa09a7';
  const CV = 'assets/cv/Khanim-Azimli-CV.pdf';   // drop the PDF here; until then the link asks by email
  const workItem = id => {
    const x = EXT[id], p = x ? null : P[PI[id]];
    const t = x ? x.title : (LONG[id] || p.title), cat = x ? x.cat : p.cat, desc = x ? x.desc : p.desc;
    const href = x ? x.href : caseHref(id);
    const pic = x ? `<img src="${x.img}" alt="" loading="lazy" decoding="async">` : img(p.card, '(max-width:820px) 92vw, 46vw');
    return `
      <li class="wk-i">
        <a href="${href}"${x ? '' : ` data-case="${id}"`}>
          <span class="wk-fr">${pic}</span>
          <span class="wk-m"><span class="wk-n">${wn(id)}</span><span>${cat}</span></span>
          <span class="wk-t">${t}</span>
          <span class="wk-d">${desc}</span>
          <span class="lk">${x ? x.go : 'View case'} <i aria-hidden="true">→</i></span>
        </a>
      </li>`;
  };
  const foot = () => `
    <footer class="ft"><div class="wrap ft-in">
      <span>© 2026 Khanim Azimli · Visual Storyteller &amp; Designer</span>
      <span>Consulting redesigns are independent exercises on public reports. In-house work is shown with figures altered.</span>
    </div></footer>`;
  const feat = P[PI[WORK[0]]];
  const VIEWS = {
    home: {
      title: 'Khanim Azimli · Visual Storyteller & Designer',
      html: () => `
      <section class="hm" aria-labelledby="hmT">
        <div class="wrap hm-g">
          <div class="hm-l">
            <p class="kk"><i class="dot" aria-hidden="true"></i>Baku · Working globally</p>
            <h1 class="hm-name" id="hmT" tabindex="-1">Khanim<br>Azimli</h1>
            <p class="hm-role"><b>Visual Storyteller &amp; Designer</b><span>Presentations · Editorial · Data · Interactive</span></p>
            <p class="hm-pos">Ideas, data and stories, designed to be understood.</p>
            <div class="hm-cta"><a class="bt bt-ink" href="#/work">Explore work <i aria-hidden="true">→</i></a><a class="bt bt-line" href="#/contact">Start a project</a></div>
          </div>
          <a class="hm-feat" href="${caseHref(feat.id)}" data-case="${feat.id}">
            <span class="hm-fr">${img(feat.card, '(max-width:900px) 92vw, 60vw', true, '')}</span>
            <span class="hm-cap"><span class="kk">Featured · ${wn(feat.id)}</span><b>${feat.title}</b><span class="hm-cat">${feat.cat}</span><span class="lk">View case <i aria-hidden="true">→</i></span></span>
          </a>
        </div>
        <nav class="wrap hm-idx" aria-label="Selected work">
          <span class="kk">Selected work</span>
          ${WORK.slice(1, 4).map(id => { const x = EXT[id], p = x || P[PI[id]]; return `<a href="${x ? x.href : caseHref(id)}"${x ? '' : ` data-case="${id}"`}><span>${wn(id)}</span>${x ? x.title : (LONG[id] || p.title)}</a>`; }).join('')}
          <a class="hm-all" href="#/work">All work <sup>${WORK.length}</sup> <i aria-hidden="true">→</i></a>
        </nav>
      </section>`
    },
    work: {
      title: 'Work · Khanim Azimli',
      html: () => `
      <section class="pv wk" aria-labelledby="wkT">
        <div class="wrap">
          <header class="pg-h">
            <p class="kk">Work <span>${pad(WORK.length)} projects</span></p>
            <h1 id="wkT" tabindex="-1">Selected work</h1>
            <p class="pg-lede">Different formats.<br>Same goal: make the idea impossible to miss.</p>
          </header>
          <ol class="wk-list">${WORK.map(workItem).join('')}</ol>
        </div>
      </section>${foot()}`
    },
    about: {
      title: 'About · Khanim Azimli',
      html: () => `
      <section class="pv ab" aria-labelledby="abT">
        <div class="wrap">
          <p class="kk">About</p>
          <h1 class="ab-st" id="abT" tabindex="-1">I design presentations from the business problem out, not from the template in.</h1>
          <div class="ab-g">
            <div class="ab-body">
              <p class="ab-lead">Whether the outcome is a presentation, a publication or an interactive experience, I start with the same question: what needs to be understood, and how should someone experience it?</p>
              <p>I work at the intersection of information, storytelling and visual design. My projects range from executive presentations and data-heavy research to educational publishing, editorial systems and interactive HTML experiences.</p>
              <p>I start with structure: what matters, what comes first and what should stay with the audience. Then I build the visual language around it.</p>
            </div>
            <dl class="ab-facts">
              <div><dt>Background</dt><dd>Presentation design · Business storytelling · Data · Customer experience · Research · Interactive work</dd></div>
              <div><dt>Tools I think with</dt><dd>Photoshop · Illustrator · InDesign · After Effects · Figma · Canva · PowerPoint · HTML · CSS · JavaScript · ChatGPT · Claude · Gemini · Gamma</dd></div>
              <div><dt>Format</dt><dd>Baku · Remote projects</dd></div>
            </dl>
          </div>
          <div class="ab-end">
            <p>The tool changes. <span>The thinking doesn’t.</span></p>
            <a class="lk" href="#/services">Services <i aria-hidden="true">→</i></a>
          </div>
        </div>
      </section>`
    },
    services: {
      title: 'Services · Khanim Azimli',
      html: () => {
        const L = id => { const x = EXT[id]; return `<a href="${x ? x.href : caseHref(id)}"${x ? '' : ` data-case="${id}"`}>${x ? x.title : P[PI[id]].title}</a>`; };
        const S = [
          ['Presentation Design', 'Strategy decks, research presentations and visual narratives built around one clear argument.', ['ppt', 'mel', 'gai']],
          ['Executive &amp; Strategy Decks', 'Decks for leadership, built in the order decision-makers ask the questions, with one message per slide.', ['pas', 'ppt']],
          ['Data Storytelling', 'Complex research and information turned into visual systems people understand quickly.', ['indo', 'got', 'nrf']],
          ['Interactive &amp; Motion Presentations', 'Browser-based presentations, interactive experiences and purposeful motion.', ['sys', 'tmf', 'gai']]
        ];
        return `
      <section class="pv sv-pg" aria-labelledby="svT">
        <div class="wrap">
          <header class="pg-h">
            <p class="kk">Services</p>
            <h1 id="svT" tabindex="-1">What I work across</h1>
            <p class="pg-lede">One practice.<br>The content decides the format.</p>
          </header>
          <ol class="srv">${S.map((s, k) => `
            <li><span class="srv-n">${pad(k + 1)}</span><h2>${s[0]}</h2><p>${s[1]}</p><p class="srv-in"><span>Seen in</span>${s[2].map(L).join('')}</p></li>`).join('')}
          </ol>
          <div class="srv-end"><p>Have an idea that needs a visual language?</p><a class="bt bt-ink" href="#/contact">Start a project <i aria-hidden="true">→</i></a></div>
        </div>
      </section>`;
      }
    },
    contact: {
      title: 'Contact · Khanim Azimli',
      html: () => `
      <section class="pv ct" aria-labelledby="ctT">
        <div class="wrap">
          <p class="kk"><i class="dot" aria-hidden="true"></i>Available for remote freelance / contract presentation projects.</p>
          <h1 class="ct-h" id="ctT" tabindex="-1">Let’s work<br>together.</h1>
          <ul class="ct-l">
            <li><a href="mailto:${MAIL}?subject=Design%20project"><span>Email</span><b>${MAIL}</b><i aria-hidden="true">↗</i></a></li>
            <li><a href="${LINKEDIN}" target="_blank" rel="noopener"><span>LinkedIn</span><b>Khanim Azimli</b><i aria-hidden="true">↗</i><span class="vh"> (opens in a new tab)</span></a></li>
            <li><a href="${CV}" download data-cv><span>CV</span><b>Download CV</b><i aria-hidden="true">↓</i></a></li>
          </ul>
          <div class="ct-foot"><p>Tell me what you are trying to communicate, who needs to understand it and where it needs to live.</p><p class="kk">Baku · GMT+4 · <b id="clock">--:--</b></p></div>
        </div>
      </section>`
    },
    missing: {
      title: 'Page not found · Khanim Azimli',
      html: () => `
      <section class="pv ct" aria-labelledby="nfT">
        <div class="wrap">
          <p class="kk">404</p>
          <h1 class="ct-h" id="nfT" tabindex="-1">This page<br>doesn’t exist.</h1>
          <div class="hm-cta"><a class="bt bt-ink" href="#/work">See the work <i aria-hidden="true">→</i></a><a class="bt bt-line" href="#/">Home</a></div>
        </div>
      </section>`
    }
  };
  let clockT = 0;
  const initView = () => {
    clearInterval(clockT);
    const clock = $('#clock', viewEl);
    if (clock) {
      const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Baku', hour: '2-digit', minute: '2-digit' });
      const tick = () => { clock.textContent = fmt.format(new Date()); };
      tick(); clockT = setInterval(tick, 20000);
    }
    const cv = $('[data-cv]', viewEl);
    if (cv) fetch(CV, { method: 'HEAD' }).then(r => { if (!r.ok) throw 0; }).catch(() => {
      cv.removeAttribute('download'); cv.href = `mailto:${MAIL}?subject=CV%20request`;
      $('b', cv).textContent = 'Request CV'; $('i', cv).textContent = '↗';
    });
  };

  /* ================================================================
     ROUTER
     ================================================================ */
  let curView = '', navTop = false, booted = false;
  const mem = {};                                   // scroll position per page view, for Back / Forward
  const LEGACY = { work: 'work', top: '', about: 'about', capabilities: 'services', services: 'services', contact: 'contact', tools: 'about', publishing: 'work', powerpoint: 'work', transformations: 'work' };
  const parse = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h && h[0] !== '/') return { redirect: '#/' + (LEGACY[h] !== undefined ? LEGACY[h] : '') };
    const s = h.replace(/^\/+|\/+$/g, '').split('/');
    if (s[0] === 'work' && s[1]) return PI[s[1]] !== undefined ? { redirect: caseHref(s[1]) } : { view: 'missing' };   // old #/work/<id>
    if (s[0] === 'case') return BY_SLUG[s[1]] ? { view: 'work', caseId: BY_SLUG[s[1]] } : { view: 'missing' };
    if (s[0] === '') return { view: 'home' };
    return VIEWS[s[0]] && s[0] !== 'missing' && !s[1] ? { view: s[0] } : { view: 'missing' };
  };
  const markNav = name => {
    $$('[data-nav]').forEach(a => a.dataset.nav === name ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  };
  const showView = (name, y) => {
    const v = VIEWS[name];
    const swap = () => {
      viewEl.innerHTML = v.html();
      viewEl.dataset.view = name; document.body.dataset.view = name;
      initView();
      scrollTo(0, y || 0);
      viewEl.classList.remove('out');
    };
    if (curView && !RM && !isOpen()) { viewEl.classList.add('out'); setTimeout(swap, 130); }
    else swap();
    curView = name;
  };
  const route = () => {
    const r = parse();
    if (r.redirect) { history.replaceState(null, '', r.redirect); route(); return; }
    closeMenu();
    const top = navTop; navTop = false;
    if (r.caseId) {
      if (!curView) showView(r.view, 0);           // deep link: the Work index sits under the case
      markNav('work');
      document.title = `${LONG[r.caseId] || P[PI[r.caseId]].title} · Khanim Azimli`;
      openCase(r.caseId);
      booted = true;
      return;
    }
    const wasCase = isOpen();
    closeCase();
    markNav(r.view);
    document.title = VIEWS[r.view].title;
    const y = top ? 0 : (mem[r.view] || 0);
    if (r.view === curView) {
      if (!wasCase) scrollTo({ top: y, behavior: RM ? 'auto' : 'smooth' });
    } else {
      if (curView) mem[curView] = scrollY;
      showView(r.view, y);
    }
    const h1 = $('h1', viewEl);
    if (booted && h1) setTimeout(() => h1.focus({ preventScroll: true }), RM ? 0 : 150);
    booted = true;
  };

  /* ---------- menu (mobile) ---------- */
  function closeMenu() {
    if (!menu.classList.contains('on')) return;
    menu.classList.remove('on'); burger.setAttribute('aria-expanded', 'false');
    $('span', burger).textContent = 'Menu';
    document.documentElement.classList.remove('menu-on');
    setTimeout(() => { if (!menu.classList.contains('on')) menu.hidden = true; }, RM ? 0 : 220);
  }
  burger.addEventListener('click', () => {
    if (menu.classList.contains('on')) { closeMenu(); burger.focus(); return; }
    menu.hidden = false; burger.setAttribute('aria-expanded', 'true'); $('span', burger).textContent = 'Close';
    document.documentElement.classList.add('menu-on');
    requestAnimationFrame(() => menu.classList.add('on'));
  });

  /* ---------- clicks: internal links set "start at top"; case previews carry their image ---------- */
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const g = e.target.closest('[data-goto]');
    if (g) { e.preventDefault(); location.hash = caseHref(P[+g.dataset.goto].id); return; }
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    const href = a.getAttribute('href');
    const legacy = a.dataset.open;                   // links inside the art-directed pages
    if (legacy && PI[legacy] !== undefined) { e.preventDefault(); navTop = true; location.hash = caseHref(legacy); return; }
    if (href[0] !== '#') return;
    navTop = true;
    if (a.dataset.case && !isOpen()) zoomSrc = $('img', a);
    if (href === location.hash || (href === '#/' && (location.hash === '' || location.hash === '#/'))) {
      e.preventDefault(); route();                   // same link again: back to the top of the view
    }
  });
  addEventListener('hashchange', route);

  /* ---------- keys ---------- */
  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!lbx.hidden) { e.preventDefault(); lbClose(); return; }
      if (menu.classList.contains('on')) { closeMenu(); burger.focus(); return; }
      return;
    }
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    if (e.altKey || e.metaKey || e.ctrlKey || typing(document.activeElement)) return;
    const d = e.key === 'ArrowRight' ? 1 : -1;
    if (!lbx.hidden) { e.preventDefault(); lbStep(d); return; }
    if (!isOpen()) return;
    // arrows drive the slide viewer that is in view
    const v = viewers.find(v => { const r = v.el.getBoundingClientRect(); return r.top < innerHeight * .75 && r.bottom > innerHeight * .25; });
    if (!v) return;
    e.preventDefault(); d > 0 ? v.next() : v.prev();
  });

  const atTop = () => document.documentElement.classList.toggle('top', scrollY < 8);
  addEventListener('scroll', atTop, { passive: true }); atTop();
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  cs.inert = true;
  route();
  requestAnimationFrame(() => document.documentElement.classList.add('ready'));
})();
