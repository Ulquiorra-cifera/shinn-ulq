/* ==========================================================================
   SHINN — Cart page
   ========================================================================== */

const FREE_SHIP_THRESHOLD = 150;
const SHIP_COST = 8;
const TAX_RATE = 0.0;

let promoApplied = false;

function cartLineRow(line) {
  const p = getProduct(line.productId);
  if (!p) return '';
  const color = p.colors.find(c => c.id === line.color) || p.colors[0];
  return `
    <div class="cart-line" data-key="${line.key}">
      <a href="product.html?id=${p.id}"><img src="${imgUrl(color.img, 300)}" alt="${p.name}"></a>
      <div>
        <a href="product.html?id=${p.id}" class="cart-line-name">${p.name}</a>
        <div class="cart-line-meta">${color.label} · Size ${line.size}</div>
        <div class="cart-line-controls">
          <div class="qty-row">
            <button data-qty-minus aria-label="Decrease quantity">&minus;</button>
            <span>${line.qty}</span>
            <button data-qty-plus aria-label="Increase quantity">&plus;</button>
          </div>
          <button class="cart-line-remove" data-remove>Remove</button>
        </div>
      </div>
      <div class="cart-line-price">${formatPrice(p.price * line.qty)}</div>
    </div>
  `;
}

function renderCart() {
  const lines = Cart.read();
  const main = document.getElementById('cart-main');
  const summaryWrap = document.getElementById('cart-summary-wrap');

  if (!lines.length) {
    main.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 3H2"/><circle cx="9.5" cy="19.5" r="1.5"/><circle cx="17.5" cy="19.5" r="1.5"/></svg>
        <h2>Your bag is empty</h2>
        <p>Items you add will show up here.</p>
        <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
      </div>`;
    summaryWrap.style.display = 'none';
    return;
  }

  summaryWrap.style.display = '';
  main.innerHTML = `<h1 class="h-display" style="font-size:var(--step-3); margin-bottom:8px;">Your Bag</h1>
    <p class="result-count" style="margin-bottom:8px;">${Cart.count()} item${Cart.count() === 1 ? '' : 's'}</p>
    ${lines.map(cartLineRow).join('')}`;

  main.querySelectorAll('[data-qty-minus]').forEach(btn => btn.addEventListener('click', () => {
    const key = btn.closest('[data-key]').dataset.key;
    const line = Cart.read().find(l => l.key === key);
    Cart.updateQty(key, line.qty - 1);
  }));
  main.querySelectorAll('[data-qty-plus]').forEach(btn => btn.addEventListener('click', () => {
    const key = btn.closest('[data-key]').dataset.key;
    const line = Cart.read().find(l => l.key === key);
    Cart.updateQty(key, line.qty + 1);
  }));
  main.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
    Cart.remove(btn.closest('[data-key]').dataset.key);
    showToast('Item removed');
  }));

  renderSummary();
}

function renderSummary() {
  const subtotal = Cart.subtotal();
  const shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_COST);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + shipping + tax;

  document.getElementById('summary-body').innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    ${promoApplied ? `<div class="summary-row"><span>Promo (WELCOME10)</span><span>&minus;${formatPrice(discount)}</span></div>` : ''}
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
    ${subtotal < FREE_SHIP_THRESHOLD ? `<p style="font-size:0.75rem; color:var(--ink-soft); margin-top:-4px;">Add ${formatPrice(FREE_SHIP_THRESHOLD - subtotal)} more for free shipping</p>` : ''}
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  window.addEventListener('cart:change', renderCart);

  document.getElementById('promo-apply').addEventListener('click', () => {
    const input = document.getElementById('promo-input');
    if (input.value.trim().toUpperCase() === 'WELCOME10') {
      promoApplied = true;
      showToast('Promo code applied');
      renderSummary();
    } else {
      showToast('Invalid promo code');
    }
  });
});
