/* ==========================================================================
   SHINN — Catalog data
   Category schema is generic (id, label, parent) so new departments
   (e.g. "Home", "Accessories") can be added without touching page logic.
   ========================================================================== */

const CATEGORIES = [
  { id: 'women', label: "Women", parent: null },
  { id: 'women-outerwear', label: 'Outerwear', parent: 'women' },
  { id: 'women-knitwear', label: 'Knitwear', parent: 'women' },
  { id: 'women-tops', label: 'Tops', parent: 'women' },
  { id: 'women-bottoms', label: 'Bottoms', parent: 'women' },

  { id: 'men', label: "Men", parent: null },
  { id: 'men-outerwear', label: 'Outerwear', parent: 'men' },
  { id: 'men-knitwear', label: 'Knitwear', parent: 'men' },
  { id: 'men-tops', label: 'Tops', parent: 'men' },
  { id: 'men-bottoms', label: 'Bottoms', parent: 'men' },

  { id: 'accessories', label: 'Accessories', parent: null },
  { id: 'footwear', label: 'Footwear', parent: null },
];

// Product schema — deliberately generic beyond `dept`/`category` so future
// non-apparel product lines (e.g. homeware) can reuse the same shape.
const PRODUCTS = [
  {
    id: 'w-coat-001', name: 'Wool Wrap Coat', dept: 'women', category: 'women-outerwear',
    price: 328, compareAt: null, isNew: true,
    rating: 4.8, reviews: 112,
    colors: [
      { id: 'camel', label: 'Camel', hex: '#B79269', img: '1591047139829-d91aecb6caea' },
      { id: 'black', label: 'Black', hex: '#1b1b1b', img: '1539533018447-63fcce2678e3' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    outOfStock: [],
    description: 'A double-faced wool coat cut for movement, with a self-tie belt and dropped shoulder. Made from Italian-milled wool.',
    details: ['80% wool, 20% nylon', 'Dry clean only', 'Made in Portugal', 'Model is 5\'10", wearing size S'],
  },
  {
    id: 'w-knit-002', name: 'Ribbed Merino Sweater', dept: 'women', category: 'women-knitwear',
    price: 128, compareAt: 168, isNew: false,
    rating: 4.6, reviews: 89,
    colors: [
      { id: 'ivory', label: 'Ivory', hex: '#EDE7DA', img: '1434389677669-e08b4cac3105' },
      { id: 'forest', label: 'Forest', hex: '#33402E', img: '1576871337622-98d48d1cf531' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    outOfStock: ['XS'],
    description: 'Fine-gauge merino knit with a fitted rib and crew neck. A quiet layer that works alone or under a coat.',
    details: ['100% merino wool', 'Hand wash cold', 'Made in Peru'],
  },
  {
    id: 'w-top-003', name: 'Silk Button Shirt', dept: 'women', category: 'women-tops',
    price: 148, compareAt: null, isNew: true,
    rating: 4.7, reviews: 54,
    colors: [
      { id: 'white', label: 'White', hex: '#FBFAF6', img: '1594633312681-425c7b97ccd1' },
      { id: 'sage', label: 'Sage', hex: '#A9B79A', img: '1551803091-e20673f15644' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    outOfStock: [],
    description: 'A relaxed silk shirt with a soft point collar and single chest pocket. Sits just below the hip.',
    details: ['100% mulberry silk', 'Dry clean only', 'Made in India'],
  },
  {
    id: 'w-bottom-004', name: 'Tailored Wide Trouser', dept: 'women', category: 'women-bottoms',
    price: 168, compareAt: null, isNew: false,
    rating: 4.5, reviews: 76,
    colors: [
      { id: 'stone', label: 'Stone', hex: '#C9C2AF', img: '1594633313593-bab3825d0caf' },
      { id: 'black', label: 'Black', hex: '#1b1b1b', img: '1548883354-94bcfe321cbb' },
    ],
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    outOfStock: ['24'],
    description: 'A high-rise trouser with a clean front and wide leg that breaks gently at the ankle.',
    details: ['98% wool, 2% elastane', 'Dry clean only', 'Made in Portugal'],
  },
  {
    id: 'w-dress-005', name: 'Bias Slip Dress', dept: 'women', category: 'women-tops',
    price: 188, compareAt: 240, isNew: false,
    rating: 4.9, reviews: 203,
    colors: [
      { id: 'clay', label: 'Clay', hex: '#A9714F', img: '1595777457583-95e059d581b8' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    outOfStock: [],
    description: 'Cut on the bias for a fluid drape, with adjustable straps and a cowl back.',
    details: ['100% viscose', 'Hand wash cold', 'Made in Portugal'],
  },
  {
    id: 'w-outer-006', name: 'Quilted Field Jacket', dept: 'women', category: 'women-outerwear',
    price: 248, compareAt: null, isNew: false,
    rating: 4.4, reviews: 41,
    colors: [
      { id: 'olive', label: 'Olive', hex: '#4B5240', img: '1544022613-e87ca75a784a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    outOfStock: [],
    description: 'A lightly quilted field jacket with a stand collar and four patch pockets.',
    details: ['Shell: 100% cotton', 'Fill: recycled polyester', 'Machine wash cold'],
  },

  {
    id: 'm-outer-007', name: 'Waxed Chore Jacket', dept: 'men', category: 'men-outerwear',
    price: 228, compareAt: null, isNew: true,
    rating: 4.7, reviews: 98,
    colors: [
      { id: 'rust', label: 'Rust', hex: '#8C4A32', img: '1544966503-7cc5ac882d5f' },
      { id: 'navy', label: 'Navy', hex: '#2B3547', img: '1591047139829-d91aecb6caea' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    outOfStock: [],
    description: 'A waxed-cotton chore jacket built for weather, with a corduroy collar and brass hardware.',
    details: ['100% organic cotton, waxed', 'Wipe clean', 'Made in Portugal'],
  },
  {
    id: 'm-knit-008', name: 'Merino Crewneck', dept: 'men', category: 'men-knitwear',
    price: 118, compareAt: null, isNew: false,
    rating: 4.6, reviews: 133,
    colors: [
      { id: 'charcoal', label: 'Charcoal', hex: '#3B3B3B', img: '1576566588028-4147f3842f27' },
      { id: 'ivory', label: 'Ivory', hex: '#EDE7DA', img: '1434389677669-e08b4cac3105' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    outOfStock: ['XXL'],
    description: 'A midweight merino crewneck, fully fashioned with a ribbed hem and cuff.',
    details: ['100% merino wool', 'Hand wash cold', 'Made in Peru'],
  },
  {
    id: 'm-top-009', name: 'Oxford Shirt', dept: 'men', category: 'men-tops',
    price: 98, compareAt: 128, isNew: false,
    rating: 4.5, reviews: 210,
    colors: [
      { id: 'blue', label: 'Blue', hex: '#5B7A9C', img: '1596755094514-f87e34085b2c' },
      { id: 'white', label: 'White', hex: '#FBFAF6', img: '1620012253295-c15cc3e65df4' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    outOfStock: [],
    description: 'A washed oxford shirt with a soft button-down collar and box pleat.',
    details: ['100% cotton oxford', 'Machine wash cold', 'Made in Portugal'],
  },
  {
    id: 'm-bottom-010', name: 'Straight Selvedge Denim', dept: 'men', category: 'men-bottoms',
    price: 158, compareAt: null, isNew: true,
    rating: 4.8, reviews: 167,
    colors: [
      { id: 'indigo', label: 'Raw Indigo', hex: '#2E3A55', img: '1541099649105-f69ad21f3246' },
    ],
    sizes: ['28', '29', '30', '31', '32', '33', '34', '36'],
    outOfStock: ['28'],
    description: 'A straight-leg jean in 14oz selvedge denim, built to break in and fade with wear.',
    details: ['100% cotton selvedge denim', 'Wash cold, inside out', 'Made in Japan'],
  },
  {
    id: 'm-outer-011', name: 'Recycled Shell Anorak', dept: 'men', category: 'men-outerwear',
    price: 198, compareAt: null, isNew: false,
    rating: 4.3, reviews: 58,
    colors: [
      { id: 'moss', label: 'Moss', hex: '#4B5240', img: '1551028719-00167b16eac5' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    outOfStock: [],
    description: 'A packable anorak in recycled ripstop shell with taped seams and a half-zip placket.',
    details: ['100% recycled nylon', 'Machine wash cold', 'Made in Vietnam'],
  },
  {
    id: 'm-knit-012', name: 'Cable Fisherman Sweater', dept: 'men', category: 'men-knitwear',
    price: 168, compareAt: null, isNew: false,
    rating: 4.6, reviews: 77,
    colors: [
      { id: 'natural', label: 'Natural', hex: '#DED4C0', img: '1516257984-b1b4d707412e' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    outOfStock: [],
    description: 'A heavyweight cable-knit sweater in undyed wool, hand-finished at the collar.',
    details: ['100% wool', 'Dry clean only', 'Made in Ireland'],
  },

  {
    id: 'acc-013', name: 'Leather Card Holder', dept: 'accessories', category: 'accessories',
    price: 68, compareAt: null, isNew: false,
    rating: 4.7, reviews: 64,
    colors: [
      { id: 'black', label: 'Black', hex: '#1b1b1b', img: '1627123424574-724758594e93' },
      { id: 'tan', label: 'Tan', hex: '#B08B5F', img: '1553062407-98eeb64c6a62' },
    ],
    sizes: ['One Size'],
    outOfStock: [],
    description: 'A slim card holder in vegetable-tanned leather that ages with use.',
    details: ['100% leather', 'Made in Italy'],
  },
  {
    id: 'acc-014', name: 'Merino Watch Cap', dept: 'accessories', category: 'accessories',
    price: 48, compareAt: null, isNew: true,
    rating: 4.9, reviews: 152,
    colors: [
      { id: 'navy', label: 'Navy', hex: '#2B3547', img: '1576871337622-98d48d1cf531' },
      { id: 'camel', label: 'Camel', hex: '#B79269', img: '1576566588028-4147f3842f27' },
    ],
    sizes: ['One Size'],
    outOfStock: [],
    description: 'A close-fit watch cap knit from merino wool for warmth without bulk.',
    details: ['100% merino wool', 'Hand wash cold', 'Made in Scotland'],
  },
  {
    id: 'acc-015', name: 'Canvas Tote', dept: 'accessories', category: 'accessories',
    price: 58, compareAt: 78, isNew: false,
    rating: 4.4, reviews: 39,
    colors: [
      { id: 'natural', label: 'Natural', hex: '#DED4C0', img: '1591561954557-26941169b49e' },
    ],
    sizes: ['One Size'],
    outOfStock: [],
    description: 'A heavy-canvas tote with leather straps, sized for daily carry.',
    details: ['16oz cotton canvas', 'Spot clean', 'Made in Portugal'],
  },
  {
    id: 'foot-016', name: 'Suede Derby', dept: 'footwear', category: 'footwear',
    price: 218, compareAt: null, isNew: true,
    rating: 4.6, reviews: 91,
    colors: [
      { id: 'taupe', label: 'Taupe', hex: '#B8A88E', img: '1549298916-b41d501d3772' },
      { id: 'black', label: 'Black', hex: '#1b1b1b', img: '1533867617858-e7b97e060509' },
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    outOfStock: ['7'],
    description: 'A suede derby on a lightweight rubber sole, built for everyday wear.',
    details: ['Suede upper, leather lining', 'Made in Portugal'],
  },
  {
    id: 'foot-017', name: 'Minimal Court Trainer', dept: 'footwear', category: 'footwear',
    price: 148, compareAt: null, isNew: false,
    rating: 4.5, reviews: 174,
    colors: [
      { id: 'white', label: 'White', hex: '#FBFAF6', img: '1525966222134-fcfa99b8ae77' },
      { id: 'black', label: 'Black', hex: '#1b1b1b', img: '1595950653106-6c9ebd614d3a' },
    ],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    outOfStock: [],
    description: 'A low-profile leather trainer with a cupsole and minimal branding.',
    details: ['Leather upper', 'Rubber cupsole', 'Made in Portugal'],
  },
  {
    id: 'w-outer-018', name: 'Alpaca Blend Overcoat', dept: 'women', category: 'women-outerwear',
    price: 398, compareAt: null, isNew: true,
    rating: 4.9, reviews: 28,
    colors: [
      { id: 'oat', label: 'Oat', hex: '#D7CBB3', img: '1548624313-0396c75f8e0d' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    outOfStock: [],
    description: 'A long, single-breasted overcoat in an alpaca-wool blend with horn buttons.',
    details: ['70% wool, 25% alpaca, 5% nylon', 'Dry clean only', 'Made in Italy'],
  },
  {
    id: 'm-top-019', name: 'Garment-Dyed Tee', dept: 'men', category: 'men-tops',
    price: 48, compareAt: null, isNew: false,
    rating: 4.4, reviews: 245,
    colors: [
      { id: 'clay', label: 'Clay', hex: '#A9714F', img: '1521572163474-6864f9cf17ab' },
      { id: 'ink', label: 'Ink', hex: '#2B2E33', img: '1503341504253-dff4815485f1' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    outOfStock: [],
    description: 'A heavyweight tee in garment-dyed cotton with a slightly boxy fit.',
    details: ['100% cotton', 'Machine wash cold', 'Made in Portugal'],
  },
  {
    id: 'w-bottom-020', name: 'Pleated Midi Skirt', dept: 'women', category: 'women-bottoms',
    price: 138, compareAt: null, isNew: false,
    rating: 4.6, reviews: 47,
    colors: [
      { id: 'black', label: 'Black', hex: '#1b1b1b', img: '1583496661160-fb5886a13d77' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    outOfStock: [],
    description: 'A permanently pleated midi skirt with an elasticated back waist.',
    details: ['100% recycled polyester', 'Machine wash cold', 'Made in Portugal'],
  },
];

function imgUrl(id, w = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getCategoryLabel(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.label : id;
}

function getDeptLabel(dept) {
  const map = { women: 'Women', men: 'Men', accessories: 'Accessories', footwear: 'Footwear' };
  return map[dept] || dept;
}

function relatedProducts(product, count = 4) {
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
}
