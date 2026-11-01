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
     category     'tshirts' | 'jerseys'   (must match a key in CATEGORIES)
     tagline      one line shown under the name on a card
     colors       [{ name, hex }]  — informational swatches only
     sizes        [{ label, note }]  — informational size run only
     image        path to the main photograph
     gallery      optional extra views; falls back to the main image
     featured     shows the piece in the home page "Featured" row
     description  long copy on the product page
     fabric / fit / weight / details / care   spec rows
     related      optional; auto-filled from the same category when omitted
   ========================================================================== */

window.AURA = window.AURA || {};

AURA.BRAND = {
  name: 'AURA FASHION',
  wordmark: 'aura',
  slogan: 'DEFINE AURA.',
  announcement: 'TIMELESS ESSENTIALS. EVERYDAY COMFORT.',
  email: 'aurafashion135@gmail.com',
  founded: '2026',
  location: 'Dhaka, Bangladesh',
  social: {
    facebook: { label: 'AURA Fashion', url: 'https://www.facebook.com/aurafashion' },
    instagram: { label: '@aura_fashion135', url: 'https://www.instagram.com/aura_fashion135' }
  }
};

AURA.CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'tshirts', label: 'T-Shirts' },
  { id: 'jerseys', label: 'Jerseys' }
];

AURA.CATEGORY_LABEL = { tshirts: 'T-Shirts', jerseys: 'Jerseys' };

AURA.CATEGORY_CARDS = [
  {
    id: 'tshirts',
    label: 'T-Shirts',
    copy: 'Heavyweight cotton, cut for everyday wear.',
    image: 'assets/images/editorial/category-tshirts.jpg'
  },
  {
    id: 'jerseys',
    label: 'Jerseys',
    copy: 'Archive silhouettes, rebuilt in modern cloth.',
    image: 'assets/images/editorial/category-jerseys.jpg'
  }
];

/* Shared spec blocks, so repeated values stay consistent. */
var COTTON_CARE = [
  'Machine wash cold, inside out, with like colours',
  'Do not bleach or tumble dry',
  'Dry flat, reshape while damp',
  'Cool iron on reverse only'
];

var JERSEY_CARE = [
  'Machine wash cold, inside out, on a gentle cycle',
  'Do not bleach, do not fabric softener',
  'Hang to dry away from direct heat',
  'Do not iron the printed or striped panels'
];

