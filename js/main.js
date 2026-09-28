/* ==========================================================================
   Cool Climate AC Services - site behaviour

   Business details are read from the data-* attributes on <body> in index.html,
   so there is one place to edit them. Every link in the HTML also works without
   JavaScript; this script only tidies numbers, wires up WhatsApp, the mobile
   menu, scroll effects and the enquiry form.
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var qs = function (s, r) { return (r || document).querySelector(s); };
  var qsa = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var cfg = {
    business: body.getAttribute('data-business') || 'Cool Climate AC Services',
    phone: body.getAttribute('data-phone') || '',
    whatsapp: body.getAttribute('data-whatsapp') || '',
    email: body.getAttribute('data-email') || '',
    address: body.getAttribute('data-address') || '',
    waMessage: body.getAttribute('data-wa-message') ||
      'Hello, I would like to enquire about AC sales/service. Please share more details.'
  };

  function isPlaceholder(v) { return !v || /^\s*\[.*\]\s*$/.test(v); }
  function digits(v) { return (v || '').replace(/\D/g, ''); }
  function telHref(v) { return 'tel:' + (/^\s*\+/.test(v) ? '+' : '') + digits(v); }
  function waHref(message) {
    return 'https://wa.me/' + digits(cfg.whatsapp) + '?text=' + encodeURIComponent(message);
  }

  /* ---- 1. Business details -------------------------------------------- */
  qsa('[data-bind]').forEach(function (el) {
    var key = el.getAttribute('data-bind');
    if (cfg[key]) el.textContent = cfg[key];
  });

  if (!isPlaceholder(cfg.phone)) {
    qsa('[data-tel]').forEach(function (a) { a.setAttribute('href', telHref(cfg.phone)); });
  }
  if (!isPlaceholder(cfg.email)) {
    qsa('[data-mail]').forEach(function (a) { a.setAttribute('href', 'mailto:' + cfg.email.trim()); });
  }

  var waConfigured = !isPlaceholder(cfg.whatsapp) && digits(cfg.whatsapp).length >= 10;
  qsa('[data-wa]').forEach(function (a) {
    if (waConfigured) {
      a.setAttribute('href', waHref(cfg.waMessage));
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    } else {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.alert('WhatsApp number is not set up yet.\n\nOpen index.html and replace [WHATSAPP NUMBER] on the <body> tag with the business number, e.g. 919876543210.');
      });
    }
  });
  if (!waConfigured && window.console) {
    console.warn('[Cool Climate] Replace the [WHATSAPP NUMBER], [PHONE NUMBER], [EMAIL] and [ADDRESS] placeholders on the <body> tag in index.html.');
  }

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

  /* "Home" scrolls to the very top */
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
  if (reveals.length && !reduceMotion && 'IntersectionObserver' in window) {
    qsa('.reveal-stagger').forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) { child.style.setProperty('--i', i); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- 5. Enquiry form -------------------------------------------------- */
  var form = qs('#enquiry-form');
  var status = qs('#form-status');

  if (form && status) {
    var f = {
      name: qs('#f-name'),
      phone: qs('#f-phone'),
      service: qs('#f-service'),
      type: qs('#f-type'),
      message: qs('#f-message')
    };

    var setError = function (input, msg) {
      var field = input.closest('.field');
      var err = field ? field.querySelector('.error') : null;
      if (field) field.classList.toggle('has-error', !!msg);
      if (err) err.textContent = msg || '';
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    };

    var validate = function () {
      var ok = true;
      if (!f.name.value.trim()) { setError(f.name, 'Please enter your name.'); ok = false; } else setError(f.name, '');
      var ph = digits(f.phone.value);
      if (ph.length < 10 || ph.length > 13) { setError(f.phone, 'Please enter a valid 10-digit mobile number.'); ok = false; } else setError(f.phone, '');
      if (!f.service.value) { setError(f.service, 'Please choose the service you need.'); ok = false; } else setError(f.service, '');
      if (!ok) {
        var first = form.querySelector('.has-error input, .has-error select');
        if (first) first.focus();
      }
      return ok;
    };

    ['name', 'phone', 'service'].forEach(function (k) {
      f[k].addEventListener('input', function () {
        var field = this.closest('.field');
        if (field && field.classList.contains('has-error')) validate();
      });
    });

    var showStatus = function (msg, type) {
      status.textContent = msg;
      status.className = 'form-status' + (type ? ' ' + type : '');
    };

    var composeMessage = function () {
      return 'Hello ' + cfg.business + ', I would like to make a service enquiry.\n\n' +
        'Name: ' + f.name.value.trim() + '\n' +
        'Phone: ' + f.phone.value.trim() + '\n' +
        'Service: ' + f.service.value + '\n' +
        'AC type: ' + (f.type.value || 'Not sure') + '\n' +
        'Details: ' + (f.message.value.trim() || '-') + '\n\n' +
        'Sent from the website enquiry form.';
    };

    var waBtn = qs('#send-wa');
    if (waBtn) {
      waBtn.addEventListener('click', function () {
        if (!validate()) return;
        if (!waConfigured) {
          showStatus('WhatsApp is not set up on this site yet. Please call or email us instead.', 'err');
          return;
        }
        var url = waHref(composeMessage());
        var win = window.open(url, '_blank', 'noopener');
        if (!win) window.location.href = url;
        showStatus('Opening WhatsApp with your enquiry filled in. Just press send.', 'ok');
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      var btn = qs('#send-email');
      var original = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      showStatus('', '');

      var fallback = ' Please use the WhatsApp button or call us.';
      fetch(form.getAttribute('action') || 'send-enquiry.php', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (r) {
          return r.json().then(function (j) {
            if (!r.ok || !j.ok) throw new Error(j && j.error ? j.error : 'Could not send the email right now.');
          }, function () { throw new Error('Could not send the email right now.'); });
        })
        .then(function () {
          form.reset();
          showStatus('Thanks, your enquiry has been sent. We will get back to you shortly.', 'ok');
        })
        .catch(function (err) {
          showStatus((err && err.message ? err.message : 'Could not send the email right now.') + fallback, 'err');
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.innerHTML = original; }
        });
    });
  }

  /* ---- 6. Footer year --------------------------------------------------- */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
