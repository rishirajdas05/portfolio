/* =============================================
   PORTFOLIO SCRIPT — Rishi Raj Das
   ============================================= */

// ---- Custom Cursor ----
const cursorDot = document.createElement('div');
cursorDot.className = 'cursor';
const cursorRing = document.createElement('div');
cursorRing.className = 'cursor-ring';
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .project-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

// ---- Nav Scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- Mobile Nav ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ---- Reveal on Scroll ----
const revealSelectors = [
  '.section-label', '.section-heading', '.about-text', '.about-pills',
  '.about-links', '.about-image-wrap', '.project-card', '.skill-group',
  '.timeline-item', '.cert-item', '.contact-left', '.contact-form', '.stat',
];
revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 0.07) + 's';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Typing Effect on Hero Role ----
const roleEl = document.getElementById('hero-role');
const roles = [
  'Python Developer',
  'Django Backend Engineer',
  'AI / ML Builder',
  'Cybersecurity Practitioner',
  'REST API Specialist',
];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const current = roles[roleIndex];
  roleEl.textContent = deleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);

  if (!deleting) {
    charIndex++;
    if (charIndex === current.length) {
      setTimeout(() => { deleting = true; typeRole(); }, 2400);
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 48 : 85);
}
setTimeout(typeRole, 1200);

// ---- Active Nav Link ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });

// ---- Parallax on Hero BG text ----
const heroBgText = document.querySelector('.hero-bg-text');
window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.3}px))`;
  }
}, { passive: true });

// ---- Contact Form ----
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.textContent = 'Sent!';
    formSuccess.classList.add('visible');
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.opacity = '1';
      formSuccess.classList.remove('visible');
    }, 4000);
  }, 1200);
});

// ---- Page Load Fade ----
document.body.style.opacity = '0';
window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.6s ease';
  document.body.style.opacity = '1';
});