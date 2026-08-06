/* ==========================================================================
   SHINN — Shop / listing page
   ========================================================================== */

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const ALL_COLORS = [
  { id: 'black', hex: '#1b1b1b' }, { id: 'white', hex: '#FBFAF6' }, { id: 'navy', hex: '#2B3547' },
  { id: 'camel', hex: '#B79269' }, { id: 'olive', hex: '#4B5240' }, { id: 'ivory', hex: '#EDE7DA' },
  { id: 'stone', hex: '#C9C2AF' }, { id: 'tan', hex: '#B08B5F' },
];

function readParams() {
  return new URLSearchParams(window.location.search);
}

let state = {
  dept: null,
  q: '',
  filter: null,
  colors: new Set(),
  sizes: new Set(),
  sort: 'featured',
};

function initStateFromUrl() {
  const p = readParams();
  state.dept = p.get('dept');
  state.q = (p.get('q') || '').toLowerCase();
  state.filter = p.get('filter');
}

function matches(p) {
  if (state.dept && p.dept !== state.dept) return false;
  if (state.filter === 'new' && !p.isNew) return false;
  if (state.filter === 'sale' && !p.compareAt) return false;
  if (state.q && !p.name.toLowerCase().includes(state.q)) return false;
  if (state.colors.size && !p.colors.some(c => state.colors.has(c.id))) return false;
  if (state.sizes.size && !p.sizes.some(s => state.sizes.has(s) && !p.outOfStock.includes(s))) return false;
  return true;
}

function sortProducts(list) {
  const l = [...list];
  switch (state.sort) {
    case 'price-asc': return l.sort((a, b) => a.price - b.price);
    case 'price-desc': return l.sort((a, b) => b.price - a.price);
    case 'newest': return l.sort((a, b) => (b.isNew === true) - (a.isNew === true));
    case 'rating': return l.sort((a, b) => b.rating - a.rating);
    default: return l;
  }
}

function productCard(p) {
  const c = p.colors[0];
  const c2 = p.colors[1] || c;
  const onSale = !!p.compareAt;
  return `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="product-card__frame">
        ${p.isNew ? '<span class="tag tag-new">New</span>' : (onSale ? '<span class="tag tag-sale">Sale</span>' : '')}
        <img class="img-main" src="${imgUrl(c.img)}" alt="${p.name} in ${c.label}" loading="lazy">
        <img class="img-alt" src="${imgUrl(c2.img)}" alt="" loading="lazy">
        <div class="quick-add">
          <button class="btn btn-primary btn-block btn-sm" type="button" onclick="event.preventDefault(); quickAdd('${p.id}')">Quick add</button>
        </div>
      </div>
      <div class="product-card__body">
        <p class="name">${p.name}</p>
        <p class="meta">${getCategoryLabel(p.category)}</p>
        <div class="price-row">
          ${onSale ? `<span class="was">${formatPrice(p.compareAt)}</span>` : ''}
          <span class="now ${onSale ? 'on-sale' : ''}">${formatPrice(p.price)}</span>
        </div>
        <div class="swatches">${p.colors.map(c => `<span class="swatch" style="background:${c.hex}"></span>`).join('')}</div>
      </div>
    </a>
  `;
}

function quickAdd(id) {
  const p = getProduct(id);
  const size = p.sizes.find(s => !p.outOfStock.includes(s)) || p.sizes[0];
  Cart.add(id, p.colors[0].id, size);
  showToast('Added to bag');
}

function renderChips() {
  const chips = [];
  if (state.dept) chips.push({ label: getDeptLabel(state.dept), clear: () => { state.dept = null; } });
  if (state.filter === 'new') chips.push({ label: 'New In', clear: () => { state.filter = null; } });
  if (state.filter === 'sale') chips.push({ label: 'On Sale', clear: () => { state.filter = null; } });
  state.colors.forEach(c => chips.push({ label: c, clear: () => state.colors.delete(c) }));
  state.sizes.forEach(s => chips.push({ label: `Size ${s}`, clear: () => state.sizes.delete(s) }));

  const mount = document.getElementById('active-filters');
  if (!chips.length) { mount.innerHTML = ''; return; }
  mount.innerHTML = chips.map((c, i) => `<span class="chip">${c.label}<button data-chip="${i}" aria-label="Remove filter">&times;</button></span>`).join('');
  mount.querySelectorAll('[data-chip]').forEach(btn => {
    btn.addEventListener('click', () => { chips[+btn.dataset.chip].clear(); syncFilterInputs(); render(); });
  });
}

