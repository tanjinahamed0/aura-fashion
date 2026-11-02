/* ==========================================================================
   AURA FASHION — local catalogue data
   --------------------------------------------------------------------------
   This is the ONLY file you need to touch to add, edit or remove a product.
   Everything on the site (home, collection, product pages, related items)
   is rendered from the PRODUCTS array below. There is no database and no
   backend.

   To add a product:
     1. Drop the photograph in  assets/images/products/
     2. Copy any existing entry below and change the values.
     3. Give it a unique `slug` (used in the URL: product.html?id=your-slug)

   Field reference
     slug         unique id, lowercase, hyphenated
     name         title shown on cards and product pages
     category     'hoodies' | 'sweatshirts' | 'jackets' | 'fullsleeve' | 'essentials'
     tagline      one line shown under the name on a card
     colors       [{ name, hex }]  — informational swatches only
     sizes        [{ label, note }]  — informational size run only
     image        path to the main photograph
     gallery      optional extra views; falls back to the main image
     isNew        part of the New Arrivals set (?c=new)
     description  long copy on the product page
     fabric / fit / weight / details / care   spec rows
     related      optional; auto-filled from the same category when omitted
   ========================================================================== */

window.AURA = window.AURA || {};

AURA.BRAND = {
  name: 'AURA FASHION',
  wordmark: 'aura',
  slogan: 'DEFINE AURA.',
  sloganDisplay: 'Define Aura.',
  announcement: 'INTRODUCING THE WINTER COLLECTION 2026',
  collection: 'Winter Collection 2026',
  email: 'aurafashion135@gmail.com',
  founded: '2026',
  location: 'Dhaka, Bangladesh',
  /* Handles are displayed as text only — no profile URLs are linked until
     each one is confirmed as the real page. */
  social: {
    facebook: { label: 'AURA Fashion' },
    instagram: { label: '@aura_fashion135' }
  }
};

AURA.CATEGORIES = [
  { id: 'all', label: 'All Pieces' },
  { id: 'hoodies', label: 'Premium Hoodies' },
  { id: 'sweatshirts', label: 'Winter Sweatshirts' },
  { id: 'jackets', label: 'Casual Jackets' },
  { id: 'fullsleeve', label: 'Full Sleeve T-Shirts' },
  { id: 'essentials', label: 'Winter Essentials' },
  { id: 'new', label: 'New Arrivals' }
];

AURA.CATEGORY_LABEL = {
  hoodies: 'Premium Hoodies',
  sweatshirts: 'Winter Sweatshirts',
  jackets: 'Casual Jackets',
  fullsleeve: 'Full Sleeve T-Shirts',
  essentials: 'Winter Essentials'
};

/* The five families shown on the home page, in display order. */
AURA.CATEGORY_CARDS = [
  {
    id: 'hoodies',
    label: 'Premium Hoodies',
    copy: 'Double-brushed fleece with a lined hood that keeps its shape all day.',
    image: 'assets/images/collections/hoodies.webp'
  },
  {
    id: 'sweatshirts',
    label: 'Winter Sweatshirts',
    copy: 'Dense loopback cotton crews — clean through the shoulder, warm without bulk.',
    image: 'assets/images/collections/sweatshirts.webp'
  },
  {
    id: 'jackets',
    label: 'Casual Jackets',
    copy: 'Wool and insulated layers cut for cold mornings and long evenings.',
    image: 'assets/images/collections/jackets.webp'
  },
  {
    id: 'fullsleeve',
    label: 'Full Sleeve T-Shirts',
    copy: 'Long-sleeve cotton that works under knitwear in winter and on its own later.',
    image: 'assets/images/collections/full-sleeve.webp'
  },
  {
    id: 'essentials',
    label: 'Winter Essentials',
    copy: 'Ribbed knits and turtlenecks — the pieces that finish a winter outfit.',
    image: 'assets/images/collections/essentials.webp'
  }
];

/* The four editorial looks shown under "Everyday winter essentials". */
AURA.LOOKS = [
  {
    name: 'The parka, worn open',
    copy: 'A hooded shell over a charcoal crew and a dark jean. Left open, so the layer ' +
      'underneath does the work and the silhouette stays long instead of bulky.',
    image: 'assets/images/lifestyle/look-black-parka.webp',
    href: 'collection.html?c=jackets'
  },
  {
    name: 'Coat over mock neck',
    copy: 'The quietest cold-weather uniform here: a full-length black coat over a fine ' +
      'mock neck. Nothing competes, which is the point.',
    image: 'assets/images/lifestyle/look-black-coat.webp',
    href: 'collection.html?c=essentials'
  },
  {
    name: 'Turtleneck, no extras',
    copy: 'A ribbed turtleneck on its own, with the collar once over. Warm enough for a ' +
      'mild January day in Dhaka and easy to layer when it is not.',
    image: 'assets/images/lifestyle/look-turtleneck.webp',
    href: 'collection.html?c=essentials'
  }
];