AURA.PRODUCTS = [
  /* ------------------------------- T-SHIRTS ------------------------------ */
  {
    slug: 'essential-crew-tee-black',
    name: 'Essential Crew Tee',
    category: 'tshirts',
    tagline: 'The everyday baseline, in dense matte black.',
    image: 'assets/images/products/essential-tee-black.jpg',
    featured: true,
    colors: [
      { name: 'Onyx Black', hex: '#141414' },
      { name: 'Optic White', hex: '#f4f4f2' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% combed ring-spun cotton',
    weight: '180 gsm / 5.3 oz',
    fit: 'Regular fit — true to size, straight through the chest',
    description:
      'The piece the whole collection is measured against. A clean crew neck cut from ' +
      'combed ring-spun cotton, garment-dyed to a deep matte black that stays flat rather ' +
      'than shiny. Ribbed collar, set-in shoulder, hem weighted so the tee hangs straight ' +
      'without clinging. Wear it under tailoring or on its own — it is designed to be the ' +
      'one you reach for without thinking.',
    details: [
      'Ribbed crew neckline with taped shoulder-to-shoulder seam',
      'Set-in sleeve, 20 mm twin-needle hem',
      'Garment-dyed for a muted, non-reflective black',
      'Pre-shrunk — expect under 3% movement across the life of the garment'
    ],
    care: COTTON_CARE
  },
  {
    slug: 'essential-crew-tee-white',
    name: 'Essential Crew Tee',
    category: 'tshirts',
    tagline: 'Undyed-bright cotton with a clean, flat hand.',
    image: 'assets/images/products/essential-tee-white.jpg',
    featured: false,
    colors: [
      { name: 'Optic White', hex: '#f4f4f2' },
      { name: 'Onyx Black', hex: '#141414' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% combed ring-spun cotton',
    weight: '180 gsm / 5.3 oz',
    fit: 'Regular fit — true to size, straight through the chest',
    description:
      'The white version is where quality shows, so the cloth runs denser than you would ' +
      'expect — enough that it holds its shape and stays opaque across the chest. Combed ' +
      'yarn gives it a smooth, flat surface with no slub, and the collar is ribbed to keep ' +
      'its opening after repeated washes.',
    details: [
      'Double-weight body panel to keep the white opaque',
      'Ribbed crew neckline with taped shoulder-to-shoulder seam',
      'Side-seamed construction so it does not twist after washing',
      'Pre-shrunk and sanforised'
    ],
    care: COTTON_CARE
  },
  {
    slug: 'oversized-tee-black',
    name: 'Oversized Box Tee',
    category: 'tshirts',
    tagline: 'Dropped shoulder, wide sleeve, garment-washed.',
    image: 'assets/images/products/oversized-tee-black.jpg',
    featured: true,
    colors: [
      { name: 'Faded Black', hex: '#2b2b2b' },
      { name: 'Sand', hex: '#cfc3b1' }
    ],
    sizes: [
      { label: 'S', note: 'oversized' }, { label: 'M', note: 'oversized' },
      { label: 'L', note: 'oversized' }, { label: 'XL', note: 'oversized' }
    ],
    fabric: '100% heavyweight cotton',
    weight: '240 gsm / 7.1 oz',
    fit: 'Oversized — size down one step for a regular silhouette',
    description:
      'A deliberately wide block of cloth: the shoulder seam sits on the upper arm, the ' +
      'sleeve is cut full enough to reach the elbow, and the body is boxy rather than long. ' +
      'Enzyme-washed after sewing so the surface breaks in immediately and the black fades ' +
      'evenly instead of going grey at the seams.',
    details: [
      'Dropped shoulder with a 6 cm sleeve extension',
      'Boxy body, straight hem falling below the waist',
      'Enzyme garment-wash for a broken-in hand from the first wear',
      'Wide 22 mm hem stitch to hold the weight of the cloth'
    ],
    care: COTTON_CARE
  },
  {
    slug: 'oversized-tee-sand',
    name: 'Oversized Box Tee',
    category: 'tshirts',
    tagline: 'The same wide block, in undyed warm sand.',
    image: 'assets/images/products/oversized-tee-sand.jpg',
    featured: false,
    colors: [
      { name: 'Sand', hex: '#cfc3b1' },
      { name: 'Faded Black', hex: '#2b2b2b' }
    ],
    sizes: [
      { label: 'S', note: 'oversized' }, { label: 'M', note: 'oversized' },
      { label: 'L', note: 'oversized' }, { label: 'XL', note: 'oversized' }
    ],
    fabric: '100% heavyweight cotton',
    weight: '240 gsm / 7.1 oz',
    fit: 'Oversized — size down one step for a regular silhouette',
    description:
      'Sand is the hardest neutral to get right — too yellow and it reads cheap, too grey ' +
      'and it disappears. This one is dyed low and warm so it sits against skin without ' +
      'washing out. Cut to the identical oversized block as the black version, so the two ' +
      'belong together in a rotation.',
    details: [
      'Low-chroma warm sand dye, matched across production runs',
      'Dropped shoulder with a 6 cm sleeve extension',
      'Boxy body, straight hem falling below the waist',
      'Enzyme garment-wash for a broken-in hand from the first wear'
    ],
    care: COTTON_CARE
  },
  {
    slug: 'heavyweight-tee-charcoal',
    name: 'Heavyweight Boxy Tee',
    category: 'tshirts',
    tagline: 'Dense dry-hand cotton that holds its own shape.',
    image: 'assets/images/products/heavyweight-tee-charcoal.jpg',
    colors: [
      { name: 'Charcoal', hex: '#3a3a3c' },
      { name: 'Bone', hex: '#e6e1d7' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: '100% open-end heavyweight cotton',
    weight: '260 gsm / 7.7 oz',
    fit: 'Boxy — shorter body length, wider chest',
    description:
      'Built from open-end yarn, which is coarser and drier than combed cotton. The result ' +
      'is a tee that stands slightly away from the body instead of draping over it, so the ' +
      'silhouette stays clean even when you are not wearing it. A thick 1×1 rib collar ' +
      'keeps the neck open firm over years of wear.',
    details: [
      'Open-end spun yarn for a dry, textured matte surface',
      'Extra-thick 1×1 rib collar with a coverstitched finish',
      'Boxy block: wider chest, shortened body length',
      'Reinforced neck tape to stop the collar stretching out'
    ],
    care: COTTON_CARE
  },
  {
    slug: 'longline-tee-bone',
    name: 'Longline Tee',
    category: 'tshirts',
    tagline: 'Extended curved hem, soft washed bone.',
    image: 'assets/images/products/longline-tee-bone.jpg',
    featured: false,
    colors: [
      { name: 'Bone', hex: '#e6e1d7' },
      { name: 'Charcoal', hex: '#3a3a3c' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% washed cotton',
    weight: '210 gsm / 6.2 oz',
    fit: 'Relaxed — extended body, straight shoulder',
    description:
      'A longer body with a curved side-seam hem, designed to sit below the waistband and ' +
      'cover the hip when you move your arms overhead. The cloth is mid-weight and washed ' +
      'soft, so the extra length falls rather than billows. Bone is a warm off-white with ' +
      'the blue cast taken out.',
    details: [
      'Extended body length with a curved, side-vented hem',
      'Mid-weight 210 gsm washed cotton — soft enough to drape',
      'Set-in shoulder kept regular so the length does the work',
      'Warm off-white dye with no blue brightener'
    ],
    care: COTTON_CARE
  },

  /* -------------------------------- JERSEYS ------------------------------ */
  {
    slug: 'retro-stripe-jersey',
    name: 'Retro Stripe Jersey',
    category: 'jerseys',
    tagline: 'Bold vertical blocks, matte technical knit.',
    image: 'assets/images/products/retro-stripe-jersey.jpg',
    featured: true,
    colors: [
      { name: 'Black / White', hex: '#141414' },
      { name: 'White / Black', hex: '#f4f4f2' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% recycled polyester knit',
    weight: '160 gsm / 4.7 oz',
    fit: 'Relaxed — cut long in the body, wider than a match jersey',
    description:
      'Taken from a 1970s domestic-league template: wide alternating blocks rather than ' +
      'thin pinstripes, a plain round neck instead of a collar, and no numbering anywhere. ' +
      'Knitted in a dry matte polyester so the stripes stay crisp and the shirt keeps its ' +
      'shape in the wash. Cut long and loose on purpose — it is meant to be worn off the ' +
      'pitch, not during a match.',
    details: [
      'Woven-in stripe panels, not screen-printed, so they will not crack',
      'Plain bound crew neckline with no collar or placket',
      'Side vents at the hem for a longer, easier line',
      'Matte recycled knit — no sheen under daylight'
    ],
    care: JERSEY_CARE
  },
  {
    slug: 'club-jersey-white',
    name: 'Club Jersey',
    category: 'jerseys',
    tagline: 'Clean white body with fine black binding.',
    image: 'assets/images/products/club-jersey-white.jpg',
    featured: false,
    colors: [
      { name: 'White / Black trim', hex: '#f4f4f2' },
      { name: 'Black / White trim', hex: '#141414' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Recycled polyester with elastane cuff rib',
    weight: '155 gsm / 4.6 oz',
    fit: 'Regular athletic — closer through the chest than the retro cuts',
    description:
      'The quietest shirt in the collection. A plain white body finished with a thin black ' +
      'binding at the neck and cuffs, which gives it definition without any graphics. The ' +
      'knit has a fine mesh face that moves air, and the cuffs use a stretch rib so they ' +
      'hold their width instead of flaring.',
    details: [
      'Contrast 6 mm binding at neckline and sleeve cuffs',
      'Fine mesh-face knit for breathability',
      'Elastane cuff rib that recovers after wear',
      'No numbering, crest or sponsor graphics by design'
    ],
    care: JERSEY_CARE
  },
  {
    slug: 'mesh-training-jersey',
    name: 'Mesh Training Jersey',
    category: 'jerseys',
    tagline: 'Open perforated knit, built to move air.',
    image: 'assets/images/products/mesh-jersey-black.jpg',
    colors: [
      { name: 'Black', hex: '#141414' },
      { name: 'Ash Grey', hex: '#8b8b8b' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: '100% recycled polyester open mesh',
    weight: '140 gsm / 4.1 oz',
    fit: 'Loose — cut generously through the body for layering',
    description:
      'An open mesh construction where the perforations are large enough to see through, ' +
      'which is what makes it cool in heat and interesting under a light. Because the cloth ' +
      'is airy it never clings, so the jersey reads as a loose block on the body. Wear it ' +
      'over a tee in the same family for contrast.',
    details: [
      'Large-gauge perforated mesh face, semi-sheer by design',
      'Bonded neck and hem trims so nothing chafes',
      'Generous loose cut — sits away from the body',
      'Lightweight 140 gsm — packs flat and dries fast'
    ],
    care: JERSEY_CARE
  },
  {
    slug: 'vintage-wash-jersey',
    name: 'Vintage Wash Jersey',
    category: 'jerseys',
    tagline: 'Garment-dyed heather grey, broken in on purpose.',
    image: 'assets/images/products/vintage-jersey-grey.jpg',
    featured: false,
    colors: [
      { name: 'Heather Grey', hex: '#9a9a98' },
      { name: 'Faded Black', hex: '#2b2b2b' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Cotton-polyester jersey blend',
    weight: '190 gsm / 5.6 oz',
    fit: 'Boxy retro — wide shoulders, straight body',
    description:
      'Enzyme-washed after cutting, so the seams lift slightly and the dye settles unevenly ' +
      'in the way a well-worn shirt does. No two pieces are identical in tone. The block is ' +
      'taken from a late-eighties training top — broad shoulder, straight body, short sleeve.',
    details: [
      'Post-construction enzyme wash for an authentically broken-in look',
      'Natural colour variation between individual pieces',
      'Broad-shoulder retro block with a straight body',
      'Tonal stitching throughout, no contrast thread'
    ],
    care: JERSEY_CARE
  },
  {
    slug: 'pinstripe-jersey',
    name: 'Pinstripe Jersey',
    category: 'jerseys',
    tagline: 'Fine stripes and a buttoned collar placket.',
    image: 'assets/images/products/pinstripe-jersey-black.jpg',
    featured: false,
    colors: [
      { name: 'Black / White stripe', hex: '#141414' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }, { label: 'XXL' }
    ],
    fabric: 'Recycled polyester with a dry matte finish',
    weight: '165 gsm / 4.9 oz',
    fit: 'Regular — straight through the chest and hem',
    description:
      'The older detail, done properly: narrow vertical stripes and a short three-button ' +
      'placket at the neck, as worn before collars became decoration. The buttons are ' +
      'self-fabric covered so the placket reads as one continuous line, and the stripe ' +
      'pitch is set to match across the shoulder seam.',
    details: [
      'Narrow 4 mm pinstripe, matched across every panel seam',
      'Three self-fabric covered buttons at a short placket',
      'Set-in sleeve with a clean hem-finished cuff',
      'Dry matte polyester — no sheen in direct light'
    ],
    care: JERSEY_CARE
  },
  {
    slug: 'colorblock-jersey',
    name: 'Colorblock Jersey',
    category: 'jerseys',
    tagline: 'Cream body, black yoke, geometric panel lines.',
    image: 'assets/images/products/colorblock-jersey-cream.jpg',
    featured: true,
    colors: [
      { name: 'Cream / Black', hex: '#efe7d8' },
      { name: 'Black / Cream', hex: '#141414' }
    ],
    sizes: [
      { label: 'S' }, { label: 'M' }, { label: 'L' }, { label: 'XL' }
    ],
    fabric: 'Recycled polyester interlock knit',
    weight: '175 gsm / 5.2 oz',
    fit: 'Relaxed — slightly cropped body, wide through the chest',
    description:
      'A solid black yoke across the shoulders running down into the sleeve panels, against ' +
      'a cream body. The division is purely geometric — no logos, no numbering — which is ' +
      'what lets it work as a shirt rather than kit. Interlock knit gives it more body than ' +
      'a standard jersey, so the panel lines stay crisp.',
    details: [
      'Contrast shoulder yoke carried through into the sleeve panels',
      'Interlock knit — firmer hand than a single-jersey',
      'Colour division matched across front, back and sleeves',
      'Slightly cropped body with a wide chest'
    ],
    care: JERSEY_CARE
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
    // Prefer different styles, then fall back to the other colour of this one,
    // so the related row never just repeats the product you are already on.
    var distinct = sameCat.filter(function (o) { return o.name !== p.name; });
    var variants = sameCat.filter(function (o) { return o.name === p.name; });
    p.related = distinct.concat(variants).slice(0, 4).map(function (o) { return o.slug; });
  });

  AURA.countIn = function (id) {
    if (id === 'all') return AURA.PRODUCTS.length;
    return AURA.PRODUCTS.filter(function (p) { return p.category === id; }).length;
  };

  AURA.featured = function () {
    return AURA.PRODUCTS.filter(function (p) { return p.featured; });
  };

  AURA.get = function (slug) {
    return AURA.bySlug[slug] || null;
  };
})();
