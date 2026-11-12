// Générateur du site Cross Borders — aucun paquet à installer.
// Usage : node build.mjs   (écrit le site dans ./docs)
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from './src/pages.mjs';
import { site } from './src/site.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, 'docs');
const LANGS = ['fr', 'en'];
const BASE = (process.env.SITE_URL || site.url).replace(/\/$/, '');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pathOf = (id, lang) => pages[id].slug[lang];
const depth = p => (p ? p.split('/').length : 0);
const abs = p => `${BASE}/${p ? p + '/' : ''}`;

const euFlag = () => {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 - 90) * Math.PI / 180, cx = 45 + 20 * Math.cos(a), cy = 30 + 20 * Math.sin(a);
    const pts = Array.from({ length: 10 }, (_, k) => {
      const r = k % 2 ? 1.35 : 3.4, t = (k * 36 - 90) * Math.PI / 180;
      return `${(cx + r * Math.cos(t)).toFixed(2)},${(cy + r * Math.sin(t)).toFixed(2)}`;
    }).join(' ');
    return `<polygon points="${pts}"/>`;
  }).join('');
  return `<svg viewBox="0 0 90 60" role="img" aria-label="European Union"><rect width="90" height="60" fill="#003399"/><g fill="#FFCC00">${stars}</g></svg>`;
};

const icons = {
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
};

