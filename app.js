// PlantPlace - shared data + chrome. Intentionally naive. See INTERVIEWER-GUIDE.md
document.documentElement.classList.toggle('dark', localStorage.getItem('pp_dark') === '1');

const PRODUCTS = [
  { id: 1, name: 'Monstera Deliciosa', latin: 'Monstera deliciosa', price: 34.99, seller: 'GreenThumb_Mike', cat: 'Houseplants', light: 'Bright indirect', water: 'Weekly', pet: false, size: 'Medium', emoji: '🌿', rating: 4.5, reviews: 212, deal: true, vibe: 'The Dramatic Diva', eco: 8 },
  { id: 2, name: 'Snake Plant', latin: 'Sansevieria trifasciata', price: 19.99, seller: 'PlantLady88', cat: 'Houseplants', light: 'Low', water: 'Biweekly', pet: false, size: 'Small', emoji: '🪴', rating: 4.8, reviews: 540, vibe: 'The Quiet Survivor', eco: 9 },
  { id: 3, name: 'Fiddle Leaf Fig', latin: 'Ficus lyrata', price: 59.0, seller: 'LeafyLoft', cat: 'Houseplants', light: 'Bright', water: 'Weekly', pet: false, size: 'Large', emoji: '🌳', rating: 3.9, reviews: 98, vibe: 'The Main Character', eco: 6 },
  { id: 4, name: 'Basil Seeds (100ct)', latin: 'Ocimum basilicum', price: 3.5, seller: 'SeedCo', cat: 'Seeds', light: 'Full sun', water: 'Daily', pet: true, size: 'N/A', emoji: '🌱', rating: 4.2, reviews: 31, deal: true, vibe: 'The Overachiever', eco: 10 },
  { id: 5, name: 'Terracotta Pot 6"', latin: '', price: 12.0, seller: 'PotBarn', cat: 'Pots', light: 'N/A', water: 'N/A', pet: true, size: '6 inch', emoji: '🏺', rating: 4.6, reviews: 77, vibe: 'The Classic', eco: 7 },
  { id: 6, name: 'Pothos Golden', latin: 'Epipremnum aureum', price: 14.5, seller: 'PlantLady88', cat: 'Houseplants', light: 'Low to bright', water: 'Weekly', pet: false, size: 'Small', emoji: '🍃', rating: 4.7, reviews: 389, deal: true, vibe: 'The Easygoing Friend', eco: 8 },
  { id: 7, name: 'Premium Potting Mix 10L', latin: '', price: 16.99, seller: 'SoilWorks', cat: 'Soil', light: 'N/A', water: 'N/A', pet: true, size: '10L', emoji: '🟫', rating: 4.1, reviews: 54, vibe: 'The Foundation', eco: 5 },
  { id: 8, name: 'Calathea Orbifolia', latin: 'Goeppertia orbifolia', price: 42.0, seller: 'LeafyLoft', cat: 'Houseplants', light: 'Medium', water: 'Twice weekly', pet: true, size: 'Medium', emoji: '🌿', rating: 3.7, reviews: 45, vibe: 'The Sensitive Artist', eco: 7 },
  { id: 9, name: 'Garden Trowel', latin: '', price: 9.99, seller: 'ToolShed', cat: 'Tools', light: 'N/A', water: 'N/A', pet: true, size: 'N/A', emoji: '🔧', rating: 4.0, reviews: 19, deal: true, vibe: 'The Reliable One', eco: 6 },
  { id: 10, name: 'Cherry Tomato Starter', latin: 'Solanum lycopersicum', price: 6.0, seller: 'GreenThumb_Mike', cat: 'Outdoor', light: 'Full sun', water: 'Daily', pet: false, size: 'Small', emoji: '🍅', rating: 4.4, reviews: 63, vibe: 'The Sunny Optimist', eco: 9 },
  { id: 11, name: 'Succulent Mix (6 pack)', latin: 'Assorted', price: 24.0, seller: 'DesertDan', cat: 'Houseplants', light: 'Full sun', water: 'Monthly', pet: true, size: 'Mini', emoji: '🌵', rating: 4.3, reviews: 201, vibe: 'The Independent', eco: 8 },
  { id: 12, name: 'Watering Can 2L', latin: '', price: 18.5, seller: 'ToolShed', cat: 'Tools', light: 'N/A', water: 'N/A', pet: true, size: '2L', emoji: '🚿', rating: 4.5, reviews: 28, vibe: 'The Helper', eco: 7 },
];
const SELLER_ZIP = { GreenThumb_Mike: '10001', PlantLady88: '10002', LeafyLoft: '20001', SeedCo: '30001', PotBarn: '30002', SoilWorks: '40001', ToolShed: '40002', DesertDan: '85001' };
PRODUCTS.forEach(p => { p.color = [8, 11].includes(p.id) ? 'Variegated' : 'Green'; p.cond = p.id === 9 ? 'Used' : 'New'; });
const loadListings = () => JSON.parse(localStorage.getItem('pp_listings') || '[]');
loadListings().forEach((l, i) => PRODUCTS.push({ id: 100 + i, name: l.title, latin: l.latin || '', price: +l.price || 0, seller: 'GreenThumb_Mike', cat: l.cat || 'Houseplants',
  light: l.light || 'N/A', water: l.water || 'N/A', pet: /y/i.test(l.pet || ''), size: 'N/A', emoji: '🪴', rating: 0, reviews: 0, vibe: 'The New Arrival', eco: 5, color: 'Green', cond: 'New', mine: true, idx: i }));