/* Shared spec blocks, so repeated values stay consistent. */
var FLEECE_CARE = [
  'Machine wash cold, inside out, with like colours',
  'Do not bleach — the brush finishes will not recover',
  'Reshape while damp and dry flat, away from direct heat',
  'Cool iron on reverse only, never over the rib'
];

var KNIT_CARE = [
  'Hand wash cold, or machine wash on a wool cycle in a mesh bag',
  'Do not wring — press the water out with a towel',
  'Dry flat and reshape while damp to hold the rib',
  'Store folded, never hung, so the shoulders do not stretch'
];

var OUTER_CARE = [
  'Spot clean; dry clean the wool body when it needs a full wash',
  'Do not tumble dry — hang on a broad hanger and let it settle',
  'Steam on low to lift creases, never press a hot iron into the pile',
  'Keep the collar and cuffs brushed so the nap lies flat'
];

AURA.PRODUCTS = [
  /* ------------------------------- HOODIES ------------------------------- */
  {
    slug: 'alpine-hoodie-charcoal',
    name: 'Alpine Hoodie',
    category: 'hoodies',
    tagline: 'Charcoal fleece, lined hood, weighted cuffs.',
    image: 'assets/images/products/hoodie-charcoal.webp',
    isNew: true,
    colors: [
      { name: 'Charcoal', hex: '#3a3936' },
      { name: 'Winter Cream', hex: '#e8e1d6' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '80% cotton / 20% recycled polyester double-brushed fleece',
    weight: '400 gsm / 11.8 oz',
    fit: 'Regular — straight through the body, dropped slightly at the shoulder',
    description:
      'The heaviest piece in the winter range and the one worn most. The face is combed ' +
      'cotton so it takes dye as a flat, even charcoal, and the reverse is brushed into a ' +
      'fine nap that holds warmth without adding thickness. The hood is cut from two layers ' +
      'and self-lined, so it stands rather than collapses, and the cuffs use a denser rib ' +
      'that keeps its width after a season of wear.',
    details: [
      'Double-layer self-lined hood with a tonal drawcord',
      '400 gsm brushed fleece — warm enough to wear alone in cold weather',
      'Kangaroo pocket on a reinforced bar-tack at each corner',
      '2×2 rib cuffs and hem, 6 cm deep so they hold their shape'
    ],
    care: FLEECE_CARE
  },
  {
    slug: 'bone-brushed-hoodie',
    name: 'Brushed Hoodie',
    category: 'hoodies',
    tagline: 'Bone white, garment-washed, soft from the first wear.',
    image: 'assets/images/products/hoodie-bone.webp',
    colors: [
      { name: 'Bone', hex: '#e6e1d7' },
      { name: 'Charcoal', hex: '#3a3936' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: '100% cotton brushed fleece',
    weight: '360 gsm / 10.6 oz',
    fit: 'Relaxed — slightly wider chest, straight hem',
    description:
      'A light hood in a warm off-white, made for the days when full charcoal feels heavy. ' +
      'Bone is the hardest shade to get right in fleece — too bright and it looks cheap, ' +
      'too grey and it reads dirty — so this one is dyed low and warm with no optical ' +
      'brightener. Washed after sewing so the surface is already broken in.',
    details: [
      'Undyed-warm bone dye, no optical brightener',
      'Post-construction enzyme wash for a soft hand',
      'Flat-lock seams at the shoulders to reduce chafing',
      'Matching tonal drawcord with tipped ends'
    ],
    care: FLEECE_CARE
  },
  {
    slug: 'taupe-hooded-pullover',
    name: 'Hooded Pullover',
    category: 'hoodies',
    tagline: 'Warm taupe, cut full enough to wear the hood up.',
    image: 'assets/images/products/hoodie-taupe.webp',
    isNew: true,
    colors: [
      { name: 'Warm Taupe', hex: '#a69a87' },
      { name: 'Espresso', hex: '#514238' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: 'Cotton-modal loopback fleece',
    weight: '380 gsm / 11.2 oz',
    fit: 'Relaxed — fuller hood, straight through the sleeve',
    description:
      'Built around the hood: it is cut deep enough to actually cover the head and panelled ' +
      'so it falls to either side instead of framing the face like a cone. Modal in the blend ' +
      'gives the taupe a soft, low-sheen surface and keeps the cloth from stiffening after ' +
      'washing.',
    details: [
      'Three-panel hood with a deeper front opening',
      'Cotton-modal loopback — softer drape than pure cotton fleece',
      'Raglan-set sleeve under the arm for shoulder room',
      'Hidden seam pocket so the front line stays clean'
    ],
    care: FLEECE_CARE
  },

  /* ---------------------------- SWEATSHIRTS ------------------------------ */
  {
    slug: 'charcoal-crew-sweatshirt',
    name: 'Crew Sweatshirt',
    category: 'sweatshirts',
    tagline: 'The plain crew, in dense charcoal loopback.',
    image: 'assets/images/products/sweatshirt-charcoal-crew.webp',
    colors: [
      { name: 'Charcoal', hex: '#3a3936' },
      { name: 'Winter Cream', hex: '#e8e1d6' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% cotton loopback sweat',
    weight: '380 gsm / 11.2 oz',
    fit: 'Regular — true to size, straight through the chest',
    description:
      'No hood, no print, no zip — just a heavy crew in a flat charcoal. Loopback knit is ' +
      'the reason it works across a whole winter: the reverse carries the little loops that ' +
      'trap air, while the face stays smooth enough to sit under a coat without bunching. ' +
      'The neck rib is knitted tall so it can be worn once over without rolling.',
    details: [
      'Tall 1×1 rib crew neckline that resists rolling',
      'Loopback reverse for warmth without extra thickness',
      'Set-in shoulder with a clean twin-needle hem',
      'Side-seamed body so it will not twist in the wash'
    ],
    care: FLEECE_CARE
  },
  {
    slug: 'heather-grey-sweatshirt',
    name: 'Heather Sweatshirt',
    category: 'sweatshirts',
    tagline: 'Two-tone grey yarn, washed soft.',
    image: 'assets/images/products/sweatshirt-heather-grey.webp',
    isNew: true,
    colors: [
      { name: 'Heather Grey', hex: '#b6b2ab' },
      { name: 'Soft Grey', hex: '#d8d5d0' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Cotton-polyester heathered sweat',
    weight: '340 gsm / 10.0 oz',
    fit: 'Regular — slightly shorter body, full sleeve',
    description:
      'Heather is woven into the yarn before the cloth is knitted: dark and pale fibres ' +
      'spun together, so the tone shifts with the light instead of sitting flat. This one ' +
      'is a mid-weight crew, lighter than the charcoal, intended for layering over a ' +
      'long-sleeve tee rather than wearing alone in hard cold.',
    details: [
      'Yarn-dyed heather — colour variation is built into the spin',
      'Mid-weight 340 gsm, cut for layering rather than stand-alone warmth',
      'Ribated cuffs, collar and hem in matching tone',
      'Pre-shrunk, garment washed for a softer first wear'
    ],
    care: FLEECE_CARE
  },

  /* ------------------------------- JACKETS ------------------------------- */
  {
    slug: 'grey-wool-overcoat',
    name: 'Wool Overcoat',
    category: 'jackets',
    tagline: 'Full-length grey wool, cut to layer over everything.',
    image: 'assets/images/products/jacket-grey-wool.webp',
    isNew: true,
    colors: [
      { name: 'Soft Grey', hex: '#d8d5d0' },
      { name: 'Charcoal', hex: '#3a3936' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: 'Wool-blend melton with a quilted cupro lining',
    weight: '720 gsm / 21.2 oz',
    fit: 'Relaxed overlayers — cut to sit over a hoodie without pulling',
    description:
      'The longest piece in the range, and the only one built to go over everything else. ' +
      'Melton is pressed rather than woven tight, which gives the grey a soft, slightly ' +
      'muted face and blocks wind better than a looser tweed. The lining is quilted at the ' +
      'front panels and smooth at the back so the coat slides on over knitwear.',
    details: [
      'Notched lapel with a two-button front',
      'Quilted front lining, smooth back panel for easy layering',
      'Deep welt pockets plus an inner chest pocket',
      'Hem falls below the knee; side vent for movement'
    ],
    care: OUTER_CARE
  },
  {
    slug: 'grey-tweed-jacket',
    name: 'Tweed Jacket',
    category: 'jackets',
    tagline: 'A shorter grey tweed layer for everyday cold.',
    image: 'assets/images/products/jacket-grey-tweed.webp',
    colors: [
      { name: 'Grey Tweed', hex: '#9b9891' },
      { name: 'Espresso', hex: '#514238' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Wool tweed with a cotton-bound interior',
    weight: '540 gsm / 16.0 oz',
    fit: 'Regular — hip length, closer through the chest than the overcoat',
    description:
      'Where the overcoat is for travelling, this is the jacket you wear to sit down in. ' +
      'The tweed is a two-tone grey with a visible fleck, woven open enough to breathe but ' +
      'heavy enough to hold its own shape over a shirt and a knit. Hip length, so it works ' +
      'with a straight trouser instead of demanding a long line.',
    details: [
      'Two-tone flecked tweed, woven in a heavier gauge',
      'Patch front pockets with a bound opening',
      'Half-lined body — warm at the chest, breathable below',
      'Cuff vent with two corozo-look buttons'
    ],
    care: OUTER_CARE
  },

  /* --------------------------- FULL SLEEVE TEES -------------------------- */
  {
    slug: 'black-longsleeve-tee',
    name: 'Long Sleeve Tee',
    category: 'fullsleeve',
    tagline: 'Matte black, mid-weight, the base of every winter layer.',
    image: 'assets/images/products/longsleeve-black-studio.webp',
    colors: [
      { name: 'Pure Black', hex: '#111111' },
      { name: 'Charcoal', hex: '#3a3936' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% combed ring-spun cotton',
    weight: '210 gsm / 6.2 oz',
    fit: 'Regular — true to size, straight through the chest',
    description:
      'The piece under everything else, so it is kept simple: a clean crew, a long sleeve ' +
      'that actually reaches the wrist, and a matte black that stays flat under a knit ' +
      'instead of shining through it. Light enough to wear indoors in a Dhaka December, ' +
      'dense enough that it does not cling.',
    details: [
      'Ribbed crew neckline with shoulder-to-shoulder tape',
      'Sleeve length set to reach the wrist when the body is upright',
      'Garment-dyed for an even, non-reflective black',
      'Pre-shrunk — under 3% movement across the life of the garment'
    ],
    care: FLEECE_CARE
  },
  {
    slug: 'contrast-raglan-longsleeve',
    name: 'Raglan Long Sleeve',
    category: 'fullsleeve',
    tagline: 'White body, black sleeve, seam carried to the collar.',
    image: 'assets/images/products/longsleeve-raglan-contrast.webp',
    isNew: true,
    colors: [
      { name: 'White / Black', hex: '#f4f2ee' },
      { name: 'Black / White', hex: '#111111' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Cotton jersey with a contrast sleeve panel',
    weight: '220 gsm / 6.5 oz',
    fit: 'Relaxed — straight body, full sleeve',
    description:
      'The only graphic in the collection, and it is structural rather than printed: the ' +
      'sleeve seam runs from the collar to the wrist in one line, so the two colours divide ' +
      'the garment along a seam you would have anyway. Nothing is inked on, which means the ' +
      'contrast will not crack or fade apart.',
    details: [
      'Colour division carried along the raglan seam, not printed',
      'Bound neckline in the sleeve colour for a continuous line',
      '220 gsm jersey — heavier than a base layer, lighter than a sweat',
      'Matched panel colour across front, back and sleeve'
    ],
    care: FLEECE_CARE
  },
  {
    slug: 'black-mock-longsleeve',
    name: 'Mock Neck Long Sleeve',
    category: 'fullsleeve',
    tagline: 'A soft stand collar that replaces the scarf.',
    image: 'assets/images/products/longsleeve-black-mock.webp',
    colors: [
      { name: 'Pure Black', hex: '#111111' },
      { name: 'Espresso', hex: '#514238' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: 'Cotton-elastane rib jersey',
    weight: '240 gsm / 7.1 oz',
    fit: 'Slim through the body — size up to layer under a coat',
    description:
      'A mock neck cut from fine rib, so it holds up at the collar without needing the ' +
      'stiffness that makes most mock necks uncomfortable. The small amount of elastane is ' +
      'there to let the rib recover at the neck and cuffs rather than to make the garment ' +
      'tight. Wear it alone, or under a turtleneck when the collar is the warm layer.',
    details: [
      'Fine 2×2 rib body and stand collar',
      'Collar knitted to hold its height without interlining',
      'Cotton with 3% elastane for recovery at neck and cuff',
      'Slim block — sits close so it layers without bulk'
    ],
    care: FLEECE_CARE
  },

  /* --------------------------- WINTER ESSENTIALS ------------------------- */
  {
    slug: 'grey-ribbed-turtleneck',
    name: 'Ribbed Turtleneck',
    category: 'essentials',
    tagline: 'Grey rib, knitted tall enough to fold once.',
    image: 'assets/images/products/knit-grey-turtleneck.webp',
    colors: [
      { name: 'Heather Grey', hex: '#b6b2ab' },
      { name: 'Warm Taupe', hex: '#a69a87' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Cotton-wool rib knit',
    weight: '320 gsm / 9.4 oz',
    fit: 'Regular — follows the body without clinging',
    description:
      'Knitted in a wide rib so the fabric has room to stretch across the shoulders and ' +
      'spring back. A little wool in the blend adds warmth and keeps the grey reading as a ' +
      'soft, matte tone rather than a shiny one. The neck is deliberately long: fold it ' +
      'once for a double collar, or leave it single and high.',
    details: [
      'Wide 3×2 rib, knitted to recover rather than bag out',
      'Cotton-wool blend — warm with a dry, matte surface',
      'Unfolded collar height of 24 cm',
      'Fully fashioned shoulders, so the seam follows the arm'
    ],
    care: KNIT_CARE
  },
  {
    slug: 'oatmeal-ribbed-turtleneck',
    name: 'Oatmeal Turtleneck',
    category: 'essentials',
    tagline: 'Chunky oatmeal rib — the warmest knit we make.',
    image: 'assets/images/products/knit-oatmeal-turtleneck.webp',
    isNew: true,
    colors: [
      { name: 'Oatmeal', hex: '#cbbda4' },
      { name: 'Winter Cream', hex: '#e8e1d6' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Lambswool-acrylic rib knit',
    weight: '480 gsm / 14.2 oz',
    fit: 'Relaxed — generous through the body and collar',
    description:
      'The heaviest knit in the collection, in an oatmeal shade pulled straight from the ' +
      'cream end of the winter palette. The gauge is deliberately coarse: the rib reads as ' +
      'structure rather than texture, and the cloth stands slightly away from the body, ' +
      'which is what makes it warm. Cut generously so it can be worn over a long-sleeve tee ' +
      'on the coldest days.',
    details: [
      'Coarse-gauge rib, knitted to stand away from the body',
      'Lambswool blend for warmth without the weight of pure wool',
      'Double-thick collar, cuffs and hem',
      'Fully fashioned construction throughout'
    ],
    care: KNIT_CARE
  }
];

/* Normalise: build lookup, default gallery and related items. */
(function () {
  var bySlug = {};
  AURA.PRODUCTS.forEach(function (p) {
    bySlug[p.slug] = p;
    if (!p.gallery) p.gallery = [p.image];
    if (!p.categoryName) p.categoryName = AURA.CATEGORY_LABEL[p.category] || p.category;
  });
  AURA.bySlug = bySlug;

  AURA.PRODUCTS.forEach(function (p) {
    if (p.related) return;
    var sameCat = AURA.PRODUCTS.filter(function (o) {
      return o.category === p.category && o.slug !== p.slug;
    });
    // Prefer different styles, then fall back to another piece in the same
    // family, so the related row never just repeats the product you are on.
    var distinct = sameCat.filter(function (o) { return o.name !== p.name; });
    var variants = sameCat.filter(function (o) { return o.name === p.name; });
    var others = AURA.PRODUCTS.filter(function (o) {
      return o.category !== p.category && o.slug !== p.slug;
    });
    p.related = distinct.concat(variants, others).slice(0, 4).map(function (o) { return o.slug; });
  });

  AURA.countIn = function (id) {
    if (id === 'all') return AURA.PRODUCTS.length;
    if (id === 'new') return AURA.PRODUCTS.filter(function (p) { return p.isNew; }).length;
    return AURA.PRODUCTS.filter(function (p) { return p.category === id; }).length;
  };

  AURA.newArrivals = function () {
    return AURA.PRODUCTS.filter(function (p) { return p.isNew; });
  };

  AURA.get = function (slug) {
    return AURA.bySlug[slug] || null;
  };
})();
