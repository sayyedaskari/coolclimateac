/* ==========================================================================
   Cool Climate AC Services - site behaviour

   The WhatsApp number and messages live on the <body> tag in index.html.
   Every WhatsApp link in the HTML already works without JavaScript; this
   script upgrades the "book" links with a fill-in template, and runs the
   mobile menu, sticky header, scroll effects and the services photo swap.
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var qs = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var cfg = {
    number: (body.getAttribute('data-whatsapp') || '').replace(/\D/g, ''),
    display: body.getAttribute('data-whatsapp-display') || '',
    chat: body.getAttribute('data-wa-chat') || 'Hello, I would like to enquire about AC sales/service.',
    book: body.getAttribute('data-wa-book') || 'Hello, I would like to book an AC service.'
  };

  /* ---- 1. WhatsApp links ------------------------------------------------ */
  function message(kind) {
    // kind is "chat", "book", "book:<service>" or "type:<AC type>"
    var parts = (kind || 'chat').split(':');
    var mode = parts[0];
    var value = parts.slice(1).join(':').trim();
    if (mode === 'chat') return cfg.chat;
    return cfg.book + '\n\n' +
      'Service: ' + (mode === 'book' ? value : '') + '\n' +
      'AC type: ' + (mode === 'type' ? value : '') + '\n' +
      'Brand: \n' +
      'Issue or requirement: \n' +
      'Area in Mumbai: \n' +
      'Preferred date and time: ';
  }
  function waHref(kind) {
    return 'https://wa.me/' + cfg.number + '?text=' + encodeURIComponent(message(kind));
  }

  if (cfg.number.length >= 10) {
    qsa('[data-wa]').forEach(function (a) {
      a.setAttribute('href', waHref(a.getAttribute('data-wa')));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }
  qsa('[data-bind="whatsapp-display"]').forEach(function (el) { if (cfg.display) el.textContent = cfg.display; });

  /* ---- 2. Header: mobile menu and sticky shadow ------------------------ */
  var header = qs('.site-header');
  var toggle = qs('.nav-toggle');
  var nav = qs('#site-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () { setOpen(!body.classList.contains('nav-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (body.classList.contains('nav-open') && header && !header.contains(e.target)) setOpen(false);
    });
    var mq = window.matchMedia('(min-width: 900px)');
    var onMq = function () { if (mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  var sentinel = qs('.header-sentinel');
  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { rootMargin: '-10px 0px 0px 0px', threshold: 0 }).observe(sentinel);
  }

  qsa('a[href="#home"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    });
  });

  /* ---- 3. Active nav link while scrolling ------------------------------ */
  var navLinks = qsa('.site-nav a[href^="#"]');
  var sections = navLinks.map(function (a) { return qs(a.getAttribute('href')); }).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = '#' + en.target.id;
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === id); });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- 4. Reveal on scroll ---------------------------------------------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = qsa('.reveal, .reveal-stagger');
  qsa('.reveal-stagger').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) { child.style.setProperty('--i', i); });
  });
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- 5. Services: photo follows the hovered or focused row ----------- */
  var rows = qsa('.service-row');
  var visuals = qsa('.service-visual img');
  if (rows.length && visuals.length) {
    var activate = function (row) {
      var key = row.getAttribute('data-img');
      rows.forEach(function (r) { r.classList.toggle('is-active', r === row); });
      visuals.forEach(function (img) { img.classList.toggle('is-active', img.getAttribute('data-for') === key); });
    };
    rows.forEach(function (row) {
      row.addEventListener('mouseenter', function () { activate(row); });
      row.addEventListener('focusin', function () { activate(row); });
    });
    activate(rows[0]);
  }

  /* ---- 6. Social links: do nothing until real profile URLs are added ---- */
  qsa('[data-social]').forEach(function (a) {
    if (a.getAttribute('href') === '#') {
      a.removeAttribute('target');
      a.addEventListener('click', function (e) { e.preventDefault(); });
    }
  });

  /* ---- 7. Footer year --------------------------------------------------- */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
