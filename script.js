const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  nav.classList.toggle('is-open', !expanded);
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}));

document.getElementById('year').textContent = new Date().getFullYear();

const productFilm = document.querySelector('.film-frame video');

if (productFilm) {
  const startProductFilm = () => {
    productFilm.muted = true;
    productFilm.defaultMuted = true;
    productFilm.play().catch(() => {});
  };

  productFilm.addEventListener('canplay', startProductFilm, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) startProductFilm();
  });
  startProductFilm();
}

const scanVideo = document.querySelector('.scan-source video');
const scanCards = document.querySelectorAll('.scan-result');
const compactSignals = window.matchMedia('(max-width: 1024px)');
let scanHasStarted = false;

function revealScanInsights() {
  if (scanHasStarted) return;
  scanHasStarted = true;

  if (compactSignals.matches) {
    startCompactSignalCarousel();
    return;
  }

  scanCards.forEach((card, index) => {
    window.setTimeout(() => card.classList.add('is-visible'), (index + 1) * 1000);
  });

  window.setTimeout(startSignalHighlightLoop, scanCards.length * 1000 + 450);
}

function startCompactSignalCarousel() {
  let activeIndex = 0;

  function showNextSignal() {
    const card = scanCards[activeIndex];
    card.classList.add('is-mobile-active');
    window.setTimeout(() => card.classList.remove('is-mobile-active'), 1500);
    activeIndex = (activeIndex + 1) % scanCards.length;
    window.setTimeout(showNextSignal, 1700);
  }

  showNextSignal();
}

function startSignalHighlightLoop() {
  let activeIndex = 0;

  function highlightNextSignal() {
    const card = scanCards[activeIndex];
    card.classList.add('is-highlighted');
    window.setTimeout(() => card.classList.remove('is-highlighted'), 560);
    activeIndex = (activeIndex + 1) % scanCards.length;
    window.setTimeout(highlightNextSignal, 1000);
  }

  highlightNextSignal();
}

if (scanVideo) {
  scanVideo.addEventListener('playing', revealScanInsights, { once: true });
  if (scanVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && !scanVideo.paused) {
    revealScanInsights();
  }
}
