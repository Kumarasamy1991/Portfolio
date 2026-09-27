/* =========================================================
   Kumarasamy B — Single-Page Portfolio — script.js
   Vanilla JavaScript only
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);
  window.addEventListener('load', hideLoader);

  function init() {
    setYear();
    initMobileMenu();
    initTypingAnimation();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initSkillFilter();
    initProjectFilter();
    initProjectModal();
    initContactForm();
    initBackToTop();
    initActiveNav();
    initHeaderShadowOnScroll();
  }

  /* ---------- Page loader ---------- */
  function hideLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    setTimeout(function () { loader.classList.add('is-hidden'); }, 350);
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header shadow after scroll ---------- */
  function initHeaderShadowOnScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      header.style.borderBottomColor = window.scrollY > 20 ? 'rgba(231,236,243,0.18)' : 'rgba(231,236,243,0.10)';
    }, { passive: true });
  }

  /* ---------- Typing animation ---------- */
  function initTypingAnimation() {
    var el = document.getElementById('typed-text');
    if (!el) return;
    var phrases = ['React Frontend Developer', 'UI Developer', 'Frontend Specialist'];
    var phraseIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 75);
    }
    tick();
  }

  /* ---------- Generic scroll reveal ---------- */
  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .tl-item, .skill-card');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    var counters = document.querySelectorAll('.stat-num[data-target]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { io.observe(c); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- Skill bar fill ---------- */
  function initSkillBars() {
    var bars = document.querySelectorAll('.skill-bar-fill');
    if (!bars.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            el.style.width = el.getAttribute('data-level') + '%';
            io.unobserve(el);
          }
        });
      }, { threshold: 0.4 });
      bars.forEach(function (b) { io.observe(b); });
    } else {
      bars.forEach(function (b) { b.style.width = b.getAttribute('data-level') + '%'; });
    }
  }

  /* ---------- Skills category filter ---------- */
  function initSkillFilter() {
    var buttons = document.querySelectorAll('#skills .filter-btn');
    var cards = document.querySelectorAll('.skill-card');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var show = (cat === 'all' || card.getAttribute('data-category') === cat);
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Project filter (All | React | JavaScript | UI) ---------- */
  function initProjectFilter() {
    var buttons = document.querySelectorAll('#projects .filter-btn');
    var cards = document.querySelectorAll('.project-card');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
          var cats = (card.getAttribute('data-category') || '').split(' ');
          var show = (cat === 'all' || cats.indexOf(cat) !== -1);
          if (show) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ---------- Project detail modal ---------- */
  function initProjectModal() {
    var overlay = document.getElementById('project-modal');
    if (!overlay) return;
    var titleEl = document.getElementById('modal-title');
    var descEl = document.getElementById('modal-desc');
    var tagsEl = document.getElementById('modal-tags');

    document.querySelectorAll('.view-project-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.project-card');
        titleEl.textContent = card.getAttribute('data-title');
        descEl.textContent = card.getAttribute('data-full');
        var tags = (card.getAttribute('data-tags') || '').split(',');
        tagsEl.innerHTML = '';
        tags.forEach(function (t) {
          if (!t.trim()) return;
          var span = document.createElement('span');
          span.className = 'tag';
          span.textContent = t.trim();
          tagsEl.appendChild(span);
        });
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-modal-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ---------- Contact form validation ---------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var rules = [
        { id: 'name', check: function (v) { return v.trim().length > 1; } },
        { id: 'email', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
        { id: 'phone', check: function (v) { return v.trim().length === 0 || /^[0-9+\-\s()]{7,15}$/.test(v); } },
        { id: 'subject', check: function (v) { return v.trim().length > 2; } },
        { id: 'message', check: function (v) { return v.trim().length > 9; } }
      ];

      rules.forEach(function (rule) {
        var input = document.getElementById(rule.id);
        var wrap = input.closest('.field');
        var ok = rule.check(input.value);
        wrap.classList.toggle('has-error', !ok);
        if (!ok) valid = false;
      });

      var successMsg = document.getElementById('form-success');
      if (valid) {
        var firstName = document.getElementById('name').value.trim().split(' ')[0];
        var email = document.getElementById('email').value.trim();
        successMsg.textContent = 'Thanks, ' + firstName + '! Your message has been noted. I\'ll get back to you soon at ' + email + '.';
        successMsg.classList.add('is-visible');
        form.reset();
      } else {
        successMsg.classList.remove('is-visible');
      }
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 480);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Active nav highlighting ---------- */
  function initActiveNav() {
    var sections = document.querySelectorAll('main section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navLinks.length) return;

    function setActive(id) {
      navLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { threshold: 0.35, rootMargin: '-74px 0px -40% 0px' });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

})();