// seller edits/deletes of the seeded listings
(() => { const ed = JSON.parse(localStorage.getItem('pp_edits') || '{}'), hid = JSON.parse(localStorage.getItem('pp_hidden') || '[]');
  PRODUCTS.forEach(p => { if (ed[p.id]) Object.assign(p, ed[p.id]); });
  for (let i = PRODUCTS.length - 1; i >= 0; i--) if (hid.includes(PRODUCTS[i].id)) PRODUCTS.splice(i, 1); })();
const SELLERS = [...new Set(PRODUCTS.map(p => p.seller))];
const GIFT = { id: 900, name: 'Gift Card', emoji: '🎁', cat: 'Gifts', seller: 'PlantPlace', price: 25 };
const ORDERS0 = [
  { id: 'PP-20481', date: 'Oct 28, 2026', status: 'Delivered', items: [{ id: 1, qty: 1 }, { id: 5, qty: 1 }], ship: 8.5 },
  { id: 'PP-20517', date: 'Nov 3, 2026', status: 'Shipped', items: [{ id: 6, qty: 1 }], ship: 6.0 },
  { id: 'PP-20544', date: 'Nov 8, 2026', status: 'Processing', items: [{ id: 11, qty: 1 }, { id: 12, qty: 1 }], ship: 7.25 },
];
const orders = () => ORDERS0.concat(JSON.parse(localStorage.getItem('pp_orders') || '[]'));
const ADDONS = { 901: { name: 'Gift wrap', price: 6.0, emoji: '🎀' }, 902: { name: 'Handwritten card', price: 4.99, emoji: '💌' }, 903: { name: 'Plant guarantee', price: 7.99, emoji: '🛡️' },
  904: { name: 'Plant of the Month', price: 29, emoji: '📦' }, 905: { name: 'Gifting service fee', price: 2.99, emoji: '🎁' } };
Object.keys(ADDONS).forEach(k => Object.assign(ADDONS[k], { id: +k, cat: 'Gifts', seller: 'PlantPlace' }));
const prod = id => id == 900 ? GIFT : ADDONS[id] || PRODUCTS.find(p => p.id == id);
const q = k => new URLSearchParams(location.search).get(k);
const money = n => '$' + Number(n).toFixed(2);
const itemPrice = it => it.price != null ? it.price : prod(it.id).price;
const itemName = it => it.label || prod(it.id).name;
const orderSub = o => o.items.reduce((t, it) => t + itemPrice(it) * it.qty, 0);
const orderTotal = o => o.total != null ? o.total : orderSub(o) + o.ship;
const PROMOS = { PLANT10: 0.1 };
const discount = sub => sub * (PROMOS[localStorage.getItem('pp_promo')] || 0);

const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  truck: '<path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.5 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.5 6-7"/>',
  chev: '<path d="M6 9l6 6 6-6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
  drop: '<path d="M12 2.7s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12z"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  gift: '<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7z"/>',
};
const icon = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24">${ICONS[n]}</svg>`;

// state
const cart = () => JSON.parse(localStorage.getItem('pp_cart') || '[]');
const saveCart = c => localStorage.setItem('pp_cart', JSON.stringify(c));
const wish = () => JSON.parse(localStorage.getItem('pp_wish') || '[]');
function addToCart(id, n = 1, price, label) {
  const c = cart(); c.push({ id, qty: Math.max(1, parseInt(n) || 1), price, label }); saveCart(c); updateCount();  // no toast, badge only
}
function toggleWish(id, btn) {
  let w = wish(); w = w.includes(id) ? w.filter(x => x !== id) : [...w, id];
  localStorage.setItem('pp_wish', JSON.stringify(w)); btn.classList.toggle('on');
  btn.classList.remove('pop'); void btn.offsetWidth; btn.classList.add('pop');
}
function updateCount() { const el = document.getElementById('cc'); if (el) el.textContent = cart().length; }
function toggleDark() { const d = !document.documentElement.classList.contains('dark'); document.documentElement.classList.toggle('dark', d); localStorage.setItem('pp_dark', d ? '1' : '0'); }

