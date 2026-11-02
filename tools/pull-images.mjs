import { mkdirSync, writeFileSync, statSync, rmSync } from 'fs';
import { join } from 'path';

/*
 * Winter Collection 2026 image build.
 * Source: Unsplash (free Unsplash License), fetched through the images.unsplash.com
 * imgix endpoint so every file lands already cropped, resized and WebP-encoded.
 */
const ROOT = join(process.cwd(), 'assets', 'images');

const manifest = [
  // C. hero
  ['hero/hero-winter-shearling.webp', '1627637454030-5ddd536e06e5', 1400, 1500, 82],

  // D. winter collection category tiles
  ['collections/hoodies.webp', '1688111421205-a0a85415b224', 900, 1100, 78],
  ['collections/sweatshirts.webp', '1789997547242-935249681a29', 900, 1100, 78],
  ['collections/jackets.webp', '1786540610338-0fec664e7db4', 900, 1100, 78],
  ['collections/full-sleeve.webp', '1614495039368-525273956716', 900, 1100, 78],
  ['collections/essentials.webp', '1601379327928-bedfaf9da2d0', 900, 1100, 72],

  // E + H. banner bands
  ['campaigns/embrace-the-cold.webp', '1703625587655-af8c924d64e4', 1800, 900, 68],
  ['campaigns/make-winter-yours.webp', '1715622053361-4baf5ad2c51a', 1800, 900, 78],

  // F. everyday winter essentials look cards
  ['lifestyle/look-black-parka.webp', '1579282936226-5bada6542ace', 800, 1000, 78],
  ['lifestyle/look-black-coat.webp', '1617137977259-bb83e191f377', 800, 1000, 78],
  ['lifestyle/look-turtleneck.webp', '1599542829769-9ab0c324b4dd', 800, 1000, 78],

  // G. brand story
  ['lifestyle/story-folded-knits.webp', '1633943934209-31b7f3775fee', 1000, 1200, 78],

  // product catalogue
  ['products/hoodie-charcoal.webp', '1596075780750-81249df16d19', 900, 1120, 78],
  ['products/hoodie-bone.webp', '1738486260590-23c954cf29b8', 900, 1120, 78],
  ['products/hoodie-taupe.webp', '1611817757591-c3f345024273', 900, 1120, 70],
  ['products/sweatshirt-charcoal-crew.webp', '1614495039268-aa9a80429b66', 900, 1120, 70],
  ['products/sweatshirt-heather-grey.webp', '1555024905-8ceaab2aed08', 900, 1120, 72],
  ['products/jacket-grey-wool.webp', '1610871277087-9b65b6fe623c', 900, 1120, 70],
  ['products/jacket-grey-tweed.webp', '1619208382871-96f4d45bc840', 900, 1000, 78],
  ['products/longsleeve-black-studio.webp', '1699282022178-293b6658b45d', 900, 1120, 78],
  ['products/longsleeve-raglan-contrast.webp', '1734003066406-33aa5fba6821', 900, 1120, 78],
  ['products/longsleeve-black-mock.webp', '1771092358890-0db24db44e56', 900, 1120, 78],
  ['products/knit-grey-turtleneck.webp', '1605680315165-56df4ac5ba9f', 900, 1120, 78],
  ['products/knit-oatmeal-turtleneck.webp', '1686704814231-ef0474eea7f7', 900, 1120, 74],

  // about page
  ['lifestyle/about-knit-detail.webp', '1636716018705-90400d550a62', 900, 900, 66],
  ['lifestyle/about-patterns.webp', '1673201230274-c4dbd20c3f79', 900, 1200, 78],
  ['lifestyle/about-warm-stack.webp', '1760013531865-89ff324f83a6', 1200, 900, 72],
  ['lifestyle/about-street.webp', '1590424805482-a858832c66d6', 1400, 800, 78]
];

const credits = [];

async function pull([rel, id, w, h, q]) {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=${w}&h=${h}&q=${q}&fm=webp`;
  const dest = join(ROOT, rel);
  mkdirSync(join(ROOT, ...rel.split('/').slice(0, -1)), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) return { rel, err: 'HTTP ' + res.status };
  const buf = Buffer.from(await res.arrayBuffer());
  const magic = buf.slice(0, 4).toString('latin1') === 'RIFF' && buf.slice(8, 12).toString('latin1') === 'WEBP';
  if (!magic) return { rel, err: 'not a WebP payload (' + buf.length + ' bytes)' };
  writeFileSync(dest, buf);
  credits.push(`- ${rel} — https://unsplash.com/photos/photo-${id} (Unsplash License, ${w}x${h} webp, ${Math.round(statSync(dest).size / 1024)} KB)`);
  return { rel, kb: Math.round(buf.length / 1024) };
}

const results = [];
for (const entry of manifest) results.push(await pull(entry));

const failed = results.filter((r) => r.err);
results.filter((r) => !r.err).forEach((r) => console.log('ok  ', r.rel, r.kb + 'kb'));
failed.forEach((r) => console.log('FAIL', r.rel, r.err));

writeFileSync(
  join(process.cwd(), 'IMAGE_CREDITS.md'),
  `# Photography credits

Every photograph on this site is an independent winter menswear image licensed under the
[Unsplash License](https://unsplash.com/license) (free for commercial and editorial use,
no attribution required). Each file is stored locally inside \`assets/images/\` — the site
makes no external image requests at runtime.

${credits.join('\n')}
`
);

console.log('\n' + (manifest.length - failed.length) + '/' + manifest.length + ' images written');
