/* ==========================================================================
   SHINN — Shared chrome
   Header and footer are rendered from one template so nav links, the
   announcement bar, and footer copy only ever need to change in one place.
   ========================================================================== */

const THEME_KEY = 'shinn_theme';

function getPreferredTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {}
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Applied again here (in addition to the inline head script) so pages
// without the inline snippet still get the right theme before paint.
applyTheme(getPreferredTheme());

const NAV_LINKS = [
  { href: 'shop.html?dept=women', label: 'Women' },
  { href: 'shop.html?dept=men', label: 'Men' },
  { href: 'shop.html?dept=accessories', label: 'Accessories' },
  { href: 'shop.html?dept=footwear', label: 'Footwear' },
  { href: 'shop.html?filter=new', label: 'New In' },
];

function renderHeader(current = '') {
  const mount = document.getElementById('site-header');
  if (!mount) return;
  mount.innerHTML = `
    <div class="announce-bar">Free shipping on orders over $150 &nbsp;·&nbsp; 30-day returns</div>
    <header class="site-header">
      <div class="wrap header-inner">
        <button class="icon-btn nav-toggle" aria-label="Open menu" data-open-nav>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <a href="index.html" class="logo">SHINN</a>
        <nav class="primary-nav" aria-label="Primary">
          ${NAV_LINKS.map(l => `<a href="${l.href}" ${current === l.label ? 'aria-current="page"' : ''}>${l.label}</a>`).join('')}
        </nav>
        <div class="header-actions">
          <form class="search-bar" role="search" action="shop.html" method="get">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input type="search" name="q" placeholder="Search products">
          </form>
          <a class="icon-btn" href="shop.html" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </a>
          <button class="icon-btn theme-toggle" type="button" data-toggle-theme aria-label="Toggle dark mode">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.9 4.9l1.85 1.85M17.25 17.25l1.85 1.85M2.5 12h2.6M18.9 12h2.6M4.9 19.1l1.85-1.85M17.25 6.75l1.85-1.85"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>
          </button>
          <a class="icon-btn" href="#" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.6-4 5-6 8-6s6.4 2 8 6"/></svg>
          </a>
          <a class="icon-btn" href="cart.html" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17.5" cy="19.5" r="1.5"/></svg>
            <span class="cart-count" data-cart-count>0</span>
          </a>
        </div>
      </div>
    </header>
    <div class="mobile-nav" data-mobile-nav>
      <div class="mobile-nav__scrim" data-close-nav></div>
      <div class="mobile-nav__panel">
        <button class="icon-btn mobile-nav__close" data-close-nav aria-label="Close menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        ${NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join('')}
      </div>
    </div>
  `;

  const drawer = mount.querySelector('[data-mobile-nav]');
  mount.querySelectorAll('[data-open-nav]').forEach(b => b.addEventListener('click', () => drawer.classList.add('is-open')));
  mount.querySelectorAll('[data-close-nav]').forEach(b => b.addEventListener('click', () => drawer.classList.remove('is-open')));
  mount.querySelectorAll('[data-toggle-theme]').forEach(b => b.addEventListener('click', toggleTheme));
}

function renderFooter() {
  const mount = document.getElementById('site-footer');
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-top">
        <div class="footer-brand">
          <span class="logo">SHINN</span>
          <p>Considered clothing, made to be worn for years rather than seasons. Designed in small batches, shipped worldwide.</p>
          <div class="footer-newsletter">
            <input type="email" placeholder="Email address" aria-label="Email address">
            <button class="btn btn-secondary btn-sm" style="border-color:rgba(255,255,255,.4); color:#fff;">Join</button>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="shop.html?dept=women">Women</a>
          <a href="shop.html?dept=men">Men</a>
          <a href="shop.html?dept=accessories">Accessories</a>
          <a href="shop.html?dept=footwear">Footwear</a>
        </div>
        <div class="footer-col">
          <h4>Help</h4>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">Size Guide</a>
          <a href="#">Track Order</a>
          <a href="#">Contact Us</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="#">Our Story</a>
          <a href="#">Materials</a>
          <a href="#">Stores</a>
          <a href="#">Careers</a>
        </div>
      </div>
      <div class="wrap footer-bottom">
        <span>&copy; 2026 Shinn Goods Co.</span>
        <span>Privacy &nbsp;·&nbsp; Terms</span>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader(document.body.dataset.nav || '');
  renderFooter();
});
