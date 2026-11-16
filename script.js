(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  /* ----- Theme toggle ----- */
  var themeBtn = document.getElementById('themeToggle');
  function syncThemeBtn() {
    var dark = doc.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  syncThemeBtn();
  themeBtn.addEventListener('click', function () {
    var next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    doc.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeBtn();
  });

  /* ----- Mobile nav ----- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ----- Scroll progress ----- */
  var progress = document.getElementById('progress');
  function onScroll() {
    var h = doc.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Reveal on scroll ----- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ----- Skill bars ----- */
  var skills = document.querySelector('.skills');
  if (skills) {
    if ('IntersectionObserver' in window && !reduce) {
      new IntersectionObserver(function (en, obs) {
        if (en[0].isIntersecting) { skills.classList.add('in'); obs.disconnect(); }
      }, { threshold: 0.3 }).observe(skills);
    } else { skills.classList.add('in'); }
  }

  /* ----- Count-up stats ----- */
  var counters = document.querySelectorAll('[data-count]');
  function animate(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); cio.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ----- Publication filter ----- */
  var filters = document.querySelectorAll('.filter');
  var pubs = document.querySelectorAll('.pub');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', String(on));
      });
      pubs.forEach(function (p) {
        p.hidden = !(f === 'all' || p.getAttribute('data-year') === f);
      });
    });
  });

  /* ----- Active nav link ----- */
  var links = document.querySelectorAll('.nav-menu a[href^="#"]:not(.btn)');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) sio.observe(s);
    });
  }

  /* ----- Contact form (mailto, no backend) ----- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var TO = 'prajith@example.com'; // TODO: replace with the real address
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = form.name.value.trim(), m = form.email.value.trim(), msg = form.message.value.trim();
    if (!n || !/^\S+@\S+\.\S+$/.test(m) || !msg) {
      status.textContent = 'Please enter your name, a valid email and a message.';
      return;
    }
    var subject = encodeURIComponent('Website enquiry from ' + n);
    var body = encodeURIComponent(msg + '\n\n' + n + ' (' + m + ')');
    status.textContent = 'Opening your email app...';
    window.location.href = 'mailto:' + TO + '?subject=' + subject + '&body=' + body;
  });

  /* ----- Footer year ----- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
