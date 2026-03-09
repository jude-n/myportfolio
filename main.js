// ── THEME TOGGLE ──
const html = document.documentElement;
const btn = document.getElementById('themeToggle');
const label = document.getElementById('themeLabel');

// Respect system preference on first load
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initial = saved || (prefersDark ? 'dark' : 'light');
html.setAttribute('data-theme', initial);
label.textContent = initial === 'dark' ? 'Light' : 'Dark';

btn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  label.textContent = next === 'dark' ? 'Light' : 'Dark';
  localStorage.setItem('theme', next);
});

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 5 + 'px';
  cursor.style.top  = my - 5 + 'px';
});

function animateRing() {
  // Increased from 0.12 → 0.28 for faster, snappier trailing ring
  rx += (mx - rx - 18) * 0.28;
  ry += (my - ry - 18) * 0.28;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    cursorRing.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorRing.style.transform = 'scale(1)';
  });
});

// ── HERO SPOTLIGHT ──
const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');

if (hero && heroGlow) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move the glow to follow the cursor
    heroGlow.style.transition = 'left 0.08s ease, top 0.08s ease';
    heroGlow.style.left   = x + 'px';
    heroGlow.style.top    = y + 'px';
    heroGlow.style.transform = 'translate(-50%, -50%)';

    // Subtle tint shift on the grid bg
    const xPct = (x / rect.width)  * 100;
    const yPct = (y / rect.height) * 100;
    hero.style.setProperty('--mouse-x', `${xPct}%`);
    hero.style.setProperty('--mouse-y', `${yPct}%`);
  });

  hero.addEventListener('mouseleave', () => {
    // Drift back to center
    heroGlow.style.transition = 'left 1.2s ease, top 1.2s ease';
    heroGlow.style.left   = '50%';
    heroGlow.style.top    = '50%';
    heroGlow.style.transform = 'translate(-50%, -50%)';
  });
}

// ── SCROLL FADE-IN ──
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

setTimeout(() => {
  document.querySelectorAll('.hero .fade-up').forEach(el => el.classList.add('visible'));
}, 100);
