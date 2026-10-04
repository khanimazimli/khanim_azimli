/* Tech Moves Fast · featured interactive case
   Home block (TMF.card), case page (TMF.page), behaviour (TMF.initCard / TMF.init).
   Carries the project's own system: carbon / graphite / signal yellow / mint / cyan, Inter Tight + IBM Plex Mono.
   The live presentation itself is never modified: it is linked and embedded as-is. */
(() => {
  const LIVE = 'assets/live/Tech-Moves-Fast_EY-Emerging-Tech-Reinterpretation.html';
  const I = (n, t) => `assets/img/tmf/${n}${t ? '-t' : ''}.webp`;
  const pic = (n, alt, sizes, eager) => `<img src="${I(n, 1)}" srcset="${I(n, 1)} 960w, ${I(n)} 1920w" sizes="${sizes}" alt="${alt}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  const pad = n => String(n).padStart(2, '0');
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const liveBtn = (cls = '') => `<a class="tm-live ${cls}" href="${LIVE}" target="_blank" rel="noopener"><span>Open live experience</span><i aria-hidden="true">↗</i></a>`;

  /* ---------------- HOME: featured block in Selected work ---------------- */
  const card = (n, total) => `
  <section class="tm" aria-label="Featured interactive case: Tech Moves Fast. People decide if it lands.">
    <div class="tm-in wrap">
      <div class="tm-mast tm-q"><span><i class="tm-sig"></i>${n} / Featured interactive case</span><i class="tm-rule"></i><span>Interactive presentation · 10 slides · 2026</span></div>

      <div class="tm-grid">
        <div class="tm-copy">
          <h3 class="tm-title tm-q" aria-label="Tech moves fast. People decide if it lands.">
            <span aria-hidden="true">Tech moves<br>fast.</span>
            <span class="y" aria-hidden="true">People decide<br>if it lands.</span>
          </h3>
          <p class="tm-desc tm-q">A corporate emerging-tech report reframed as a 10-slide human-centered interactive narrative.</p>
        </div>

        <a class="tm-f tm-cover tm-q" href="#/work/tmf" data-open="tmf" aria-label="Tech Moves Fast, view case study">
          ${pic('s01', 'Slide 01: Tech moves fast. People decide if it lands. A person at the centre of a technology network.', '(max-width:900px) 92vw, 58vw', false)}
          <span class="tm-cap"><b>01</b>Signal</span>
        </a>
        <a class="tm-f tm-89 tm-q" href="#/work/tmf" data-open="tmf" aria-hidden="true" tabindex="-1">
          ${pic('c-89', '', '(max-width:900px) 60vw, 26vw')}
          <span class="tm-cap"><b>03</b>89% see the value</span>
        </a>
      </div>

      <div class="tm-row">
        <a class="tm-f tm-split tm-q" href="#/work/tmf" data-open="tmf" aria-hidden="true" tabindex="-1">
          ${pic('c-split', '', '(max-width:900px) 92vw, 52vw')}
          <span class="tm-cap"><b>05</b>Perception gap · 85% vs 48%</span>
        </a>
        <a class="tm-f tm-stack tm-q" href="#/work/tmf" data-open="tmf" aria-hidden="true" tabindex="-1">
          ${pic('c-stack', '', '(max-width:900px) 92vw, 34vw')}
          <span class="tm-cap"><b>08</b>Tech stack / human stack</span>
        </a>
        <a class="tm-f tm-found tm-q" href="#/work/tmf" data-open="tmf" aria-hidden="true" tabindex="-1">
          ${pic('s09', '', '(max-width:900px) 92vw, 34vw')}
          <span class="tm-cap"><b>09</b>Built underneath it</span>
        </a>
      </div>

      <ol class="tm-eq tm-q" aria-label="What the case shows">
        <li class="m"><i></i>Technology</li><li class="pl">+</li><li class="y"><i></i>People</li><li class="pl">+</li><li class="w"><i></i>Adoption</li><li class="pl">+</li><li class="c"><i></i>Interaction</li>
      </ol>

      <div class="tm-low">
        <div class="tm-body tm-q">
          <p>A 10-slide interactive reinterpretation of emerging-technology adoption through a human lens.</p>
          <p>Instead of treating cloud, AI, IoT, quantum, digital twins and other technologies as isolated trends, the story focuses on what determines whether they actually create value:</p>
          <p class="tm-five"><span>people</span><span>leadership</span><span>skills</span><span>trust</span><span>adoption</span></p>
        </div>
        <div class="tm-act tm-q">
          <ul class="tm-tags" aria-label="Tags"><li>Interactive</li><li>Data storytelling</li><li>Human-centered</li><li>HTML</li><li>Motion</li></ul>
          <a class="tm-go" href="#/work/tmf" data-open="tmf"><span>View case study</span><i aria-hidden="true">→</i></a>
          ${liveBtn()}
          <p class="tm-disc">Independent redesign of public EY research. Not affiliated with EY.</p>
        </div>
      </div>
    </div>
  </section>`;

  const io = (els, root, cls = 'in', margin = '0px 0px -10% 0px') => {
    if (RM || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add(cls)); return; }
    const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add(cls); o.unobserve(e.target); } }), { root, rootMargin: margin });
    els.forEach(e => o.observe(e));
  };
  const initCard = root => { const t = root.querySelector('.tm'); if (t) io([...t.querySelectorAll('.tm-q')], null); };

  /* ---------------- CASE PAGE ---------------- */
  const ba = (k, before, after, bAlt, aAlt, bLab, aLab, start = 50) => `
    <div class="tb" data-ba style="--x:${start}%">
      <div class="tb-img tb-b">${pic(before, bAlt, '(max-width:900px) 92vw, 66vw')}</div>
      <div class="tb-img tb-a">${pic(after, aAlt, '(max-width:900px) 92vw, 66vw')}</div>
      <span class="tb-tag l">Before · ${bLab}</span><span class="tb-tag r">After · ${aLab}</span>
      <span class="tb-h" aria-hidden="true"><i></i></span>
      <input type="range" min="0" max="100" value="${start}" aria-label="Compare before and after, study ${k}">
    </div>`;

  const study = (k, o) => `
    <article class="ts ${o.cls || ''}" id="tm-ba-${k}">
      <div class="ts-txt rv">
        <span class="ts-n">${k}</span>
        <dl>
          <div><dt>Before</dt><dd>${o.before}</dd></div>
          <div><dt>After</dt><dd class="ts-after">${o.after}</dd></div>
        </dl>
        <p class="ts-tr"><span>${o.from}</span><i>→</i><span>${o.to}</span></p>
        <p class="ts-why">${o.why}</p>
      </div>
      <div class="ts-vis rv d1">${ba(k, o.b, o.a, o.bAlt, o.aAlt, o.bLab, o.aLab, o.start)}${o.extra || ''}</div>
    </article>`;

  const gapSvg = `
    <svg class="ts-gap" viewBox="0 0 520 120" role="img" aria-label="Use AI/ML to automate repetitive tasks: 23% use it now, 60% would be willing to. A 37 point gap.">
      <line x1="20" y1="70" x2="500" y2="70" class="g-tr"/>
      <line x1="${20 + 23 * 4.8}" y1="70" x2="${20 + 60 * 4.8}" y2="70" class="g-cn"/>
      <circle cx="${20 + 23 * 4.8}" cy="70" r="8" class="g-now"/>
      <circle cx="${20 + 60 * 4.8}" cy="70" r="10" class="g-rd"/>
      <text x="${20 + 23 * 4.8}" y="104" class="g-l">NOW 23%</text>
      <text x="${20 + 60 * 4.8}" y="104" class="g-l m">READY 60%</text>
      <text x="${20 + 41.5 * 4.8}" y="50" class="g-v">+37 pts</text>
      <text x="20" y="22" class="g-k">Use AI/ML to automate repetitive tasks</text>
    </svg>`;

  const page = (i, total, nextIdx, next) => `
  <article class="tmc">
    <!-- HERO -->
    <section class="tc-hero">
      <div class="wrap">
        <div class="tc-mast c-in"><span><i class="tm-sig"></i>Tech Moves Fast</span><span>Interactive presentation / Data storytelling</span><span>${pad(i + 1)} / ${pad(total)}</span></div>
        <h1 id="cTitle" class="tc-h" aria-label="Tech moves fast. People decide if it lands.">
          <span class="tc-l"><span>Tech moves fast.</span></span>
          <span class="tc-l y d2"><span>People decide</span></span>
          <span class="tc-l y d3"><span>if it lands.</span></span>
        </h1>
        <div class="tc-hero-low c-in d3">
          <ul class="tc-meta" aria-label="Project type"><li>Interactive presentation</li><li>Data storytelling</li><li>Human-centered design</li><li>10 slides</li></ul>
          ${liveBtn('lg')}
        </div>
        <figure class="tc-cover c-in d3">${pic('s01', 'Slide 01 of the live presentation: a person at the centre of a technology network', '(max-width:1440px) 92vw, 1280px', true)}<figcaption>Slide 01 · Only the nodes closest to a person switch on.</figcaption></figure>
      </div>
    </section>

    <!-- POSITIONING -->
    <section class="tc-sec">
      <div class="wrap">
        <p class="tc-k rv"><span>01</span>Positioning</p>
        <div class="tc-pos">
          <h2 class="tc-h2 rv">Emerging technology is usually presented as a technology story. <span>I reframed it as a people story.</span></h2>
          <div class="tc-body rv d1">
            <p>The original research spans cloud, edge computing, IoT, digital twins, quantum, AI, generative AI, blockchain, Web3, VR / AR and other emerging technologies.</p>
            <p>But the strongest tension was not between technologies. It was between availability and adoption.</p>
            <p>The redesign therefore moves from:</p>
          </div>
        </div>
        <ol class="tc-flow rv" aria-label="Narrative arc">
          <li><b>01</b>Technology exists</li>
          <li><b>02</b>People see the value</li>
          <li><b>03</b>Adoption still stalls</li>
          <li><b>04</b>Leadership creates friction</li>
          <li class="on"><b>05</b>The human stack becomes the foundation</li>
        </ol>
        <p class="tc-idea rv">The result is a 10-slide interactive experience built around one idea: <span>Technology can move quickly. Adoption only moves when people do.</span></p>
      </div>
    </section>

    <!-- STATEMENT -->
    <section class="tc-state">
      <div class="wrap">
        <p class="tc-big rv">The technology<br>wasn’t the story.</p>
        <p class="tc-big y rv d1">Adoption was.</p>
        <p class="tc-sub rv d2">Tools move fast. Behaviour moves differently.</p>
      </div>
    </section>

    <!-- ROLE -->
    <section class="tc-sec tc-tight">
      <div class="wrap">
        <dl class="tc-role rv">
          <div><dt>Role</dt><dd>Information architecture<br>Presentation design<br>Data storytelling<br>Human-centered narrative<br>Motion<br>Interactive HTML</dd></div>
          <div><dt>Format</dt><dd>10-slide interactive presentation</dd></div>
          <div><dt>Technology</dt><dd>HTML<br>CSS<br>JavaScript<br>SVG</dd></div>
          <div><dt>Source</dt><dd>EY Emerging Tech at Work 2023 (public). n=1,001 US workers. Every figure checked against the report.</dd></div>
        </dl>
      </div>
    </section>

    <!-- BEFORE → AFTER -->
    <section class="tc-sec tc-ba" id="tm-ba">
      <div class="wrap">
        <p class="tc-k rv"><span>02</span>Transformation study · Report → human-centered interactive story</p>
        <div class="tc-bahero">
          <div class="rv">
            <h2 class="tc-h2">Many technologies<br><i>→</i> <span>one human question.</span></h2>
            <div class="tc-ab">
              <div><p class="tc-mk">Before</p><p class="tc-ab-t">A conventional emerging-technology research report</p>
                <ul><li>multiple technology categories</li><li>statistics</li><li>adoption data</li><li>employee sentiment</li><li>leadership findings</li><li>barriers</li><li>cybersecurity concerns</li></ul></div>
              <div><p class="tc-mk y">After</p><p class="tc-after">Tech moves fast.<br><span>People decide if it lands.</span></p></div>
            </div>
          </div>
          <div class="rv d1">${ba('00', 'b06', 's01', 'Original report page: twelve technologies charted as established, emerging or futuristic, with a cybersecurity line', 'Redesign slide 01: the technology network activated by one person', 'Report p.6', 'Slide 01', 42)}<p class="tb-hint">Drag to compare</p></div>
        </div>

        ${study('01', { before: 'Technology adoption data across many categories.', after: 'This isn’t about the future. It’s already at work.', from: 'Percentages', to: 'Activation field',
          why: 'Instead of showing adoption as a standard bar chart, the redesign turns technologies into a field that progressively activates. Each word fills to its own adoption rate.',
          b: 'b05-top', a: 's02', bAlt: 'Original stacked bar chart of adoption across twelve technologies', aAlt: 'Redesign slide 02: technology names filled in mint to their adoption rate', bLab: 'Report p.5', aLab: 'Slide 02' })}

        ${study('02', { before: 'Multiple employee sentiment percentages.', after: 'The resistance isn’t where you think.', from: 'Survey data', to: 'One human insight', cls: 'flip',
          why: '89% becomes the focal point, while the supporting figures orbit around it. Five equal statistics become one finding with context.',
          b: 'b04', a: 's03', bAlt: 'Original row of five equal statistics', aAlt: 'Redesign slide 03: 89% at the centre, four figures on an orbit', bLab: 'Report p.4', aLab: 'Slide 03' })}

        ${study('03', { before: 'Current usage vs willingness-to-use data.', after: 'Interest is not adoption.', from: 'Two data series', to: 'The adoption gap',
          why: 'Current use and future willingness become two points on one line. The connector stretches between NOW and READY, so the gap becomes a physical distance you can read.',
          b: 'b05-bot', a: 's04', bAlt: 'Original stacked bars of current use and willingness for nine use cases', aAlt: 'Redesign slide 04: connectors stretch from now to ready', bLab: 'Report p.5', aLab: 'Slide 04', extra: gapSvg })}

        <article class="ts ts-hero" id="tm-ba-04">
          <div class="ts-top rv">
            <span class="ts-n">04</span>
            <div><p class="tc-mk">Before</p><p class="ts-bt">Leadership sentiment shown as separate percentages.</p></div>
            <div><p class="tc-mk y">After</p><p class="ts-after">The technology is moving.<br><span>Leadership is lagging.</span></p></div>
          </div>
          <div class="pg rv" aria-label="Perception gap: 85% of senior leaders say they see the value. 48% of employees and managers believe they do not.">
            <div class="pg-l"><span class="pg-who">Senior leaders say</span><b><span data-count="85">85</span>%</b><span class="pg-say">“We see the value.”</span></div>
            <div class="pg-gap" aria-hidden="true"><i></i><span>Perception gap</span><i></i></div>
            <div class="pg-r"><span class="pg-who">Employees &amp; managers see</span><b><span data-count="48">48</span>%</b><span class="pg-say">“They don’t.”</span></div>
          </div>
          <div class="ts-wide rv">${ba('04', 'b07', 's05-gap', 'Original leadership page: paired percentages in a list', 'Redesign slide 05: split screen, 85% leaders against 48% employees, panels drifting apart', 'Report p.7', 'Slide 05', 38)}</div>
          <div class="ts-foot rv">
            <p class="ts-tr"><span>Statistics</span><i>→</i><span>Perception gap</span></p>
            <p class="ts-why">The report lists these figures in separate lines. Set side by side, the same two numbers become a contradiction. In the live slide the two panels slowly drift apart and open a yellow seam: the space where transformation can fail.</p>
          </div>
        </article>

        ${study('05', { before: 'Technology stack and people-related barriers treated as separate topics.', after: 'Transformation has two systems.', from: 'Two topics', to: 'One dependent system', cls: 'flip',
          why: 'A tech stack and a human stack sit on one beam. Weaken trust or behaviour and the whole system tilts. In the live slide every human layer is clickable.',
          b: 'b08', a: 's08-tilt', bAlt: 'Original barriers table by technology', aAlt: 'Redesign slide 08: tech stack and human stack on one beam, tilted because two human layers are weak', bLab: 'Report p.8', aLab: 'Slide 08' })}

        ${study('06', { before: 'The report asks whether the future of the tech stack is built on people.', after: 'The future of your tech stack is built underneath it.', from: 'Question', to: 'Visual answer',
          why: 'A detailed tech stack loses its bottom layer and becomes unstable. PEOPLE slides in underneath and the stack rebuilds: people, skills, trust, adoption, technology, value.',
          b: 'b01', a: 's09', bAlt: 'Original report cover with the question as its title', aAlt: 'Redesign slide 09: a stack rebuilt on people', bLab: 'Report cover', aLab: 'Slide 09' })}
      </div>
    </section>

    <!-- WHAT CHANGED -->
    <section class="tc-sec">
      <div class="wrap">
        <p class="tc-k rv"><span>03</span>What changed</p>
        <dl class="tc-wc rv">
          <div><dt>Structure</dt><dd>Technology categories<i>→</i><b>human adoption story</b></dd></div>
          <div><dt>Data</dt><dd>Survey percentages<i>→</i><b>visual tension</b></dd></div>
          <div><dt>Insight</dt><dd>Technology<i>→</i><b>behaviour</b></dd></div>
          <div><dt>Motion</dt><dd>Static report<i>→</i><b>progressive interaction</b></dd></div>
          <div><dt>Format</dt><dd>Research<i>→</i><b>interactive HTML experience</b></dd></div>
        </dl>
      </div>
    </section>

    <!-- LIVE PREVIEW -->
    <section class="tc-sec tc-xp">
      <div class="wrap">
        <p class="tc-k rv"><span>04</span>Live preview</p>
        <div class="tc-xp-head">
          <h2 class="tc-big sm rv">Experience<br><span>the adoption gap.</span></h2>
          <div class="rv d1">
            <p class="tc-p">The project was designed as an interactive sequence, not a static deck. Movement is used to reveal readiness, friction, perception gaps, system imbalance and human dependence.</p>
            ${liveBtn()}
          </div>
        </div>
        <div class="xp rv" data-xp="${LIVE}#s4">
          <div class="xp-bar"><span class="xp-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="xp-url">Tech-Moves-Fast_EY-Emerging-Tech-Reinterpretation.html</span><a href="${LIVE}" target="_blank" rel="noopener">Open full experience <i>↗</i></a></div>
          <div class="xp-view">
            <img class="xp-poster" src="${I('s04')}" alt="Slide 04 of the live presentation: the adoption gap" loading="lazy" decoding="async">
            <button class="xp-shield" type="button" aria-label="Interact with the live presentation preview"><span class="xp-cta">Click to interact</span><small>Arrow keys or the on-screen controls move through the slides</small></button>
            <a class="xp-mob" href="${LIVE}" target="_blank" rel="noopener"><span>Open live experience ↗</span><small>Best viewed in landscape</small></a>
          </div>
        </div>
        <p class="tc-cap rv">Live preview of the actual HTML file, opened at slide 04. The page keeps scrolling normally until you choose to interact.</p>
      </div>
    </section>

    <!-- BUILT TO RESPOND -->
    <section class="tc-sec">
      <div class="wrap">
        <p class="tc-k rv"><span>05</span>Interaction system</p>
        <h2 class="tc-big sm rv">Built to respond.</h2>
        <div class="tr">
          ${[
            [['c-net', 'Signal', 'Node network', 'Nodes switch on only near a person.', .89], ['c-field', 'Signal', 'Adoption field', 'Each word fills to its adoption rate.', 2.33]],
            [['c-gap', 'Gap', 'Gap connectors', 'Ready dots stretch away from now.', 1.12], ['c-split', 'Perception', 'Perception split', 'Two panels drift apart.', 2.53]],
            [['c-barrier', 'Interaction', 'Interactive barriers', 'Pick a technology. The forces resize to its data.', 1.14], ['c-stack', 'Stack', 'Tech / human stack', 'Weaken a human layer. The system tilts.', 1.97]],
            [['c-fall', 'Foundation', 'Foundation rebuild', 'Remove the base. Rebuild on people.', 1.08], ['c-ctrl', 'Interaction', 'Slide controls', 'Step builds, replay, fullscreen, keyboard.', 2.2, 'ctl']]
          ].map(row => `<div class="tr-row">${row.map(([img, lab, t, d, ar, cls], k) => `<figure class="tr-i ${cls || ''} rv${k ? ' d1' : ''}" style="--ar:${ar}"><span class="tr-v">${pic(img, '', '(max-width:900px) 92vw, 50vw')}</span><figcaption><span class="tr-lab">${lab}</span><b>${t}</b>${d}</figcaption></figure>`).join('')}</div>`).join('')}
        </div>
      </div>
    </section>

    <!-- END -->
    <section class="tc-end">
      <div class="tc-end-bg" aria-hidden="true">${pic('s10', '', '100vw')}</div>
      <div class="wrap">
        <p class="tc-big rv">You can buy<br>the technology.</p>
        <p class="tc-big rv d1">You can’t buy<br><span class="y">adoption.</span></p>
        <p class="tc-big y tc-final rv d2">Build the people<br>who make it work.</p>
        <p class="tc-small rv">10-slide interactive experience</p>
        <div class="tc-end-act rv">${liveBtn('lg')}<button class="tm-next" type="button" data-goto="${nextIdx}"><span>Next project</span><i aria-hidden="true">→</i><small>${next.title}</small></button></div>
        <p class="tc-disc rv">Independent presentation redesign based on publicly available EY Emerging Tech at Work research. Not commissioned by or affiliated with EY.</p>
      </div>
    </section>
  </article>`;


  /* ---------------- TRANSFORMATION STUDIES: series index + study 03 ---------------- */
  const tfSeries = () => `
    <ol class="tsr" aria-label="Three kinds of transformation">
      <li><a href="powerpoint-rebuilt.html"><span class="n">01 · PowerPoint</span><b>Corporate deck <i>→</i> clearer business story</b><span class="x">From Complexity to Control</span></a></li>
      <li><a href="#/work/sys" data-open="sys"><span class="n">02 · Research <i>→</i> interactive</span><b>Trend report <i>→</i> one connected system</b><span class="x">The System Is Waking Up</span></a></li>
      <li class="t"><a href="#/work/tmf" data-open="tmf" data-tmf-jump><span class="n">03 · Report <i>→</i> human-centered interactive</span><b>Many technologies <i>→</i> one human question</b><span class="x">Tech Moves Fast</span></a></li>
    </ol>`;
  const tfStudy = () => `
    <article class="tsx" aria-label="Transformation study 03: Tech Moves Fast">
      <div class="tsx-bar"><span class="k">03 · Report → human-centered interactive story</span><span>EY Emerging Tech at Work 2023 · research report → 10-slide interactive HTML</span></div>
      <h3 class="tsx-line"><span>Many technologies</span><i aria-hidden="true">→</i><span class="y">One human question</span></h3>
      <div class="tsx-grid">
        <div class="tsx-before">
          <p class="tc-mk">Before</p>
          <p class="tsx-t">A conventional emerging-technology research report</p>
          <ul><li>multiple technology categories</li><li>statistics</li><li>adoption data</li><li>employee sentiment</li><li>leadership findings</li><li>barriers</li><li>cybersecurity concerns</li></ul>
          <p class="tc-mk y">After</p>
          <p class="tc-after">Tech moves fast.<br><span>People decide if it lands.</span></p>
        </div>
        <div class="tsx-vis">${ba('h0', 'b06', 's01', 'Original EY report page: twelve technologies charted as established, emerging or futuristic', 'Redesign slide 01: a person activating the technology network', 'Report p.6', 'Slide 01', 42)}<p class="tb-hint">Drag to compare</p></div>
      </div>
      <ol class="tsx-moves" aria-label="Six restructuring moves">
        ${[['Percentages', 'Activation field', 's02'], ['Survey data', 'One human insight', 's03'], ['Two data series', 'The adoption gap', 's04'], ['Statistics', 'Perception gap', 's05-gap'], ['Two topics', 'One dependent system', 's08-tilt'], ['Question', 'Visual answer', 's09']]
          .map(([a, b, img], k) => `<li${k === 3 ? ' class="hot"' : ''}><a href="#/work/tmf" data-open="tmf" data-tmf-jump><span class="th"><img src="${I(img, 1)}" alt="" loading="lazy" decoding="async"></span><span class="mv"><i>0${k + 1}</i>${a}<em>→</em><b>${b}</b></span></a></li>`).join('')}
      </ol>
      <div class="tsx-foot">
        <a class="tm-go" href="#/work/tmf" data-open="tmf" data-tmf-jump><span>View the transformation</span><i aria-hidden="true">→</i></a>
        ${liveBtn()}
        <p class="tm-disc">Independent presentation redesign based on publicly available EY Emerging Tech at Work research. Not commissioned by or affiliated with EY.</p>
      </div>
    </article>`;
  const initTf = root => {
    root.querySelectorAll('.tsx [data-ba]').forEach(el => { const inp = el.querySelector('input'); const set = () => el.style.setProperty('--x', inp.value + '%'); inp.addEventListener('input', set); set(); });
    io([...root.querySelectorAll('.tsx, .tsr')], null, 'in', '0px 0px -12% 0px');
  };

  /* ---------------- CASE BEHAVIOUR ---------------- */
  const init = (cb, cs) => {
    const root = cb.querySelector('.tmc'); if (!root) return;
    // before/after sliders
    root.querySelectorAll('[data-ba]').forEach(el => {
      const inp = el.querySelector('input');
      const set = () => el.style.setProperty('--x', inp.value + '%');
      inp.addEventListener('input', set); set();
    });
    // count-up for the perception gap
    const cnt = [...root.querySelectorAll('[data-count]')];
    const run = el => { const to = +el.dataset.count; if (RM) { el.textContent = to; return; } const t0 = performance.now(); const f = now => { const p = Math.min(1, (now - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
    const pg = root.querySelector('.pg');
    if (pg) { cnt.forEach(c => { if (!RM) c.textContent = '0'; }); io([pg], cs, 'go'); const mo = new MutationObserver(() => { if (pg.classList.contains('go')) { cnt.forEach(run); mo.disconnect(); } }); mo.observe(pg, { attributes: true }); if (RM) cnt.forEach(run); }
    io([...root.querySelectorAll('.ts-gap')], cs, 'go');
    // live iframe: desktop only, loads near the viewport, shield keeps scrolling until clicked
    const fr = root.querySelector('.xp');
    if (fr) {
      const view = fr.querySelector('.xp-view'), shield = fr.querySelector('.xp-shield');
      if (!matchMedia('(min-width: 900px) and (hover: hover)').matches) fr.classList.add('static');
      else {
        let ifr = null;
        const load = () => { if (ifr) return; ifr = document.createElement('iframe'); ifr.title = 'Tech Moves Fast, live presentation preview'; ifr.setAttribute('tabindex', '-1'); ifr.setAttribute('allow', 'fullscreen'); ifr.addEventListener('load', () => fr.classList.add('loaded')); ifr.src = fr.dataset.xp; view.insertBefore(ifr, shield); };
        const o = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { load(); o.disconnect(); } }, { root: cs, rootMargin: '500px 0px' });
        o.observe(fr);
        shield.addEventListener('click', () => { load(); fr.classList.add('live'); ifr.setAttribute('tabindex', '0'); ifr.focus(); });
        fr.addEventListener('pointerleave', () => { if (!fr.classList.contains('live')) return; fr.classList.remove('live'); ifr && ifr.setAttribute('tabindex', '-1'); });
      }
    }
    // arrived from Transformation studies: jump to the before → after section
    if (window.__tmfJump) { window.__tmfJump = false; setTimeout(() => { const t = root.querySelector('#tm-ba'); t && cs.scrollTo({ top: t.offsetTop - 68, behavior: RM ? 'auto' : 'smooth' }); }, 350); }
  };
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-tmf-jump]')) window.__tmfJump = true; }, true);

  window.TMF = { card, initCard, page, init, tfSeries, tfStudy, initTf, LIVE };
})();