const stars = r => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));
function cardHTML(p) {
  return `<div class="card">
    <button class="heart ${wish().includes(p.id) ? 'on' : ''}" onclick="toggleWish(${p.id},this)">${icon('heart')}</button>
    <div class="pic c-${p.cat}">${p.emoji}<button class="qv-btn" onclick="quickView(${p.id})">${icon('eye')} Quick view</button></div>
    <a class="name" href="product.html?id=${p.id}">${p.name}</a>
    <div class="latin">${p.latin}</div>
    <div class="meta"><span class="price">${money(p.price)}</span><span class="stars">${stars(p.rating)}</span></div>
    <div class="seller">${p.seller}</div>
    <button class="btn block sm" style="margin-top:8px" onclick="addToCart(${p.id})">Add to Cart</button>
  </div>`;
}
function quickView(id) {
  const p = prod(id); let b = document.getElementById('qv');
  if (!b) { b = document.createElement('div'); b.id = 'qv'; b.className = 'modal-bg'; document.body.appendChild(b); b.onclick = e => { if (e.target === b) b.style.display = 'none'; }; }
  b.innerHTML = `<div class="modal" style="text-align:left;width:460px"><span class="close" onclick="qv.style.display='none'">close</span>
    <div class="pic c-${p.cat}" style="height:180px;font-size:80px">${p.emoji}</div><h3 style="margin-top:12px">${p.name}</h3>
    <div class="muted small" style="font-style:italic">${p.latin}</div><div class="pprice" style="font-size:18px">${money(p.price)}</div>
    <div class="flex"><button class="btn" onclick="addToCart(${p.id});qv.style.display='none'">Add to Cart</button><a class="btn secondary" href="product.html?id=${p.id}">Full details</a></div></div>`;
  b.style.display = 'flex';
}
const statusBadge = s => `<span class="badge ${s === 'Delivered' ? 'green' : s === 'Shipped' ? 'blue' : 'orange'}">${s}</span>`;

function renderChrome() {
  const here = location.pathname.split('/').pop() + location.search;
  const nav = [['Home', 'index.html'], ['Explore', 'explore.html'], ['Shop', 'browse.html'], ['Plants', 'browse.html?cat=Houseplants'], ['Categories', 'categories.html'],
    ['Deals', 'browse.html?deals=1'], ['Gifts <span class="navnew">New</span>', 'giftcards.html'], ['Sellers', 'sellers.html'], ['Community', 'community.html'], ['Assistant', 'agent.html'], ['Help', 'help.html']];
  document.getElementById('chrome-top').innerHTML = `
  <div class="promo">Free shipping on orders over $75* &nbsp;·&nbsp; 🎁 Send a plant gift from $19.99 &nbsp;·&nbsp; <a href="giftcards.html" style="color:#fff;text-decoration:underline">Send love →</a></div>
  <header class="main"><div class="row">
    <a class="logo" href="index.html">${icon('leaf')} PlantPlace</a>
    <form class="search" action="browse.html">${icon('search')}<input name="q" placeholder="Search" value="${q('q') || ''}"></form>
    <div class="hdr-right">
      <a href="wishlist.html">${icon('heart')}</a>
      <a href="#" onclick="toggleDark();return false" title="">${icon('moon')}</a>
      <a href="account.html">${icon('user')} My Stuff</a>
      <a href="sell.html">Sell</a>
      <a href="cart.html">${icon('cart')} <span class="cart-count" id="cc">0</span></a>
    </div>
  </div></header>
  <nav class="primary"><div class="row">${nav.map(([t, h]) => `<a href="${h}" class="${(here === h || (h === 'index.html' && here === '')) ? 'active' : ''}">${t}</a>`).join('')}</div></nav>`;
  const L = (t, p) => `<a href="info.html?p=${p}">${t}</a>`;
  document.getElementById('chrome-bottom').innerHTML = `
  <footer><div class="cols-f">
    <div><b>About</b><a href="about.html">Our Story</a>${L('Careers', 'careers')}${L('Press', 'press')}<a href="blog.html">Blog</a><a href="quiz.html">Plant Quiz</a></div>
    <div><b>Shop</b><a href="browse.html?cat=Houseplants">Plants</a><a href="browse.html?cat=Seeds">Seeds</a><a href="browse.html?cat=Pots">Pots</a><a href="browse.html?cat=Soil">Soil</a><a href="browse.html?cat=Tools">Tools</a><a href="giftcards.html">Gift Cards</a></div>
    <div><b>Sell</b><a href="sell.html">Become a Seller</a>${L('Seller Rules', 'rules')}${L('Fees', 'fees')}</div>
    <div><b>Help</b><a href="help.html">FAQ</a><a href="help.html#contact">Contact</a>${L('Returns', 'returns')}${L('Shipping', 'shipping')}${L('Terms', 'terms')}${L('Privacy', 'privacy')}</div>
  </div><p>© 2024 PlantPlace Inc. All rights reserved.</p></footer>
  ${localStorage.getItem('pp_cookie') ? '' : `<div class="cookie" id="ck"><span>We use cookies to improve your experience.</span><button class="btn sm secondary" onclick="localStorage.setItem('pp_cookie',1);ck.remove()">OK</button></div>`}`;
  updateCount();
}
// account area side menu
function renderSide(active) {
  const l = (t, h) => `<a href="${h}" class="${active === t ? 'on' : ''}">${t}</a>`;
  return `<div class="side"><div class="grp">Buying</div>${l('Overview', 'account.html')}${l('Orders', 'orders.html')}${l('Wishlist', 'wishlist.html')}${l('Messages', 'messages.html')}<a href="giftcards.html">Send a Gift <span class="navnew">New</span></a>
    <div class="grp">Plant Life</div>${l('My Garden', 'garden.html')}${l('Rewards', 'rewards.html')}
    <div class="grp">Selling</div>${l('My Listings', 'my-listings.html')}${l('Create Listing', 'sell.html')}
    <div class="grp">Account</div>${l('Settings', 'settings.html')}<a href="login.html">Log out</a></div>`;
}
document.addEventListener('DOMContentLoaded', renderChrome);

