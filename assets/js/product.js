/* ==========================================================================
   SHINN — Product detail page
   ========================================================================== */

let currentProduct = null;
let selectedColor = null;
let selectedSize = null;
let selectedQty = 1;

function stars(rating) {
  const full = Math.round(rating);
  return '★★★★★☆☆☆☆☆'.slice(5 - full, 10 - full);
}

function renderProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  currentProduct = getProduct(id) || PRODUCTS[0];
  const p = currentProduct;
  selectedColor = p.colors[0].id;
  selectedSize = null;
  selectedQty = 1;

  document.title = `${p.name} — Shinn`;

  document.getElementById('crumb-dept').textContent = getDeptLabel(p.dept);
  document.getElementById('crumb-dept').href = `shop.html?dept=${p.dept}`;
  document.getElementById('crumb-name').textContent = p.name;

  renderGallery();

  document.getElementById('pdp-eyebrow').textContent = getCategoryLabel(p.category);
  document.getElementById('pdp-title').textContent = p.name;
  document.getElementById('pdp-rating').innerHTML = `<span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.reviews} reviews)`;
  renderPrice();
  renderColorOptions();
  renderSizeGrid();
  renderQty();

  document.getElementById('pdp-description').textContent = p.description;
  document.getElementById('pdp-details').innerHTML = p.details.map(d => `<li>${d}</li>`).join('');

  const related = relatedProducts(p);
  document.getElementById('related-grid').innerHTML = related.map(rp => {
    const c = rp.colors[0];
    return `
    <a class="product-card" href="product.html?id=${rp.id}">
      <div class="product-card__frame">
        <img class="img-main" src="${imgUrl(c.img)}" alt="${rp.name}" loading="lazy">
      </div>
      <div class="product-card__body">
        <p class="name">${rp.name}</p>
        <p class="meta">${getCategoryLabel(rp.category)}</p>
        <div class="price-row"><span class="now">${formatPrice(rp.price)}</span></div>
      </div>
    </a>`;
  }).join('');
  document.getElementById('related-section').style.display = related.length ? '' : 'none';
}

function renderGallery() {
  const p = currentProduct;
  const color = p.colors.find(c => c.id === selectedColor) || p.colors[0];
  const imgs = [color.img, p.colors[1] ? p.colors[1].img : color.img, color.img];
  document.getElementById('pdp-gallery').innerHTML = imgs.map((im, i) =>
    `<img src="${imgUrl(im, 900)}" alt="${p.name} view ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">`
  ).join('');
}

function renderPrice() {
  const p = currentProduct;
  const onSale = !!p.compareAt;
  document.getElementById('pdp-price').innerHTML = onSale
    ? `<span class="was">${formatPrice(p.compareAt)}</span><span class="now on-sale">${formatPrice(p.price)}</span>`
    : `<span class="now">${formatPrice(p.price)}</span>`;
}

function renderColorOptions() {
  const p = currentProduct;
  document.getElementById('color-option-label').textContent = `Color — ${p.colors.find(c => c.id === selectedColor).label}`;
  document.getElementById('color-options-row').innerHTML = p.colors.map(c => `
    <button class="color-option-btn ${c.id === selectedColor ? 'is-selected' : ''}" style="background:${c.hex}" data-color="${c.id}" aria-label="${c.label}" title="${c.label}">
      <span style="background:${c.hex}"></span>
    </button>
  `).join('');
  document.querySelectorAll('[data-color]').forEach(btn => btn.addEventListener('click', () => {
    selectedColor = btn.dataset.color;
    renderGallery();
    renderColorOptions();
  }));
}

function renderSizeGrid() {
  const p = currentProduct;
  document.getElementById('size-grid').innerHTML = p.sizes.map(s => {
    const oos = p.outOfStock.includes(s);
    return `<button class="size-cell ${selectedSize === s ? 'is-selected' : ''} ${oos ? 'is-disabled' : ''}" data-size="${s}" ${oos ? 'disabled' : ''}>${s}</button>`;
  }).join('');
  document.querySelectorAll('[data-size]').forEach(btn => btn.addEventListener('click', () => {
    selectedSize = btn.dataset.size;
    renderSizeGrid();
    document.getElementById('size-error').style.display = 'none';
  }));
}

function renderQty() {
  document.getElementById('qty-display').textContent = selectedQty;
}

function initHandlers() {
  document.getElementById('qty-minus').addEventListener('click', () => {
    if (selectedQty > 1) { selectedQty--; renderQty(); }
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    if (selectedQty < 10) { selectedQty++; renderQty(); }
  });
  document.getElementById('add-to-bag').addEventListener('click', () => {
    if (!selectedSize) {
      document.getElementById('size-error').style.display = 'block';
      document.getElementById('size-grid').scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    Cart.add(currentProduct.id, selectedColor, selectedSize, selectedQty);
    showToast(`Added ${currentProduct.name} to your bag`);
  });
  document.getElementById('size-guide-link').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Size guide: refer to our standard chart — XS (0-2), S (4-6), M (8-10), L (12-14), XL (16-18), XXL (20-22). Waist sizes run true to number.');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProduct();
  initHandlers();
});
