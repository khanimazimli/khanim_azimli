/* TISA · E-mail Campaigns ("You've got mail"). Vanilla JS, no dependencies.
   Email HTML comes from case-tisa-data.js (generated from the original newsletter) and is rendered in
   sandboxed iframes via srcdoc: no scripts run inside, links cannot navigate the page, and the page can
   measure the email (same origin) to scroll, crop and highlight its real sections. */
(function () {
  "use strict";
  var doc = document, win = window;
  doc.documentElement.classList.add("js-tx");
  var reduce = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var EMAIL = win.TISA_EMAIL, CODE = win.TISA_CODE, RESP = win.TISA_RESP, FACTS = win.TISA_FACTS || {};
  var R = "assets/case-tisa/";
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = doc.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function pad(n) { return String(n).padStart(2, "0"); }

  /* ---------- content ---------- */
  var STORIES = [
    { id: "issue", cat: "Weekly Newsletters", title: "TISA Weekly Look Ahead", date: "27 August 2021", size: "xl",
      img: R + "renders/d-header.webp", w: 1200, h: 1600,
      d: "The full Friday issue: sixteen sections, from the Director's message to the community corner.",
      peek: "<b>Open the issue</b> at full length, in its original HTML.", target: null },
    { id: "back-to-school", cat: "School Events", title: "Back to School Nights", size: "l", drop: true, wide: true,
      img: R + "thumbs/back-to-school.webp", w: 1000, h: 659,
      d: "Three evenings, one for each school division, set as a single graphic under the Director's message.",
      peek: "<b>Opens at</b> the announcement, inside the issue.", target: { img: "Untitled-171" } },
    { id: "distance", cat: "Special Announcements", title: "Distance Learning Page", size: "m", wide: true,
      img: R + "thumbs/distance.webp", w: 1000, h: 719, contain: false,
      d: "A new page on the school website, introduced with a device mockup and a direct link.",
      peek: "<b>Opens at</b> the Learning Technologies Director's letter.", target: { text: "Visit Our New" } },
    { id: "amis", cat: "School Events", title: "AMIS Music Competition", size: "m",
      img: R + "thumbs/amis.webp", w: 1000, h: 1398,
      d: "A call for performers, with divisions, the entry deadline and who to contact.",
      peek: "<b>Opens at</b> Upcoming Events.", target: { text: "Upcoming Events" } },
    { id: "openmic", cat: "School Events", title: "Break Out Open Mic", size: "m",
      img: R + "thumbs/openmic.webp", w: 1000, h: 1398,
      d: "Lunchtime performances announced for September, led by a poster that does the inviting.",
      peek: "<b>Opens at</b> the Open Mic announcement.", target: { text: "Break Out Open Mic" } },
    { id: "library", cat: "Editorial Columns", title: "Library Corner", size: "l", wide: true, contain: true,
      img: R + "thumbs/library.webp", w: 1000, h: 222,
      d: "A recurring column with its own masthead, library news and a weekly book recommendation.",
      peek: "<b>Opens at</b> the column's masthead.", target: { text: "Library Corner" } },
    { id: "pan", cat: "Community Communications", title: "Parent Action Network", size: "m", wide: true, contain: true,
      img: R + "thumbs/pan.webp", w: 1000, h: 281,
      d: "The PTA's charity partners and its first donation drive, with drop-off dates.",
      peek: "<b>Opens at</b> PTA Corner.", target: { text: "PTA Corner" } },
    { id: "cookbook", cat: "Community Communications", title: "Community Cookbook", size: "l", wide: true,
      img: R + "thumbs/cookbook.webp", w: 900, h: 600,
      d: "A PTA launch: when the book goes on sale, where, and how to order it.",
      peek: "<b>Opens at</b> PTA Shop.", target: { text: "PTA Shop" } }
  ];
  var ITEMS = [{ id: "intro", cat: "Case study", title: "Four Years of Digital Storytelling", date: "Now", cover: true,
    lede: "Below: the TISA Weekly Look Ahead of 27 August 2021, at full length and in its original HTML.", target: null }]
    .concat(STORIES.map(function (s) {
      return { id: s.id, cat: s.cat, title: s.id === "issue" ? "TISA Weekly Look Ahead - 27 August" : s.title,
        date: "Friday 27 August 2021", target: s.target,
        lede: s.id === "issue" ? "" : "From the TISA Weekly Look Ahead of 27 August 2021. The issue opens at this story." };
    }));

  var STEPS = [
    { t: "Masthead", p: "The issue opens on the Weekly Look Ahead masthead and a full-width photograph, so readers know the Friday email at a glance.", target: null },
    { t: "Director's message", p: "The Director speaks first: long-form text set for reading, signed with the school's three values in their brand colours.", target: { text: "Message from the Director" } },
    { t: "Announcements", p: "Then the week's notices: back-to-school nights as one graphic, a new distance learning page, a change of contact details.", target: { img: "Untitled-171" } },
    { t: "School life and Library Corner", p: "Class news from across the school, each piece signed by its author, then a recurring column with its own masthead.", target: { text: "Who We Are" } },
    { t: "Calendar and events", p: "The week ahead as a three-column grid, then events led by their posters: the AMIS music competition and Break Out Open Mic.", target: { text: "Calendar" } },
    { t: "Community and footer", p: "PTA news, clubs and a cookbook launch, then the footer: mission statement, address and the rule for next week's submissions.", target: { text: "PTA Corner" } }
  ];

  /* ---------- email helpers (same-origin srcdoc frames) ---------- */
  function loadEmail(frame, cb) {
    if (frame.dataset.loaded) { cb && cb(); return; }
    frame.addEventListener("load", function onl() {
      frame.removeEventListener("load", onl);
      frame.dataset.loaded = "1";
      try {
        var d = frame.contentDocument;
        var st = d.createElement("style");
        st.textContent = "html,body{overflow-x:hidden!important}a{cursor:default!important}" +
          "#tx-hl{position:absolute;pointer-events:none;border:2px solid #D4AF37;background:rgba(212,175,55,.10);border-radius:6px;transition:all .55s cubic-bezier(.7,0,.2,1);z-index:9999}" +
          "#tx-hl b{position:absolute;left:-2px;top:-26px;font:500 12px/1 Helvetica,Arial,sans-serif;background:#0D1B2A;color:#fff;padding:6px 8px;border-radius:4px;white-space:nowrap}";
        d.head.appendChild(st);
        // links are inert: block clicks so nothing inside the email can navigate
        d.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("a"); if (a) e.preventDefault(); }, true);
      } catch (e) { /* cross-origin fallback: still renders */ }
      cb && cb();
    });
    // the email's <base> is relative to this page; srcdoc documents need it absolute
    // (the template's neutralised stylesheet link is dropped so the browser does not try to fetch it)
    frame.srcdoc = EMAIL.replace('<base href="assets/', '<base href="' + new URL("assets/", location.href).href)
      .replace('<link href="javascript:void(0)" rel="stylesheet" type="text/css">', "");
  }
  // force the parent to lay out the frame at its new size, so measurements inside use the right width
  function settle(frame) { void frame.offsetWidth; try { void frame.contentDocument.documentElement.offsetHeight; } catch (e) {} }
  function docH(frame) { try { return frame.contentDocument.documentElement.scrollHeight; } catch (e) { return 24000; } }
  function findEl(frame, target) {
    try {
      var d = frame.contentDocument;
      if (!target) return null;
      if (target.img) return d.querySelector('img[src*="' + target.img + '"]');
      if (target.sel) return d.querySelector(target.sel);
      var w = d.createTreeWalker(d.body, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) {
        if (n.textContent.replace(/\s+/g, " ").trim().indexOf(target.text) === 0) return n.parentElement;
      }
    } catch (e) {}
    return null;
  }
  function yOf(frame, target) {
    var e = findEl(frame, target);
    if (!e) return 0;
    var r = e.getBoundingClientRect(), d = frame.contentDocument;
    return r.top + (d.defaultView.pageYOffset || 0);
  }

  /* ================= 01 INBOX ================= */
  var mail = $("[data-mail]"), hint = $("[data-hint]"), count = $("[data-count]");
  function playInbox() {
    if (mail.dataset.played) return;
    mail.dataset.played = "1";
    var steps = ["is-t1", "is-t2", "is-t3", "is-t4"];
    if (reduce) { steps.forEach(function (c) { mail.classList.add(c); }); count.hidden = false; hint.classList.add("is-on"); return; }
    steps.forEach(function (c, i) {
      setTimeout(function () {
        mail.classList.add(c);
        if (c === "is-t3") count.hidden = false;
        if (c === "is-t4") hint.classList.add("is-on");
      }, 700 + i * 1000);
    });
  }
  if ("IntersectionObserver" in win) {
    var mio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { playInbox(); mio.disconnect(); } }, { threshold: .35 });
    mio.observe(mail);
  } else playInbox();

  $$("[data-open]", mail).forEach(function (b) {
    b.addEventListener("click", function () { openReader(b.dataset.open, b); });
  });

  /* ================= READER ================= */
  var reader = $("[data-reader]"), rFrame = $("[data-r-frame]"), rWin = $("[data-r-win]"), rDev = $("[data-r-dev]"),
    rScroll = $("[data-r-scroll]"), rStage = $("[data-r-stage]");
  var rs = { idx: 0, view: "desktop", origin: null, open: false, lastFocus: null };
  // on a phone the natural first view is the phone layout
  if (win.innerWidth < 640) {
    rs.view = "mobile";
    rDev.classList.add("is-mobile");
    $$("[data-r-view]").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.rView === "mobile" ? "true" : "false"); });
  }
  var fullBtn = $("[data-r-full]");
  if (!doc.fullscreenEnabled) fullBtn.hidden = true;

  function idxOf(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return i; return 0; }
  function rectClip(r) {
    var vw = win.innerWidth, vh = win.innerHeight;
    return "inset(" + Math.max(0, r.top) + "px " + Math.max(0, vw - r.right) + "px " + Math.max(0, vh - r.bottom) + "px " + Math.max(0, r.left) + "px round 14px)";
  }
  function sizeReader() {
    if (!rFrame.dataset.loaded) return;
    if (rs.view === "desktop") {
      var w = Math.min(680, rStage.clientWidth) - 2, s = w / 640;
      rFrame.style.width = "640px";
      settle(rFrame);
      rFrame.style.height = docH(rFrame) + "px";
      rFrame.style.transform = "scale(" + s + ")";
      rWin.style.height = Math.ceil(docH(rFrame) * s) + "px";
      rFrame.setAttribute("scrolling", "no");
    } else {
      rFrame.style.width = win.innerWidth < 640 ? "100%" : "375px";
      rFrame.style.height = "100%";
      settle(rFrame);
      rFrame.style.transform = "none";
      rWin.style.height = "";
      rFrame.setAttribute("scrolling", "yes");
    }
  }
  function goTarget(smooth) {
    var it = Object.assign({}, ITEMS[rs.idx]);
    if (rs.override) it.target = rs.override;
    var beh = smooth && !reduce ? "smooth" : "auto";
    if (rs.view === "desktop") {
      try { rFrame.contentWindow.scrollTo(0, 0); } catch (e) {}
      if (!it.target) { rScroll.scrollTo({ top: 0, behavior: beh }); return; }
      var s = (Math.min(680, rStage.clientWidth) - 2) / 640;
      var y = rStage.offsetTop + yOf(rFrame, it.target) * s - 120;
      rScroll.scrollTo({ top: Math.max(0, y), behavior: beh });
    } else {
      rScroll.scrollTo({ top: it.target ? rStage.offsetTop - 80 : 0, behavior: beh });
      try { rFrame.contentWindow.scrollTo({ top: it.target ? Math.max(0, yOf(rFrame, it.target) - 48) : 0, behavior: beh }); } catch (e) {}
    }
  }
  function fillReader() {
    var it = ITEMS[rs.idx];
    $("[data-r-subj]").textContent = it.title;
    $("[data-r-cat]").textContent = it.cat;
    $("[data-r-date]").textContent = it.id === "intro" ? "To: you · " + it.date : "To: the TISA community · " + it.date;
    $("[data-r-lede]").textContent = it.lede || "";
    $("[data-r-cover]").hidden = !it.cover;
    $("[data-r-pos]").textContent = (rs.idx + 1) + " / " + ITEMS.length;
    $("[data-r-prev]").disabled = rs.idx === 0;
    $("[data-r-next]").disabled = rs.idx === ITEMS.length - 1;
  }
  function openReader(id, originEl, target) {
    rs.idx = idxOf(id);
    rs.override = target || null;
    rs.origin = originEl || null;
    rs.lastFocus = doc.activeElement;
    fillReader();
    reader.hidden = false;
    reader.classList.remove("is-open", "is-closing");
    doc.body.classList.add("tx-lock");
    var row = $('[data-row="intro"]');
    if (id === "intro" && row) { row.classList.add("is-read"); $("[data-newcount]").textContent = "No new messages"; count.hidden = true; }
    var after = function () {
      sizeReader();
      // wait a frame for layout, then jump to the story
      requestAnimationFrame(function () { goTarget(false); });
    };
    loadEmail(rFrame, after);
    if (rFrame.dataset.loaded) after();
    if (!reduce && originEl) {
      reader.classList.remove("is-anim");
      reader.style.clipPath = rectClip(originEl.getBoundingClientRect());
      reader.offsetWidth; // commit start state
      reader.classList.add("is-anim");
      reader.style.clipPath = "inset(0 0 0 0 round 0px)";
    } else {
      reader.style.clipPath = "";
    }
    requestAnimationFrame(function () { reader.classList.add("is-open"); });
    if (!reduce && originEl) morphSubject(originEl);
    rs.open = true;
    setTimeout(function () { $("[data-r-close]").focus({ preventScroll: true }); }, 60);
  }
  // shared-element feel: the subject line travels from the inbox row to the reader heading
  function morphSubject(originEl) {
    var from = originEl.querySelector && originEl.querySelector(".row__subj");
    var to = $("[data-r-subj]");
    if (!from) return;
    var a = from.getBoundingClientRect();
    to.classList.add("is-ghosting");
    var g = el("div", "subj-ghost");
    g.textContent = from.textContent;
    g.setAttribute("aria-hidden", "true");
    g.style.left = a.left + "px"; g.style.top = a.top + "px";
    g.style.fontSize = getComputedStyle(from).fontSize;
    doc.body.appendChild(g);
    requestAnimationFrame(function () {
      var b = to.getBoundingClientRect();
      var s = parseFloat(getComputedStyle(to).fontSize) / parseFloat(getComputedStyle(from).fontSize);
      g.style.transform = "translate(" + (b.left - a.left) + "px," + (b.top - a.top - 16) + "px) scale(" + s + ")";
      setTimeout(function () { to.classList.remove("is-ghosting"); g.style.opacity = "0"; }, 680);
      setTimeout(function () { g.remove(); }, 1000);
    });
  }
  function closeReader() {
    if (!rs.open) return;
    rs.open = false;
    if (doc.fullscreenElement) doc.exitFullscreen().catch(function () {});
    var o = rs.origin, done = function () {
      var row = o && o.closest && o.closest(".row");
      if (row && !reduce) { row.classList.add("is-back"); setTimeout(function () { row.classList.remove("is-back"); }, 1400); }
      reader.hidden = true;
      reader.classList.remove("is-anim", "is-open", "is-closing");
      reader.style.clipPath = "";
      doc.body.classList.remove("tx-lock");
      if (rs.lastFocus && rs.lastFocus.focus) rs.lastFocus.focus({ preventScroll: true });
    };
    if (!reduce && o && o.isConnected) {
      var r = o.getBoundingClientRect();
      if (r.bottom > 0 && r.top < win.innerHeight) {
        reader.classList.add("is-closing", "is-anim");
        reader.style.clipPath = rectClip(r);
        setTimeout(done, 760);
        return;
      }
    }
    done();
  }
  function step(d) {
    var n = clamp(rs.idx + d, 0, ITEMS.length - 1);
    if (n === rs.idx) return;
    rs.idx = n;
    rs.override = null;
    fillReader();
    goTarget(true);
  }
  $$("[data-r-close]").forEach(function (b) { b.addEventListener("click", closeReader); });
  $("[data-r-prev]").addEventListener("click", function () { step(-1); });
  $("[data-r-next]").addEventListener("click", function () { step(1); });
  fullBtn.addEventListener("click", function () {
    if (doc.fullscreenElement) doc.exitFullscreen(); else reader.requestFullscreen().catch(function () {});
  });
  $$("[data-r-view]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (rs.view === b.dataset.rView) return;
      rs.view = b.dataset.rView;
      $$("[data-r-view]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      rDev.classList.add("is-swap");
      setTimeout(function () {
        rDev.classList.toggle("is-mobile", rs.view === "mobile");
        sizeReader();
        setTimeout(function () { rDev.classList.remove("is-swap"); goTarget(false); }, reduce ? 0 : 320);
      }, reduce ? 0 : 220);
    });
  });
  doc.addEventListener("keydown", function (e) {
    if (!rs.open) return;
    if (e.key === "Escape" && !doc.fullscreenElement) { e.preventDefault(); closeReader(); }
    if (e.key === "ArrowRight" && !/INPUT|TEXTAREA/.test(e.target.tagName)) step(1);
    if (e.key === "ArrowLeft" && !/INPUT|TEXTAREA/.test(e.target.tagName)) step(-1);
    if (e.key === "Tab") {
      var f = $$("button:not([disabled]):not([hidden]), iframe", reader).filter(function (x) { return x.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  win.addEventListener("resize", function () { if (rs.open) sizeReader(); });

  /* ================= 02 ISSUE SHOWCASE ================= */
  var iFrame = $("[data-issue-frame]"), iWin = $("[data-issue-win]"), iSteps = $("[data-issue-steps]"), meter = $("[data-issue-meter]");
  var iState = { y: [], cur: -1 };
  STEPS.forEach(function (s, i) {
    var li = el("li", "istep");
    li.innerHTML = '<span class="istep__n">' + pad(i + 1) + " / " + pad(STEPS.length) + '</span><h3 class="istep__t"></h3><p class="istep__p"></p>';
    li.querySelector(".istep__t").textContent = s.t;
    li.querySelector(".istep__p").textContent = s.p;
    var b = el("button", "istep__open", "Open this in the reader →");
    b.type = "button";
    b.addEventListener("click", function () { openReader("issue", iWin, s.target); });
    li.appendChild(b);
    li.dataset.i = i;
    iSteps.appendChild(li);
  });
  function layoutIssue() {
    if (!iFrame.dataset.loaded) return;
    var s = iWin.clientWidth / 600;
    iFrame.style.width = "640px";
    settle(iFrame);
    iFrame.style.height = docH(iFrame) + "px";
    settle(iFrame);
    iState.s = s;
    iState.y = STEPS.map(function (st) { return st.target ? yOf(iFrame, st.target) : 0; });
    setIssue(iState.cur < 0 ? 0 : iState.cur, true);
  }
  function setIssue(i, force) {
    if (i === iState.cur && !force) return;
    iState.cur = i;
    $$(".istep", iSteps).forEach(function (li, k) { li.classList.toggle("is-on", k === i); });
    meter.style.width = ((i + 1) / STEPS.length * 100) + "%";
    if (!iFrame.dataset.loaded) return;
    var s = iState.s || 1, y = Math.max(0, (iState.y[i] || 0) - 28);
    var maxY = docH(iFrame) - iWin.clientHeight / s;
    y = Math.min(y, Math.max(0, maxY));
    iFrame.style.transform = "translate(" + (-20 * s) + "px," + (-y * s) + "px) scale(" + s + ")";
  }
  if ("IntersectionObserver" in win) {
    var lazy = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { loadEmail(iFrame, function () { setTimeout(layoutIssue, 60); }); lazy.disconnect(); }
    }, { rootMargin: "800px 0px" });
    lazy.observe(iWin);
    var sio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) setIssue(+x.target.dataset.i); });
    }, { rootMargin: win.innerWidth < 900 ? "-64% 0px -30% 0px" : "-45% 0px -45% 0px" });
    $$(".istep", iSteps).forEach(function (li) { sio.observe(li); });
  } else { loadEmail(iFrame, layoutIssue); }
  win.addEventListener("resize", function () { layoutIssue(); });

  /* ================= 03 ARCHIVE ================= */
  var arc = $("[data-arc]"), filt = $("[data-filters]");
  STORIES.forEach(function (s, i) {
    var li = el("li", "card card--" + s.size + (s.drop ? " card--drop" : "") + (s.wide ? " card--wide" : ""));
    li.dataset.cat = s.cat;
    li.innerHTML =
      '<button type="button" class="card__btn">' +
        '<span class="card__fig' + (s.contain ? " card__fig--contain" : "") + '">' +
          '<img src="' + s.img + '" alt="" loading="lazy" decoding="async" width="' + s.w + '" height="' + s.h + '">' +
          '<span class="card__peek">' + s.peek + "</span>" +
        "</span>" +
        '<span class="card__meta"><span class="card__n">' + pad(i + 1) + '</span><span class="card__cat">' + esc(s.cat) + "</span>" +
        '<span class="card__t">' + esc(s.title) + '</span><span class="card__d">' + esc(s.d) + "</span></span>" +
      "</button>";
    var btn = li.querySelector(".card__btn");
    btn.setAttribute("aria-label", s.title + ", " + s.cat + ". Open in the reader");
    btn.addEventListener("click", function () { openReader(s.id, li.querySelector(".card__fig")); });
    arc.appendChild(li);
  });
  var cats = ["All"].concat(STORIES.map(function (s) { return s.cat; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
  cats.forEach(function (c, i) {
    var n = c === "All" ? STORIES.length : STORIES.filter(function (s) { return s.cat === c; }).length;
    var b = el("button", "chip", esc(c) + "<b>" + n + "</b>");
    b.type = "button";
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      $$(".chip", filt).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      $$(".card", arc).forEach(function (card) {
        var show = c === "All" || card.dataset.cat === c;
        card.classList.toggle("is-hidden", !show);
        card.classList.toggle("card--drop", show && c === "All" && card === arc.children[1]);
      });
    });
    filt.appendChild(b);
  });

  /* ================= 04 CODE ================= */
  var cFrame = $("[data-code-frame]"), cScreen = $("[data-code-screen]"), cTabs = $("[data-code-tabs]");
  var cs = { part: 0, view: "desktop" };
  if (FACTS.mso_blocks) { var fm = $('[data-fact="mso"]'); if (fm) fm.textContent = FACTS.mso_blocks; }
  if (FACTS.media_queries) { var fq = $('[data-fact="mq"]'); if (fq) fq.textContent = FACTS.media_queries; }
  CODE.forEach(function (c, i) {
    var b = el("button", "code__tab", esc(c.label));
    b.type = "button"; b.setAttribute("role", "tab"); b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.addEventListener("click", function () { selectPart(i, true); });
    cTabs.appendChild(b);
  });
  cTabs.addEventListener("keydown", function (e) {
    var t = $$(".code__tab", cTabs), i = t.indexOf(doc.activeElement);
    if (i < 0) return;
    if (e.key === "ArrowRight") { e.preventDefault(); t[(i + 1) % t.length].focus(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); t[(i - 1 + t.length) % t.length].focus(); }
  });
  function highlight(src) {
    var re = /(&lt;!--[\s\S]*?--&gt;|&lt;!\[endif\]--&gt;|&lt;!\[if [^\]]*\]&gt;|\/\*[\s\S]*?\*\/)|(&lt;\/?)([a-zA-Z][\w:-]*)|([\w:-]+)=("[^"]*")|(@media[^{]*)/g;
    return src.split("\n").map(function (ln, i) {
      var h = esc(ln).replace(re, function (m, com, lt, tag, an, av, mq) {
        if (com) return '<span class="tk-c">' + com + "</span>";
        if (lt) return lt + '<span class="tk-t">' + tag + "</span>";
        if (an) return '<span class="tk-a">' + an + '</span>=<span class="tk-s">' + av + "</span>";
        if (mq) return '<span class="tk-p">' + mq + "</span>";
        return m;
      });
      return '<span class="l" data-n="' + (i + 1) + '" style="animation-delay:' + Math.min(i * 28, 600) + 'ms">' + h + "</span>";
    }).join("");
  }
  function showCode(label, note, code) {
    $("[data-code-label]").textContent = label;
    $("[data-code-note]").textContent = note;
    $("[data-code-src]").innerHTML = highlight(code);
  }
  function codeScale() { return cs.view === "desktop" ? cScreen.clientWidth / 600 : cScreen.clientWidth / 375; }
  function layoutCode() {
    if (!cFrame.dataset.loaded) return;
    var s = codeScale();
    if (cs.view === "desktop") {
      cFrame.style.width = "640px";
      cFrame.style.transform = "translateX(" + (-20 * s) + "px) scale(" + s + ")";
    } else {
      cFrame.style.width = "375px";
      cFrame.style.transform = "scale(" + s + ")";
    }
    cFrame.style.height = (cScreen.clientHeight / s) + "px";
    settle(cFrame);
  }
  function markPart(i) {
    var c = CODE[i];
    if (!cFrame.dataset.loaded) return;
    try {
      var d = cFrame.contentDocument, target = d.querySelector(c.sel);
      if (c.id === "content") target = findEl(cFrame, { text: "Message from the Director" });
      if (!target) return;
      var box = target;
      if (c.id === "content") box = target.closest("div").parentElement.parentElement || target;
      if (c.id === "footer") box = target.parentElement.parentElement;
      var r = box.getBoundingClientRect(), sy = d.defaultView.pageYOffset;
      var top = r.top + sy, h = r.height;
      if (c.id === "content") h = Math.max(h, 220);
      if (c.id === "footer") h = Math.min(Math.max(h, 360), 560);
      var hl = d.getElementById("tx-hl");
      if (!hl) { hl = d.createElement("div"); hl.id = "tx-hl"; hl.appendChild(d.createElement("b")); d.body.appendChild(hl); }
      hl.querySelector("b").textContent = c.label;
      hl.style.left = (r.left - 6) + "px"; hl.style.width = (r.width + 12) + "px";
      hl.style.top = (top - 6) + "px"; hl.style.height = (h + 12) + "px";
      var vh = cScreen.clientHeight / codeScale();
      d.defaultView.scrollTo({ top: Math.max(0, top - Math.max(40, (vh - h) / 3)), behavior: reduce ? "auto" : "smooth" });
    } catch (e) {}
  }
  function selectPart(i, fromUser) {
    cs.part = i;
    $$(".code__tab", cTabs).forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); });
    showCode(CODE[i].label, CODE[i].note, CODE[i].code);
    markPart(i);
    void fromUser;
  }
  $$("[data-code-view]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (cs.view === b.dataset.codeView) return;
      cs.view = b.dataset.codeView;
      $$("[data-code-view]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      cScreen.classList.toggle("is-mobile", cs.view === "mobile");
      var r = RESP[cs.view];
      showCode(r.label, r.note, r.code);
      setTimeout(function () { layoutCode(); markPart(cs.part); }, reduce ? 0 : 640);
      layoutCode();
    });
  });
  if ("IntersectionObserver" in win) {
    var cio = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { loadEmail(cFrame, function () { layoutCode(); setTimeout(function () { selectPart(0); }, 120); }); cio.disconnect(); }
    }, { rootMargin: "600px 0px" });
    cio.observe(cScreen);
  }
  showCode(CODE[0].label, CODE[0].note, CODE[0].code);
  win.addEventListener("resize", function () { layoutCode(); markPart(cs.part); });

  /* ================= 06 YEARS ================= */
  var years = $("[data-years]"), stack = $("[data-years-stack]");
  var YC = ["header", "director", "distance", "library", "brooklyn", "calendar", "amis", "openmic", "credit", "pta", "footer"];
  var ycards = YC.map(function (n, i) {
    var c = el("div", "ycard");
    c.innerHTML = '<img src="' + R + "renders/d-" + n + '.webp" alt="" decoding="async">';
    stack.appendChild(c);
    return { el: c, i: i, rot: ((i * 37) % 7 - 3) * 1.1 };
  });
  function yearsTick() {
    var r = years.getBoundingClientRect(), vh = win.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    var p = clamp(-r.top / (r.height - vh), 0, 1);
    var W = win.innerWidth, mobile = W < 860, N = ycards.length;
    var cw = ycards[0].el.offsetWidth || 200;
    // the cards live in the right part of the screen on desktop, below the text on phones
    var cx = mobile ? 0 : W * .23, cy = mobile ? vh * .22 : vh * .04;
    var span = mobile ? W - cw * .9 : W * .5 - cw * .7;
    var rowGap = span / (N - 1);
    var a = clamp((p - .1) / .4, 0, 1), b = clamp((p - .58) / .3, 0, 1);
    a = a * a * (3 - 2 * a); b = b * b * (3 - 2 * b);
    var FOCUS = { 1: -1, 6: 0, 7: 1 };
    ycards.forEach(function (o) {
      var i = o.i;
      var pileX = cx + (i - N / 2) * 3, pileY = cy + (i - N / 2) * -3;
      var rowX = cx + (i - (N - 1) / 2) * rowGap, rowY = cy + Math.abs(i - (N - 1) / 2) * 5;
      var x = pileX + (rowX - pileX) * a, y = pileY + (rowY - pileY) * a, rot = o.rot * (1 - a), sc = 1 - .1 * a;
      var f = FOCUS[i];
      if (f !== undefined) {
        // three pages step forward and open out
        var tx = cx + f * cw * (mobile ? .62 : 1.02);
        x += (tx - x) * b;
        y -= b * vh * (mobile ? .02 : .05);
        sc += b * (mobile ? .1 : .2);
      } else { sc -= b * .06; }
      o.el.style.transform = "translate(-50%,-50%) translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) rotate(" + rot.toFixed(2) + "deg) scale(" + sc.toFixed(3) + ")";
      o.el.style.zIndex = f !== undefined && b > .05 ? 30 + f : 10 - Math.abs(i - 5);
      o.el.style.filter = f === undefined && b > 0 ? "brightness(" + (1 - b * .35).toFixed(2) + ")" : "";
    });
  }

  /* ================= 03 PRODUCTION JOURNEY ================= */
  // tool chips: "v" = verified in the 2021 source files, "k" = part of my toolkit (no claim about this issue)
  function chips(list) {
    return '<ul class="chips">' + list.map(function (c) {
      return '<li class="chip2 chip2--' + c[1] + '"' + (c[1] === "v" ? ' title="Verified in the 2021 source files"' : ' title="Part of my toolkit"') + ">" + esc(c[0]) + "</li>";
    }).join("") + "</ul>";
  }
  function img(n, cls) { return '<img class="' + (cls || "") + '" src="' + R + n + '" alt="" loading="lazy" decoding="async">'; }
  var JR = [
    { t: "Design", k: "Graphics for a 600 px column",
      p: "Every issue needed its own set of visuals: mastheads, posters, photo collages and banners, each composed to read on a phone and a desktop.",
      ev: ["One collage in this issue still carries Adobe Photoshop 22.4 metadata.", "The Instagram clip was converted from video to an animated GIF, because email cannot play video."],
      tools: [["Adobe Photoshop", "v"], ["Adobe Illustrator", "k"], ["Adobe Creative Cloud", "k"], ["Final Cut Pro", "k"]],
      v: function () {
        var im = [["thumbs/openmic.webp", "t2"], ["thumbs/back-to-school.webp", ""], ["thumbs/distance.webp", ""], ["thumbs/amis.webp", "t2"], ["thumbs/library.webp", "wide"], ["thumbs/cookbook.webp", ""], ["thumbs/pan.webp", "wide"]];
        return '<div class="jv-mosaic">' + im.map(function (x, i) { return img(x[0], x[1]).replace("<img", '<img style="transition-delay:' + (i * 70) + 'ms"'); }).join("") + "</div>" +
          '<p class="jv-cap"><span class="src src--o">Original</span> Graphics from the issue of 27 August 2021.</p>';
      } },
    { t: "HTML / CSS", k: "Built block by block",
      p: "The issue was assembled in Campaign Monitor's email builder on its “The Blueprint” template: images, dividers, headings, text and buttons, each with inline styles that survive email clients.",
      ev: ["34 Outlook-only conditional blocks, 7 media queries and a VML button in the source.", "Fixed 600 px column with a hybrid fallback for narrow screens."],
      tools: [["Campaign Monitor", "v"], ["HTML", "k"], ["CSS", "k"], ["Email Template Design", "k"]],
      more: { href: "#code", label: "Inspect the markup" },
      v: function () {
        var b = [["b-img", "image", "masthead · 558 px"], ["b-hero", "image", "photo · 561 px"], ["", "divider", "40 px · #cbcbcb"],
          ["", "heading", "22/34 · #1499e0"], ["", "text", "15/23 · Avenir"], ["", "button", "#fbac00 · VML for Outlook"]];
        return '<div class="jv-build"><div class="jv-blocks">' + b.map(function (x, i) {
          return '<span class="' + x[0] + '" style="transition-delay:' + (i * 110) + 'ms"><b>' + x[1] + "</b><i>" + x[2] + "</i></span>";
        }).join("") + '<p class="jv-cap"><span class="src src--r">Reconstruction</span> Block order and values read from the source.</p></div>' +
          '<figure>' + img("renders/d-director.webp") + '<figcaption class="jv-cap"><span class="src src--o">Original</span> The same blocks, rendered.</figcaption></figure></div>';
      } },
    { t: "Responsive testing", k: "One email, two screens",
      p: "Each issue went out as a preview first and was checked on desktop and on a phone: images scaling, columns stacking, links and buttons working.",
      ev: ["The file this case study is built from is that preview: “TISA Weekly Look Ahead - 27 August - Preview”, sent through Campaign Monitor to my own inbox."],
      tools: [["Campaign Monitor previews", "v"], ["Responsive Email Design", "k"]],
      v: function () {
        return '<div class="jv-devices"><figure class="d">' + img("renders/d-header.webp") + '<figcaption>Desktop · 600 px</figcaption></figure><figure class="m">' + img("renders/m-header.webp") + '<figcaption>Phone · 375 px</figcaption></figure></div>' +
          '<pre class="jv-code" aria-label="Media queries from the source">@media only screen and (min-width: 620px) {\n  .column, .gutter { display: table-cell; }\n}\n@media (max-width: 321px) {\n  .layout, .stack .column { width: 320px !important; }\n}</pre>' +
          '<p class="jv-cap"><span class="src src--o">Original</span> Both renders and both rules come from the 2021 source.</p>';
      } },
    { t: "Delivery", k: "Friday, 27 August 2021",
      p: "Submissions closed on Thursday at 10:00. On Friday the issue's image files were captured between 08:47 and 13:17, and the preview went out three minutes later.",
      ev: ["Times come from the file names of the issue's images and from the email's own send header."],
      tools: [["Campaign Monitor", "v"], ["Mailchimp", "k"]],
      v: function () {
        var t = [["Fri 20 Aug", "13:28", "Masthead captured"], ["Fri 27 Aug", "08:47", "CEESA challenge poster captured"], ["", "08:53", "Library Corner images captured"],
          ["", "08:58", "P8 photo collage captured"], ["", "10:24", "Cookbook image captured"], ["", "11:16", "Parent Action Network banner captured"], ["", "13:17", "Guest speaker screenshot captured"], ["", "13:20", "Preview sent through Campaign Monitor"]];
        return '<ol class="jv-time">' + t.map(function (x, i) {
          return '<li style="transition-delay:' + (i * 90) + 'ms"' + (i === t.length - 1 ? ' class="is-send"' : "") + '><span class="d">' + x[0] + '</span><b>' + x[1] + "</b><span>" + x[2] + "</span></li>";
        }).join("") + "</ol>" +
          '<p class="jv-cap"><span class="src src--o">Original</span> Baku time. The send header records 09:20 UTC.</p>';
      } }
  ];
  var jr = $("[data-jr]"), jrTabs = $("[data-jr-tabs]"), jrStage = $("[data-jr-stage]"), jrFill = $("[data-jr-fill]"), jrEnv = $("[data-jr-env]");
  var js = { i: 0, timer: null, paused: false, visible: false, DUR: 7000 };
  jr.style.setProperty("--dur", js.DUR + "ms");
  JR.forEach(function (s, i) {
    var b = el("button", "jtab");
    b.type = "button"; b.setAttribute("role", "tab"); b.id = "jtab-" + i; b.setAttribute("aria-controls", "jp-" + i);
    b.innerHTML = '<span class="jtab__n">' + pad(i + 1) + '</span><span class="jtab__t">' + esc(s.t) + '</span><span class="jtab__bar"></span>';
    b.addEventListener("click", function () { stopJr(); setJr(i); });
    jrTabs.appendChild(b);
    var pnl = el("div", "jp");
    pnl.id = "jp-" + i; pnl.setAttribute("role", "tabpanel"); pnl.setAttribute("aria-labelledby", "jtab-" + i); pnl.tabIndex = 0;
    pnl.innerHTML = '<div class="jp__text"><p class="jp__k">Stage ' + pad(i + 1) + " · " + esc(s.t) + '</p><h3 class="jp__t">' + esc(s.k) + '</h3><p class="jp__p">' + esc(s.p) + "</p>" +
      '<ul class="jp__ev">' + s.ev.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") + "</ul>" +
      '<p class="jp__tk">Tools <small><i aria-hidden="true"></i>used in this issue</small></p>' + chips(s.tools) +
      (s.more ? '<a class="jp__more" href="' + s.more.href + '">' + esc(s.more.label) + ' <i aria-hidden="true">↓</i></a>' : "") +
      '</div><div class="jp__vis">' + s.v() + "</div>";
    jrStage.appendChild(pnl);
  });
  $("[data-jr-prev]").addEventListener("click", function () { stopJr(); setJr((js.i - 1 + JR.length) % JR.length); });
  $("[data-jr-next]").addEventListener("click", function () { stopJr(); setJr((js.i + 1) % JR.length); });
  jrTabs.addEventListener("keydown", function (e) {
    var t = $$(".jtab", jrTabs), i = t.indexOf(doc.activeElement);
    if (i < 0) return;
    var n = e.key === "ArrowRight" ? (i + 1) % t.length : e.key === "ArrowLeft" ? (i - 1 + t.length) % t.length : -1;
    if (n > -1) { e.preventDefault(); t[n].focus(); stopJr(); setJr(n); }
  });
  function stopJr() {
    js.paused = true; jr.classList.add("is-paused"); clearTimeout(js.timer);
    $("[data-jr-hint]").textContent = "Use the arrows or select a stage.";
  }
  function setJr(i) {
    js.i = i;
    $$(".jtab", jrTabs).forEach(function (t, k) {
      t.setAttribute("aria-selected", k === i ? "true" : "false");
      t.tabIndex = k === i ? 0 : -1;
      t.classList.toggle("is-done", k < i);
      var bar = t.querySelector(".jtab__bar"); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
    });
    $$(".jp", jrStage).forEach(function (v, k) { v.classList.toggle("is-on", k === i); v.hidden = k !== i; });
    jrTick();
    clearTimeout(js.timer);
    if (!js.paused && js.visible && !reduce) js.timer = setTimeout(function () { setJr((js.i + 1) % JR.length); }, js.DUR);
  }
  function jrTick() {
    var t = $$(".jtab", jrTabs)[js.i];
    if (!t) return;
    var x = t.offsetLeft + t.offsetWidth / 2;
    jrFill.style.width = x + "px";
    jrEnv.style.transform = "translateX(" + (x - 14) + "px)";
  }
  if ("IntersectionObserver" in win) {
    new IntersectionObserver(function (en) {
      js.visible = en[0].isIntersecting;
      if (js.visible) setJr(js.i); else clearTimeout(js.timer);
    }, { threshold: .4 }).observe(jr);
  }
  setJr(0);
  win.addEventListener("resize", jrTick);

  /* ================= scroll loop + reveals ================= */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; yearsTick(); jrTick(); });
  }
  win.addEventListener("scroll", onScroll, { passive: true });
  win.addEventListener("resize", onScroll);
  onScroll();

  var rv = $$(".tx-head, .card, .evid, .jr, .tx-end__in, .arc__filters, .tx-hero__foot");
  rv.forEach(function (e) { e.classList.add("rv"); });
  if (!reduce && "IntersectionObserver" in win) {
    var rio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("is-in"); rio.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .04 });
    rv.forEach(function (e) { rio.observe(e); });
  } else rv.forEach(function (e) { e.classList.add("is-in"); });
})();
