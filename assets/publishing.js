(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* intro */
  requestAnimationFrame(() => setTimeout(() => $('.intro')?.classList.add('on'), 60));

  /* reveal */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px', threshold: .01 });
  const els = $$('.rv,.settle,.zoom,.end');
  if (RM) els.forEach(el => el.classList.add('in')); else els.forEach(el => io.observe(el));

  /* annotation markers <-> legend */
  $$('[data-anno]').forEach(box => {
    const set = (k, on) => $$(`[data-k="${k}"]`, box).forEach(el => el.classList.toggle('on', on));
    $$('[data-k]', box).forEach(el => {
      const k = el.dataset.k;
      el.addEventListener('mouseenter', () => set(k, true));
      el.addEventListener('mouseleave', () => set(k, false));
      el.addEventListener('focus', () => set(k, true));
      el.addEventListener('blur', () => set(k, false));
    });
  });

  /* page-edge stack under 148,050 fills as you scroll through */
  const edges = $('#edges'), scale = $('#scale');
  if (edges && scale) {
    const upd = () => {
      const r = scale.getBoundingClientRect(), vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * .2)));
      const v = (RM ? 100 : Math.round(p * 100)) + '%';
      edges.style.webkitMaskImage = edges.style.maskImage = `linear-gradient(90deg,#000 0,#000 ${v},transparent ${v})`;
    };
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  }

  /* fit 148,050 to the full measure */
  const num = $('#num');
  if (num) {
    const fit = () => {
      num.style.fontSize = '';
      const ps = getComputedStyle(num.parentElement), w = num.parentElement.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight), s = num.getBoundingClientRect().width;
      if (s) num.style.fontSize = (parseFloat(getComputedStyle(num).fontSize) * w / s * .995) + 'px';
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
    addEventListener('resize', fit);
  }

  /* AZ / RU wipe */
  const w = $('#wipe');
  if (w) {
    const inp = $('input', w);
    inp.addEventListener('input', () => w.style.setProperty('--p', inp.value + '%'));
  }

  /* folio counter */
  const fol = $('#folio'), fN = $('#folioN');
  const secs = $$('[data-folio]');
  const fo = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      fN.textContent = e.target.dataset.folio;
      fol.classList.toggle('dark', e.target.classList.contains('loc'));
    }
  }), { rootMargin: '-50% 0px -50% 0px' });
  secs.forEach(s => fo.observe(s));

  /* lightbox for spreads */
  const lb = $('#lb'), lbImg = $('#lbImg');
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  $$('[data-lb]').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Open spread at full size');
    const open = () => {
      lbImg.src = el.dataset.lb;
      lbImg.alt = $('img', el)?.alt || '';
      lb.classList.add('open'); lb.scrollTop = 0; document.body.style.overflow = 'hidden';
    };
    el.addEventListener('click', open);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
  lbImg.addEventListener('click', close);
  $('#lbX').addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
