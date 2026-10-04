/* The World Is Still Trading · Geometry of Trade 2026 · featured interactive atlas case
   Home block (GOT.card), case page (GOT.page), Transformation studies (GOT.tfSeries / GOT.tfStudy), behaviour (GOT.initCard / GOT.init / GOT.initTf).
   Carries the atlas's own system: deep ink, ice white, cobalt, cyan, trade orange, signal red. Instrument Sans (75% width) + IBM Plex Mono, extracted from the live file.
   The live atlas itself is never modified: it is linked and embedded as-is. */
(() => {
  const LIVE = 'assets/live/geometry-of-trade-2026-atlas.html';
  const VID = 'assets/video/got/globe.mp4';        // plate 01 as rendered, with its title
  const VIDC = 'assets/video/got/globe-clean.mp4';  // plate 01 globe only: the live render with the plate's text hidden
  const I = (n, t) => `assets/img/got/${n}${t ? '-t' : ''}.webp`;
  // intrinsic ratios (thumb files): reserve each lazy image's height before it loads, so in-page links land on target
  const IR = { 'b-cover':'560/725', 'b-p003':'560/725', 'b-p004':'560/725', 'b-p007':'560/725', 'b-p010':'560/725', 'b-p014':'560/725', 'b-p031':'560/725', 'b-p043':'560/725', 'b-p048':'560/725', 'b-p050':'560/725', 'c-ai':'640/490', 'c-aipaths':'960/435', 'c-chain':'960/239', 'c-ctrl':'321/48', 'c-distance':'960/375', 'c-fracture':'960/431', 'c-layers':'880/600', 'c-overlay':'960/474', 'c-redirect':'960/431', 'c-routes':'960/797', 'c-src':'960/36', 'c-subst':'840/620', 'g-cover':'960/540', 'g-globe':'960/495', 'g-mask':'900/860', 'g-nodes':'380/470', 'n02':'960/540', 'o02':'960/540', 's01':'960/540', 's02':'960/540', 's03':'960/540', 's04':'960/540', 's07':'960/540', 's08':'960/540', 's09':'960/540', 's09a':'960/540', 's10':'960/540', 's10g':'960/540' };
  const ir = n => IR[n] ? ` style="aspect-ratio:auto ${IR[n]}"` : '';
  const pic = (n, alt, sizes, eager) => `<img src="${I(n, 1)}" srcset="${I(n, 1)} 960w, ${I(n)} 1920w" sizes="${sizes}" alt="${alt}"${ir(n)}${eager ? '' : ' loading="lazy"'} decoding="async">`;
  const thumb = (n, alt) => `<img src="${I(n, 1)}" alt="${alt}"${ir(n)} loading="lazy" decoding="async">`;
  const pad = n => String(n).padStart(2, '0');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AR = '<i class="ga-ar" aria-hidden="true">→</i>';
  const live = (cls = '', label = 'Open live atlas') => `<a class="ga-live ${cls}" href="${LIVE}" target="_blank" rel="noopener"><span>${label}</span><i aria-hidden="true">↗</i></a>`;
  const globe = (cls, alt, full) => `<video class="${cls}" src="${full ? VID : VIDC}" poster="${I(full ? 's01' : 'g-cover', 1)}" muted loop playsinline preload="none" aria-label="${alt}" data-ga-vid></video>`;
  const DISC = 'Independent visual interpretation based on McKinsey Global Institute research. Not commissioned by or affiliated with McKinsey &amp; Company.';
  const ARC = [['01', 'The globe'], ['02', 'Routes'], ['03', 'Distance'], ['05', 'Fracture'], ['06', 'Rerouting'], ['08', 'New hubs'], ['09', 'Multiple trade geometries']];
  const route = (cls = '') => `<ol class="ga-route ${cls}" aria-label="Narrative geometry">${ARC.map(([n, t], k) => `<li${k === ARC.length - 1 ? ' class="end"' : ''} style="--k:${k}"><i aria-hidden="true"></i><span class="n">${n}</span><b>${t}</b></li>`).join('')}</ol>`;
  const ICONS = {
    chip: '<rect x="6" y="6" width="12" height="12"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/>',
    gpu: '<path d="M2 5v15M2 7h19v10H5"/><circle cx="9" cy="12" r="3"/><circle cx="16" cy="12" r="3"/><path d="M9 10.6v2.8M7.8 12h2.4M16 10.6v2.8M14.8 12h2.4M6 17v2h9v-2"/>',
    router: '<rect x="3" y="13" width="18" height="6"/><path d="M7 13 5 5M17 13l2-8M6.5 16h1M10 16h1M14 16h4"/>',
    server: '<rect x="5" y="2.5" width="14" height="19"/><path d="M5 7.5h14M5 12h14M5 16.5h14M8 5h1M8 9.7h1M8 14.2h1M8 19h1M12 5h4M12 9.7h4M12 14.2h4M12 19h4"/>'
  };
  const icon = k => `<svg viewBox="0 0 24 24" aria-hidden="true"><g class="ic">${ICONS[k]}</g></svg>`;

  /* ---------------- HOME: featured block in Selected work ---------------- */
  const card = (n, total) => `
  <section class="ga" aria-label="Featured interactive case: The World Is Still Trading. Just differently.">
    <svg class="ga-grat" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g>${[0, 1, 2, 3, 4, 5, 6].map(k => `<ellipse cx="1180" cy="520" rx="${120 + k * 95}" ry="${560}"/>`).join('')}${[0, 1, 2, 3, 4].map(k => `<ellipse cx="1180" cy="${200 + k * 160}" rx="700" ry="${40 + k * 6}"/>`).join('')}</g>
      <path class="orb" pathLength="1" d="M-40 760 C 380 420, 1100 300, 1700 470"/>
    </svg>
    <div class="ga-in wrap">
      <div class="ga-mast ga-q"><span><i class="ga-sig"></i>${n} / Featured interactive case · Atlas</span><i class="ga-rule"></i><span class="ga-read" data-ga-read>View centre 26.00°N 037.08°E · Orthographic</span></div>

      <div class="ga-stage">
        <a class="ga-f ga-cover ga-q" href="#/work/got" data-open="got" aria-label="The World Is Still Trading, view case study">
          <span class="ga-fr">${globe('ga-v', 'Plate 01 of the live atlas: the globe turning, geography rotating under a fixed light')}</span>
        </a>
        <div class="ga-copy">
          <h3 class="ga-title ga-q" aria-label="The world is still trading. Just differently.">
            <span aria-hidden="true">The world<br>is still trading.</span>
            <span class="cy" aria-hidden="true">Just differently.</span>
          </h3>
          <p class="ga-sub ga-q">Geopolitics and the new geometry of global trade</p>
        </div>
        <span class="ga-cap ga-ccap ga-q"><b>01</b>The globe · live render from the atlas · true earth rotation, light fixed</span>
      </div>

      <div class="ga-row">
        <a class="ga-f ga-map ga-q" href="#/work/got" data-open="got" aria-hidden="true" tabindex="-1">
          <span class="ga-fr">${pic('c-routes', '', '(max-width:900px) 70vw, 32vw')}</span>
          <span class="ga-cap"><b>02</b>Trade didn’t retreat. It rerouted.</span>
        </a>
        <a class="ga-f ga-frac ga-q" href="#/work/got" data-open="got" aria-hidden="true" tabindex="-1">
          <span class="ga-fr">${pic('c-fracture', '', '(max-width:900px) 92vw, 40vw')}</span>
          <span class="ga-cap"><b class="r">05</b>The US–China corridor breaks · ≈ –30%</span>
        </a>
        <a class="ga-f ga-ai ga-q" href="#/work/got" data-open="got" aria-hidden="true" tabindex="-1">
          <span class="ga-fr">${pic('c-ai', '', '(max-width:900px) 70vw, 24vw')}</span>
          <span class="ga-cap"><b>04</b>AI moves goods · ≈40% · ≈⅓</span>
        </a>
        <a class="ga-f ga-lay ga-q" href="#/work/got" data-open="got" aria-hidden="true" tabindex="-1">
          <span class="ga-fr">${pic('c-layers', '', '(max-width:900px) 70vw, 24vw')}</span>
          <span class="ga-cap"><b class="co">09</b>No longer one trade map</span>
        </a>
      </div>

      ${route('ga-q')}

      <div class="ga-low">
        <div class="ga-body ga-q">
          <p class="ga-lede">A 10-plate interactive editorial atlas about how global trade routes are being reshaped by geopolitics, AI demand and new manufacturing hubs.</p>
          <p class="ga-tri"><span>Research</span>${AR}<span>Editorial atlas</span>${AR}<span class="cy">Interactive system</span></p>
        </div>
        <div class="ga-act ga-q">
          <ul class="ga-tags" aria-label="Tags"><li>Interactive</li><li>Data storytelling</li><li>Cartography</li><li>Vector</li><li>HTML</li><li>Motion</li></ul>
          <div class="ga-btns">
            <a class="ga-go" href="#/work/got" data-open="got"><span>View case study</span><i aria-hidden="true">→</i></a>
            ${live()}
          </div>
          <p class="ga-disc">${DISC}</p>
        </div>
      </div>
    </div>
  </section>`;

  const io = (els, root, cls = 'in', margin = '0px 0px -10% 0px') => {
    if (RM || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add(cls)); return; }
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add(cls); o.unobserve(e.target); } }), { root, rootMargin: margin });
    els.forEach(e => o.observe(e));
  };
  // globe clips play only while visible (never on reduced motion: the poster frame stays)
  const play = (vids, root) => {
    if (RM || !vids.length) return;
    const o = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) { v.preload = 'auto'; const p = v.play(); p && p.catch(() => {}); } else v.pause(); }), { root: root || null, threshold: .2 });
    vids.forEach(v => o.observe(v));
  };
  // the coordinate readout drifts east with the globe, like the atlas's own header
  const readout = (el, root) => {
    if (!el || RM) return;
    let lon = 37.08, on = false, last = 0;
    const tick = now => { if (!on) return; if (now - last > 120) { lon = (lon + .06) % 360; el.textContent = `View centre 26.00°N ${lon.toFixed(2).padStart(6, '0')}°E · Orthographic`; last = now; } requestAnimationFrame(tick); };
    new IntersectionObserver(es => { const v = es.some(e => e.isIntersecting); if (v && !on) { on = true; requestAnimationFrame(tick); } else if (!v) on = false; }, { root: root || null }).observe(el);
  };
  const initCard = root => {
    const g = root.querySelector('.ga'); if (!g) return;
    io([...g.querySelectorAll('.ga-q')], null);
    io([g], null, 'in', '0px 0px -30% 0px');
    play([...g.querySelectorAll('[data-ga-vid]')]);
    readout(g.querySelector('[data-ga-read]'));
  };

  /* ---------------- CASE PAGE ---------------- */
  const page_ = (n, alt, p) => `<figure class="gb-page"><span>${thumb(n, alt)}</span><figcaption>${p}</figcaption></figure>`;
  const study = (k, o) => `
    <article class="gs ${o.cls || ''}" id="ga-ba-${k}">
      <header class="gs-h rv">
        <span class="gs-n">${k}</span>
        <p class="gs-tr"><span>${o.from}</span>${AR}<span class="cy">${o.to}</span></p>
      </header>
      <div class="gs-grid">
        <div class="gs-before rv">
          <p class="gk">Before</p>
          <p class="gs-bt">${o.before}</p>
          <div class="gs-pages">${o.pages.map(p => page_(p[0], p[1], p[2])).join('')}</div>
        </div>
        <div class="gs-after rv d1">
          <p class="gk cy">After</p>
          <p class="gs-at">${o.after}</p>
          ${o.vis}
          <p class="gs-why">${o.why}</p>
        </div>
      </div>
    </article>`;
  const fr = (n, alt, cap, cls = '') => `<figure class="gfr ${cls}">${pic(n, alt, '(max-width:900px) 92vw, 60vw')}${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;

  const page = (i, total, nextIdx, next) => `
  <article class="gc">
    <!-- HERO -->
    <section class="gc-hero">
      <div class="wrap">
        <div class="gc-mast c-in"><span><i class="ga-sig"></i>Atlas of trade geometry · 2026</span><span>Interactive editorial atlas / Data storytelling</span><span>${pad(i + 1)} / ${pad(total)}</span></div>
        <h1 id="cTitle" class="gc-h" aria-label="The world is still trading. Just differently.">
          <span class="gc-l"><span>The world</span></span>
          <span class="gc-l d1"><span>is still trading.</span></span>
          <span class="gc-l cy d3"><span>Just differently.</span></span>
        </h1>
        <div class="gc-hero-low c-in d3">
          <p class="gc-sup">A 10-plate interactive atlas on geopolitics and the new geometry of global trade.</p>
          ${live('lg')}
        </div>
        <ul class="gc-meta c-in d3" aria-label="Project type"><li>Interactive presentation</li><li>Data storytelling</li><li>Custom cartography</li><li>Vector system</li><li>HTML / CSS / JavaScript</li></ul>
        <figure class="gc-cover c-in d3"><span class="gc-cv">${globe('gc-v', 'Plate 01 of the live atlas: the globe rotating under the title')}</span><figcaption><span>Plate 01 · The globe</span><span>Geography rotates, light stays fixed · recorded from the live HTML</span></figcaption></figure>
      </div>
    </section>

    <!-- POSITIONING -->
    <section class="gc-sec">
      <div class="wrap">
        <p class="gc-k rv"><span>01</span>Positioning</p>
        <div class="gc-pos">
          <h2 class="gc-h2 rv">Global trade did not collapse.<br><span class="cy">It rerouted.</span></h2>
          <div class="gc-body rv d1">
            <p>The source material contained trade corridors, geopolitical distance, AI-hardware growth, US–China decoupling and the rise of new manufacturing connectors.</p>
            <p>The redesign turns those findings into one evolving visual system:</p>
          </div>
        </div>
        ${route('gc-route rv')}
        <p class="gc-idea rv">Instead of treating each chart as a separate finding, the project behaves like <span>an atlas whose geometry changes as the story progresses.</span></p>
        <ol class="gc-tri rv" aria-label="Not another report redesign">
          <li><span class="n">Input</span><b>Research</b><small>A 59-page MGI update · corridors, distances, exhibits</small></li>
          <li><span class="n">Structure</span><b>Editorial atlas</b><small>Ten plates · ink and paper rhythm · one cartographic language</small></li>
          <li class="on"><span class="n">Output</span><b>Interactive system</b><small>Live HTML · rotating globe · drawn routes · layered maps</small></li>
        </ol>
      </div>
    </section>

    <!-- STATEMENT -->
    <section class="gc-state">
      <svg class="gc-state-orb" viewBox="0 0 1600 600" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M-20 520 C 420 120, 1180 80, 1620 360"/><path pathLength="1" class="b" d="M-20 560 C 520 260, 1080 260, 1620 120"/></svg>
      <div class="wrap">
        <p class="gc-big rv">The report<br>had the data.</p>
        <p class="gc-big cy rv d1">The atlas<br>found the geometry.</p>
        <p class="gc-sub rv d2">The charts showed change. The map made it visible.</p>
      </div>
    </section>

    <!-- ROLE -->
    <section class="gc-sec gc-tight">
      <div class="wrap">
        <dl class="gc-role rv">
          <div><dt>Role</dt><dd>Information architecture<br>Data storytelling<br>Presentation design<br>Editorial art direction<br>Vector illustration<br>Cartography<br>Motion<br>Interactive HTML</dd></div>
          <div><dt>Format</dt><dd>10-plate interactive presentation</dd></div>
          <div><dt>Technology</dt><dd>HTML<br>CSS<br>JavaScript<br>SVG</dd></div>
          <div><dt>Source</dt><dd>McKinsey Global Institute, <i>Geopolitics and the geometry of global trade: 2026 update</i> (March 2026, public). Figures checked against the report page by page.</dd></div>
        </dl>
      </div>
    </section>

    <!-- BEFORE → AFTER -->
    <section class="gc-sec gc-ba" id="ga-ba">
      <div class="wrap">
        <p class="gc-k rv"><span>02</span>Transformation study · Report → interactive editorial atlas</p>
        <div class="gb-hero">
          <div class="rv">
            <h2 class="gb-h"><span>Trade report</span>${AR}<span class="cy">Interactive atlas</span></h2>
            <dl class="gb-pairs">
              <div><dt>Charts</dt><dd>${AR}Geometry</dd></div>
              <div><dt>Data</dt><dd>${AR}Routes</dd></div>
              <div><dt>Findings</dt><dd>${AR}One evolving map</dd></div>
            </dl>
          </div>
          <div class="gb-vis rv d1">
            <figure class="gb-rep">${thumb('b-cover', 'Cover of the source report, Geopolitics and the geometry of global trade: 2026 update')}<figcaption>Before · 59-page report</figcaption></figure>
            <span class="gb-arrow" aria-hidden="true"></span>
            <figure class="gb-out">${pic('s02', 'Plate 02 of the atlas: trade didn’t retreat, it rerouted, with corridors drawn across the globe', '(max-width:900px) 80vw, 44vw')}<figcaption>After · 10-plate interactive atlas</figcaption></figure>
          </div>
        </div>

        ${study('01', { from: 'Volume data', to: 'Route behaviour',
          before: 'Trade growth and corridor data shown as traditional research findings.',
          after: 'Trade didn’t retreat. <span class="cy">It rerouted.</span>',
          pages: [['b-p004', 'Report page 4: trade growth by sector bar chart', 'Report p.4 · growth by sector']],
          vis: fr('s02', 'Plate 02: sustained, weakened and redirected corridors on one globe', 'Plate 02 · sustained, weakened and redirected corridors share one map'),
          why: 'Growth figures stay on the plate, but the argument moves to the globe. Each corridor is drawn as sustained, weakened or redirected, so 6.5% growth reads as movement, not just volume.' })}

        ${study('02', { from: 'Two metrics', to: 'One spatial contradiction', cls: 'paper',
          before: 'Geographic distance and geopolitical distance shown as analytical measures.',
          after: 'Farther on the map. <span class="co">Closer in alignment.</span>',
          pages: [['b-p007', 'Report page 7, Exhibit 1: goods trade indicators as three line charts', 'Report p.7 · Exhibit 1']],
          vis: fr('c-distance', 'Plate 03 detail: India to US about 13,000 km on a globe, beside a polar diagram of geopolitical distance', 'Plate 03 · the same flows measured twice: kilometres on the left, alignment on the right'),
          why: 'The report charts the two distances as separate lines. Set side by side as two studies of the same trade, one stretching on the globe and one tightening on the alignment rings, they become a single contradiction: <b>distance ≠ alignment</b>.' })}

        ${study('03', { from: 'Statistics', to: 'Global flow',
          before: 'AI-hardware trade statistics.',
          after: 'AI doesn’t only move data. <span class="cy">It moves goods.</span>',
          pages: [['b-p010', 'Report page 10, Exhibit 3: AI-related goods trade growth by region', 'Report p.10 · Exhibit 3']],
          vis: `<div class="gs-ai">${fr('c-ai', 'Plate 04 detail: approximately 40% growth in AI-related hardware shipments, approximately one third of global trade growth', '≈40% · ≈⅓', 'stat')}${fr('c-aipaths', 'Plate 04 detail: AI hardware corridors from Taiwan, South Korea and ASEAN to the United States, with chip, GPU, router and server icons in transit', 'Semiconductors, graphics cards, routers and servers move along the corridors', 'paths')}</div>`,
          why: 'The two headline numbers carry the plate: about 40% growth in AI-hardware shipments, about a third of all trade growth. The globe then shows where that hardware travels, with a custom icon family riding the corridors.' })}

        <article class="gs gs-hero" id="ga-ba-04">
          <header class="gs-h rv">
            <span class="gs-n r">04</span>
            <p class="gs-tr"><span>Decline</span>${AR}<span class="rd">Structural break</span></p>
          </header>
          <div class="gs-grid">
            <div class="gs-before rv">
              <p class="gk">Before</p>
              <p class="gs-bt">US–China trade decline described through data.</p>
              <div class="gs-pages">${page_('b-p014', 'Report page 14, Exhibit 6: US and China trade change decomposition', 'Report p.14 · Exhibit 6')}</div>
            </div>
            <div class="gs-after rv d1">
              <p class="gk rd">After</p>
              <p class="gs-at">One major corridor <span class="rd">physically fractures.</span></p>
            </div>
          </div>
          <div class="gx-break rv">
            <figure class="gx-a">${pic('c-fracture', 'Plate 05: the China to United States corridor drawn in red and cut in the middle, labelled corridor –30%', '(max-width:900px) 92vw, 46vw')}<figcaption><b>1 · Break</b>The corridor is drawn, then cut. Red is used only here.</figcaption></figure>
            <span class="gx-mid" aria-hidden="true"><i></i><em>then</em><i></i></span>
            <figure class="gx-b">${pic('c-redirect', 'Plate 05: after the break, routes from China redirect toward Europe, the Middle East and India', '(max-width:900px) 92vw, 46vw')}<figcaption><b>2 · Redirect</b>Flows bend toward Europe, the Middle East and India.</figcaption></figure>
          </div>
          <div class="gx-num rv" aria-label="Approximately minus 30 percent US–China trade. More than 165 billion dollars pushed away from the corridor. About two thirds replaced through alternative suppliers.">
            <div><b class="rd">≈ –30%</b><span>US–China trade</span></div>
            <div><b>&gt;$165B</b><span>pushed away from the corridor</span></div>
            <div><b class="cy">≈ ⅔</b><span>replaced through other suppliers</span></div>
          </div>
          <p class="gs-why rv">The report decomposes the decline into bars. In the atlas the largest corridor in world trade is drawn once and then broken in place, so the decline becomes a structural event. The flows that leave it are drawn immediately afterwards, which keeps the plate honest: trade moved, it did not vanish.</p>
        </article>

        ${study('05', { from: 'Country examples', to: 'New connector logic',
          before: 'ASEAN, India and Brazil treated as separate observations.',
          after: 'The new trade map <span class="cy">has more middles.</span>',
          pages: [['b-p043', 'Report page 43: ASEAN trade', 'p.43 · ASEAN'], ['b-p048', 'Report page 48: India', 'p.48 · India'], ['b-p050', 'Report page 50: Brazil', 'p.50 · Brazil']],
          vis: fr('s08', 'Plate 08: ASEAN as a dense cluster of connectors between China, the United States, India and Brazil', 'Plate 08 · ASEAN, India and Brazil drawn as connectors on one network'),
          why: 'Three country chapters become one network. ASEAN is drawn as a cluster that links China, Korea, Taiwan, India, the US and Brazil, with India and Brazil as named connectors beside it.' })}

        ${study('06', { from: 'Multiple factors', to: 'Layered geometries', cls: 'paper',
          before: 'Different drivers discussed separately: tariffs, AI demand, manufacturing, geopolitical alignment.',
          after: 'There is no longer <span class="co">one trade map.</span>',
          pages: [['b-p014', 'Report page 14: tariffs', 'Tariffs · p.14'], ['b-p010', 'Report page 10: AI demand', 'AI · p.10'], ['b-p031', 'Report page 31: manufacturing', 'Manufacturing · p.31'], ['b-p007', 'Report page 7: geopolitical alignment', 'Geopolitics · p.7']],
          vis: `<div class="gs-lay">${fr('c-layers', 'Plate 09: four tracing-paper map sheets, tariffs, AI, manufacturing and geopolitics, stacked in perspective', '1 · Four sheets, one per driver', 'a')}${fr('c-overlay', 'Plate 09: the four sheets collapsed into one overlaid map with a legend', '2 · Collapsed into one map', 'b')}</div>`,
          why: 'Each driver gets its own tracing-paper sheet in its own colour. The sheets hover apart, then collapse into one map, so the plate argues the point by construction: the trade map is the sum of several geometries.' })}

        ${study('07', { from: 'Summary', to: 'Visual resolution',
          before: 'A report concludes with findings.',
          after: 'Trade didn’t disappear. <span class="cy">The map changed.</span>',
          pages: [['b-p003', 'Report page 3: At a glance summary of findings', 'Report p.3 · At a glance']],
          vis: fr('s10', 'Plate 10: the final globe centred on India, ASEAN and China with the new routes drawn', 'Plate 10 · the globe returns, now centred on India, ASEAN and China'),
          why: 'The atlas ends where it began, on the globe. The view centre has moved from the Atlantic to India, ASEAN and China, and the routes drawn across the plates remain. The conclusion is shown as a changed map rather than restated as a list.' })}
      </div>
    </section>

    <!-- WHAT CHANGED -->
    <section class="gc-sec">
      <div class="wrap">
        <p class="gc-k rv"><span>03</span>What changed</p>
        <dl class="gc-wc rv">
          <div><dt>Structure</dt><dd>Multiple findings<i>→</i><b>one atlas narrative</b></dd></div>
          <div><dt>Data</dt><dd>Charts and statistics<i>→</i><b>spatial relationships</b></dd></div>
          <div><dt>Visual language</dt><dd>Research graphics<i>→</i><b>custom cartography</b></dd></div>
          <div><dt>Motion</dt><dd>Static pages<i>→</i><b>moving routes and geography</b></dd></div>
          <div><dt>Format</dt><dd>Report<i>→</i><b>interactive 10-plate HTML experience</b></dd></div>
        </dl>
      </div>
    </section>

    <!-- BUILT FROM VECTOR LOGIC -->
    <section class="gc-vec">
      <div class="wrap">
        <p class="gc-k rv"><span>04</span>Craft</p>
        <div class="gv-head">
          <h2 class="gc-big sm rv">Built from<br><span class="co">vector logic.</span></h2>
          <div class="rv d1">
            <p class="gc-p">The project uses a custom vector-led cartographic system rather than generic map assets.</p>
            <p class="gc-p">The globe, route logic, technical labels and map compositions were designed to behave as one visual language.</p>
            <ul class="gv-labs" aria-label="Disciplines"><li>Vector</li><li>Cartography</li><li>Path system</li><li>Masking</li><li>Layers</li></ul>
          </div>
        </div>
        <div class="gv-ol rv" data-ol style="--x:52%">
          <div class="gv-ol-img a">${pic('n02', 'Plate 02 in preview: the rendered globe with routes', '(max-width:1440px) 92vw, 1280px')}</div>
          <div class="gv-ol-img b">${pic('o02', 'Plate 02 in outline view: the same plate reduced to its vector paths, coastlines, graticule, routes and nodes', '(max-width:1440px) 92vw, 1280px')}</div>
          <span class="gv-tag l">Preview</span><span class="gv-tag r">Outline · paths only</span>
          <span class="gv-h" aria-hidden="true"><i></i></span>
          <input type="range" min="0" max="100" value="52" aria-label="Compare the rendered plate with its outline view">
        </div>
        <p class="gc-cap rv">The same live plate shown rendered and in outline view. Coastlines, graticule, corridors, arrowheads and nodes are paths, so the system can rotate, redraw and recolour in the browser.</p>
        <div class="gv-anat">
          ${[
            ['g-globe', 'Globe', 'Vector', 'Orthographic globe. Ocean, land and atmosphere separated into passes; the light stays fixed while geography turns.', 's3 r1'],
            ['g-mask', 'Masks', 'Masking', 'Land traced to vector and used as a mask over the land pass. Shown here in outline.', 's3 r1'],
            ['c-subst', 'Routes', 'Path system', 'Three line codes: direct replacement, new capacity, new destination.', 's2 r2'],
            ['c-aipaths', 'Arcs', 'Path system', 'Great-circle arcs with travelling pulses and drawn arrowheads.', 's2 r2'],
            ['g-nodes', 'Nodes', 'Cartography', 'Ringed nodes, leader lines and mono labels set like an atlas index.', 's2 r2'],
            ['icons', 'Icons', 'Vector', 'A 24-unit icon family for hardware in transit, drawn on one stroke.', 's3 r3'],
            ['c-layers', 'Map layers', 'Layers', 'Tracing-paper sheets per driver, stacked and collapsed.', 's3 r3 pp']
          ].map(([img, t, lab, d, w], k) => `<figure class="gv-i ${w} rv${k % 2 ? ' d1' : ''}"><span class="gv-v${img === 'icons' ? ' ic' : ''}">${img === 'icons' ? `<span class="gv-icons">${['chip', 'gpu', 'router', 'server'].map(icon).join('')}</span><span class="gv-iname"><span>Semiconductors</span><span>Graphics cards</span><span>Routers</span><span>Servers</span></span>` : pic(img, '', '(max-width:900px) 92vw, 40vw')}</span><figcaption><span class="gv-lab">${lab}</span><b>${t}</b>${d}</figcaption></figure>`).join('')}
        </div>
        <figure class="gv-chain rv">${pic('c-chain', 'Plate 07 detail: technical drawings of components, assembly, finished products and global market, drawn as line art with dimension marks', '(max-width:1440px) 92vw, 1280px')}<figcaption><span class="gv-lab">Technical drawings</span>Plate 07 · components, assembly, product, market. Line art with dimension marks, drawn for the plate.</figcaption></figure>
      </div>
    </section>

    <!-- BUILT TO MOVE -->
    <section class="gc-sec">
      <div class="wrap">
        <p class="gc-k rv"><span>05</span>Motion and interaction</p>
        <h2 class="gc-big sm rv">Built to move<br><span class="cy">like an atlas.</span></h2>
        <div class="gm">
          ${[
            ['video', 'Rotation', 'Rotating globe', 'Real earth rotation, not a spinning image. The view centre is read out live.', 'w'],
            ['c-routes', 'Path', 'Route drawing', 'Corridors draw themselves across the globe, plate by plate.', ''],
            ['c-subst', 'Route', 'Corridor rerouting', 'When one route closes, new lines grow from the same origin.', ''],
            ['c-aipaths', 'Path', 'AI-hardware paths', 'Pulses travel the AI corridors with icons in transit.', 'w'],
            ['c-fracture', 'Motion', 'Route fracture', 'The US–China line is drawn, then cut.', 'w'],
            ['c-layers', 'Layer', 'Layered map states', 'Four sheets separate, then collapse into one.', ''],
            ['c-ctrl', 'Interaction', 'Slide controls', 'Arrow keys, swipe, replay, fullscreen, deep links per plate.', 'ctl'],
            ['c-src', 'Interaction', 'Source captions', 'Every plate carries its page references.', 'src']
          ].map(([img, lab, t, d, w], k) => `<figure class="gm-i ${w} rv${k % 2 ? ' d1' : ''}"><span class="gm-v">${img === 'video' ? globe('gm-vid', 'Plate 01 of the live atlas as rendered: the globe rotating under the title', true) : pic(img, '', '(max-width:900px) 92vw, 46vw')}</span><figcaption><span class="gv-lab">${lab}</span><b>${t}</b>${d}</figcaption></figure>`).join('')}
        </div>
      </div>
    </section>

    <!-- LIVE PREVIEW -->
    <section class="gc-sec gc-xp">
      <div class="wrap">
        <p class="gc-k rv"><span>06</span>Live preview</p>
        <div class="gc-xp-head">
          <h2 class="gc-big sm rv">Explore<br><span class="cy">the new map.</span></h2>
          <div class="rv d1">
            <p class="gc-p">The atlas was designed to be experienced over time, not read as a static sequence.</p>
            ${live()}
          </div>
        </div>
        <div class="gxp rv" data-xp="${LIVE}#s2">
          <div class="gxp-bar"><span class="gxp-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="gxp-url">geometry-of-trade-2026-atlas.html</span><a href="${LIVE}" target="_blank" rel="noopener">Open live atlas <i>↗</i></a></div>
          <div class="gxp-view">
            <img class="gxp-poster" src="${I('s02')}" alt="Plate 02 of the live atlas: trade didn’t retreat, it rerouted" loading="lazy" decoding="async">
            <button class="gxp-shield" type="button" aria-label="Interact with the live atlas preview"><span class="gxp-cta">Click to interact</span><small>Arrow keys or the on-screen controls move through the plates</small></button>
            <a class="gxp-mob" href="${LIVE}" target="_blank" rel="noopener"><span>Open live atlas ↗</span><small>Best viewed in landscape</small></a>
          </div>
        </div>
        <p class="gc-cap rv">Live preview of the actual HTML file, opened at plate 02. It loads only near the viewport, and the page keeps scrolling normally until you choose to interact.</p>
      </div>
    </section>

    <!-- END -->
    <section class="gc-end">
      <div class="gc-end-bg" aria-hidden="true">${pic('s10g', '', '100vw')}</div>
      <div class="wrap">
        <p class="gc-big rv">Trade<br>didn’t disappear.</p>
        <p class="gc-big cy rv d1">The map<br>changed.</p>
        <p class="gc-small rv">10-plate interactive atlas · HTML · CSS · JavaScript · SVG</p>
        <div class="gc-end-act rv">${live('lg')}<button class="ga-next" type="button" data-goto="${nextIdx}"><span>Next project</span><i aria-hidden="true">→</i><small>${next.title}</small></button></div>
        <p class="gc-disc rv">${DISC}</p>
      </div>
    </section>
  </article>`;

  /* ---------------- TRANSFORMATION STUDIES: four kinds of transformation + study 03 ---------------- */
  const tfSeries = () => `
    <ol class="gsr" aria-label="Four kinds of transformation">
      <li class="s"><a href="#/work/sys" data-open="sys"><span class="n">01 · Report <i>→</i> interactive system</span><b>13 trends <i>→</i> one connected system</b><span class="x">The System Is Waking Up</span></a></li>
      <li class="t"><a href="#/work/tmf" data-open="tmf" data-tmf-jump><span class="n">02 · Report <i>→</i> human-centered story</span><b>Many technologies <i>→</i> one human question</b><span class="x">Tech Moves Fast</span></a></li>
      <li class="ga-t"><a href="#/work/got" data-open="got" data-got-jump><span class="n">03 · Report <i>→</i> editorial atlas</span><b>Trade report <i>→</i> interactive atlas</b><span class="x">The World Is Still Trading</span></a></li>
      <li class="p"><a href="powerpoint-rebuilt.html"><span class="n">04 · PowerPoint <i>→</i> decision story</span><b>Corporate decks <i>→</i> ten-slide decisions</b><span class="x">PowerPoint, Rebuilt · 3 studies</span></a></li>
    </ol>`;
  const tfStudy = () => `
    <article class="gsx" aria-label="Transformation study 03: The World Is Still Trading">
      <div class="gsx-bar"><span class="k">03 · Report → interactive editorial atlas</span><span>MGI Geopolitics and the geometry of global trade · 59-page report → 10-plate interactive HTML</span></div>
      <h3 class="gsx-line"><span>Trade report</span><i aria-hidden="true">→</i><span class="cy">Interactive atlas</span></h3>
      <div class="gsx-grid">
        <div class="gsx-l">
          <dl class="gb-pairs sm">
            <div><dt>Charts</dt><dd>${AR}Geometry</dd></div>
            <div><dt>Data</dt><dd>${AR}Routes</dd></div>
            <div><dt>Findings</dt><dd>${AR}One evolving map</dd></div>
          </dl>
          <div class="gsx-ba">
            <figure class="gsx-rep">${thumb('b-p007', 'Source report page 7, Exhibit 1: distance shown as line charts')}<figcaption>Before · Exhibit 1, p.7</figcaption></figure>
            <i class="gsx-arr" aria-hidden="true"></i>
            <figure class="gsx-aft">${thumb('c-distance', 'Atlas plate 03: farther on the map, closer in alignment')}<figcaption>After · Plate 03</figcaption></figure>
          </div>
        </div>
        <a class="gsx-vis" href="#/work/got" data-open="got" data-got-jump aria-label="View the transformation: The World Is Still Trading">
          <span class="gsx-fr">${globe('gsx-v', 'Plate 01 of the live atlas: the rotating globe')}</span>
          <span class="ga-cap"><b>01</b>The World Is Still Trading · live HTML</span>
        </a>
      </div>
      <ol class="gsx-moves" aria-label="Seven restructuring moves">
        ${[['Volume data', 'Route behaviour', 's02'], ['Two metrics', 'One spatial contradiction', 's03'], ['Statistics', 'Global flow', 's04'], ['Decline', 'Structural break', 'c-fracture'], ['Country examples', 'New connector logic', 's08'], ['Multiple factors', 'Layered geometries', 's09a'], ['Summary', 'Visual resolution', 's10']]
          .map(([a, b, img], k) => `<li${k === 3 ? ' class="hot"' : ''}><a href="#/work/got" data-open="got" data-got-jump><span class="th">${thumb(img, '')}</span><span class="mv"><i>0${k + 1}</i>${a}<em>→</em><b>${b}</b></span></a></li>`).join('')}
      </ol>
      <div class="gsx-foot">
        <a class="ga-go" href="#/work/got" data-open="got" data-got-jump><span>View the transformation</span><i aria-hidden="true">→</i></a>
        ${live()}
        <p class="ga-disc">${DISC}</p>
      </div>
    </article>`;
  const initTf = root => {
    io([...root.querySelectorAll('.gsx, .gsr')], null, 'in', '0px 0px -12% 0px');
    play([...root.querySelectorAll('.gsx [data-ga-vid]')]);
  };

  /* ---------------- CASE BEHAVIOUR ---------------- */
  const init = (cb, cs) => {
    const root = cb.querySelector('.gc'); if (!root) return;
    play([...root.querySelectorAll('[data-ga-vid]')], cs);
    // preview / outline comparison
    root.querySelectorAll('[data-ol]').forEach(el => { const inp = el.querySelector('input'); const set = () => el.style.setProperty('--x', inp.value + '%'); inp.addEventListener('input', set); set(); });
    io([...root.querySelectorAll('.gc-route, .gc-state, .gx-break')], cs, 'g-on', '0px 0px -15% 0px');
    // live iframe: desktop only, loads near the viewport, shield keeps scrolling until clicked
    const fr = root.querySelector('.gxp');
    if (fr) {
      const view = fr.querySelector('.gxp-view'), shield = fr.querySelector('.gxp-shield');
      if (!matchMedia('(min-width: 900px) and (hover: hover)').matches) fr.classList.add('static');
      else {
        let ifr = null;
        const load = () => { if (ifr) return; ifr = document.createElement('iframe'); ifr.title = 'The World Is Still Trading, live atlas preview'; ifr.setAttribute('tabindex', '-1'); ifr.setAttribute('allow', 'fullscreen'); ifr.addEventListener('load', () => fr.classList.add('loaded')); ifr.src = fr.dataset.xp; view.insertBefore(ifr, shield); };
        const o = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { load(); o.disconnect(); } }, { root: cs, rootMargin: '400px 0px' });
        o.observe(fr);
        shield.addEventListener('click', () => { load(); fr.classList.add('live'); ifr.setAttribute('tabindex', '0'); ifr.focus(); });
        fr.addEventListener('pointerleave', () => { if (!fr.classList.contains('live')) return; fr.classList.remove('live'); ifr && ifr.setAttribute('tabindex', '-1'); });
      }
    }
    // arrived from Transformation studies: jump to the before → after section
    if (window.__gotJump) { window.__gotJump = false; setTimeout(() => { const t = root.querySelector('#ga-ba'); t && cs.scrollTo({ top: t.offsetTop - 68, behavior: RM ? 'auto' : 'smooth' }); }, 350); }
  };
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-got-jump]')) window.__gotJump = true; }, true);

  window.GOT = { card, initCard, page, init, tfSeries, tfStudy, initTf, LIVE };
})();
