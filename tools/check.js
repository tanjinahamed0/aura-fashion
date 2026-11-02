/* Static integrity check — no build step, no dependencies.
   Verifies every local link and asset referenced by the site resolves, every
   product deep link has real data, and no commerce UI leaked into the copy.

   Usage:  node tools/check.js            (expects the server on :4173)  */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const base = process.env.AURA_BASE || 'http://localhost:4173';

const PAGES = ['index.html', 'collection.html', 'product.html', 'about.html'];

/* Terms that must never appear — this is a showcase, not a store. */
const FORBIDDEN = [
  'add to bag', 'add to cart', 'add to basket', 'shopping cart', 'shopping bag',
  'your bag', 'proceed to checkout', 'checkout', 'order summary', 'buy now',
  'place order', 'cash on delivery', 'payment', 'sign in', 'log in', 'login',
  'quantity', '₹', 'tk ', '৳'
];

/* Load the catalogue data the same way the browser does: window === globalThis,
   so `window.AURA = {}` also creates the bare `AURA` global. */
const ctx = vm.createContext({ console });
vm.runInContext('this.window = this;', ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8'), ctx);
const AURA = vm.runInContext('AURA', ctx);

const problems = [];
const notes = [];

function checkFile(rel, from) {
  const clean = rel.split('#')[0].split('?')[0];
  if (!clean) return;
  if (/^(https?:|mailto:|tel:|data:)/i.test(rel)) return;
  const target = path.join(root, clean);
  if (!fs.existsSync(target)) problems.push(`missing ${rel}  (referenced by ${from})`);
}

/* 1 — every href/src in every page */
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) checkFile(m[1], page);
}

/* 2 — links built at runtime by the JS */
const runtime = fs.readFileSync(path.join(root, 'assets/js/site.js'), 'utf8') +
  fs.readFileSync(path.join(root, 'assets/js/home.js'), 'utf8') +
  fs.readFileSync(path.join(root, 'assets/js/collection.js'), 'utf8') +
  fs.readFileSync(path.join(root, 'assets/js/product.js'), 'utf8');

for (const m of runtime.matchAll(/["'(](assets\/[^"'()]+|[\w.-]+\.html)/g)) {
  checkFile(m[1], 'js');
}

/* 3 — catalogue integrity */
const slugs = new Set();
for (const p of AURA.PRODUCTS) {
  if (slugs.has(p.slug)) problems.push(`duplicate slug: ${p.slug}`);
  slugs.add(p.slug);

  for (const img of [p.image, ...p.gallery]) {
    if (!fs.existsSync(path.join(root, img))) problems.push(`missing image ${img} (${p.slug})`);
  }
  for (const field of ['name', 'category', 'tagline', 'description', 'fabric', 'weight', 'fit']) {
    if (!p[field]) problems.push(`${p.slug}: empty "${field}"`);
  }
  if (!AURA.CATEGORY_LABEL[p.category]) problems.push(`${p.slug}: unknown category "${p.category}"`);
  if (!p.colors?.length || !p.sizes?.length) problems.push(`${p.slug}: needs colors and sizes`);

  for (const r of p.related) {
    if (!AURA.get(r)) problems.push(`${p.slug}: related slug not found "${r}"`);
  }
}

for (const c of AURA.CATEGORY_CARDS) {
  if (!fs.existsSync(path.join(root, c.image))) problems.push(`missing category image ${c.image}`);
}

for (const look of AURA.LOOKS) {
  if (!fs.existsSync(path.join(root, look.image))) problems.push(`missing look image ${look.image}`);
  const target = look.href.split('?')[0];
  if (!PAGES.includes(target)) problems.push(`look link target not a page: ${look.href}`);
}

/* 4 — forbidden commerce language across every shipped file */
const source = PAGES.map((p) => fs.readFileSync(path.join(root, p), 'utf8')).join('\n') +
  fs.readFileSync(path.join(root, 'assets/js/data.js'), 'utf8') + runtime +
  fs.readFileSync(path.join(root, 'assets/css/style.css'), 'utf8');

const lower = source.toLowerCase();
for (const term of FORBIDDEN) {
  if (lower.includes(term)) problems.push(`forbidden term present: "${term}"`);
}

/* 4b — the summer imagery is retired: nothing shipped may still point at a
   .jpg asset, since every Winter 2026 photograph is served as WebP. */
for (const m of source.matchAll(/assets\/images\/[\w./-]+\.jpe?g/g)) {
  problems.push(`retired summer asset still referenced: ${m[0]}`);
}

/* 5 — HTTP reachability of each page and every product deep link */
(async () => {
  const urls = [
    ...PAGES.map((p) => `${base}/${p}`),
    ...AURA.PRODUCTS.map((p) => `${base}/product.html?id=${p.slug}`),
    ...AURA.CATEGORIES.filter((c) => c.id !== 'all').map((c) => `${base}/collection.html?c=${c.id}`)
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (!res.ok) problems.push(`HTTP ${res.status} ${url}`);
    } catch (e) {
      problems.push(`FETCH FAILED ${url} — ${e.message}`);
    }
  }

  notes.push(`products: ${AURA.PRODUCTS.length}`);
  notes.push(AURA.CATEGORIES.filter((c) => c.id !== 'all')
    .map((c) => `${c.id}: ${AURA.countIn(c.id)}`).join(', '));
  notes.push(`urls probed: ${urls.length}`);

  console.log(notes.join('\n'));
  if (problems.length) {
    console.log('\nPROBLEMS (' + problems.length + '):');
    problems.forEach((p) => console.log('  - ' + p));
    process.exit(1);
  }
  console.log('\nAll checks passed.');
})();
