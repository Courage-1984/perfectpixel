/* Perfect Pixel & Web — Main JavaScript */

'use strict';

/* ============================================================
   Navigation: scroll state & hamburger
   ============================================================ */

(function initNav() {
  const nav  = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link, .nav__mobile-cta');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
    // Init on load
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link highlighting
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/$/, '') || '/';
    if (currentPath === linkPath || (linkPath !== '' && linkPath !== '/' && currentPath.includes(linkPath))) {
      link.classList.add('active');
    }
  });
})();

/* ============================================================
   Scroll Reveal
   ============================================================ */

(function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   Before/After Comparison Slider
   ============================================================ */

function initComparisonSlider(widget) {
  if (!widget) return;

  const beforeWrap  = widget.querySelector('.comparison-widget__before-wrap');
  const divider     = widget.querySelector('.comparison-widget__divider');
  const handle      = widget.querySelector('.comparison-widget__handle');
  let isDragging = false;

  function setPosition(x) {
    const rect = widget.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));

    if (beforeWrap) {
      beforeWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }
    if (divider) divider.style.left = pct + '%';
    if (handle)  handle.style.left  = pct + '%';
  }

  // Set initial position
  setPosition(widget.getBoundingClientRect().left + widget.getBoundingClientRect().width * 0.5);

  function onStart(e) {
    isDragging = true;
    widget.style.cursor = 'ew-resize';
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  }

  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  }

  function onEnd() {
    isDragging = false;
    widget.style.cursor = 'ew-resize';
  }

  widget.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  widget.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchmove', onMove, { passive: false });
  document.addEventListener('touchend', onEnd);
}

// Init all comparison sliders on the page
document.querySelectorAll('.comparison-widget').forEach(initComparisonSlider);

/* ============================================================
   FAQ Accordion
   ============================================================ */

(function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ============================================================
   Tabs
   ============================================================ */

(function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      const container = btn.closest('.tabs-container') || document;

      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const content = container.querySelector(`#${tabId}`) ||
                      document.querySelector(`#${tabId}`);
      if (content) content.classList.add('active');
    });
  });
})();

/* ============================================================
   Counter Animation (stats)
   ============================================================ */

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ============================================================
   Upload Zone
   ============================================================ */

(function initUploadZone() {
  document.querySelectorAll('.upload-zone').forEach(zone => {
    const input = zone.querySelector('input[type="file"]');

    zone.addEventListener('dragover', e => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('dragover');
      if (input && e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        updateZoneLabel(zone, e.dataTransfer.files[0].name);
      }
    });

    zone.addEventListener('click', e => {
      if (e.target !== input) input && input.click();
    });

    if (input) {
      input.addEventListener('change', () => {
        if (input.files.length) {
          updateZoneLabel(zone, input.files[0].name);
        }
      });
    }
  });

  function updateZoneLabel(zone, filename) {
    const title = zone.querySelector('.upload-zone__title');
    const sub   = zone.querySelector('.upload-zone__sub');
    if (title) title.textContent = filename;
    if (sub)   sub.textContent  = 'Click to change file';
    zone.style.borderColor = 'var(--color-purple)';
  }
})();

/* ============================================================
   Contact Form Submission
   ============================================================ */

(function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Collect form data
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // Save to table API
      await fetch('tables/contact_requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      showNotification('✅ Message sent! We\'ll reply within 24 hours.', 'success');
      form.reset();
    } catch (err) {
      showNotification('⚠️ Something went wrong. Please email us directly.', 'error');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
})();

/* ============================================================
   Notification Toast
   ============================================================ */

function showNotification(message, type = 'success') {
  const existing = document.querySelector('.pp-notification');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'pp-notification';
  el.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
    background: ${type === 'success' ? '#1a2e1a' : '#2e1a1a'};
    border: 1px solid ${type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};
    color: ${type === 'success' ? '#86efac' : '#fca5a5'};
    padding: 1rem 1.5rem; border-radius: 12px;
    font-size: 0.9375rem; font-weight: 500;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: fadeInUp 0.3s ease;
    max-width: 400px;
  `;
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}

/* ============================================================
   Smooth anchor scrolling
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
