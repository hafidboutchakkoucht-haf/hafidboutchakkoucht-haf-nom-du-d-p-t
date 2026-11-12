// Dessine le logo Cross Borders (vectoriel, textes convertis en tracés) et écrit :
//   src/assets/brand/*.svg   — fichiers du logo
// Usage :  cd tools && npm install && node make-logo.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import opentype from 'opentype.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '../src/assets/brand');
mkdirSync(OUT, { recursive: true });
const nm = p => join(HERE, 'node_modules', p);

export const C = { navy: '#0B1F5E', blue: '#1559C8', sky: '#58A6F5', gold: '#EFA91B', goldDark: '#D08A06', goldLight: '#F8C63A', white: '#FFFFFF' };

// ── Polices → tracés
const loadFont = f => { const b = readFileSync(nm(f)); return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)); };
const F = {
  800: loadFont('@fontsource/montserrat/files/montserrat-latin-800-normal.woff'),
  700: loadFont('@fontsource/montserrat/files/montserrat-latin-700-normal.woff'),
  600: loadFont('@fontsource/montserrat/files/montserrat-latin-600-normal.woff'),
  500: loadFont('@fontsource/montserrat/files/montserrat-latin-500-normal.woff'),
  script: loadFont('@fontsource/kaushan-script/files/kaushan-script-latin-400-normal.woff'),
};
// Renvoie { d, w, boxes } ; x = bord gauche, y = ligne de base
function layout(str, font, size, ls = 0) {
  const k = size / font.unitsPerEm, glyphs = font.stringToGlyphs(str);
  let x = 0; const parts = [], boxes = [];
  glyphs.forEach((g, i) => {
    if (i) x += font.getKerningValue(glyphs[i - 1], g) * k + ls;
    const adv = g.advanceWidth * k;
    parts.push({ g, x }); boxes.push({ x, w: adv, ch: str[i] }); x += adv;
  });
  return { w: x, boxes, d: (ox, oy, skip = []) => parts.filter((_, i) => !skip.includes(i)).map(p => p.g.getPath(ox + p.x, oy, size).toPathData(1)).join('') };
}
function text(str, { font = 700, size, x, y, anchor = 'middle', ls = 0, fill }) {
  const L = layout(str, F[font], size, ls), ox = anchor === 'middle' ? x - L.w / 2 : anchor === 'end' ? x - L.w : x;
  return { svg: `<path d="${L.d(ox, y)}" fill="${fill}"/>`, w: L.w, x0: ox, x1: ox + L.w };
}

