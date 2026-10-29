/* Email Campaigns · page layer (chapters) + PASHA Malls chapter. Vanilla JS, no dependencies.
   The TISA chapter is driven by case-tisa.js, unchanged. The PASHA email comes from case-pasha-data.js and is
   rendered in sandboxed iframes (srcdoc, no scripts): the email itself stays email-safe, and every interaction
   lives in this page. */
(function () {
  "use strict";
  var doc = document, win = window;
  var reduce = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EMAIL = win.PM_EMAIL || "", MK = win.PM_MARKETS || [];
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

  /* ================= PASHA · EMAIL FRAMES ================= */
  function loadEmail(frame, cb) {
    if (frame.dataset.loaded) { if (cb) cb(); return; }
    frame.addEventListener("load", function once() {
      frame.removeEventListener("load", once);
      frame.dataset.loaded = "1";
      if (cb) cb();
    });
    frame.srcdoc = EMAIL;
  }
  function settle(frame) { void frame.offsetWidth; try { void frame.contentDocument.documentElement.offsetHeight; } catch (e) {} }
  function docH(frame) { try { return frame.contentDocument.documentElement.scrollHeight; } catch (e) { return 5000; } }
  function secY(frame, n) {
    try {
      var d = frame.contentDocument, e = d.getElementById("pm-s" + n);
      if (!e) return 0;
      return e.getBoundingClientRect().top + (d.defaultView.pageYOffset || 0);
    } catch (e) { return 0; }
  }

  var SECTIONS = [
    { t: "Executive Overview", d: "The month in one headline and three numbers. Written so the first paragraph could be the whole briefing.", key: true },
    { t: "Retail Landscape", d: "All eight markets in one table: the kind of month each had, brands in, brands out, openings next." },
    { t: "New Arrivals", d: "A selection of brands entering malls, chosen for what they say about a market rather than for size." },
    { t: "Departures & Closures", d: "Every exit with its reason, so a planned consolidation never reads like a failure." },
    { t: "Market Movements", d: "Net change per market as a simple bar chart, built to render in any inbox." },
    { t: "Looking Ahead", d: "Confirmed openings and signed developments, ordered by when they land." },
    { t: "Executive Summary", d: "Three points to take into the next meeting. The last thing read, and often the only thing.", key: true }
  ];

  /* ================= PASHA · INBOX ================= */
  var inbox = $("[data-pm-inbox]");
  var peek = $("[data-pm-peek]"), empty = $("[data-pm-empty]"), peekFrame = $("[data-pm-peekframe]"), peekWin = $(".xin__peekwin");
  var newRow = $("[data-pm-new]"), count = $("[data-pm-count]");
  function sizePeek() {
    if (!peekFrame.dataset.loaded) return;
    var s = peekWin.clientWidth / 640;
    peekFrame.style.transform = "scale(" + s + ")";
  }
  function playInbox() {
    if (inbox.dataset.played) return;
    inbox.dataset.played = "1";
    var show = function () {
      count.textContent = "1";
      loadEmail(peekFrame, function () {
        sizePeek();
        empty.style.opacity = "0";
        peek.hidden = false;
        requestAnimationFrame(function () { peek.classList.add("is-on"); });
        newRow.classList.add("is-sel");
      });
    };
    if (reduce) { inbox.classList.add("is-p1", "is-p2", "is-p3"); show(); return; }
    setTimeout(function () { inbox.classList.add("is-p1"); }, 500);
    setTimeout(function () { inbox.classList.add("is-p2"); show(); }, 1500);
    setTimeout(function () { inbox.classList.add("is-p3"); }, 4200);
  }
  if ("IntersectionObserver" in win) {
    var iio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { playInbox(); iio.disconnect(); } }, { threshold: .35 });
    iio.observe(inbox);
  } else playInbox();
  win.addEventListener("resize", sizePeek);

  /* ================= PASHA · READER ================= */
  var reader = $("[data-pm-reader]"), rFrame = $("[data-pm-frame]"), rWin = $("[data-pm-win]"), rDev = $("[data-pm-dev]"),
    rScroll = $("[data-pm-scroll]"), rStage = $("[data-pm-stage]"), toc = $("[data-pm-toc]"), fullBtn = $("[data-pm-full]");
  var rs = { view: win.innerWidth < 640 ? "mobile" : "desktop", open: false, origin: null, lastFocus: null, sec: 0 };
  if (!doc.fullscreenEnabled) fullBtn.hidden = true;
  function syncViewButtons() {
    $$("[data-pm-view]").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.pmView === rs.view ? "true" : "false"); });
    rDev.classList.toggle("is-mobile", rs.view === "mobile");
  }
  syncViewButtons();

  toc.appendChild(el("p", null, "In this issue"));
  var tocBtns = SECTIONS.map(function (s, i) {
    var b = el("button", "toc__b", "<span>0" + (i + 1) + "</span>" + s.t.replace("&", "&amp;"));
    b.type = "button";
    b.addEventListener("click", function () { goSection(i + 1, true); });
    toc.appendChild(b);
    return b;
  });
  function markSection(n) {
    if (n === rs.sec) return;
    rs.sec = n;
    tocBtns.forEach(function (b, i) {
      if (i + 1 === n) { b.setAttribute("aria-current", "true"); if (win.innerWidth <= 980) b.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); }
      else b.removeAttribute("aria-current");
    });
  }
  function stageTop() { return rStage.getBoundingClientRect().top - rScroll.getBoundingClientRect().top + rScroll.scrollTop; }
  function scale() { return rs.view === "desktop" ? Math.min(640, rStage.clientWidth) / 640 : 1; }
  function sizeReader() {
    if (!rFrame.dataset.loaded) return;
    if (rs.view === "desktop") {
      var s = scale();
      rFrame.style.width = "640px";
      settle(rFrame);
      var h = docH(rFrame);
      rFrame.style.height = h + "px";
      rFrame.style.transform = "scale(" + s + ")";
      rWin.style.height = Math.ceil(h * s) + "px";
      rFrame.setAttribute("scrolling", "no");
    } else {
      rFrame.style.width = win.innerWidth < 640 ? "100%" : "375px";
      rFrame.style.height = "100%";
      rFrame.style.transform = "none";
      rWin.style.height = "";
      settle(rFrame);
      rFrame.setAttribute("scrolling", "yes");
    }
  }
  function goSection(n, smooth) {
    var beh = smooth && !reduce ? "smooth" : "auto";
    if (rs.view === "desktop") {
      var y = n ? stageTop() + secY(rFrame, n) * scale() - 8 : 0;
      rScroll.scrollTo({ top: Math.max(0, y), behavior: beh });
    } else {
      rScroll.scrollTo({ top: 0, behavior: beh });
      try { rFrame.contentWindow.scrollTo({ top: n ? Math.max(0, secY(rFrame, n) - 8) : 0, behavior: beh }); } catch (e) {}
    }
    if (n) markSection(n);
  }
  function spy() {
    if (!rs.open || !rFrame.dataset.loaded) return;
    var pos, n = 0, i;
    if (rs.view === "desktop") {
      pos = (rScroll.scrollTop - stageTop() + rScroll.clientHeight * .3) / scale();
    } else {
      try { pos = rFrame.contentWindow.pageYOffset + rFrame.clientHeight * .3; } catch (e) { pos = 0; }
    }
    for (i = 1; i <= 7; i++) if (secY(rFrame, i) <= pos) n = i;
    markSection(n || 1);
  }
  rScroll.addEventListener("scroll", spy, { passive: true });
  function bindFrameScroll() {
    try { rFrame.contentWindow.addEventListener("scroll", spy, { passive: true }); } catch (e) {}
  }
  function rectClip(r) {
    var vw = win.innerWidth, vh = win.innerHeight;
    return "inset(" + Math.max(0, r.top) + "px " + Math.max(0, vw - r.right) + "px " + Math.max(0, vh - r.bottom) + "px " + Math.max(0, r.left) + "px round 10px)";
  }
  function openReader(originEl, section) {
    if (rs.open) { if (section) goSection(section, true); return; }
    rs.origin = originEl || null;
    rs.lastFocus = doc.activeElement;
    rs.sec = 0;
    reader.hidden = false;
    reader.classList.remove("is-open");
    doc.body.classList.add("tx-lock");
    newRow.classList.add("is-read");
    count.textContent = "0";
    var after = function () {
      bindFrameScroll();
      sizeReader();
      requestAnimationFrame(function () { goSection(section || 0, false); if (!section) markSection(1); });
    };
    if (rFrame.dataset.loaded) after(); else loadEmail(rFrame, after);
    if (!reduce && originEl) {
      reader.classList.remove("is-anim");
      reader.style.clipPath = rectClip(originEl.getBoundingClientRect());
      void reader.offsetWidth;
      reader.classList.add("is-anim");
      reader.style.clipPath = "inset(0 0 0 0 round 0px)";
    } else reader.style.clipPath = "";
    requestAnimationFrame(function () { requestAnimationFrame(function () { reader.classList.add("is-open"); }); });
    rs.open = true;
    setTimeout(function () { $("[data-pm-close]").focus({ preventScroll: true }); }, 60);
  }
  function closeReader() {
    if (!rs.open) return;
    rs.open = false;
    if (doc.fullscreenElement) doc.exitFullscreen().catch(function () {});
    var o = rs.origin, done = function () {
      reader.hidden = true;
      reader.classList.remove("is-anim", "is-open");
      reader.style.clipPath = "";
      doc.body.classList.remove("tx-lock");
      if (rs.lastFocus && rs.lastFocus.focus) rs.lastFocus.focus({ preventScroll: true });
    };
    if (!reduce && o && o.isConnected) {
      var r = o.getBoundingClientRect();
      if (r.bottom > 0 && r.top < win.innerHeight) {
        reader.classList.add("is-anim");
        reader.style.clipPath = rectClip(r);
        setTimeout(done, 800);
        return;
      }
    }
    done();
  }
  $$("[data-pm-open]").forEach(function (b) {
    b.addEventListener("click", function () { openReader($("[data-pm-pane]")); });
  });
  $$("[data-pm-close]").forEach(function (b) { b.addEventListener("click", closeReader); });
  fullBtn.addEventListener("click", function () {
    if (doc.fullscreenElement) doc.exitFullscreen(); else reader.requestFullscreen().catch(function () {});
  });
  $$("[data-pm-view]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (rs.view === b.dataset.pmView) return;
      var keep = rs.sec || 1;
      rs.view = b.dataset.pmView;
      rDev.classList.add("is-swap");
      setTimeout(function () {
        syncViewButtons();
        sizeReader();
        setTimeout(function () { rDev.classList.remove("is-swap"); goSection(keep, false); }, reduce ? 0 : 300);
      }, reduce ? 0 : 220);
    });
  });
  win.addEventListener("resize", function () { if (rs.open) sizeReader(); });
  doc.addEventListener("keydown", function (e) {
    if (!rs.open) return;
    if (e.key === "Escape" && !doc.fullscreenElement) { e.preventDefault(); closeReader(); }
    if (e.key === "Tab") {
      var f = $$("button:not([disabled]):not([hidden]), iframe", reader).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ================= PASHA · ANATOMY ================= */
  var anat = $("[data-pm-anat]");
  SECTIONS.forEach(function (s, i) {
    var li = el("li", "anat__row ec-up" + (s.key ? " anat__row--key" : ""));
    var b = el("button", "anat__btn",
      '<span class="anat__n">0' + (i + 1) + '</span><span class="anat__t"></span><span class="anat__d"></span>' +
      '<span class="anat__go">Open in the briefing<i aria-hidden="true">→</i></span>');
    b.type = "button";
    b.querySelector(".anat__t").textContent = s.t;
    b.querySelector(".anat__d").textContent = s.d;
    b.setAttribute("aria-label", "Open the briefing at section " + (i + 1) + ", " + s.t);
    b.addEventListener("click", function () { openReader(li, i + 1); });
    li.appendChild(b);
    anat.appendChild(li);
    if (!reduce && "IntersectionObserver" in win) {
      li.style.transitionDelay = (i * 50) + "ms";
      uio.observe(li);
    } else li.classList.add("is-in");
  });

  /* ================= PASHA · LANDSCAPE EXPLORER ================= */
  var tiles = $("[data-pm-tiles]"), panel = $("[data-pm-panel]"), land = $("[data-pm-land]");
  var sel = -1, auto = null, touched = false;
  function netOf(m) { return m.arrivals - m.departures; }
  function fmt(n) { return n > 0 ? "+" + n : String(n); }
  var SAY = {
    A: "A growing market: new brands well ahead of exits, and a new wing in early leasing.",
    B: "Balanced: as many brands in as out. One tenant change already has a successor.",
    C: "The strongest month: seven arrivals, including a first store in the market.",
    D: "Repositioning: more exits than arrivals, most of them planned consolidations.",
    E: "Steady growth, helped by a relocation in from the high street.",
    F: "Consolidating: a quiet month with no confirmed openings yet.",
    G: "Pipeline-heavy: the most confirmed openings for the months ahead.",
    H: "Early stage: small numbers, with an entertainment anchor approved."
  };
  var tileBtns = MK.map(function (m, i) {
    var n = netOf(m);
    var b = el("button", "tile",
      '<span class="tile__code">Market<b>' + m.code + '</b></span>' +
      '<span class="tile__ch">' + m.character + '</span>' +
      '<span class="tile__net ' + (n > 0 ? "is-up" : n < 0 ? "is-down" : "is-flat") + '">' + fmt(n) + '</span>');
    b.type = "button";
    b.setAttribute("role", "tab");
    b.id = "pm-tile-" + m.code;
    b.setAttribute("aria-label", "Market " + m.code + ", " + m.character + ", net " + fmt(n));
    b.addEventListener("click", function () { touched = true; stopAuto(); select(i); });
    b.addEventListener("keydown", function (e) {
      var k = e.key, j = -1;
      if (k === "ArrowRight" || k === "ArrowDown") j = (i + 1) % MK.length;
      if (k === "ArrowLeft" || k === "ArrowUp") j = (i - 1 + MK.length) % MK.length;
      if (j >= 0) { e.preventDefault(); touched = true; stopAuto(); select(j); tileBtns[j].focus(); }
    });
    tiles.appendChild(b);
    return b;
  });
  function dots(n, cls) { var s = ""; for (var i = 0; i < n; i++) s += "<i></i>"; return '<span class="lp__dots ' + cls + '">' + s + "</span>"; }
  function select(i) {
    if (i === sel) return;
    sel = i;
    var m = MK[i];
    tileBtns.forEach(function (b, j) {
      b.setAttribute("aria-selected", j === i ? "true" : "false");
      b.tabIndex = j === i ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", "pm-tile-" + m.code);
    panel.innerHTML =
      '<div class="lp__fade" style="display:flex;flex-direction:column;height:100%">' +
      '<p class="lp__k">Sample market · this month</p>' +
      '<p class="lp__t">Market ' + m.code + '</p>' +
      '<p class="lp__ch">' + m.character + ', net ' + fmt(netOf(m)) + '</p>' +
      '<div class="lp__rows">' +
      '<div class="lp__row"><span class="lp__lab">Arrivals</span>' + dots(m.arrivals, "lp__dots--in") + '<span class="lp__v">' + m.arrivals + '</span></div>' +
      '<div class="lp__row"><span class="lp__lab">Departures</span>' + dots(m.departures, "lp__dots--out") + '<span class="lp__v" style="color:var(--pm-claret)">' + m.departures + '</span></div>' +
      '<div class="lp__row"><span class="lp__lab">Opening next</span>' + dots(m.upcoming, "lp__dots--next") + '<span class="lp__v">' + m.upcoming + '</span></div>' +
      '</div>' +
      '<p class="lp__s">' + (SAY[m.code] || "") + '</p></div>';
    $$(".lp__dots", panel).forEach(function (d) {
      $$("i", d).forEach(function (x, k) { x.style.transitionDelay = (k * 45) + "ms"; });
      requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add("is-in"); }); });
    });
    $$(".mv__row").forEach(function (r, j) { r.classList.toggle("is-hl", j === i); });
  }
  function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
  function startAuto() {
    if (reduce || touched || auto) return;
    auto = setInterval(function () { select((sel + 1) % MK.length); }, 3200);
  }
  land.addEventListener("pointerenter", stopAuto);
  land.addEventListener("pointerleave", function () { if (!touched) startAuto(); });
  land.addEventListener("focusin", stopAuto);
  if (MK.length) select(2);
  if ("IntersectionObserver" in win) {
    new IntersectionObserver(function (en) { if (en[0].isIntersecting) startAuto(); else stopAuto(); }, { threshold: .4 }).observe(land);
  }

  /* market movements */
  var mv = $("[data-pm-mv]"), chart = $("[data-pm-mvchart]");
  var mx = Math.max.apply(null, MK.map(function (m) { return Math.abs(netOf(m)); }).concat([1]));
  MK.forEach(function (m, i) {
    var n = netOf(m);
    var r = el("div", "mv__row",
      '<span class="mv__name">Market ' + m.code + '</span>' +
      '<span class="mv__neg">' + (n < 0 ? '<i style="width:' + (Math.abs(n) / mx * 100) + '%;transition-delay:' + (i * 70) + 'ms"></i>' : '') + '</span>' +
      '<span class="mv__pos">' + (n > 0 ? '<i style="width:' + (n / mx * 100) + '%;transition-delay:' + (i * 70) + 'ms"></i>' : '') + '</span>' +
      '<span class="mv__val" style="color:' + (n > 0 ? "var(--pm-ink)" : n < 0 ? "var(--pm-claret)" : "var(--ink-3)") + '">' + fmt(n) + '</span>' +
      '<span class="mv__det"><span>' + m.arrivals + ' in</span><span>' + m.departures + ' out</span><span>' + m.upcoming + ' next</span></span>');
    r.tabIndex = 0;
    r.setAttribute("aria-label", "Market " + m.code + ": " + m.arrivals + " arrivals, " + m.departures + " departures, net " + fmt(n));
    r.addEventListener("click", function () { touched = true; stopAuto(); select(i); });
    chart.appendChild(r);
  });
  if (!reduce && "IntersectionObserver" in win) {
    var mio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { mv.classList.add("is-in"); mio.disconnect(); } }, { threshold: .3 });
    mio.observe(mv);
  } else mv.classList.add("is-in");
  if (sel >= 0) $$(".mv__row").forEach(function (r, j) { r.classList.toggle("is-hl", j === sel); });

  /* ================= ARTİ + NARGIS · EMAIL VIEWERS =================
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
