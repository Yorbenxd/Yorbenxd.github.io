/* =============================================
   main.js — Portfolio site scripts
   ============================================= */

// --- Helpers ---

/**
 * Query shorthand.
 * @param {string} selector
 * @param {Document|Element} [root=document]
 * @returns {Element|null}
 */
function qs(selector, root = document) {
  return root.querySelector(selector);
}

// --- Year in footer ---
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// --- Navbar include & initialization ---
function loadNavbar() {
  const base = window.location.pathname.includes('/pages/') ? '../' : '';
  const url = base + 'partials/navbar.html';
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Failed to load navbar');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('navbar-include');
      if (container) container.innerHTML = html;
    })
    .catch(() => {
      // silently ignore failure
    });
}

function initNavbar() {
  const navToggle = qs('.nav-toggle');
  const mainNav   = qs('.main-nav', document);

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when a link inside it is clicked
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active nav link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

loadNavbar().then(initNavbar);
// --- Footer include ---
function loadFooter() {
  const base = window.location.pathname.includes('/pages/') ? '../' : '';
  const url = base + 'partials/footer.html';
  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Failed to load footer');
      return res.text();
    })
    .then(html => {
      const container = document.getElementById('footer-include');
      if (container) container.innerHTML = html;
    })
    .catch(() => {
      // ignore
    });
}

loadFooter().then(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// --- Contact form (client-side demo) ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  // Create feedback element if not present
  let feedback = qs('.form-message', contactForm.parentElement);
  if (!feedback) {
    feedback = document.createElement('p');
    feedback.className = 'form-message';
    contactForm.after(feedback);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFeedback(feedback, 'error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showFeedback(feedback, 'error', 'Please enter a valid email address.');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    fetch(contactForm.action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: new FormData(contactForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        showFeedback(feedback, 'success', `Bedankt, ${name}! Je bericht is verstuurd.`);
        contactForm.reset();
      })
      .catch(() => {
        showFeedback(feedback, 'error', 'Verzenden mislukt. Probeer het later opnieuw.');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      });
  });
}

/**
 * Show a feedback message below the form.
 * @param {HTMLElement} el
 * @param {'success'|'error'} type
 * @param {string} msg
 */
function showFeedback(el, type, msg) {
  el.className = `form-message ${type}`;
  el.textContent = msg;
  el.style.display = 'block';
}

/**
 * Basic email format check.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Scroll-reveal animation ---
(function initScrollReveal() {
  const targets = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .activity-card');

  if (!targets.length || !('IntersectionObserver' in window)) return;

  targets.forEach(el => {
    el.style.opacity  = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
})();