// ── Globe centré sur l'Europe et l'Afrique
const world = JSON.parse(readFileSync(nm('world-atlas/land-110m.json')));
const land = feature(world, world.objects.land);
function globe(cx, cy, r, { id, flat = false, ocean, landFill, grat = true, digits = 1 }) {
  const proj = geoOrthographic().rotate([0, -32, 0]).scale(r).translate([cx, cy]).clipAngle(90);
  const path = geoPath(proj).digits(digits);
  const fill = flat ? ocean : `url(#${id})`;
  return `${flat ? '' : `<defs><radialGradient id="${id}" cx="42%" cy="34%" r="72%"><stop offset="0" stop-color="#6DB6FA"/><stop offset=".5" stop-color="#1F6FDC"/><stop offset="1" stop-color="#0A348F"/></radialGradient></defs>`}
<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>
${grat ? `<path d="${path(geoGraticule10())}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="${(r / 190).toFixed(2)}"/>` : ''}
<path d="${path(land)}" fill="${landFill}"/>`;
}

const star = (cx, cy, R, rot = 0) => 'M' + Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 ? R * 0.4 : R, a = (i * 36 - 90 + rot) * Math.PI / 180;
  return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
}).join('L') + 'Z';

const person = (hx, hy, hr, d, fill) => `<g fill="${fill}" stroke="#fff" stroke-width="5" stroke-linejoin="round" paint-order="stroke"><path d="${d}"/><circle cx="${hx}" cy="${hy}" r="${hr}"/></g>`;

// ── Emblème : zone utile 760 × 440
// mode : 'color' | 'mono' (une couleur) ; simple : sans rubans ni étoiles (icône)
export function emblem({ mode = 'color', color = C.navy, navy: navyIn = C.navy, uid = 'g', simple = false } = {}) {
  const mono = mode === 'mono';
  const navy = mono ? color : navyIn, blue = mono ? color : C.blue, gold = mono ? color : `url(#${uid}gold)`;
  const defs = mono ? '' : `<defs><linearGradient id="${uid}gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.goldLight}"/><stop offset="1" stop-color="${C.goldDark}"/></linearGradient></defs>`;
  const g = globe(400, 222, 198, { id: uid + 'sea', flat: mono, ocean: color, landFill: mono ? '#fff' : '#D6EAFF', grat: !mono });
  const crescents = simple ? '' : `<g>
<path d="M361 -1 A226 226 0 0 0 227 367 A262 262 0 0 1 361 -1Z" fill="${gold}"/>
<path d="M383 23 A200 200 0 0 0 227 322 A245 245 0 0 1 383 23Z" fill="${navy}"/></g>`;
  const people =
    person(292, 268, 23, 'M222 262 C262 268 286 292 298 312 C310 292 330 272 360 250 C340 300 316 350 304 420 C290 350 262 300 222 262Z', blue) +
    person(508, 268, 23, 'M440 250 C470 272 490 292 502 312 C514 292 538 268 578 262 C538 300 510 350 496 420 C484 350 460 300 440 250Z', gold) +
    person(400, 214, 31, 'M296 196 C346 222 380 258 400 286 C420 258 454 222 504 196 C468 268 426 340 400 430 C374 340 332 268 296 196Z', navy);
  // Masque blanc sous la ligne des rubans, puis rubans
  const clip = `<clipPath id="${uid}clip"><path d="${simple ? 'M150 0H650V400Q400 350 150 400Z' : 'M0 -20H760V306H646Q575 396 400 398Q240 322 40 430H0Z'}"/></clipPath>`;
  const ribbons = simple ? '' : `<path d="M40 430 Q240 322 400 398 Q250 352 40 430Z" fill="${navy}"/>
<path d="M112 432 Q270 362 400 404 Q270 384 112 432Z" fill="${blue}"/>
<path d="M400 398 Q575 396 646 306 Q590 425 400 416Z" fill="${gold}"/>
<path d="M420 424 Q585 432 640 342 Q590 452 420 436Z" fill="${navy}"/>`;
  const stars = simple ? '' : `<path d="${[[-58, 16], [-47, 16], [-36, 15.5], [-25, 15], [-14, 14], [-3, 13], [8, 11.5]].map(([a, R]) => { const t = a * Math.PI / 180; return star(400 + 252 * Math.cos(t), 232 + 252 * Math.sin(t), R, a + 12); }).join('')}" fill="${gold}"/>`;
  return `${defs}${clip}<g clip-path="url(#${uid}clip)">${g}${crescents}${people}</g>${ribbons}${stars}`;
}

// ── Mot-symbole « CROSS BORDERS » (le O de CROSS est un globe)
function wordmark(xc, y, size, { mode = 'color', color = C.navy, navy = C.navy, uid = 'w' } = {}) {
  const mono = mode === 'mono', f = F[800], gap = size * 0.3;
  const a = layout('CROSS', f, size, size * 0.012), b = layout('BORDERS', f, size, size * 0.012);
  const total = a.w + gap + b.w, x0 = xc - total / 2;
  const o = a.boxes[2], r = size * 0.372, ocx = x0 + o.x + o.w / 2, ocy = y - size * 0.35;
  const gold = mono ? color : `url(#${uid}gold)`;
  return { w: total, x0, svg: `${mono ? '' : `<defs><linearGradient id="${uid}gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.goldLight}"/><stop offset="1" stop-color="${C.goldDark}"/></linearGradient></defs>`}
<path d="${a.d(x0, y, [2])}" fill="${mono ? color : navy}"/>
${globe(ocx, ocy, r, { id: uid + 'o', flat: mono, ocean: mono ? color : navy, landFill: mono ? '#fff' : '#EAF5FF', grat: false, digits: 1 })}
<path d="${b.d(x0 + a.w + gap, y)}" fill="${gold}"/>` };
}

const svg = (w, h, body, title = 'Cross Borders') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

// ── 1. Emblème seul, 2. icône simplifiée
const emblemSvg = o => svg(700, 456, `<g transform="translate(-10 10)">${emblem(o)}</g>`);
const iconSvg = o => svg(520, 520, `<g transform="translate(-140 28)">${emblem({ ...o, simple: true })}</g>`);

// ── 3. Logo vertical : emblème + nom
function vertical(o = {}) {
  const wm = wordmark(500, 600, 98, o);
  return svg(1000, 640, `<g transform="translate(132 12) scale(.92)">${emblem(o)}</g>${wm.svg}`);
}
// ── 4. Logo horizontal (en-tête de site, signature)
function horizontal(o = {}) {
  const wm = wordmark(0, 0, 104, o);
  return svg(300 + wm.w + 16, 200, `<g transform="translate(-8 6) scale(.42)">${emblem(o)}</g><g transform="translate(${300 + wm.w / 2} 141)">${wm.svg}</g>`);
}

// ── 5. Bandeau complet : logo, devises FR/EN, cinq domaines
const lucide = n => readFileSync(nm(`lucide-static/icons/${n}.svg`), 'utf8').replace(/^[\s\S]*?<svg[\s\S]*?>/, '').replace('</svg>', '').replace(/\s+/g, ' ');
function banner() {
  const W = 1540, H = 1070, cx = W / 2, o = { uid: 'b' };
  const wm = wordmark(cx, 520, 152, { uid: 'bw' });
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="6.5" fill="${C.gold}"/>`;
  const triple = (words, y, font, size, fill, ls) => {
    const parts = words.map(w => layout(w, F[font], size, ls)), gap = size * 2.1, total = parts.reduce((s, p) => s + p.w, 0) + gap * 2;
    let x = cx - total / 2, out = '';
    parts.forEach((p, i) => { out += `<path d="${p.d(x, y)}" fill="${fill}"/>`; x += p.w; if (i < 2) { out += dot(x + gap / 2, y - size * 0.36); x += gap; } });
    return { svg: out, x0: cx - total / 2, x1: cx + total / 2 };
  };
  const fr = triple(['DIALOGUE', 'COOPÉRATION', 'INCLUSION'], 578, 800, 37, C.navy, 4.5);
  const en = triple(['DIALOGUE', 'COOPERATION', 'INCLUSION'], 616, 500, 27, C.navy, 5.5);
  const rule = (xa, xb, y) => `<path d="M${xa} ${y} L${xb} ${y - 2.6} L${xb} ${y + 2.6}Z" fill="${C.gold}"/>`;
  const s1 = text('Ensemble, au-delà des frontières', { font: 'script', size: 64, x: cx, y: 690, fill: C.navy });
  const s2 = text('Together, beyond borders', { font: 'script', size: 50, x: cx, y: 752, fill: C.navy });
  const brush = `<path d="M${s1.x0 + 10} 716 Q${cx} 690 ${s1.x1 - 30} 704 Q${cx} 700 ${s1.x0 + 10} 716Z" fill="${C.gold}"/>`;
  const euRing = `<g fill="${C.blue}" stroke="none">${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<path d="${star(12 + 9.3 * Math.sin(a), 12 - 9.3 * Math.cos(a), 1.9)}"/>`; }).join('')}</g>`;
  const domains = [
    ['handshake', 'Coopération', 'internationale', 'International', 'Cooperation'],
    ['graduation-cap', 'Éducation &', 'Formation', 'Education &', 'Training'],
    ['users', 'Jeunesse &', 'Inclusion sociale', 'Youth &', 'Social Inclusion'],
    ['globe+leaf', 'Développement', 'durable', 'Sustainable', 'Development'],
    ['eu', 'Projets Erasmus+', 'et mobilité', 'Erasmus+ Projects', 'and Mobility'],
  ];
  const colW = 300, x0 = cx - colW * 2;
  const cols = domains.map(([ic, a, b, c2, d2], i) => {
    const x = x0 + colW * i;
    const icon = ic === 'eu' ? euRing : ic === 'globe+leaf'
      ? `${lucide('globe')}<g transform="translate(11.5 10.5) scale(.62)" stroke="${C.gold}" fill="#fff"><circle cx="12" cy="12" r="12" fill="#fff" stroke="none"/>${lucide('leaf')}</g>`
      : lucide(ic);
    return `<g transform="translate(${x - 42} 778) scale(3.5)" fill="none" stroke="${i % 2 ? C.navy : C.blue}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${icon}</g>
${text(a, { font: 700, size: 25, x, y: 900, fill: C.navy }).svg}${text(b, { font: 700, size: 25, x, y: 930, fill: C.navy }).svg}
${text(c2, { font: 500, size: 20, x, y: 962, fill: C.blue }).svg}${text(d2, { font: 500, size: 20, x, y: 987, fill: C.blue }).svg}
${i < 4 ? `<path d="M${x + colW / 2} 790 V985" stroke="${C.navy}" stroke-width="2" stroke-opacity=".55"/>` : ''}`;
  }).join('');
  const wave = `<path d="M40 1044 Q420 1004 770 1032 T1500 1036 Q1120 1066 770 1046 T40 1044Z" fill="${C.navy}"/><path d="M130 1034 Q470 1008 770 1024 T1420 1022 Q1100 1042 770 1036 T130 1034Z" fill="url(#bgold)"/>`;
  return svg(W, H, `<rect width="${W}" height="${H}" fill="#fff"/><g transform="translate(410 12) scale(.9)">${emblem(o)}</g>${wm.svg}
${rule(60, fr.x0 - 36, 566)}${rule(W - 60, fr.x1 + 36, 566)}${fr.svg}${en.svg}${s1.svg}${brush}${s2.svg}${cols}${wave}`, 'Cross Borders — Dialogue, Coopération, Inclusion — Ensemble, au-delà des frontières');
}

const files = {
  'embleme.svg': emblemSvg({ uid: 'e' }),
  'embleme-monochrome.svg': emblemSvg({ mode: 'mono', color: C.navy }),
  'icone.svg': iconSvg({ uid: 'i' }),
  'logo-vertical.svg': vertical({ uid: 'v' }),
  'logo-vertical-monochrome.svg': vertical({ mode: 'mono', color: C.navy }),
  'logo-horizontal.svg': horizontal({ uid: 'h' }),
  'logo-horizontal-fond-sombre.svg': horizontal({ uid: 'hd', navy: '#FFFFFF' }),
  'embleme-blanc.svg': emblemSvg({ mode: 'mono', color: '#FFFFFF' }),
  'bandeau-complet.svg': banner(),
};
for (const [f, s] of Object.entries(files)) { writeFileSync(join(OUT, f), s); console.log(f, (s.length / 1024).toFixed(0) + ' Ko'); }

// Pictogrammes des cinq domaines, réutilisés par les pages du site
const euIcon = `<g fill="currentColor" stroke="none">${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<path d="${star(12 + 9.3 * Math.sin(a), 12 - 9.3 * Math.cos(a), 1.9)}"/>`; }).join('')}</g>`;
const wrap = inner => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const domainIcons = { cooperation: wrap(lucide('handshake')), education: wrap(lucide('graduation-cap')), youth: wrap(lucide('users')), sustainable: wrap(lucide('globe') + `<g transform="translate(11.5 10.5) scale(.62)" stroke="${C.gold}"><circle cx="12" cy="12" r="12" fill="var(--card,#fff)" stroke="none"/>${lucide('leaf')}</g>`), erasmus: wrap(euIcon) };
writeFileSync(join(HERE, '../src/brand-icons.mjs'), `// Fichier généré par tools/make-logo.mjs — ne pas modifier à la main.\nexport const domainIcons = ${JSON.stringify(domainIcons, null, 2)};\n`);
