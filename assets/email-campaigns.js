/* Email Campaigns · page layer (chapters) + email viewers for PASHA Malls, ARTİ and NARGIS. Vanilla JS, no dependencies.
   The TISA chapter is driven by case-tisa.js, unchanged. The other chapters show full-length renders of each HTML email
   in a scrolling window, with a Desktop/Mobile switch and a full-email overlay. */
(function () {
  "use strict";
  var doc = document, win = window;
  var reduce = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = doc.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* ================= REVEALS ================= */
  var ups = $$(".ec-up, .ec-intro");
  if (!reduce && "IntersectionObserver" in win) {
    var uio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("is-in"); uio.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
    ups.forEach(function (e, i) { e.style.transitionDelay = e.classList.contains("ec-up") ? (Math.min(i % 6, 5) * 60) + "ms" : ""; uio.observe(e); });
  } else ups.forEach(function (e) { e.classList.add("is-in"); });

  /* ================= CHAPTER NAV + PROGRESS ================= */
  var nav = $$("[data-ec-nav]"), bar = $("[data-ec-bar]"), prog = $("[data-ec-progress]");
  var chapters = ["tisa", "pasha", "arti", "nargis"].map(function (id) { return doc.getElementById(id); }).filter(Boolean);
  var current = null;
  function setChapter(id) {
    if (id === current) return;
    current = id;
    nav.forEach(function (a) {
      var on = a.dataset.ecNav === id;
      a.classList.toggle("is-on", on);
      if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    var on = nav.filter(function (a) { return a.dataset.ecNav === id; })[0];
    if (on) {
      bar.style.left = (on.offsetLeft + 12) + "px";
      bar.style.width = (on.offsetWidth - 24) + "px";
      bar.classList.add("is-on");
    } else bar.classList.remove("is-on");
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = win.scrollY + win.innerHeight * .4;
      var id = null;
      chapters.forEach(function (c) { if (y >= c.getBoundingClientRect().top + win.scrollY) id = c.id; });
      setChapter(id);
      var max = doc.documentElement.scrollHeight - win.innerHeight;
      prog.style.transform = "scaleX(" + (max > 0 ? Math.min(1, win.scrollY / max) : 0) + ")";
    });
  }
  win.addEventListener("scroll", onScroll, { passive: true });
  win.addEventListener("resize", function () { current = null; onScroll(); });
  onScroll();

  /* ================= PASHA + ARTİ + NARGIS · EMAIL VIEWERS =================
     Each [data-ev] holds two full-length renders of the HTML email (desktop 680 px, mobile 375 px, both 2x). */
  var evx = $("[data-evx]"), evxImg = $("[data-evx-img]"), evxScroll = $("[data-evx-scroll]"), evxCur = null, evxBack = null;
  function evSrc(v, m) { return { src: v.dataset[m === "m" ? "evM" : "evD"], w: m === "m" ? 375 : 680, h: Math.round(+v.dataset[m === "m" ? "evMh" : "evDh"] / 2) }; }
  function press(btns, attr, m) { btns.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute(attr) === m ? "true" : "false"); }); }
  function evxMode(m) {
    var r = evSrc(evxCur, m);
    evx.classList.toggle("is-m", m === "m");
    evxImg.src = r.src; evxImg.width = r.w; evxImg.height = r.h;
    evxImg.alt = evxCur.dataset.evName + ", full email, " + (m === "m" ? "mobile" : "desktop") + " width";
    press($$("[data-evx-mode]"), "data-evx-mode", m);
    evxScroll.scrollTop = 0;
  }
  function evxClose() {
    evx.hidden = true; doc.documentElement.style.overflow = "";
    if (evxBack) evxBack.focus();
  }
  $$("[data-ev]").forEach(function (v) {
    var winEl = $("[data-ev-win]", v), img = $("[data-ev-img]", v), btns = $$("[data-ev-mode]", v), mode = "d";
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        mode = b.dataset.evMode;
        var r = evSrc(v, mode);
        img.src = r.src; img.width = r.w; img.height = r.h;
        img.alt = img.alt.replace(/(desktop|mobile) width$/, mode === "m" ? "mobile width" : "desktop width");
        winEl.classList.toggle("is-m", mode === "m");
        winEl.scrollTop = 0;
        press(btns, "data-ev-mode", mode);
      });
    });
    /* on a phone, open on the mobile render: it is the readable one at that width */
    if (win.matchMedia("(max-width: 600px)").matches) btns.filter(function (b) { return b.dataset.evMode === "m"; })[0].click();
    $("[data-ev-full]", v).addEventListener("click", function (e) {
      evxCur = v; evxBack = e.currentTarget;
      $("[data-evx-t]").textContent = v.dataset.evName;
      evx.hidden = false; doc.documentElement.style.overflow = "hidden";
      evxMode(mode);
      $("[data-evx-close]", evx).focus();
    });
  });
  if (evx) {
    $$("[data-evx-mode]").forEach(function (b) { b.addEventListener("click", function () { evxMode(b.dataset.evxMode); }); });
    $$("[data-evx-close]").forEach(function (b) { b.addEventListener("click", evxClose); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && !evx.hidden) evxClose(); });
  }

  /* ================= SMOOTH CHAPTER JUMPS ================= */
  $$("[data-ec-jump]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var t = doc.getElementById(a.dataset.ecJump);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#" + a.dataset.ecJump);
    });
  });
})();