function render(id, lang) {
  const page = pages[id];
  const here = pathOf(id, lang);
  const up = '../'.repeat(depth(here)) || './';
  const x = (fr, en) => (lang === 'fr' ? fr : en);
  const url = (target, hash = '') => { const p = pathOf(target, lang); return up + (p ? p + '/' : '') + hash; };
  const asset = f => `${up}assets/${f}`;
  const other = lang === 'fr' ? 'en' : 'fr';
  const ctx = { lang, x, url, asset, esc, site, euFlag };

  const nav = [['about', x('L’association', 'About')], ['projects', x('Projets', 'Projects')], ['join', x('Participer', 'Get involved')], ['resources', x('Ressources', 'Resources')], ['videos', x('Vidéos', 'Videos')], ['contact', 'Contact']];
  const isCurrent = t => t === id || (t === 'projects' && page.parent === 'projects');
  const title = id === 'home' ? `${site.name} — ${page.title[lang]}` : `${page.title[lang]} — ${site.name}`;
  const desc = page.desc[lang];

  const ld = [{
    '@context': 'https://schema.org', '@type': 'NGO', name: site.name, url: abs(''), email: site.email,
    slogan: x(site.tagline.fr, site.tagline.en), logo: `${BASE}/assets/brand/icone.svg`,
    address: { '@type': 'PostalAddress', streetAddress: site.street, postalCode: site.zip, addressLocality: site.city, addressCountry: 'FR' },
    identifier: [{ '@type': 'PropertyValue', propertyID: 'RNA', value: site.rna }, { '@type': 'PropertyValue', propertyID: 'SIREN', value: site.siren }],
    knowsAbout: ['Erasmus+', 'Youth exchange', 'Non-formal education', 'Social inclusion', 'Rural entrepreneurship'],
  }, ...(page.ld ? page.ld(ctx, abs(here)) : [])];

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${abs(here)}">
<link rel="alternate" hreflang="fr" href="${abs(pathOf(id, 'fr'))}">
<link rel="alternate" hreflang="en" href="${abs(pathOf(id, 'en'))}">
<link rel="alternate" hreflang="x-default" href="${abs(pathOf(id, 'fr'))}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${abs(here)}">
<meta property="og:image" content="${BASE}/assets/og.png">
<meta property="og:locale" content="${x('fr_FR', 'en_GB')}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0B1F5E">
<link rel="icon" href="${asset('brand/icone.svg')}" type="image/svg+xml">
<link rel="manifest" href="${asset('site.webmanifest')}">
<link rel="preload" href="${asset('fonts/bricolage-grotesque-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('style.css')}">
<script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('cb-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body>
<a class="skip" href="#main">${x('Aller au contenu', 'Skip to content')}</a>
<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="${url('home')}" aria-label="${site.name} — ${x('accueil', 'home')}"><img class="logo-full logo-light" src="${asset('brand/logo-horizontal.svg')}" alt="${site.name}" width="292" height="44"><img class="logo-full logo-dark" src="${asset('brand/logo-horizontal-fond-sombre.svg')}" alt="${site.name}" width="292" height="44" loading="lazy"><img class="logo-mark" src="${asset('brand/embleme.svg')}" alt="${site.name}" width="68" height="44"></a>
    <nav aria-label="${x('Navigation principale', 'Main navigation')}">
      <ul class="menu" id="menu">
        ${nav.map(([t, l]) => `<li><a href="${url(t)}"${isCurrent(t) ? ' aria-current="page"' : ''}>${l}</a></li>`).join('\n        ')}
      </ul>
    </nav>
    <div class="tools">
      <a class="chip-btn" href="${up}${pathOf(id, other) ? pathOf(id, other) + '/' : ''}" hreflang="${other}" lang="${other}" aria-label="${x('Read this page in English', 'Lire cette page en français')}">${other.toUpperCase()}</a>
      <button class="chip-btn" type="button" data-theme-toggle aria-label="${x('Changer de thème clair / sombre', 'Toggle light / dark theme')}">${icons.sun}</button>
      <button class="chip-btn burger" type="button" aria-controls="menu" aria-expanded="false" aria-label="Menu">${icons.menu}</button>
      <a class="btn small" href="${url('join')}">${x('Partir avec nous', 'Join a project')}</a>
    </div>
  </div>
</header>
<main id="main">
${page.body(ctx)}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="foot">
      <div>
        <a class="brand" href="${url('home')}"><img src="${asset('brand/logo-horizontal-fond-sombre.svg')}" alt="${site.name}" width="292" height="44" loading="lazy"></a>
        <p>${x(site.tagline.fr, site.tagline.en)}</p>
        <p>${site.street}<br>${site.zip} ${site.city}, France<br><a href="mailto:${site.email}">${site.email}</a></p>
      </div>
      <div><h4>${x('Découvrir', 'Explore')}</h4><ul>
        <li><a href="${url('about')}">${x('L’association', 'About us')}</a></li>
        <li><a href="${url('projects')}">${x('Nos projets', 'Our projects')}</a></li>
        <li><a href="${url('join')}">${x('Participer', 'Get involved')}</a></li>
        <li><a href="${url('contact')}">Contact</a></li></ul></div>
      <div><h4>${x('Ressources', 'Resources')}</h4><ul>
        <li><a href="${url('resources', '#guides')}">${x('Guides Erasmus+', 'Erasmus+ guides')}</a></li>
        <li><a href="${url('resources', '#checklist')}">${x('Liste de préparation', 'Packing checklist')}</a></li>
        <li><a href="${url('resources', '#glossaire')}">${x('Glossaire', 'Glossary')}</a></li>
        <li><a href="${url('resources', '#faq')}">FAQ</a></li>
        <li><a href="${url('videos')}">${x('Série vidéo', 'Video series')}</a></li></ul></div>
      <div><h4>${x('Informations', 'Information')}</h4><ul>
        <li><a href="${url('legal')}">${x('Mentions légales', 'Legal notice')}</a></li>
        <li><a href="${url('privacy')}">${x('Confidentialité', 'Privacy')}</a></li>
        <li>RNA ${site.rna}</li>
        <li>SIREN ${site.siren}</li></ul></div>
    </div>
    <div class="eu">${euFlag()}<p style="margin:0">${x(
      'Projets cofinancés par l’Union européenne dans le cadre du programme Erasmus+. Les points de vue et avis exprimés n’engagent que leurs auteurs et ne reflètent pas nécessairement ceux de l’Union européenne. Ni l’Union européenne ni l’autorité chargée de l’octroi ne sauraient en être tenues pour responsables.',
      'Projects co-funded by the European Union under the Erasmus+ programme. Views and opinions expressed are those of the authors only and do not necessarily reflect those of the European Union. Neither the European Union nor the granting authority can be held responsible for them.')}</p></div>
    <div class="legal"><span>© ${new Date().getFullYear()} ${site.name} — ${x('association loi 1901', 'French non-profit association')}</span><span>${x('Site sans cookie ni traceur publicitaire', 'No cookies, no ad trackers')}</span></div>
  </div>
</footer>
<script src="${asset('app.js')}" defer></script>
</body>
</html>
`;
}

// --- Écriture ---
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync(join(ROOT, 'src/assets'), join(OUT, 'assets'), { recursive: true });
const urls = [];
for (const id of Object.keys(pages)) for (const lang of LANGS) {
  const p = pathOf(id, lang), file = join(OUT, p, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, render(id, lang));
  if (!pages[id].noindex) urls.push(abs(p));
}
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);
writeFileSync(join(OUT, '.nojekyll'), '');
writeFileSync(join(OUT, '404.html'), render('home', 'fr').replace(/(href|src)="\.\//g, `$1="${new URL(BASE + '/').pathname}`));
writeFileSync(join(OUT, 'assets/site.webmanifest'), JSON.stringify({ name: site.name, short_name: site.name, start_url: '../', display: 'standalone', background_color: '#FAF8F3', theme_color: '#0B1F5E', icons: [{ src: 'brand/icone.svg', sizes: 'any', type: 'image/svg+xml' }] }));
console.log(`OK — ${urls.length} pages → docs/  (URL du site : ${BASE})`);