function toast(msg) { const t = document.createElement('div'); t.className = 'toasty'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 1800); }
const POSTS0 = [['My monstera has yellow leaves, help?', 'Questions', 'PlantLady88', 14, 'I got it two weeks ago and the lower leaves are turning yellow. I water it once a week. Any ideas?'], ['Finally got a new leaf!', 'Showcase', 'DesertDan', 32, 'After months of waiting, it unfurled today.'], ['Best soil mix for succulents', 'Tips', 'GreenThumb_Mike', 9, 'I use equal parts potting mix, perlite and coarse sand.'],
  ['Is pothos toxic to cats?', 'Questions', 'LeafyLoft', 21, 'Asking for my very curious cat.'], ['My balcony garden', 'Showcase', 'SeedCo', 5, 'Three months of progress.']];
const posts = () => POSTS0.concat(JSON.parse(localStorage.getItem('pp_posts') || '[]'));
const ARTICLES = [
  { id: 1, title: 'Meet the ZZ plant', tag: 'Plant of the day', emoji: '🪴', bg: '#e9efe9', date: 'Nov 9, 2026', body: ['The ZZ plant has become a favorite of busy people everywhere.', 'Its waxy leaves store water, so it forgives the occasional missed watering.', 'Place it anywhere and it will quietly do its thing.'] },
  { id: 2, title: '10 plants for your bedroom', tag: 'Guides', emoji: '🌿', bg: '#f3ecdc', date: 'Nov 2, 2026', body: ['Plants can make a bedroom feel calmer.', 'Here are ten of our favorites, from snake plants to peace lilies.', 'Choose what fits your style.'] },
  { id: 3, title: 'Repotting 101', tag: 'How-to', emoji: '🏺', bg: '#f1e1d6', date: 'Oct 24, 2026', body: ['Repotting gives roots room to grow.', 'Pick a pot one size up and use fresh soil.', 'Water gently afterwards.'] },
  { id: 4, title: 'Seller spotlight: DesertDan', tag: 'Community', emoji: '🌵', bg: '#f0f1d8', date: 'Oct 15, 2026', body: ['DesertDan started selling succulents from his garage.', 'Today he ships all over the country.', 'We asked him a few questions.'] },
  { id: 5, title: 'The spring planting calendar', tag: 'Guides', emoji: '🌱', bg: '#e3e8ee', date: 'Oct 3, 2026', body: ['Spring is the busiest season in the garden.', 'Use our calendar to plan what goes in the ground and when.', 'Happy planting.'] },
  { id: 6, title: 'Why we love plants', tag: 'Culture', emoji: '💚', bg: '#e8e0d8', date: 'Sep 20, 2026', body: ['Plants make us happier.', 'They make our homes feel alive.', 'That is why we built PlantPlace.'] },
];
