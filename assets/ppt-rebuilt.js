/* PowerPoint, Rebuilt · reveal on scroll + before/after sliders */
(() => {
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  document.querySelectorAll('.rv, .mega').forEach(el => io ? io.observe(el) : el.classList.add('in'));
  requestAnimationFrame(() => document.querySelector('.mega')?.classList.add('in'));

  document.querySelectorAll('.ba').forEach(ba => {
    const r = ba.querySelector('.ba-range');
    const set = v => ba.style.setProperty('--p', v + '%');
    set(ba.dataset.start || r.value);
    r.addEventListener('input', () => set(r.value));
    // a gentle hint on first view: sweep from the start value to 70% and back
    let hinted = false;
    if (io && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const o = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting || hinted) return;
        hinted = true; o.disconnect();
        const a = +r.value, b = 72, t0 = performance.now(), D = 1600;
        const step = t => {
          const k = Math.min(1, (t - t0) / D), s = Math.sin(k * Math.PI);
          const v = a + (b - a) * s; r.value = v; set(v);
          if (k < 1 && !ba.dataset.touched) requestAnimationFrame(step); else if (!ba.dataset.touched) { r.value = a; set(a); }
        };
        setTimeout(() => requestAnimationFrame(step), 500);
      }, { threshold: 0.6 });
      o.observe(ba);
    }
    r.addEventListener('pointerdown', () => { ba.dataset.touched = 1; });
  });
})();
