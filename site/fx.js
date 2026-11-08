(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (q, c) { return (c || document).querySelector(q); };
  var $$ = function (q, c) { return Array.prototype.slice.call((c || document).querySelectorAll(q)); };
  var T = (window.PF && window.PF.T) || { fr: {}, en: {} };

  /* menu mobile */
  var menu = $("#menu"), nav = $("#nav");
  function closeMenu() { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); }
  menu.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* numéros de section */
  $$("main section[id]").forEach(function (sec, i) {
    var h = $("h2", sec);
    if (!h) return;
    // le texte traduisible passe dans un span, pour que le changement de langue ne supprime pas le numéro
    if (h.hasAttribute("data-i18n")) {
      var t = document.createElement("span");
      t.setAttribute("data-i18n", h.getAttribute("data-i18n")); h.removeAttribute("data-i18n");
      t.textContent = h.textContent; h.textContent = ""; h.appendChild(t);
    }
    var n = document.createElement("span");
    n.className = "num"; n.setAttribute("aria-hidden", "true");
    n.textContent = (i < 9 ? "0" : "") + (i + 1);
    h.insertBefore(n, h.firstChild);
  });
  var secNum = 0;
  $$("main section[id]").forEach(function (sec) { var n = $(".num", sec); if (n) { secNum++; n.textContent = (secNum < 10 ? "0" : "") + secNum; } });

  /* bande de technos : boucle continue, ralentit au survol */
  var track = $("#track"), marquee = $(".marquee");
  if (track) {
    var names = [];
    $$(".skillgroups .chips span").forEach(function (sp) {
      var t = sp.firstChild ? sp.firstChild.textContent.trim() : "";
      if (t && names.indexOf(t) < 0 && !/^(Français|Anglais|Allemand|French|English|German)/.test(t)) names.push(t);
    });
    var one = names.map(function (n) { var e = document.createElement("span"); e.textContent = n; return e.outerHTML; }).join("");
    track.innerHTML = one + one;
    var half = 0, x = 0, speed = 0.45, cur = 0.45, last = null;
    function measure() { half = track.scrollWidth / 2; }
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    marquee.addEventListener("mouseenter", function () { speed = 0.08; });
    marquee.addEventListener("mouseleave", function () { speed = reduce ? 0.25 : 0.45; });
    function run(t) {
      if (last === null) last = t;
      var dt = Math.min(48, t - last); last = t;
      cur += (speed - cur) * 0.06;
      x -= cur * dt / 16.67;
      if (half && -x >= half) x += half;
      track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
      requestAnimationFrame(run);
    }
    if (reduce) { speed = cur = 0.25; }
    requestAnimationFrame(run);
  }

  /* défilement fluide avec inertie (souris uniquement) */
  var smooth = fine; // défilement doux voulu partout (la parallaxe, elle, reste coupée en mode « réduire les animations »)
  var sTarget = window.scrollY, sCur = window.scrollY, sRunning = false;
  function maxScroll() { return root.scrollHeight - window.innerHeight; }
  function sLoop() {
    sCur += (sTarget - sCur) * 0.085;
    if (Math.abs(sTarget - sCur) < 0.4) { sCur = sTarget; sRunning = false; }
    window.scrollTo(0, sCur);
    if (sRunning) requestAnimationFrame(sLoop);
  }
  function scrollToY(y) {
    sTarget = Math.max(0, Math.min(maxScroll(), y));
    if (!sRunning) { sRunning = true; sCur = window.scrollY; requestAnimationFrame(sLoop); }
  }
  if (smooth) {
    root.classList.add("lenis");
    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey || e.defaultPrevented) return;
      var el = e.target.closest && e.target.closest(".site-header nav.open");
      if (el) return;
      e.preventDefault();
      var d = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1);
      if (!sRunning) sTarget = window.scrollY;
      scrollToY(sTarget + d);
    }, { passive: false });
    window.addEventListener("scroll", function () { if (!sRunning) { sTarget = sCur = window.scrollY; } }, { passive: true });
    // clavier : flèches, page précédente/suivante, espace, début/fin
    window.addEventListener("keydown", function (e) {
      var t = e.target, tag = t && t.tagName;
      if (e.altKey || e.ctrlKey || e.metaKey || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (t && t.isContentEditable)) return;
      if ((tag === "BUTTON" || tag === "A") && (e.key === " " || e.key === "Spacebar")) return;
      if (t && t.closest && t.closest(".tabs") && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return;
      var vh = window.innerHeight, d = null;
      switch (e.key) {
        case "ArrowDown": d = 120; break;
        case "ArrowUp": d = -120; break;
        case "PageDown": d = vh * 0.85; break;
        case "PageUp": d = -vh * 0.85; break;
        case " ": case "Spacebar": d = (e.shiftKey ? -1 : 1) * vh * 0.85; break;
        case "Home": e.preventDefault(); scrollToY(0); return;
        case "End": e.preventDefault(); scrollToY(maxScroll()); return;
      }
      if (d === null) return;
      e.preventDefault();
      if (!sRunning) sTarget = window.scrollY;
      scrollToY(sTarget + d);
    });
  }
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      var dest = id === "#top" ? document.body : $(id);
      if (!dest || !smooth) return;
      e.preventDefault();
      var y = id === "#top" ? 0 : dest.getBoundingClientRect().top + window.scrollY - 90;
      scrollToY(y);
      history.replaceState(null, "", id);
    });
  });

  /* défilement : progression, parallaxe, frise, bouton haut */
  var heroIntro = $(".hero .intro"), heroProfile = $(".hero .profile"), header = $(".site-header"), bar = $("#progress"), totop = $("#totop"), timeline = $(".timeline"), ticking = false;
  function onScroll() {
    var h = root, max = h.scrollHeight - h.clientHeight, st = h.scrollTop;
    bar.style.transform = "scaleX(" + (max > 0 ? st / max : 0) + ")";
    totop.classList.toggle("show", st > 600);
    header.classList.toggle("scrolled", st > 20);
    root.style.setProperty("--sy", st);
    if (!reduce && heroIntro && st < window.innerHeight) {
      heroIntro.style.transform = "translate3d(0," + (st * 0.12).toFixed(1) + "px,0)";
      heroProfile.style.transform = "translate3d(0," + (st * 0.06).toFixed(1) + "px,0)";
      heroIntro.style.opacity = Math.max(0, 1 - st / (window.innerHeight * 0.9)).toFixed(3);
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* frise : la barre se remplit au défilement (lissée), les points s'allument quand elle les atteint */
  var tlItems = timeline ? $$(".timeline li") : [], tlCenters = [], tlLen = 0, pTarget = 0, pCur = 0, tlRun = false;
  var tlDots = [];
  function tlMeasure() {
    if (!timeline || !tlItems.length) return;
    if (!tlDots.length) {
      tlDots = tlItems.map(function (li) {
        var d = document.createElement("span"); d.className = "tl-dot"; d.setAttribute("aria-hidden", "true");
        timeline.appendChild(d);
        li.addEventListener("mouseenter", function () { d.classList.add("hover"); });
        li.addEventListener("mouseleave", function () { d.classList.remove("hover"); });
        return d;
      });
    }
    // centre des points : à hauteur du titre de chaque étape, sur l'axe de la barre
    var lx = Math.round(tlItems[0].offsetLeft / 4);
    timeline.style.setProperty("--lx", lx + "px");
    tlCenters = tlItems.map(function (li) { return li.offsetTop + li.clientTop + 34; });
    tlDots.forEach(function (d, i) { d.style.top = tlCenters[i] + "px"; });
    tlLen = tlCenters[tlCenters.length - 1] - tlCenters[0];
    timeline.style.setProperty("--lt", tlCenters[0] + "px");
    timeline.style.setProperty("--lh", tlLen + "px");
  }
  function tlTarget() {
    if (!timeline || !tlLen) return;
    var top = timeline.getBoundingClientRect().top + tlCenters[0];
    pTarget = Math.max(0, Math.min(1, (window.innerHeight * 0.62 - top) / tlLen));
    if (!tlRun) { tlRun = true; requestAnimationFrame(tlLoop); }
  }
  function tlLoop() {
    pCur += (pTarget - pCur) * (reduce ? 1 : 0.1);
    if (Math.abs(pTarget - pCur) < 0.0005) { pCur = pTarget; tlRun = false; }
    timeline.style.setProperty("--p", pCur.toFixed(4));
    var reach = tlCenters[0] + pCur * tlLen + 1;
    tlDots.forEach(function (d, i) { d.classList.toggle("reached", tlCenters[i] <= reach); });
    if (tlRun) requestAnimationFrame(tlLoop);
  }
  if (timeline) {
    tlMeasure(); tlTarget();
    window.addEventListener("scroll", tlTarget, { passive: true });
    window.addEventListener("resize", function () { tlMeasure(); tlTarget(); });
    window.addEventListener("load", function () { tlMeasure(); tlTarget(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { tlMeasure(); tlTarget(); });
    $("#lang").addEventListener("click", function () { setTimeout(function () { tlMeasure(); tlTarget(); }, 30); });
  }

  /* section active + apparition progressive */
  if ("IntersectionObserver" in window) {
    var links = {};
    $$("#nav a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
          links[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (sec) { spy.observe(sec); });

    if (true) {
      var targets = $$(".stat, h2, #about > p, .timeline li, .skillgroups > div, .subtitle, .tabs, .card, .cv-card, .contact-list li, .marquee");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      targets.forEach(function (el, i) {
        el.classList.add("reveal");
        el.style.transitionDelay = ((i % 3) * 80) + "ms";
        io.observe(el);
      });
    }
    // (frise gérée plus bas : remplissage lissé au défilement)
  }

  /* boutons légèrement magnétiques */
  if (fine && !reduce) {
    $$(".btn, .social a, .contact-list a, .copy, .tools button").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.translate = ((e.clientX - (r.left + r.width / 2)) * 0.12) + "px " + ((e.clientY - (r.top + r.height / 2)) * 0.18) + "px";
      });
      el.addEventListener("mouseleave", function () { el.style.translate = ""; });
    });
  }

  /* ondulation au clic */
  document.addEventListener("pointerdown", function (e) {
    var el = e.target.closest(".btn, .copy, .contact-list a, .tab, .social a, .tools button");
    if (!el || reduce) return;
    var r = el.getBoundingClientRect(), s = document.createElement("span");
    s.className = "ripple";
    s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top) + "px";
    el.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 750);
  });

  /* texte animé du hero */
  var words = {
    fr: ["développeur full stack", "passionné de DevOps", "adepte de l'auto-hébergement", "étudiant à Epitech Lyon"],
    en: ["full-stack developer", "DevOps enthusiast", "self-hosting fan", "Epitech Lyon student"]
  };
  var typed = $("#typed"), wi = 0, ci = 0, del = false, timer;
  function tick() {
    var list = words[root.lang] || words.fr, w = list[wi % list.length];
    if (reduce) { typed.textContent = w; timer = setTimeout(function () { wi++; tick(); }, 2600); return; }
    ci += del ? -1 : 1;
    typed.textContent = w.slice(0, ci);
    var d = del ? 35 : 70;
    if (!del && ci === w.length) { d = 1700; del = true; }
    else if (del && ci === 0) { del = false; wi++; d = 350; }
    timer = setTimeout(tick, d);
  }
  tick();
  $("#lang").addEventListener("click", function () { clearTimeout(timer); wi = 0; ci = 0; del = false; tick(); });

  /* onglets de projets avec indicateur glissant */
  var tabsBox = $(".tabs"), ind;
  function moveInd() {
    var act = $(".tab.active");
    if (!ind || !act) return;
    ind.style.width = act.offsetWidth + "px";
    ind.style.transform = "translateX(" + act.offsetLeft + "px)";
  }
  if (tabsBox) {
    ind = document.createElement("span"); ind.className = "tab-ind"; ind.setAttribute("aria-hidden", "true");
    tabsBox.insertBefore(ind, tabsBox.firstChild);
    moveInd();
    window.addEventListener("resize", moveInd);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);
    $("#lang").addEventListener("click", function () { setTimeout(moveInd, 30); });
  }
  $$(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var f = tab.getAttribute("data-filter");
      $$(".tab").forEach(function (t) { var on = t === tab; t.classList.toggle("active", on); t.setAttribute("aria-selected", on ? "true" : "false"); });
      $$("#projects .group").forEach(function (g) {
        var show = f === "all" || g.getAttribute("data-cat") === f;
        g.hidden = !show;
        if (show) { g.classList.remove("swap"); void g.offsetWidth; g.classList.add("swap"); }
      });
      moveInd();
    });
  });
  var tablist = $(".tabs");
  if (tablist) tablist.addEventListener("keydown", function (e) {
    var tabs = $$(".tab", tablist), i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var n = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i + tabs.length - 1) % tabs.length : -1;
    if (n >= 0) { tabs[n].focus(); tabs[n].click(); e.preventDefault(); }
  });

  /* compteurs animés */
  function countUp(el) {
    var end = parseInt(el.getAttribute("data-count"), 10), t0 = null;
    if (reduce) { el.textContent = end; return; }
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / 1100, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = "0"; requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); co.unobserve(en.target); } });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { co.observe(el); });
  }

  /* copier l'adresse mail */
  var toast = $("#toast"), toastTimer, copyBtn = $("#copy");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var txt = copyBtn.getAttribute("data-copy");
    function done() {
      toast.textContent = (T[root.lang] || T.fr).copied || "OK";
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
    }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = txt; ta.setAttribute("readonly", ""); ta.className = "sr-copy";
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      if (ok) done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback);
    else fallback();
  });
})();
