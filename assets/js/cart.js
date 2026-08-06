/* ==========================================================================
   SHINN — Cart
   Small localStorage-backed cart store. Line items are keyed by
   product id + color + size so the same product in two sizes is two lines.
   ========================================================================== */

const CART_KEY = 'shinn_cart_v1';

const Cart = {
  read() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  write(lines) {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
    Cart.updateBadge();
    window.dispatchEvent(new CustomEvent('cart:change', { detail: lines }));
  },

  lineKey(productId, color, size) {
    return `${productId}__${color}__${size}`;
  },

  add(productId, color, size, qty = 1) {
    const lines = Cart.read();
    const key = Cart.lineKey(productId, color, size);
    const existing = lines.find(l => l.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      lines.push({ key, productId, color, size, qty });
    }
    Cart.write(lines);
  },

  updateQty(key, qty) {
    let lines = Cart.read();
    if (qty <= 0) {
      lines = lines.filter(l => l.key !== key);
    } else {
      const line = lines.find(l => l.key === key);
      if (line) line.qty = qty;
    }
    Cart.write(lines);
  },

  remove(key) {
    Cart.write(Cart.read().filter(l => l.key !== key));
  },

  count() {
    return Cart.read().reduce((sum, l) => sum + l.qty, 0);
  },

  subtotal() {
    return Cart.read().reduce((sum, l) => {
      const p = getProduct(l.productId);
      if (!p) return sum;
      return sum + p.price * l.qty;
    }, 0);
  },

  updateBadge() {
    document.querySelectorAll('[data-cart-count]').forEach(el => {
      const n = Cart.count();
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  },
};

document.addEventListener('DOMContentLoaded', Cart.updateBadge);

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="badge-dot"></span> ${message}`;
  toast.classList.add('is-visible');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function formatPrice(n) {
  return `$${n.toFixed(2)}`;
}
