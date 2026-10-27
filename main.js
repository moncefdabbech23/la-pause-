/* ==========================================================
   LA PAUSE D'ANGEL — rendu de la carte + interactions
   - La carte (burgers, menu enfant, boissons…) vient de data/menu.js
   - GSAP + ScrollTrigger + Lenis (CDN, voir index.html)
   ========================================================== */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const pad2 = (n) => String(n).padStart(2, "0");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Prix : 11 -> « 11 € » (compact) ou « 11,00 € » */
  const NB = " ";
  const fmt = (n, compact) => (compact && Number.isInteger(n) ? n + NB + "€" : n.toFixed(2).replace(".", ",") + NB + "€");

  /* =========================================================
     HORAIRES — statut « Ouvert maintenant / Fermé » (Europe/Paris)
     À modifier ici si les horaires changent (0 = dimanche … 6 = samedi)
     ========================================================= */
  const HORAIRES = {
    0: [[11, 14], [18, 22]], // dimanche
    1: [],                   // lundi : fermé
    2: [[11, 14], [18, 21]], // mardi
    3: [[11, 14], [18, 21]], // mercredi
    4: [[11, 14], [18, 21]], // jeudi
    5: [[11, 14], [18, 22]], // vendredi
    6: [[11, 14], [18, 22]], // samedi
  };
  const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const fmtH = (h) => pad2(h) + "h00";

  function nowInParis() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Paris", weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get("weekday")];
    let h = parseInt(get("hour"), 10);
    if (h === 24) h = 0;
    return { day, minutes: h * 60 + parseInt(get("minute"), 10) };
  }

  function updateStatus() {
    const { day, minutes } = nowInParis();
    let open = false, text = "";
    for (const [a, b] of HORAIRES[day]) {
      if (minutes >= a * 60 && minutes < b * 60) { open = true; text = "Ouvert maintenant · jusqu'à " + fmtH(b); break; }
    }
    if (!open) {
      let found = false;
      for (let i = 0; i < 8 && !found; i++) {
        const d = (day + i) % 7;
        for (const [a] of HORAIRES[d]) {
          if (i === 0 && a * 60 <= minutes) continue;
          text = "Fermé · ouvre " + (i === 0 ? "aujourd'hui" : i === 1 ? "demain" : JOURS[d]) + " à " + fmtH(a);
          found = true; break;
        }
      }
    }
    $$("[data-open-status]").forEach((el) => {
      el.classList.toggle("open", open);
      el.classList.toggle("closed", !open);
      $("em", el).textContent = text;
    });
    $$(".hours tr").forEach((tr) => tr.classList.toggle("today", Number(tr.dataset.day) === day));
  }

  /* =========================================================
     RENDU DE LA CARTE (depuis data/menu.js)
     ========================================================= */
  let MENU = null;

  const icon = (name) => `<svg class="ico" aria-hidden="true"><use href="#i-${esc(name || "beef")}"/></svg>`;

  function allergens(list) {
    if (!list || !list.length) return "";
    const label = list.map((k) => (MENU.allergens[k] || k).toLowerCase()).join(", ");
    return `<span class="als" role="img" aria-label="Allergènes : ${esc(label)}"><small aria-hidden="true">Allergènes</small>${list
      .map((k) => `<span class="al" aria-hidden="true" title="${esc(k + " = " + (MENU.allergens[k] || ""))}">${esc(k)}</span>`)
      .join("")}</span>`;
  }

  const ingredients = (b) =>
    `<ul class="ing">${b.ingredients.map((g) => `<li>${icon(g.icon)}<span>${esc(g.label)}</span></li>`).join("")}</ul>`;

  const priceBlock = (b) =>
    `<div class="bprice"><div class="main"><b>${fmt(b.price, true)}</b><small>LE BURGER</small></div>` +
    (b.menuPrice ? `<span class="sep"></span><div class="menu"><small>MENU</small><b>${fmt(b.menuPrice, true)}</b></div>` : "") +
    `</div>`;

  const titleOf = (b) => ({ prefix: (b.prefix || "Le").toUpperCase(), name: b.name });
  /* « Le Classic », « L'Italien » : nom complet pour la liste et les données structurées */
  const fullName = (b) => { const p = b.prefix || "Le"; return /'$/.test(p) ? p + b.name : p.replace(/^le$/i, "Le") + " " + b.name; };

  function burgerFeature(b, i, total) {
    const ar = (b.photoW / b.photoH).toFixed(4);
    const t = titleOf(b);
    return `<article class="burger${i % 2 ? " flip" : ""}" id="b-${esc(b.id)}" style="--ar:${ar}">
      <div class="burger-bg" aria-hidden="true"><img src="${esc(b.photo)}" alt="" loading="lazy" decoding="async"></div>
      <div class="burger-inner">
        <div class="burger-shot"><figure><img src="${esc(b.photo)}" alt="${esc(b.alt || "Burger " + b.name)}" width="${b.photoW}" height="${b.photoH}" loading="lazy" decoding="async"></figure></div>
        <div class="burger-info">
          <p class="bnum">${pad2(i + 1)} / ${pad2(total)}</p>
          <h3 class="bname"><span class="le">${esc(t.prefix)}</span><em class="gold">${esc(t.name)}</em></h3>
          ${b.tagline ? `<p class="btag">${esc(b.tagline)}</p>` : ""}
          ${ingredients(b)}
          ${allergens(b.allergens)}
          ${priceBlock(b)}
        </div>
      </div>
    </article>`;
  }

  function burgerCard(b) {
    const t = titleOf(b);
    return `<article class="card">
      <h3><span class="le">${esc(t.prefix)}</span><em class="gold">${esc(t.name)}</em></h3>
      ${b.tagline ? `<p class="btag" style="font-size:1rem;margin:0 0 12px">${esc(b.tagline)}</p>` : ""}
      ${allergens(b.allergens)}
      ${ingredients(b)}
      ${priceBlock(b)}
    </article>`;
  }

  const rowHTML = (it, opts = {}) =>
    `<div class="row${it.description ? " has-desc" : ""}"><div class="nm">${esc(it.name)}${it.detail ? `<small>${esc(it.detail)}</small>` : ""}${opts.als || ""}</div><span class="dots" aria-hidden="true"></span><div class="pr">${fmt(it.price)}${opts.menu || ""}</div>${it.description ? `<p class="desc">${esc(it.description)}</p>` : ""}</div>`;

  const group = (title, rows) => `<section class="grp"><h3>${esc(title)}</h3>${rows}</section>`;
  const picture = (sec) =>
    sec.image ? `<figure class="panel-img"><img src="${esc(sec.image)}" alt="${esc(sec.imageAlt || "")}" width="${sec.imageW || ""}" height="${sec.imageH || ""}" loading="lazy" decoding="async"></figure>` : "";

  function renderBurgers() {
    const B = MENU.burgers;
    $("#burgers-sub").textContent = B.subtitle || "";
    const withPhoto = B.items.filter((b) => b.photo);
    const without = B.items.filter((b) => !b.photo);
    $("#burgers-feature").innerHTML = withPhoto.map((b, i) => burgerFeature(b, i, withPhoto.length)).join("");
    if (without.length) {
      $("#burgers-more").innerHTML = without.map(burgerCard).join("");
      $("#burgers-more-wrap").hidden = false;
    }
    $("#burgers-notes").innerHTML = (B.notes || [])
      .map((n, i) => `<li>${icon(i === 0 ? "chicken" : "beef")}<span>${esc(n)}</span></li>`)
      .join("");
  }

  function renderPanels() {
    const B = MENU.burgers;
    const burgerRows = B.items
      .map((b) =>
        rowHTML({ name: fullName(b), price: b.price }, {
          als: allergens(b.allergens).replace('<small aria-hidden="true">Allergènes</small>', ""),
          menu: b.menuPrice ? `<small>Menu ${fmt(b.menuPrice)}</small>` : "",
        })
      )
      .join("");

    const panels = {
      burgers: `<p class="panel-sub">${esc(B.subtitle || "")}</p>` + group(B.title, burgerRows),
      enfant: group(MENU.kids.title, MENU.kids.items.map((it) => rowHTML(it)).join("")),
      accompagnements:
        picture(MENU.sides) +
        `<div class="cols-2">${group(MENU.sides.title, MENU.sides.items.map((it) => rowHTML(it)).join(""))}${group(
          MENU.starters.title,
          MENU.starters.items.map((it) => rowHTML(it)).join("")
        )}</div>`,
      boissons:
        picture(MENU.localBeers) +
        `<div class="cols-2">${group(MENU.localBeers.title, MENU.localBeers.items.map((it) => rowHTML(it)).join(""))}${group(
          MENU.drinks.title,
          MENU.drinks.items.map((it) => rowHTML(it)).join("")
        )}</div>`,
    };

    $("#panels").innerHTML = Object.keys(panels)
      .map((id, i) => `<div class="panel${id === "burgers" || id === "enfant" ? " panel-narrow" : ""}" role="tabpanel" id="panel-${id}" aria-labelledby="tab-${id}" tabindex="0"${i ? " hidden" : ""}>${panels[id]}</div>`)
      .join("");

    $("#legal").innerHTML =
      (MENU.legal || []).map((l) => `<p>${esc(l)}</p>`).join("") +
      `<div class="legend" aria-label="Légende des allergènes">${Object.keys(MENU.allergens)
        .map((k) => `<span><span class="al" aria-hidden="true">${esc(k)}</span>${esc(MENU.allergens[k])}</span>`)
        .join("")}</div>`;
  }

  /* Données structurées : ajoute le menu au schema.org Restaurant */
  function injectMenuSchema() {
    try {
      const el = $("#ld-restaurant");
      const ld = JSON.parse(el.textContent);
      const item = (name, price, description) => {
        const o = { "@type": "MenuItem", name, offers: { "@type": "Offer", price: Number(price).toFixed(2), priceCurrency: "EUR" } };
        if (description) o.description = description;
        return o;
      };
      const sec = (name, items) => ({ "@type": "MenuSection", name, hasMenuItem: items });
      ld.hasMenu = {
        "@type": "Menu",
        name: "Carte",
        hasMenuSection: [
          sec("Burgers", MENU.burgers.items.map((b) => item(fullName(b), b.price, b.ingredients.map((g) => g.label).join(", ")))),
          sec(MENU.kids.title, MENU.kids.items.map((i) => item(i.name, i.price, i.description))),
          sec(MENU.sides.title, MENU.sides.items.map((i) => item(i.name, i.price))),
          sec(MENU.starters.title, MENU.starters.items.map((i) => item(i.name, i.price))),
          sec(MENU.localBeers.title, MENU.localBeers.items.map((i) => item(i.name, i.price, i.detail))),
          sec(MENU.drinks.title, MENU.drinks.items.map((i) => item(i.name, i.price, i.detail))),
        ],
      };
      el.textContent = JSON.stringify(ld);
    } catch (e) { /* silencieux */ }
  }

  function menuError() {
    const msg = `<p class="menu-error">La carte n'a pas pu être chargée : vérifiez que le fichier <code>data/menu.js</code> est bien présent et qu'il ne contient pas d'erreur de syntaxe.</p>`;
    $("#burgers-feature").innerHTML = `<div class="wrap">${msg}</div>`;
    $("#panels").innerHTML = msg;
  }

  /* =========================================================
     ONGLETS (Burgers / Enfant / Accompagnements / Boissons)
     ========================================================= */
  let currentTab = "burgers";
  let afterTabChange = () => {};

  function moveIndicator() {
    const sel = $('#tabs [aria-selected="true"]');
    const ind = $("#tabInd");
    if (!sel || !ind) return;
    ind.style.left = sel.offsetLeft + "px";
    ind.style.width = sel.offsetWidth + "px";
  }

  function activateTab(id, opts = {}) {
    const tab = $(`#tab-${id}`);
    if (!tab) return;
    currentTab = id;
    $$('#tabs [role="tab"]').forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    $$("#panels .panel").forEach((p) => { p.hidden = p.id !== "panel-" + id; });
    moveIndicator();
    if (opts.focus) tab.focus();
    const wrap = tab.closest(".tabs-wrap");
    if (wrap && tab.scrollIntoView) {
      wrap.scrollTo({ left: tab.offsetLeft - (wrap.clientWidth - tab.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
    }
    afterTabChange();
    updateActiveNav();
  }

  function initTabs() {
    const tabs = $$('#tabs [role="tab"]');
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => activateTab(t.dataset.tab));
      t.addEventListener("keydown", (e) => {
        let n = null;
        if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") n = 0;
        else if (e.key === "End") n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); activateTab(tabs[n].dataset.tab, { focus: true }); }
      });
    });
    window.addEventListener("resize", moveIndicator);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
    moveIndicator();
  }

  /* =========================================================
     NAVIGATION
     ========================================================= */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  let scrollToTarget = (el) => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

  function closeMenu() {
    document.body.classList.remove("nav-open");
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  function updateActiveNav() {
    const active = nav.dataset.section || "";
    $$("#mainnav a").forEach((a) => {
      let on = false;
      if (active === "burgers") on = a.getAttribute("href") === "#burgers";
      else if (active === "carte") on = a.dataset.tab ? a.dataset.tab === currentTab : currentTab === "burgers" && a.getAttribute("href") === "#burgers";
      else if (active === "infos") on = a.getAttribute("href") === "#infos";
      a.classList.toggle("active", on);
    });
  }

  function initNav() {
    toggle.addEventListener("click", () => {
      const open = !document.body.classList.contains("nav-open");
      document.body.classList.toggle("nav-open", open);
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

    // liens d'ancrage + liens vers un onglet
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      if (a.dataset.tab) {
        e.preventDefault();
        closeMenu();
        activateTab(a.dataset.tab);
        setTimeout(() => scrollToTarget($("#carte")), 90);
        return;
      }
      const target = $(id);
      if (target) { e.preventDefault(); closeMenu(); setTimeout(() => scrollToTarget(target), 90); }
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { nav.dataset.section = en.target.id; updateActiveNav(); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["burgers", "carte", "infos"].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    const hero = $("#accueil");
    if (hero) new IntersectionObserver(([en]) => { if (en.isIntersecting) { nav.dataset.section = ""; updateActiveNav(); } }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
  }

  /* Barre de progression dorée + header au scroll (sans dépendance) */
  function initScrollUI() {
    const bar = $("#progress");
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
      nav.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* Curseur personnalisé (desktop) */
  function initCursor() {
    const c = $(".cursor");
    if (!c || !finePointer || reduced) return;
    document.body.classList.add("has-cursor");
    const dot = $(".cursor-dot", c), ring = $(".cursor-ring", c);
    let x = -100, y = -100, rx = -100, ry = -100;
    window.addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x}px,${y}px)`;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener("pointerover", (e) => c.classList.toggle("is-link", !!e.target.closest("a,button,.card,[role=tab]")));
  }

  /* Lueur de survol des cartes */
  function initCardGlow() {
    $$(".card").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* Vidéo hero optionnelle : si assets/videos/hero.mp4 existe, elle remplace la photo */
  function initHeroVideo() {
    const v = $("#heroVideo"), hero = $("#accueil");
    if (!v || reduced) return;
    const saver = navigator.connection && navigator.connection.saveData;
    if (saver) return;
    v.addEventListener("canplay", () => { hero.classList.add("has-video"); v.play().catch(() => {}); }, { once: true });
    v.preload = "auto";
    v.load();
  }

  /* Bokeh / braises dorées (canvas, léger) */
  function initBokeh() {
    const cv = $("#bokeh");
    if (!cv || reduced) return;
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, dpr = 1, orbs = [], visible = true;
    const make = (init) => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 80 * dpr,
      r: (Math.random() * 46 + 10) * dpr,
      vy: (Math.random() * 0.22 + 0.06) * dpr,
      vx: (Math.random() - 0.5) * 0.12 * dpr,
      a: Math.random() * 0.14 + 0.04,
      ph: Math.random() * 6.28,
      warm: Math.random() > 0.35,
    });
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      w = cv.width = Math.max(1, r.width * dpr);
      h = cv.height = Math.max(1, r.height * dpr);
      const n = Math.round(Math.min(30, Math.max(12, r.width / 55)));
      orbs = Array.from({ length: n }, () => make(true));
    };
    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        orbs.forEach((o, i) => {
          o.y -= o.vy; o.ph += 0.008; o.x += o.vx + Math.sin(o.ph) * 0.25 * dpr;
          if (o.y < -o.r * 2) orbs[i] = make(false);
          const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
          const c = o.warm ? "255,196,110" : "255,150,70";
          g.addColorStop(0, `rgba(${c},${o.a})`);
          g.addColorStop(0.6, `rgba(${c},${o.a * 0.45})`);
          g.addColorStop(1, `rgba(${c},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, 6.2832); ctx.fill();
        });
      }
      requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);
  }

  /* =========================================================
     ANIMATIONS CINÉMATIQUES (GSAP + ScrollTrigger + Lenis)
     ========================================================= */
  function initMotion() {
    if (!hasGsap || reduced) return;
    const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("js-anim");

    // Smooth scroll
    if (typeof window.Lenis !== "undefined") {
      const lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      scrollToTarget = (el) => lenis.scrollTo(el, { offset: -(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72) + 2 });
      const stopStart = new MutationObserver(() => (document.body.classList.contains("nav-open") ? lenis.stop() : lenis.start()));
      stopStart.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }

    // Intro du hero
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-burger", { y: 90, scale: 1.12, opacity: 0, duration: 2, ease: "power2.out" }, 0)
      .from(".nav", { yPercent: -100, duration: 0.9, clearProps: "transform" }, 0.3)
      .from(".eyebrow", { y: 20, opacity: 0, duration: 0.8 }, 0.35)
      .from(".hero-title .ln > span", { yPercent: 115, duration: 1.25, stagger: 0.14, ease: "power4.out" }, 0.45)
      .from(".hero-city", { y: 18, opacity: 0, duration: 0.9 }, 1.1)
      .from(".hero-sub", { y: 18, opacity: 0, duration: 0.8 }, 1.3)
      .from(".hero .cta-row .btn", { y: 22, opacity: 0, duration: 0.7, stagger: 0.1, clearProps: "transform,opacity" }, 1.45)
      .from(".hero .status-pill", { y: 14, opacity: 0, duration: 0.7 }, 1.8);

    // Hero : parallaxe au scroll
    gsap.to(".hero-burger", { yPercent: 14, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero-inner", { y: -70, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 20%", scrub: true } });

    // Révélations génériques
    $$(".rv").forEach((el) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    // Photo du bandeau : zoom lent
    $$("[data-zoom]").forEach((img) => {
      gsap.fromTo(img, { scale: 1.02 }, { scale: 1.16, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 } });
    });

    // Chaque burger : gros plan qui s'agrandit, ingrédients un par un, prix en dernier
    $$(".burger").forEach((sec) => {
      const shot = $(".burger-shot img", sec);
      const bg = $(".burger-bg img", sec);
      const fig = $(".burger-shot figure", sec);
      const info = $(".burger-info", sec);
      gsap.fromTo(shot, { scale: 1 }, { scale: 1.18, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: sec, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(fig, { clipPath: "inset(16% 16% 16% 16% round 24px)", opacity: 0, y: 40, duration: 1.3, ease: "power3.out", clearProps: "clipPath", scrollTrigger: { trigger: sec, start: "top 70%", once: true } });
      const t = gsap.timeline({ scrollTrigger: { trigger: info, start: "top 80%", once: true } });
      t.from($$(".bnum, .bname, .btag", info), { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" })
        .from($$(".ing li", info), { x: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.35")
        .from($$(".als", info), { opacity: 0, y: 12, duration: 0.5 }, "-=0.1")
        .from($$(".bprice", info), { y: 26, opacity: 0, duration: 0.9, ease: "power3.out" }, ">-0.05");
    });

    // Cartes dorées + pastilles
    const stagger = (sel) => {
      const els = $$(sel);
      if (!els.length) return;
      gsap.set(els, { opacity: 0, y: 40 });
      ScrollTrigger.batch(els, {
        start: "top 92%", once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity" }),
      });
    };
    stagger(".card");
    stagger(".pills li");

    // Après un changement d'onglet : recalcul des positions
    let t2;
    afterTabChange = () => { clearTimeout(t2); t2 = setTimeout(() => ScrollTrigger.refresh(), 120); };

    window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* =========================================================
     DÉMARRAGE
     ========================================================= */
  async function start() {
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    updateStatus(); setInterval(updateStatus, 60000);
    initNav(); initScrollUI(); initCursor(); initHeroVideo(); initBokeh();

    try {
      MENU = window.MENU_DATA;
      if (!MENU) throw new Error("data/menu.js introuvable ou invalide");
      renderBurgers();
      renderPanels();
      injectMenuSchema();
    } catch (e) {
      console.warn("[La Pause d'Angel] carte :", e);
      menuError();
    }

    initTabs();
    initCardGlow();
    initMotion();

    // Lien direct vers un onglet (#enfant, #accompagnements, #boissons)
    const h = location.hash.replace("#", "");
    if (MENU && ["enfant", "accompagnements", "boissons"].includes(h)) {
      activateTab(h);
      setTimeout(() => scrollToTarget($("#carte")), 400);
    }
  }

  start();
})();
