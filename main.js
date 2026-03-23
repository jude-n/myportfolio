// ── THEME TOGGLE ──
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const toggleLabel = document.getElementById('toggleLabel');

const saved = localStorage.getItem('theme') || 'dark';
applyTheme(saved);

toggleBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (theme === 'light') {
    toggleIcon.textContent = '🌙';
    toggleLabel.textContent = 'Dark';
  } else {
    toggleIcon.textContent = '☀️';
    toggleLabel.textContent = 'Light';
  }
}

// ── SCROLL FADE-UP ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── NAV ACTIVE STATE ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
