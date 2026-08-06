/* ==========================================================================
   SHINN — Checkout
   Client-side only: validates the form and simulates order placement.
   A real deployment would post this payload to a payments/order API.
   ========================================================================== */

function miniLine(line) {
  const p = getProduct(line.productId);
  if (!p) return '';
  const color = p.colors.find(c => c.id === line.color) || p.colors[0];
  return `
    <div class="mini-line">
      <img src="${imgUrl(color.img, 200)}" alt="${p.name}">
      <div class="flex1">
        <div>${p.name}</div>
        <div class="muted">${color.label} · ${line.size} · Qty ${line.qty}</div>
      </div>
      <div>${formatPrice(p.price * line.qty)}</div>
    </div>
  `;
}

function renderCheckoutSummary() {
  const lines = Cart.read();
  if (!lines.length) {
    window.location.href = 'cart.html';
    return;
  }
  const subtotal = Cart.subtotal();
  const shipping = subtotal >= 150 ? 0 : 8;
  const total = subtotal + shipping;

  document.getElementById('checkout-lines').innerHTML = lines.map(miniLine).join('');
  document.getElementById('checkout-summary-rows').innerHTML = `
    <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
    <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
    <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
  `;
}

function selectPayMethod(el) {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('is-selected'));
  el.classList.add('is-selected');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();

  document.querySelectorAll('.pay-method').forEach(m => m.addEventListener('click', () => selectPayMethod(m)));

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    document.getElementById('place-order-btn').textContent = 'Placing order…';
    setTimeout(() => {
      localStorage.removeItem(CART_KEY);
      window.location.href = 'order-confirmation.html';
    }, 900);
  });
});