function syncFilterInputs() {
  document.querySelectorAll('[data-color-input]').forEach(el => { el.checked = state.colors.has(el.value); });
  document.querySelectorAll('[data-size-input]').forEach(el => { el.checked = state.sizes.has(el.value); });
  document.querySelectorAll('[data-dept-input]').forEach(el => { el.checked = state.dept === el.value; });
}

function render() {
  const filtered = sortProducts(PRODUCTS.filter(matches));
  document.getElementById('result-count').textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'}`;
  const grid = document.getElementById('product-grid');
  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <h2>No matches</h2>
      <p>Try removing a filter or search for something else.</p>
      <button class="btn btn-secondary" onclick="clearAll()">Clear all filters</button>
    </div>`;
  } else {
    grid.innerHTML = filtered.map(productCard).join('');
  }
  renderChips();

  const heading = document.getElementById('shop-heading');
  const eyebrow = document.getElementById('shop-eyebrow');
  if (state.q) { heading.textContent = `Results for “${state.q}”`; eyebrow.textContent = 'Search'; }
  else if (state.filter === 'new') { heading.textContent = 'New In'; eyebrow.textContent = 'Just landed'; }
  else if (state.filter === 'sale') { heading.textContent = 'On Sale'; eyebrow.textContent = 'Reduced'; }
  else if (state.dept) { heading.textContent = getDeptLabel(state.dept); eyebrow.textContent = 'Department'; }
  else { heading.textContent = 'All Products'; eyebrow.textContent = 'Shop'; }
}

function clearAll() {
  state = { dept: null, q: '', filter: null, colors: new Set(), sizes: new Set(), sort: state.sort };
  syncFilterInputs();
  document.getElementById('sort-select').value = state.sort;
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  initStateFromUrl();

  document.getElementById('size-options').innerHTML = ALL_SIZES.map(s =>
    `<label class="size-pill"><input type="checkbox" value="${s}" data-size-input> ${s}</label>`
  ).join('');
  document.getElementById('color-options').innerHTML = ALL_COLORS.map(c =>
    `<label class="color-swatch-btn" style="background:${c.hex}" title="${c.id}"><input type="checkbox" value="${c.id}" data-color-input><span style="background:${c.hex}"></span></label>`
  ).join('');
  document.getElementById('dept-options').innerHTML = ['women', 'men', 'accessories', 'footwear'].map(d =>
    `<label class="filter-check"><input type="radio" name="dept" value="${d}" data-dept-input> ${getDeptLabel(d)}
      <span class="filter-count">${PRODUCTS.filter(p => p.dept === d).length}</span>
    </label>`
  ).join('');

  document.querySelectorAll('[data-color-input]').forEach(el => el.addEventListener('change', () => {
    el.checked ? state.colors.add(el.value) : state.colors.delete(el.value);
    render();
  }));
  document.querySelectorAll('[data-size-input]').forEach(el => el.addEventListener('change', () => {
    el.checked ? state.sizes.add(el.value) : state.sizes.delete(el.value);
    render();
  }));
  document.querySelectorAll('[data-dept-input]').forEach(el => el.addEventListener('change', () => {
    state.dept = el.checked ? el.value : null;
    render();
  }));
  document.getElementById('sort-select').addEventListener('change', (e) => { state.sort = e.target.value; render(); });

  document.getElementById('mobile-filter-open')?.addEventListener('click', () => {
    document.getElementById('filter-rail').classList.add('is-open');
  });
  document.getElementById('mobile-filter-close')?.addEventListener('click', () => {
    document.getElementById('filter-rail').classList.remove('is-open');
  });

  syncFilterInputs();
  render();
});
