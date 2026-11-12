// Contenu de toutes les pages, en français et en anglais.
// x(fr, en) renvoie le texte dans la langue de la page ; url(id) le lien vers une autre page.

import { domainIcons } from './brand-icons.mjs';

const domains = x => [
  ['cooperation', x('Coopération internationale', 'International cooperation'), x('Des projets construits avec des associations partenaires, en Europe et au-delà.', 'Projects built with partner organisations, in Europe and beyond.')],
  ['education', x('Éducation & formation', 'Education & training'), x('Apprendre par la pratique, en groupe, grâce à l’éducation non formelle.', 'Learning by doing, in a group, through non-formal education.')],
  ['youth', x('Jeunesse & inclusion sociale', 'Youth & social inclusion'), x('Priorité aux jeunes ayant moins d’opportunités, aux femmes et aux territoires ruraux.', 'Priority to young people with fewer opportunities, women and rural areas.')],
  ['sustainable', x('Développement durable', 'Sustainable development'), x('Voyages écoresponsables, initiatives locales, entrepreneuriat ancré dans les territoires.', 'Green travel, local initiatives, entrepreneurship rooted in local areas.')],
  ['erasmus', x('Projets Erasmus+ et mobilité', 'Erasmus+ projects and mobility'), x('Échanges de jeunes, formations et partenariats cofinancés par l’Union européenne.', 'Youth exchanges, training courses and partnerships co-funded by the European Union.')],
];
// Devise « Dialogue · Coopération · Inclusion » : [code, nom de la langue, trois mots, sens d'écriture]
const mottoLangs = [
  ['fr', 'Français', ['Dialogue', 'Coopération', 'Inclusion']], ['en', 'English', ['Dialogue', 'Cooperation', 'Inclusion']],
  ['es', 'Español', ['Diálogo', 'Cooperación', 'Inclusión']], ['ar', 'العربية', ['حوار', 'تعاون', 'إدماج'], 'rtl'],
  ['de', 'Deutsch', ['Dialog', 'Zusammenarbeit', 'Inklusion']], ['pt', 'Português', ['Diálogo', 'Cooperação', 'Inclusão']],
  ['zh', '中文', ['对话', '合作', '包容']], ['it', 'Italiano', ['Dialogo', 'Cooperazione', 'Inclusione']],
  ['el', 'Ελληνικά', ['Διάλογος', 'Συνεργασία', 'Συμπερίληψη']], ['tr', 'Türkçe', ['Diyalog', 'İş birliği', 'Kapsayıcılık']],
  ['hi', 'हिन्दी', ['संवाद', 'सहयोग', 'समावेश']], ['pl', 'Polski', ['Dialog', 'Współpraca', 'Inkluzja']],
  ['nl', 'Nederlands', ['Dialoog', 'Samenwerking', 'Inclusie']], ['uk', 'Українська', ['Діалог', 'Співпраця', 'Інклюзія']],
  ['sw', 'Kiswahili', ['Mazungumzo', 'Ushirikiano', 'Ujumuishaji']], ['ro', 'Română', ['Dialog', 'Cooperare', 'Incluziune']],
  ['ja', '日本語', ['対話', '協力', '包摂']], ['hu', 'Magyar', ['Párbeszéd', 'Együttműködés', 'Befogadás']],
  ['sv', 'Svenska', ['Dialog', 'Samarbete', 'Inkludering']], ['ko', '한국어', ['대화', '협력', '포용']],
  ['cs', 'Čeština', ['Dialog', 'Spolupráce', 'Inkluze']], ['bg', 'Български', ['Диалог', 'Сътрудничество', 'Приобщаване']],
  ['fi', 'Suomi', ['Vuoropuhelu', 'Yhteistyö', 'Osallisuus']],
];
const motto = (x, lang) => {
  const order = [...mottoLangs.filter(l => l[0] === lang), ...mottoLangs.filter(l => l[0] !== lang)];
  const w = order[0][2];
  return `<p class="motto" data-motto aria-label="${w.join(', ')}"><span aria-hidden="true">${w[0]}</span><i></i><span aria-hidden="true">${w[1]}</span><i></i><span aria-hidden="true">${w[2]}</span><small aria-hidden="true">${order[0][1]}</small></p>
    <script type="application/json" id="motto-data">${JSON.stringify(order)}</script>`;
};

// Bandeau défilant : mots-clés de la mobilité et de la solidarité, [mot, code de langue]
const ticker = [
  [ // Solidarité · Échange · Coopération · Paix · Jeunesse
    [['Solidarité', 'fr'], ['Solidaridad', 'es'], ['Solidarität', 'de'], ['تضامن', 'ar'], ['团结', 'zh'], ['Solidarność', 'pl'], ['Αλληλεγγύη', 'el'], ['Mshikamano', 'sw']],
    [['Échange', 'fr'], ['Exchange', 'en'], ['Scambio', 'it'], ['Austausch', 'de'], ['Intercâmbio', 'pt'], ['Değişim', 'tr'], ['交流', 'ja'], ['Uitwisseling', 'nl']],
    [['Coopération', 'fr'], ['Cooperación', 'es'], ['Cooperare', 'ro'], ['Együttműködés', 'hu'], ['Співпраця', 'uk'], ['सहयोग', 'hi'], ['Samarbete', 'sv'], ['تعاون', 'ar']],
    [['Paix', 'fr'], ['Peace', 'en'], ['Paz', 'es'], ['Frieden', 'de'], ['سلام', 'ar'], ['和平', 'zh'], ['Мир', 'uk'], ['Amani', 'sw']],
    [['Jeunesse', 'fr'], ['Youth', 'en'], ['Juventud', 'es'], ['Gioventù', 'it'], ['Jugend', 'de'], ['Młodzież', 'pl'], ['شباب', 'ar'], ['Gençlik', 'tr']],
    [['Diversité', 'fr'], ['Diversity', 'en'], ['Diversidad', 'es'], ['Vielfalt', 'de'], ['Diversità', 'it'], ['تنوع', 'ar'], ['多样性', 'zh'], ['Diversidade', 'pt']],
  ],
  [ // Interculturalité · Inclusion · Dialogue · Mobilité · Citoyenneté · Ensemble
    [['Interculturalité', 'fr'], ['Interculturality', 'en'], ['Interculturalidad', 'es'], ['Interculturalità', 'it'], ['Interkulturalität', 'de'], ['Interculturalidade', 'pt'], ['Interculturalitate', 'ro'], ['Interculturaliteit', 'nl']],
    [['Inclusion', 'fr'], ['Inclusión', 'es'], ['Inclusione', 'it'], ['Inclusão', 'pt'], ['إدماج', 'ar'], ['包容', 'zh'], ['समावेश', 'hi'], ['Inklusion', 'de']],
    [['Dialogue', 'fr'], ['Diálogo', 'es'], ['Dialog', 'de'], ['حوار', 'ar'], ['对话', 'zh'], ['Διάλογος', 'el'], ['Párbeszéd', 'hu'], ['संवाद', 'hi']],
    [['Mobilité', 'fr'], ['Mobility', 'en'], ['Movilidad', 'es'], ['Mobilità', 'it'], ['Mobilität', 'de'], ['Mobilidade', 'pt'], ['Mobilność', 'pl'], ['Hareketlilik', 'tr']],
    [['Citoyenneté', 'fr'], ['Citizenship', 'en'], ['Ciudadanía', 'es'], ['Cittadinanza', 'it'], ['Cidadania', 'pt'], ['مواطنة', 'ar'], ['Cetățenie', 'ro'], ['Obywatelstwo', 'pl']],
    [['Ensemble', 'fr'], ['Together', 'en'], ['Juntos', 'es'], ['Insieme', 'it'], ['Gemeinsam', 'de'], ['معاً', 'ar'], ['Pamoja', 'sw'], ['Разом', 'uk']],
  ],
];
const tickerRow = (row, alt) => {
  const items = [];
  for (let i = 0; i < 8; i++) for (const group of row) items.push(group[i]);   // alterne les mots-clés, puis change de langue
  const html = items.map(([w, l]) => `<span><bdi lang="${l}">${w}</bdi><sup>${l.toUpperCase()}</sup></span>`).join('');
  return `<div class="marquee${alt ? ' alt-row' : ''}"><div class="marquee-track">${html}${html}</div></div>`;
};

// Série vidéo « Erasmus+ décrypté » : [titre FR, titre EN, résumé FR, résumé EN, durée ISO]
const episodes = [
  ['Ce n’est pas que pour les étudiants', 'It is not only for students', 'Erasmus+ en chiffres : qui part, combien, et pourquoi les jeunes hors université sont concernés.', 'Erasmus+ in numbers: who goes, how many, and why young people outside university are concerned.', 'PT1M4S'],
  ['Trois portes pour partir', 'Three doors to go abroad', 'Échanges de jeunes, mobilité des animateurs de jeunesse, DiscoverEU : les trois entrées du volet Jeunesse.', 'Youth exchanges, youth worker mobility, DiscoverEU: the three ways into the Youth strand.', 'PT1M5S'],
  ['Erasmus+ pour toutes et tous', 'Erasmus+ for everyone', 'Ce que le programme prévoit pour les jeunes ayant moins d’opportunités, et ce que cela donne chez nous.', 'What the programme provides for young people with fewer opportunities, and what it looks like with us.', 'PT1M1S'],
  ['Monter un projet en 6 étapes', 'Setting up a project in 6 steps', 'Du besoin de départ à la diffusion des résultats : la méthode pour une association, et les erreurs à éviter.', 'From the initial need to sharing results: the method for an organisation, and the mistakes to avoid.', 'PT1M1S'],
  ['Cross Borders en action', 'Cross Borders in action', 'Nos rendez-vous de 2025 et 2026, ce que les jeunes ont produit, et la suite.', 'Our 2025 and 2026 projects, what the young people produced, and what comes next.', 'PT1M5S'],
];
const euNote = x => x('Série cofinancée par l’Union européenne dans le cadre du programme Erasmus+. Les points de vue et avis exprimés n’engagent que leur auteur et ne reflètent pas nécessairement ceux de l’Union européenne.', 'Series co-funded by the European Union under the Erasmus+ programme. Views and opinions expressed are those of the author only and do not necessarily reflect those of the European Union.');

const partners2025 = [
  ['Cross Borders', 'France', 'France'], ['FTHIA in ACTION', 'Grèce', 'Greece'], ['DISSO', 'Italie', 'Italy'],
  ['MINHA RUA', 'Portugal', 'Portugal'], ['EUDUCATE', 'Espagne', 'Spain'],
];

const head = ({ x, url }, crumbs, eyebrow, h1, lead) => `
<div class="page-head"><div class="wrap">
  <p class="crumbs"><a href="${url('home')}">${x('Accueil', 'Home')}</a>${crumbs.map(([t, l]) => ` / ${t ? `<a href="${url(t)}">${l}</a>` : l}`).join('')}</p>
  <p class="eyebrow">${eyebrow}</p>
  <h1>${h1}</h1>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div></div>`;

const cta = ({ x, url }) => `
<section><div class="wrap"><div class="cta reveal">
  <h2>${x('Prêt·e à franchir la frontière ?', 'Ready to cross the border?')}</h2>
  <p>${x('Jeune, animateur·rice, association ou collectivité : écrivez-nous. Nous répondons à chaque message et nous vous orientons vers l’opportunité qui vous correspond.', 'Young person, youth worker, NGO or local authority: write to us. We answer every message and point you to the opportunity that fits you.')}</p>
  <div class="cta-row"><a class="btn" href="${url('contact')}">${x('Nous écrire', 'Contact us')}</a><a class="btn ghost" href="${url('resources')}">${x('Explorer les ressources', 'Browse resources')}</a></div>
</div></div></section>`;

const heroMap = x => {
  const home = [138, 136];
  const pts = [[53, 290, 'Portugal', 'Portugal', -6, 22], [112, 268, x('Espagne', 'Spain'), '', 12, 20], [323, 242, x('Italie', 'Italy'), '', 12, 4], [452, 300, x('Grèce', 'Greece'), '', -18, 24]];
  const arc = ([px, py], i) => {
    const west = px < home[0];
    const mx = west ? px - 24 : (home[0] + px) / 2, my = west ? home[1] + 14 : home[1] - 44 - i * 12;
    return `<path class="arc${i % 2 ? ' b' : ''}" d="M${home[0]} ${home[1]} Q${mx} ${my} ${px} ${py}"/>`;
  };
  return `<svg viewBox="0 0 520 380" role="img" aria-label="${x('Carte des liens entre Nantes et nos pays partenaires : Portugal, Espagne, Italie, Grèce', 'Map of links between Nantes and our partner countries: Portugal, Spain, Italy, Greece')}">
    <defs><pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#F4EFE6" opacity=".16"/></pattern></defs>
    <rect width="520" height="380" rx="20" fill="url(#dots)"/>
    <path d="M0 190 H520" stroke="#F4EFE6" stroke-opacity=".12" stroke-dasharray="2 8"/><path d="M260 0 V380" stroke="#F4EFE6" stroke-opacity=".12" stroke-dasharray="2 8"/>
    ${pts.map(arc).join('')}
    ${pts.map(([px, py, l, , dx, dy]) => `<circle class="node" cx="${px}" cy="${py}" r="6"/><text class="map-label" x="${px + dx}" y="${py + dy}">${l}</text>`).join('')}
    <circle class="pulse" cx="${home[0]}" cy="${home[1]}" r="12"/><circle class="node-home" cx="${home[0]}" cy="${home[1]}" r="9"/>
    <text class="map-label home" text-anchor="end" x="${home[0] + 12}" y="${home[1] - 24}">Nantes · Rezé</text>
  </svg>`;
};

const quiz = ({ x, url }) => ({
  ui: { step: x('Question', 'Question'), result: x('Notre suggestion', 'Our suggestion'), restart: x('Recommencer', 'Start again') },
  nodes: {
    start: { q: x('Qui êtes-vous ?', 'Who are you?'), options: [
      { label: x('Un·e jeune de 18 à 30 ans', 'A young person aged 18–30'), next: 'young' },
      { label: x('Animateur·rice, formateur·rice ou travailleur·se de jeunesse', 'A youth worker, trainer or facilitator'), next: 'r_training' },
      { label: x('Une association, une structure ou une collectivité', 'An NGO, organisation or local authority'), next: 'r_partner' }] },
    young: { q: x('Qu’est-ce qui vous tente le plus ?', 'What appeals to you most?'), options: [
      { label: x('Une à trois semaines en groupe, avec des jeunes d’autres pays', 'One to three weeks in a group, with young people from other countries'), next: 'r_exchange' },
      { label: x('M’engager plusieurs mois dans un projet solidaire à l’étranger', 'Committing several months to a solidarity project abroad'), next: 'r_esc' },
      { label: x('J’ai 18 ans et je veux découvrir l’Europe en train', 'I am 18 and want to discover Europe by train'), next: 'r_discover' },
      { label: x('Je veux d’abord comprendre comment ça marche', 'I first want to understand how it all works'), next: 'r_learn' }] },
    r_exchange: { title: x('L’échange de jeunes Erasmus+', 'An Erasmus+ youth exchange'), text: x('Un séjour court en groupe, fondé sur l’éducation non formelle : ateliers, visites, soirées interculturelles. Hébergement, repas et activités sont pris en charge, le voyage est remboursé selon les règles Erasmus+ et vous repartez avec un certificat Youthpass. C’est le cœur de notre activité.', 'A short group stay built on non-formal learning: workshops, field visits, intercultural evenings. Accommodation, meals and activities are covered, travel is reimbursed under Erasmus+ rules and you leave with a Youthpass certificate. This is the heart of what we do.'), cta: x('Voir comment participer', 'See how to take part'), href: url('join', '#jeunes') },
    r_esc: { title: x('Le volontariat du Corps européen de solidarité', 'European Solidarity Corps volunteering'), text: x('De 18 à 30 ans, vous pouvez vous engager de 2 à 12 mois dans une structure d’accueil en Europe, avec hébergement, repas et argent de poche. Les offres sont publiées sur le Portail européen de la jeunesse.', 'Between 18 and 30, you can volunteer for 2 to 12 months with a host organisation in Europe, with accommodation, food and pocket money. Offers are published on the European Youth Portal.'), cta: x('Ouvrir le portail officiel', 'Open the official portal'), href: 'https://youth.europa.eu/solidarity_' + x('fr', 'en') },
    r_discover: { title: 'DiscoverEU', text: x('Chaque année, l’Union européenne offre des pass de voyage aux jeunes de 18 ans, après une candidature en ligne et un quiz. Les périodes de candidature sont annoncées sur le Portail européen de la jeunesse.', 'Every year the European Union gives travel passes to 18-year-olds after an online application and a quiz. Application rounds are announced on the European Youth Portal.'), cta: x('Voir DiscoverEU', 'See DiscoverEU'), href: 'https://youth.europa.eu/discovereu_' + x('fr', 'en') },
    r_learn: { title: x('Commencez par nos guides', 'Start with our guides'), text: x('Erasmus+ expliqué simplement, le Youthpass, le remboursement du voyage, un glossaire et une FAQ : tout est réuni dans notre centre de ressources, gratuitement.', 'Erasmus+ in plain words, Youthpass, travel reimbursement, a glossary and an FAQ: it is all gathered in our free resource centre.'), cta: x('Ouvrir les ressources', 'Open the resources'), href: url('resources') },
    r_training: { title: x('La mobilité des acteurs de jeunesse', 'Mobility for youth workers'), text: x('Formations, séminaires et visites d’étude en Europe pour les professionnel·les et bénévoles qui accompagnent les jeunes, sans limite d’âge. Le calendrier européen de SALTO recense les formations ouvertes ; écrivez-nous si vous souhaitez intervenir dans nos projets.', 'Training courses, seminars and study visits across Europe for professionals and volunteers who work with young people, with no age limit. The SALTO European Training Calendar lists open courses; write to us if you would like to contribute to our projects.'), cta: x('Voir l’espace professionnels', 'See the professionals’ section'), href: url('join', '#pros') },
    r_partner: { title: x('Devenir partenaire', 'Become a partner'), text: x('Nous accueillons des groupes à Nantes et nous envoyons des jeunes chez nos partenaires. Présentez-nous votre structure, votre public et votre idée de projet : nous revenons vers vous pour étudier une coopération.', 'We host groups in Nantes and send young people to our partners. Tell us about your organisation, your target group and your project idea: we will get back to you to explore cooperation.'), cta: x('Proposer un partenariat', 'Propose a partnership'), href: url('join', '#partenaires') },
  },
});

const projectCard = (c, id, cover, tags, title, text, facts) => `
<a class="card project reveal" href="${c.url(id)}">
  <div class="cover ${cover}">${facts[0]}</div>
  <div class="body"><div class="tags">${tags.map((t, i) => `<span class="tag${i ? '' : ' sun'}">${t}</span>`).join('')}</div>
  <h3>${title}</h3><p>${text}</p>
  <div class="facts">${facts.slice(1).map(f => `<span>${f}</span>`).join('')}</div></div>
</a>`;

const projectCards = c => {
  const { x } = c;
  return projectCard(c, 'p2026', 'p2', ['Erasmus+', x('Inclusion', 'Inclusion'), x('Égalité', 'Equality')],
    x('Promouvoir l’inclusion socio-économique des femmes en milieu rural', 'Promoting the socio-economic inclusion of rural women'),
    x('25 jeunes de 5 pays réunis à Rezé pour comprendre les freins que rencontrent les femmes en milieu rural et imaginer des réponses concrètes.', '25 young people from 5 countries gathered in Rezé to understand the barriers rural women face and design concrete responses.'),
    ['2026', `<b>${x('22 – 30 mars 2026', '22 – 30 March 2026')}</b>`, 'Rezé, France', x('5 pays', '5 countries')])
  + projectCard(c, 'p2025', 'p1', ['Erasmus+', x('Échange de jeunes', 'Youth exchange'), x('Entrepreneuriat', 'Entrepreneurship')],
    x('Jeunes : développez votre esprit d’entreprise en milieu rural !', 'Young people: develop your entrepreneurial spirit in rural areas!'),
    x('32 jeunes de 5 pays réunis pour faire de l’entrepreneuriat une réponse au chômage des jeunes dans les territoires ruraux.', '32 young people from 5 countries turning entrepreneurship into an answer to youth unemployment in rural areas.'),
    ['2025', `<b>${x('22 – 29 juin 2025', '22 – 29 June 2025')}</b>`, 'Nantes, France', x('5 pays', '5 countries')]);
};

export const pages = {
  // ───────────────────────────── ACCUEIL
  home: {
    slug: { fr: '', en: 'en' },
    title: { fr: 'Mobilité européenne, échanges de jeunes Erasmus+ à Nantes', en: 'European mobility and Erasmus+ youth exchanges in Nantes' },
    desc: { fr: 'Cross Borders est une association de Rezé (Nantes) qui organise des échanges de jeunes et des projets Erasmus+ : mobilité, citoyenneté, entrepreneuriat, inclusion et coopération européenne.', en: 'Cross Borders is a non-profit based in Rezé (Nantes, France) running Erasmus+ youth exchanges and projects: mobility, citizenship, entrepreneurship, inclusion and European cooperation.' },
    body: c => { const { x, url } = c;  return `
<section class="hero"><div class="wrap hero-grid">
  <div>
    <p class="eyebrow">${x('Association Erasmus+ · Rezé, Nantes', 'Erasmus+ non-profit · Rezé, Nantes')}</p>
    ${motto(x, c.lang)}
    <h1>${x('Ensemble, <em>au-delà</em> des frontières.', 'Together, <em>beyond</em> borders.')}</h1>
    <p class="lead">${x('Cross Borders ouvre l’Europe aux jeunes qui en sont le plus éloignés. Nous organisons des échanges de jeunes, des formations et des partenariats européens pour apprendre autrement, entreprendre et vivre ensemble.', 'Cross Borders opens Europe to the young people furthest from it. We run youth exchanges, training courses and European partnerships to learn differently, start projects and live together.')}</p>
    <div class="cta-row"><a class="btn" href="${url('join')}">${x('Trouver mon opportunité', 'Find my opportunity')}</a><a class="btn ghost" href="${url('projects')}">${x('Voir nos projets', 'See our projects')}</a></div>
    <div class="hero-meta"><span class="pill"><b></b>${x('Cofinancé par l’Union européenne', 'Co-funded by the European Union')}</span><span class="pill">${x('Certificat Youthpass', 'Youthpass certificate')}</span><span class="pill">${x('Éducation non formelle', 'Non-formal learning')}</span></div>
  </div>
  <div class="map-card reveal">${heroMap(x)}<div class="caption"><span>47.19° N · 1.55° W</span><span>${x('Nos liens en Europe', 'Our links across Europe')}</span></div></div>
</div></section>

<div aria-hidden="true">${tickerRow(ticker[0])}${tickerRow(ticker[1], true)}</div>
<p class="sr">${x('Solidarité, échange, coopération, paix, jeunesse, diversité, interculturalité, inclusion, dialogue, mobilité, citoyenneté, ensemble : nos mots-clés, dans les langues du monde.', 'Solidarity, exchange, cooperation, peace, youth, diversity, interculturality, inclusion, dialogue, mobility, citizenship, together: our keywords, in the languages of the world.')}</p>

<section><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Ce que nous faisons', 'What we do')}</p><h2>${x('Cinq domaines, une même ambition', 'Five fields, one ambition')}</h2></div><a class="arrow" href="${url('about')}">${x('Découvrir l’association', 'About the association')}</a></div>
  <div class="grid g5">${domains(x).map(([k, t, d]) => `<div class="card lift domain reveal">${domainIcons[k]}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Nos projets', 'Our projects')}</p><h2>${x('L’Europe, vécue à Nantes', 'Europe, lived in Nantes')}</h2></div><a class="arrow" href="${url('projects')}">${x('Tous les projets', 'All projects')}</a></div>
  <div class="grid g2">${projectCards(c)}</div>
</div></section>

<section><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Série vidéo', 'Video series')}</p><h2>${x('Erasmus+ décrypté, en une minute', 'Erasmus+ decoded, in one minute')}</h2><p class="lead">${x('Cinq épisodes courts pour comprendre le programme, par le président de Cross Borders.', 'Five short episodes to understand the programme, by the president of Cross Borders.')}</p></div><a class="arrow" href="${url('videos')}">${x('Regarder la série', 'Watch the series')}</a></div>
  <div class="reels">${episodes.map(([fr, en], i) => `<a class="reel reveal" href="${url('videos', '#ep' + (i + 1))}" aria-label="${x('Épisode', 'Episode')} ${i + 1} — ${x(fr, en)}"><img src="${c.asset(`videos/erasmus-decrypte-ep${i + 1}.jpg`)}" alt="" width="540" height="960" loading="lazy"><span class="play" aria-hidden="true"></span></a>`).join('')}</div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('En chiffres', 'In numbers')}</p><h2>${x('Notre échange de juin 2025', 'Our June 2025 exchange')}</h2></div></div>
  <div class="stats reveal">
    <div class="stat"><strong>32</strong><span>${x('jeunes de 18 à 30 ans', 'young people aged 18–30')}</span></div>
    <div class="stat"><strong>5</strong><span>${x('pays européens', 'European countries')}</span></div>
    <div class="stat"><strong>5</strong><span>${x('associations partenaires', 'partner organisations')}</span></div>
    <div class="stat"><strong>8</strong><span>${x('jours d’ateliers et de visites', 'days of workshops and visits')}</span></div>
  </div>
</div></section>

<section class="dark"><div class="wrap split">
  <div>
    <p class="eyebrow">${x('Orientation en 30 secondes', 'Guidance in 30 seconds')}</p>
    <h2>${x('Quelle opportunité européenne est faite pour vous ?', 'Which European opportunity is right for you?')}</h2>
    <p class="lead">${x('Répondez à deux questions. Nous vous indiquons le bon dispositif et la prochaine étape, que ce soit avec nous ou ailleurs en Europe.', 'Answer two questions. We point you to the right scheme and the next step, with us or elsewhere in Europe.')}</p>
  </div>
  <div class="quiz" data-quiz aria-live="polite"><noscript>${x('Activez JavaScript pour utiliser le quiz, ou consultez la page Participer.', 'Enable JavaScript to use the quiz, or see the Get involved page.')}</noscript></div>
  <script type="application/json" id="quiz-data">${JSON.stringify(quiz(c)).replace(/</g, '\\u003c')}</script>
</div></section>

<section><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Centre de ressources', 'Resource centre')}</p><h2>${x('Tout comprendre avant de partir', 'Understand everything before you go')}</h2><p class="lead">${x('Des guides clairs, des outils pratiques et les liens officiels, en accès libre.', 'Clear guides, practical tools and official links, free for everyone.')}</p></div><a class="arrow" href="${url('resources')}">${x('Toutes les ressources', 'All resources')}</a></div>
  <div class="grid g3">
    <a class="card reveal" href="${url('resources', '#guides')}"><span class="num">01</span><h3>${x('Erasmus+ expliqué simplement', 'Erasmus+ in plain words')}</h3><p>${x('Qui peut partir, pour quoi faire, et ce qui est pris en charge.', 'Who can go, to do what, and what is covered.')}</p></a>
    <a class="card reveal" href="${url('resources', '#checklist')}"><span class="num">02</span><h3>${x('Ma liste de préparation', 'My packing checklist')}</h3><p>${x('La liste interactive de tout ce qu’il faut emporter et préparer.', 'The interactive list of everything to pack and prepare.')}</p></a>
    <a class="card reveal" href="${url('resources', '#glossaire')}"><span class="num">03</span><h3>${x('Le glossaire de la mobilité', 'The mobility glossary')}</h3><p>${x('Youthpass, infopack, organisation d’envoi… le jargon décodé.', 'Youthpass, infopack, sending organisation… the jargon decoded.')}</p></a>
  </div>
</div></section>

<section class="alt"><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Notre réseau', 'Our network')}</p><h2>${x('Ils construisent l’Europe avec nous', 'They build Europe with us')}</h2></div></div>
  <div class="grid g4">${partners2025.slice(1).map(([n, fr, en]) => `<div class="card reveal"><span class="tag">${x(fr, en)}</span><h3>${n}</h3></div>`).join('')}</div>
</div></section>
${cta(c)}`; },
  },

  // ───────────────────────────── ASSOCIATION
  about: {
    slug: { fr: 'a-propos', en: 'en/about' },
    title: { fr: 'L’association', en: 'About us' },
    desc: { fr: 'Mission, valeurs et méthode de Cross Borders, association loi 1901 basée à Rezé : rendre la mobilité européenne accessible à tous les jeunes.', en: 'Mission, values and method of Cross Borders, a French non-profit based in Rezé: making European mobility accessible to all young people.' },
    body: c => { const { x, site } = c; return `
${head(c, [[null, x('L’association', 'About')]], x('Qui sommes-nous', 'Who we are'), x('Une association pour celles et ceux que l’Europe n’atteint pas encore', 'A non-profit for those Europe has not reached yet'), x('Cross Borders est une association à but non lucratif basée à Rezé, aux portes de Nantes. Notre conviction : une semaine vécue avec des jeunes d’autres pays peut changer une trajectoire.', 'Cross Borders is a non-profit association based in Rezé, on the doorstep of Nantes. Our belief: one week spent with young people from other countries can change a life path.'))}
<section><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Notre mission', 'Our mission')}</p><h2>${x('Libérer le potentiel des jeunes, au-delà des frontières', 'Unlocking young people’s potential, beyond borders')}</h2></div>
  <div class="prose">
    <p>${x('Nous concevons et accueillons des projets européens de jeunesse, principalement dans le cadre du programme Erasmus+ : échanges de jeunes, formations, partenariats entre associations.', 'We design and host European youth projects, mainly under the Erasmus+ programme: youth exchanges, training courses and partnerships between organisations.')}</p>
    <p>${x('Notre travail s’adresse d’abord aux jeunes ayant moins d’opportunités : celles et ceux qui, pour des raisons sociales, économiques ou géographiques, partent rarement à l’étranger. Dans chaque projet, chaque association partenaire s’engage à inclure des jeunes dans cette situation.', 'Our work is aimed first at young people with fewer opportunities: those who, for social, economic or geographical reasons, rarely get to go abroad. In every project, each partner organisation commits to including young people in that situation.')}</p>
    <p>${x('Nous travaillons sur des sujets concrets, ancrés dans les territoires : l’entrepreneuriat des jeunes en milieu rural, l’inclusion socio-économique des femmes, la citoyenneté européenne.', 'We work on concrete, place-based topics: youth entrepreneurship in rural areas, the socio-economic inclusion of women, European citizenship.')}</p>
  </div>
</div></section>
<section class="alt"><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Nos cinq piliers', 'Our five pillars')}</p><h2>${x('Ce qui guide chacun de nos projets', 'What guides every project')}</h2></div></div>
  <div class="grid g3">
    <div class="card c-coral reveal"><div class="icon">✈️</div><h3>${x('Mobilité', 'Mobility')}</h3><p>${x('Partir, accueillir, se déplacer autrement : la mobilité comme expérience d’apprentissage, avec une préférence pour les modes de transport écoresponsables.', 'Going abroad, hosting, travelling differently: mobility as a learning experience, with a preference for greener ways to travel.')}</p></div>
    <div class="card c-sea reveal"><div class="icon">🗳️</div><h3>${x('Citoyenneté', 'Citizenship')}</h3><p>${x('Donner aux jeunes les moyens de comprendre l’Europe, d’y prendre la parole et d’agir dans leur communauté.', 'Giving young people the means to understand Europe, speak up and act in their community.')}</p></div>
    <div class="card c-sun reveal"><div class="icon">💡</div><h3>${x('Entrepreneuriat', 'Entrepreneurship')}</h3><p>${x('Passer de l’idée au projet : études de cas, visites d’initiatives locales, plans d’action construits en équipe.', 'From idea to project: case studies, visits to local initiatives, action plans built as a team.')}</p></div>
    <div class="card c-leaf reveal"><div class="icon">🫱🏽‍🫲🏾</div><h3>Inclusion</h3><p>${x('Mixité de genre, participation des jeunes ayant moins d’opportunités, tous niveaux de langue bienvenus.', 'Gender balance, participation of young people with fewer opportunities, all language levels welcome.')}</p></div>
    <div class="card c-coral reveal"><div class="icon">🇪🇺</div><h3>${x('Coopération européenne', 'European cooperation')}</h3><p>${x('Un réseau d’organisations partenaires qui partagent pratiques, idées et projets.', 'A network of partner organisations sharing practices, ideas and projects.')}</p></div>
    <div class="card reveal" style="background:var(--ink);color:var(--paper)"><h3>${x('Notre méthode : l’éducation non formelle', 'Our method: non-formal learning')}</h3><p style="color:inherit;opacity:.85">${x('On apprend en faisant, en groupe, hors de la salle de classe : jeux brise-glace, ateliers, visites de terrain, bilans quotidiens.', 'Learning by doing, in a group, outside the classroom: ice-breakers, workshops, field visits, daily debriefs.')}</p></div>
  </div>
</div></section>
<section><div class="wrap split">
  <div><p class="eyebrow">${x('Nos engagements', 'Our commitments')}</p><h2>${x('Ce que vous pouvez attendre de nous', 'What you can expect from us')}</h2></div>
  <ol class="steps">
    <li><div><h3>${x('Zéro frais caché', 'No hidden costs')}</h3><p>${x('Dans nos échanges Erasmus+, l’hébergement, les repas et les activités sont pris en charge par le programme.', 'In our Erasmus+ exchanges, accommodation, meals and activities are covered by the programme.')}</p></div></li>
    <li><div><h3>${x('Une reconnaissance européenne', 'European recognition')}</h3><p>${x('Chaque participant·e reçoit un certificat Youthpass qui décrit les compétences acquises.', 'Every participant receives a Youthpass certificate describing the skills gained.')}</p></div></li>
    <li><div><h3>${x('Des données protégées', 'Protected data')}</h3><p>${x('Nous appliquons le RGPD : vos données servent uniquement à organiser le projet et ne sont jamais vendues.', 'We apply the GDPR: your data is used only to run the project and is never sold.')}</p></div></li>
    <li><div><h3>${x('Des résultats partagés', 'Shared results')}</h3><p>${x('Participant·es et partenaires diffusent ce qu’ils ont appris dans leur communauté et leurs réseaux.', 'Participants and partners share what they learned in their communities and networks.')}</p></div></li>
  </ol>
</div></section>
<section class="alt"><div class="wrap split">
  <div><p class="eyebrow">${x('Identité', 'Identity')}</p><h2>${x('Carte d’identité de l’association', 'The association at a glance')}</h2></div>
  <dl class="glossary" style="grid-template-columns:1fr">
    <div class="term"><dt>${x('Statut', 'Status')}</dt><dd>${x('Association déclarée (loi 1901), à but non lucratif', 'Registered non-profit association (French law of 1901)')}</dd></div>
    <div class="term"><dt>${x('Siège', 'Registered office')}</dt><dd>${site.street}, ${site.zip} ${site.city}, France</dd></div>
    <div class="term"><dt>${x('Numéro RNA', 'RNA number')}</dt><dd>${site.rna}</dd></div>
    <div class="term"><dt>SIREN / SIRET</dt><dd>${site.siren} / ${site.siret}</dd></div>
  </dl>
</div></section>
<section><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Notre identité', 'Our identity')}</p><h2>${x('Dialogue, coopération, inclusion', 'Dialogue, cooperation, inclusion')}</h2><p class="lead">${x('Un globe tourné vers l’Europe, trois personnes les bras levés, un arc d’étoiles : notre logo dit ce que nous faisons, ensemble, au-delà des frontières.', 'A globe turned towards Europe, three people with raised arms, an arc of stars: our logo says what we do, together, beyond borders.')}</p></div></div>
  <div class="identity reveal"><img src="${c.asset('brand/bandeau-complet.svg')}" alt="${x('Logo Cross Borders : Dialogue, Coopération, Inclusion. Ensemble, au-delà des frontières. Cinq domaines : coopération internationale, éducation et formation, jeunesse et inclusion sociale, développement durable, projets Erasmus+ et mobilité.', 'Cross Borders logo: Dialogue, Cooperation, Inclusion. Together, beyond borders. Five fields: international cooperation, education and training, youth and social inclusion, sustainable development, Erasmus+ projects and mobility.')}" width="1540" height="1070" loading="lazy"></div>
  <div class="downloads"><a class="btn small ghost" href="${c.asset('brand/logo-vertical.png')}" download>${x('Logo (PNG)', 'Logo (PNG)')}</a><a class="btn small ghost" href="${c.asset('brand/logo-vertical.svg')}" download>${x('Logo (SVG)', 'Logo (SVG)')}</a><a class="btn small ghost" href="${c.asset('brand/bandeau-complet.png')}" download>${x('Bandeau complet (PNG)', 'Full banner (PNG)')}</a></div>
</div></section>
${cta(c)}`; },
  },

  // ───────────────────────────── PROJETS
  projects: {
    slug: { fr: 'projets', en: 'en/projects' },
    title: { fr: 'Nos projets Erasmus+', en: 'Our Erasmus+ projects' },
    desc: { fr: 'Les projets européens de Cross Borders à Nantes : entrepreneuriat des jeunes en milieu rural (2025), inclusion socio-économique des femmes rurales (2026).', en: 'Cross Borders’ European projects in Nantes: youth entrepreneurship in rural areas (2025), socio-economic inclusion of rural women (2026).' },
    body: c => { const { x, url } = c; return `
${head(c, [[null, x('Projets', 'Projects')]], x('Nos projets', 'Our projects'), x('Des projets européens, ancrés dans le réel', 'European projects, rooted in real life'), x('Chaque projet part d’un problème concret et réunit des jeunes de plusieurs pays pour y travailler ensemble, à Nantes et dans sa région.', 'Each project starts from a concrete problem and brings together young people from several countries to work on it, in and around Nantes.'))}
<section><div class="wrap"><div class="grid g2">${projectCards(c)}</div>
  <div class="note reveal" style="margin-top:28px">${x('Vous voulez être prévenu·e du prochain appel à participant·es ?', 'Want to hear about the next call for participants?')} <a href="${url('contact')}">${x('Écrivez-nous', 'Write to us')}</a> ${x('en précisant « prochain projet ».', 'and mention “next project”.')}</div>
</div></section>
${cta(c)}`; },
  },

  p2025: {
    parent: 'projects',
    slug: { fr: 'projets/entrepreneuriat-rural-2025', en: 'en/projects/rural-entrepreneurship-2025' },
    title: { fr: 'Jeunes : développez votre esprit d’entreprise en milieu rural', en: 'Young people: develop your entrepreneurial spirit in rural areas' },
    desc: { fr: 'Échange de jeunes Erasmus+ organisé par Cross Borders du 22 au 29 juin 2025 à Nantes : 32 jeunes de France, Grèce, Italie, Portugal et Espagne autour de l’entrepreneuriat rural.', en: 'Erasmus+ youth exchange hosted by Cross Borders from 22 to 29 June 2025 in Nantes: 32 young people from France, Greece, Italy, Portugal and Spain on rural entrepreneurship.' },
    body: c => { const { x } = c; const days = [
      [x('Accueil et introduction', 'Welcome and introduction'), [x('Accueil et remise du kit de bienvenue', 'Welcome and welcome kit'), x('Activité brise-glace et attentes des participant·es', 'Ice-breaker and participants’ expectations'), x('Atelier introductif : les défis de l’entrepreneuriat rural', 'Opening workshop: the challenges of rural entrepreneurship'), x('« ONG Market » : chaque association se présente', '“NGO Market”: each organisation introduces itself')]],
      [x('Modèles d’entrepreneuriat rural', 'Models of rural entrepreneurship'), [x('Étude de cas : initiatives innovantes', 'Case study: innovative initiatives'), x('Visite de terrain chez Pronatura, à Rezé', 'Field visit to Pronatura in Rezé'), x('Atelier : les écosystèmes de soutien à l’entrepreneuriat', 'Workshop: entrepreneurship support ecosystems')]],
      [x('Renforcement des compétences', 'Building skills'), [x('Atelier : créer des partenariats stratégiques', 'Workshop: creating strategic partnerships'), x('Étude de cas : monter un projet communautaire', 'Case study: setting up a community project'), x('Visite de 23 Degrés, à Nantes : agriculture innovante', 'Visit to 23 Degrés in Nantes: innovative farming')]],
      [x('Inclusion et interculturalité', 'Inclusion and interculturality'), [x('Atelier : inclusion des femmes et des jeunes dans les projets', 'Workshop: including women and young people in projects'), x('Brainstorming : solutions interculturelles et inclusives', 'Brainstorm: intercultural and inclusive solutions'), x('Soirée interculturelle et découverte de Nantes', 'Intercultural evening and discovering Nantes')]],
      [x('Clôture et perspectives', 'Closing and next steps'), [x('Élaboration collaborative des plans d’action', 'Collaborative action planning'), x('Bilan et remise des certificats Youthpass', 'Evaluation and Youthpass certificates')]],
    ]; return `
${head(c, [['projects', x('Projets', 'Projects')], [null, '2025']], x('Échange de jeunes Erasmus+ · 22 – 29 juin 2025', 'Erasmus+ youth exchange · 22 – 29 June 2025'), x('Jeunes : développez votre esprit d’entreprise en milieu rural !', 'Young people: develop your entrepreneurial spirit in rural areas!'), x('32 jeunes de cinq pays européens réunis à Nantes pour faire de l’entrepreneuriat une réponse au chômage des jeunes dans les territoires ruraux.', '32 young people from five European countries gathered in Nantes to turn entrepreneurship into an answer to youth unemployment in rural areas.'))}
<section><div class="wrap">
  <div class="stats reveal"><div class="stat"><strong>32</strong><span>${x('participant·es de 18 à 30 ans', 'participants aged 18–30')}</span></div><div class="stat"><strong>5</strong><span>${x('pays', 'countries')}</span></div><div class="stat"><strong>8</strong><span>${x('jours', 'days')}</span></div><div class="stat"><strong>5</strong><span>${x(`associations partenaires`, `partner organisations`)}</span></div></div>
</div></section>
<section class="alt"><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Pourquoi ce projet', 'Why this project')}</p><h2>${x('Moins d’emplois, moins de formations, plus de départs', 'Fewer jobs, less training, more departures')}</h2></div>
  <div class="prose">
    <p>${x('Dans les zones rurales d’Europe, les jeunes ont plus de mal à trouver un emploi qu’en ville : offres rares, accès limité à la formation, dépeuplement. L’écart est encore plus marqué pour les jeunes femmes, souvent cantonnées à quelques secteurs peu rémunérés et précaires.', 'In Europe’s rural areas, young people struggle more to find work than in cities: few openings, limited access to training, depopulation. The gap is even wider for young women, often confined to a handful of low-paid, insecure sectors.')}</p>
    <p>${x('Pourtant, la jeunesse rurale a des idées et de l’énergie. Ce projet a cherché à encourager l’esprit d’entreprise pour créer de l’emploi local et donner envie de rester, ou de revenir.', 'Yet rural youth have ideas and energy. This project set out to foster entrepreneurial spirit so as to create local jobs and make people want to stay, or come back.')}</p>
    <h3>${x('Objectifs', 'Objectives')}</h3>
    <ul>
      <li>${x('Identifier les défis et les atouts des initiatives d’emploi rural dans différents pays européens.', 'Identify the challenges and strengths of rural employment initiatives across European countries.')}</li>
      <li>${x('Former les jeunes, par l’éducation non formelle, à concevoir et mener un projet entrepreneurial dans leur communauté.', 'Train young people, through non-formal learning, to design and run an entrepreneurial project in their community.')}</li>
      <li>${x('Créer un espace d’échange de savoirs, d’expériences et de bonnes pratiques.', 'Create a space to exchange knowledge, experience and good practice.')}</li>
      <li>${x('Informer sur les financements européens pour les projets entrepreneuriaux.', 'Share information on European funding for entrepreneurial projects.')}</li>
      <li>${x('Tisser un réseau durable entre organisations européennes.', 'Build a lasting network between European organisations.')}</li>
    </ul>
  </div>
</div></section>
<section><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Le programme', 'The programme')}</p><h2>${x('Cinq temps forts', 'Five key stages')}</h2><p class="lead">${x('Ateliers le matin, terrain l’après-midi, bilan chaque soir.', 'Workshops in the morning, field work in the afternoon, a debrief every evening.')}</p></div>
  <div class="timeline">${days.map(([t, items], i) => `<div class="day reveal"><h3><small>${x('Étape', 'Stage')} ${i + 1}</small>${t}</h3><ul>${items.map(it => `<li>${it}</li>`).join('')}</ul></div>`).join('')}</div>
</div></section>
<section class="alt"><div class="wrap">
  <div class="head"><div><p class="eyebrow">${x('Partenaires', 'Partners')}</p><h2>${x('Cinq organisations, cinq pays', 'Five organisations, five countries')}</h2></div></div>
  <div class="grid g3">${partners2025.map(([n, fr, en]) => `<div class="card reveal"><span class="tag">${x(fr, en)}</span><h3>${n}</h3></div>`).join('')}</div>
  <p class="note" style="margin-top:24px">${x('Projet cofinancé par la Commission européenne dans le cadre du programme Erasmus+.', 'Project co-financed by the European Commission under the Erasmus+ programme.')}</p>
</div></section>
${cta(c)}`; },
  },

  p2026: {
    parent: 'projects',
    slug: { fr: 'projets/femmes-rurales-2026', en: 'en/projects/rural-women-2026' },
    title: { fr: 'Promouvoir l’inclusion socio-économique des femmes en milieu rural', en: 'Promoting the socio-economic inclusion of rural women' },
    desc: { fr: 'Projet Erasmus+ Jeunesse accueilli par Cross Borders à Nantes du 22 au 30 mars 2026 sur l’inclusion socio-économique des femmes en milieu rural.', en: 'Erasmus+ youth project hosted by Cross Borders in Nantes from 22 to 30 March 2026 on the socio-economic inclusion of rural women.' },
    body: c => { const { x, url } = c; return `
${head(c, [['projects', x('Projets', 'Projects')], [null, '2026']], x('Erasmus+ Jeunesse · 22 – 30 mars 2026', 'Erasmus+ Youth · 22 – 30 March 2026'), x('Promouvoir l’inclusion socio-économique des femmes en milieu rural', 'Promoting the socio-economic inclusion of rural women'), x('Un échange de jeunes à Rezé : 25 jeunes de cinq pays pour comprendre ce qui freine la participation des femmes à la vie économique et sociale des campagnes, et y répondre.', 'A youth exchange in Rezé: 25 young people from five countries to understand what holds back women’s participation in the economic and social life of rural areas, and to respond.'))}
<section><div class="wrap">
  <div class="stats reveal"><div class="stat"><strong>25</strong><span>${x('jeunes, tous repartis avec un Youthpass', 'young people, all leaving with a Youthpass')}</span></div><div class="stat"><strong>5</strong><span>${x('pays : France, Türkiye, Italie, Allemagne, Hongrie', 'countries: France, Türkiye, Italy, Germany, Hungary')}</span></div><div class="stat"><strong>10</strong><span>${x('jeunes ayant moins d’opportunités', 'young people with fewer opportunities')}</span></div><div class="stat"><strong>2</strong><span>${x('prototypes : recyclage textile et apiculture', 'prototypes: textile recycling and beekeeping')}</span></div></div>
  <p class="note" style="margin-top:20px">${x('Les jeunes ont aussi rédigé un guide de plaidoyer en 12 recommandations, et sept jeunes Rezéennes ont pris part aux ateliers.', 'The young people also wrote an advocacy guide with 12 recommendations, and seven young women from Rezé took part in the workshops.')} <a href="${url('videos', '#ep5')}">${x('Voir l’épisode 5 de notre série vidéo', 'Watch episode 5 of our video series')}</a>.</p>
</div></section>
<section><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Le sujet', 'The issue')}</p><h2>${x('Dans les campagnes, l’égalité reste à construire', 'In the countryside, equality is still to be built')}</h2></div>
  <div class="prose">
    <p>${x('Dans les territoires ruraux, l’offre d’emploi est peu diversifiée et l’emploi des femmes se concentre dans un petit nombre de secteurs, souvent mal rémunérés et précaires. Beaucoup de jeunes femmes partent en ville au début de leur vie active.', 'In rural areas, the range of jobs is narrow and women’s employment is concentrated in a small number of sectors, often low-paid and insecure. Many young women leave for the city at the start of their working lives.')}</p>
    <p>${x('Ce projet prolonge notre échange de 2025 sur l’entrepreneuriat rural en plaçant les femmes au centre : accès à l’emploi, à la formation, au financement, à la prise de décision.', 'This project builds on our 2025 exchange on rural entrepreneurship by putting women at the centre: access to jobs, training, funding and decision-making.')}</p>
    <h3>${x('Ce que les participant·es y ont trouvé', 'What participants got out of it')}</h3>
    <ul>
      <li>${x('Des ateliers d’éducation non formelle et des échanges d’expériences entre pays.', 'Non-formal learning workshops and exchanges of experience between countries.')}</li>
      <li>${x('Un voyage écoresponsable encouragé : train, bus, covoiturage.', 'Encouragement to travel green: train, bus, carpooling.')}</li>
      <li>${x('Un certificat de participation et l’engagement de diffuser les résultats dans son réseau.', 'A certificate of participation and a commitment to share results within their network.')}</li>
    </ul>
    <p><a class="arrow" href="${url('p2025')}">${x('Voir le projet 2025 qui l’a inspiré', 'See the 2025 project that inspired it')}</a></p>
  </div>
</div></section>
${cta(c)}`; },
  },

  // ───────────────────────────── PARTICIPER
  join: {
    slug: { fr: 'participer', en: 'en/get-involved' },
    title: { fr: 'Participer à un projet européen', en: 'Get involved in a European project' },
    desc: { fr: 'Jeunes de 18 à 30 ans, animateurs, associations : comment participer à un échange Erasmus+ avec Cross Borders ou devenir partenaire.', en: 'Young people aged 18–30, youth workers, NGOs: how to join an Erasmus+ exchange with Cross Borders or become a partner.' },
    body: c => { const { x, url } = c; return `
${head(c, [[null, x('Participer', 'Get involved')]], x('Participer', 'Get involved'), x('Il y a une place pour vous en Europe', 'There is a place for you in Europe'), x('Pas besoin d’être bilingue, diplômé·e ou d’avoir déjà voyagé. Il faut de la curiosité et l’envie de participer.', 'You do not need to be bilingual, hold a degree or have travelled before. You need curiosity and the will to take part.'))}
<section><div class="wrap split">
  <div>
    <p class="eyebrow">${x('Orientation', 'Guidance')}</p>
    <h2>${x('Trouvez votre voie en deux questions', 'Find your path in two questions')}</h2>
    <p class="lead">${x('Le quiz vous indique le dispositif adapté et la prochaine étape.', 'The quiz tells you which scheme fits and what to do next.')}</p>
  </div>
  <div class="quiz" data-quiz aria-live="polite"></div>
  <script type="application/json" id="quiz-data">${JSON.stringify(quiz(c)).replace(/</g, '\\u003c')}</script>
</div></section>

<section class="alt" id="jeunes"><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Jeunes de 18 à 30 ans', 'Young people aged 18–30')}</p><h2>${x('Partir en échange de jeunes', 'Joining a youth exchange')}</h2>
    <p class="lead">${x('Tous les niveaux d’anglais sont acceptés. Les jeunes ayant moins d’opportunités sont prioritaires.', 'All levels of English are welcome. Young people with fewer opportunities have priority.')}</p>
    <p><a class="btn" href="${url('contact')}">${x('Je suis intéressé·e', 'I am interested')}</a></p></div>
  <ol class="steps">
    <li><div><h3>${x('Prenez contact', 'Get in touch')}</h3><p>${x('Écrivez-nous ou contactez une association partenaire de votre pays : c’est elle qui sera votre organisation d’envoi.', 'Write to us or to a partner organisation in your country: it will be your sending organisation.')}</p></div></li>
    <li><div><h3>${x('Remplissez le formulaire d’inscription', 'Fill in the registration form')}</h3><p>${x('Identité, voyage, régime alimentaire, motivation. Quelques minutes suffisent.', 'Identity, travel, diet, motivation. It takes a few minutes.')}</p></div></li>
    <li><div><h3>${x('Recevez l’infopack', 'Receive the infopack')}</h3><p>${x('Programme, lieu d’hébergement, itinéraire, liste des affaires à emporter : tout y est.', 'Programme, venue, how to get there, what to bring: it is all in there.')}</p></div></li>
    <li><div><h3>${x('Préparez-vous avec votre groupe', 'Prepare with your group')}</h3><p>${x('Présentation de votre association, soirée interculturelle, activité « energizer ».', 'Presentation of your organisation, intercultural evening, an “energizer” activity.')}</p></div></li>
    <li><div><h3>${x('Vivez l’échange', 'Live the exchange')}</h3><p>${x('Trois repas par jour, hébergement et activités pris en charge. Votre participation active est attendue à toutes les sessions.', 'Three meals a day, accommodation and activities covered. Active participation is expected in all sessions.')}</p></div></li>
    <li><div><h3>${x('Youthpass et remboursement', 'Youthpass and reimbursement')}</h3><p>${x('Vous recevez votre certificat Youthpass. Le voyage est remboursé après le projet, dans les limites Erasmus+, sur présentation des justificatifs.', 'You receive your Youthpass certificate. Travel is reimbursed after the project, within Erasmus+ limits, on presentation of supporting documents.')}</p></div></li>
  </ol>
</div></section>

<section id="pros"><div class="wrap split">
  <div><p class="eyebrow">${x('Professionnel·les de jeunesse', 'Youth workers')}</p><h2>${x('Animer, former, accompagner', 'Facilitate, train, support')}</h2></div>
  <div class="prose">
    <p>${x('Vous êtes animateur·rice, formateur·rice, éducateur·rice ou bénévole associatif ? Vous pouvez accompagner un groupe comme « group leader » (sans limite d’âge), intervenir dans un atelier ou nous faire découvrir une initiative locale à visiter.', 'Are you a youth worker, trainer, educator or NGO volunteer? You can accompany a group as a group leader (no age limit), run a workshop or introduce us to a local initiative worth visiting.')}</p>
    <p>${x('Pour vous former en Europe, le calendrier européen des formations de SALTO-YOUTH recense les offres ouvertes toute l’année.', 'To train in Europe, the SALTO-YOUTH European Training Calendar lists open offers all year round.')}</p>
    <p><a class="arrow" href="https://www.salto-youth.net/tools/european-training-calendar/" target="_blank" rel="noopener">${x('Calendrier européen des formations', 'European Training Calendar')}</a></p>
  </div>
</div></section>

<section class="alt" id="partenaires"><div class="wrap split">
  <div><p class="eyebrow">${x('Associations et collectivités', 'NGOs and local authorities')}</p><h2>${x('Construire un projet avec nous', 'Build a project with us')}</h2>
  <p><a class="btn" href="${url('contact')}">${x('Proposer un partenariat', 'Propose a partnership')}</a></p></div>
  <div class="grid">
    <div class="card"><h3>${x('Partenaire européen', 'European partner')}</h3><p>${x('Vous cherchez une organisation d’accueil ou d’envoi en France pour un échange de jeunes ou une formation ? Envoyez-nous votre fiche de présentation et votre idée.', 'Looking for a hosting or sending organisation in France for a youth exchange or training course? Send us your organisation profile and your idea.')}</p></div>
    <div class="card"><h3>${x('Acteur local', 'Local stakeholder')}</h3><p>${x('Entreprise, ferme, tiers-lieu, structure d’insertion de la région nantaise : accueillez un groupe européen le temps d’une visite ou d’un atelier.', 'Business, farm, community hub or inclusion organisation in the Nantes area: host a European group for a visit or a workshop.')}</p></div>
    <div class="card"><h3>${x('Structure jeunesse', 'Youth organisation')}</h3><p>${x('Mission locale, centre socioculturel, association de quartier : proposez à vos jeunes une première expérience européenne encadrée.', 'Youth centre, community centre or neighbourhood association: offer your young people a supported first European experience.')}</p></div>
  </div>
</div></section>
${cta(c)}`; },
  },

  // ───────────────────────────── RESSOURCES
  resources: {
    slug: { fr: 'ressources', en: 'en/resources' },
    title: { fr: 'Centre de ressources Erasmus+ et mobilité des jeunes', en: 'Erasmus+ and youth mobility resource centre' },
    desc: { fr: 'Guides Erasmus+, Youthpass, remboursement du voyage, liste de préparation interactive, glossaire, liens officiels et FAQ : toutes les ressources pour partir en échange de jeunes.', en: 'Erasmus+ guides, Youthpass, travel reimbursement, interactive packing checklist, glossary, official links and FAQ: every resource you need for a youth exchange.' },
    faq: x => [
      [x('Combien coûte un échange de jeunes ?', 'How much does a youth exchange cost?'), x('Dans nos échanges Erasmus+, l’hébergement, les trois repas quotidiens et les activités sont pris en charge. Le voyage est remboursé après le projet, dans la limite des plafonds fixés par Erasmus+. Les dépenses personnelles et les spécialités apportées pour la soirée interculturelle restent à votre charge.', 'In our Erasmus+ exchanges, accommodation, three meals a day and activities are covered. Travel is reimbursed after the project, up to the limits set by Erasmus+. Personal expenses and the food you bring for the intercultural evening are at your own cost.')],
      [x('Faut-il bien parler anglais ?', 'Do I need good English?'), x('Non. L’anglais est la langue de travail, mais tous les niveaux sont acceptés et le groupe s’entraide. Vous pouvez aussi vous exprimer dans d’autres langues pendant les temps interculturels.', 'No. English is the working language, but all levels are welcome and the group helps each other. You can also use other languages during intercultural moments.')],
      [x('Qui peut participer ?', 'Who can take part?'), x('Nos échanges s’adressent aux jeunes de 18 à 30 ans. Les responsables de groupe n’ont pas de limite d’âge. Chaque association partenaire inclut des jeunes ayant moins d’opportunités et veille à la mixité du groupe.', 'Our exchanges are for young people aged 18 to 30. Group leaders have no age limit. Each partner organisation includes young people with fewer opportunities and ensures a balanced group.')],
      [x('Comment le voyage est-il remboursé ?', 'How is travel reimbursed?'), x('Après le projet, sur présentation des factures originales, des cartes d’embarquement ou billets, et une fois votre rapport final de participant·e rempli. Une absence non justifiée aux ateliers peut entraîner le non-remboursement.', 'After the project, on presentation of original invoices, boarding passes or tickets, and once you have completed your final participant report. Unjustified absence from workshops may mean no reimbursement.')],
      [x('Qu’est-ce que le Youthpass ?', 'What is Youthpass?'), x('C’est le certificat européen qui reconnaît les apprentissages réalisés dans un projet Erasmus+ Jeunesse ou du Corps européen de solidarité. Il décrit ce que vous avez fait et les compétences développées ; vous pouvez le joindre à un CV.', 'It is the European certificate recognising what you learned in an Erasmus+ Youth or European Solidarity Corps project. It describes what you did and the competences you developed; you can attach it to a CV.')],
      [x('J’ai un régime alimentaire particulier ou un traitement médical', 'I have a special diet or medical treatment'), x('Indiquez-le dans le formulaire d’inscription. Les régimes et allergies sont pris en compte pour les repas, et l’équipe doit être informée de tout traitement.', 'State it in the registration form. Diets and allergies are catered for, and the team needs to know about any treatment.')],
      [x('Mon association peut-elle devenir partenaire ?', 'Can my organisation become a partner?'), x('Oui. Écrivez-nous en présentant votre structure, votre public et votre idée. Pour participer à Erasmus+, une organisation doit être enregistrée auprès de la Commission européenne et disposer d’un identifiant OID.', 'Yes. Write to us introducing your organisation, your target group and your idea. To take part in Erasmus+, an organisation must be registered with the European Commission and hold an OID.')],
    ],
    ld: ({ x }, here) => [{ '@context': 'https://schema.org', '@type': 'FAQPage', url: here, mainEntity: pages.resources.faq(x).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
    body: c => { const { x, url } = c;
      const guides = [
        [x('Erasmus+ expliqué simplement', 'Erasmus+ in plain words'), x(`<p>Erasmus+ est le programme de l’Union européenne pour l’éducation, la formation, la jeunesse et le sport. Le programme actuel couvre la période 2021-2027. Il ne concerne pas que les étudiant·es : son volet Jeunesse finance des projets portés par des associations, ouverts à tous les jeunes.</p><p>Ses quatre priorités : inclusion et diversité, transformation numérique, environnement et lutte contre le changement climatique, participation à la vie démocratique.</p><ul><li><strong>Échanges de jeunes</strong> : des groupes de jeunes de 13 à 30 ans, venus d’au moins deux pays, se retrouvent de 5 à 21 jours autour d’un thème.</li><li><strong>Mobilité des acteurs de jeunesse</strong> : formations, séminaires, visites d’étude pour celles et ceux qui accompagnent les jeunes.</li><li><strong>Partenariats de coopération</strong> : des organisations de plusieurs pays travaillent ensemble sur la durée.</li></ul><p>En France, le volet Jeunesse est géré par l’Agence Erasmus+ France Jeunesse &amp; Sport.</p>`, `<p>Erasmus+ is the European Union’s programme for education, training, youth and sport. The current programme runs from 2021 to 2027. It is not only for students: its Youth strand funds projects run by NGOs and open to all young people.</p><p>Its four priorities: inclusion and diversity, digital transformation, environment and the fight against climate change, participation in democratic life.</p><ul><li><strong>Youth exchanges</strong>: groups of young people aged 13 to 30, from at least two countries, meet for 5 to 21 days around a theme.</li><li><strong>Mobility of youth workers</strong>: training courses, seminars and study visits for those who support young people.</li><li><strong>Cooperation partnerships</strong>: organisations from several countries work together over time.</li></ul><p>In France, the Youth strand is managed by the Agence Erasmus+ France Jeunesse &amp; Sport.</p>`)],
        [x('À quoi ressemble une journée d’échange ?', 'What does a day on an exchange look like?'), x(`<p>Une journée type commence vers 9 h par un « energizer », un jeu court pour réveiller le groupe. La matinée est consacrée aux ateliers : études de cas, travail en petits groupes, débats. L’après-midi part souvent sur le terrain, à la rencontre d’entreprises, de fermes ou d’associations locales. La journée se termine par un bilan collectif.</p><p>Les soirées comptent autant que les ateliers : lors de la soirée interculturelle, chaque pays fait découvrir sa cuisine, sa musique et ses traditions.</p><p>La méthode s’appelle l’éducation non formelle : pas de cours magistral, pas de notes, mais des objectifs d’apprentissage clairs et un cadre bienveillant.</p>`, `<p>A typical day starts around 9 am with an “energizer”, a short game to wake the group up. The morning is for workshops: case studies, small-group work, debates. The afternoon often goes out into the field, meeting local businesses, farms or NGOs. The day ends with a group debrief.</p><p>Evenings matter as much as workshops: at the intercultural evening, each country shares its food, music and traditions.</p><p>The method is called non-formal learning: no lectures, no grades, but clear learning objectives and a supportive setting.</p>`)],
        [x('Le Youthpass : faire reconnaître ce que vous avez appris', 'Youthpass: getting your learning recognised'), x(`<p>Le Youthpass est l’outil européen de reconnaissance des apprentissages non formels. Il est délivré à la fin d’un projet Erasmus+ Jeunesse ou du Corps européen de solidarité.</p><p>Il s’appuie sur les huit compétences clés européennes, parmi lesquelles la compétence multilingue, la compétence numérique, la compétence citoyenne, la compétence entrepreneuriale ou encore « apprendre à apprendre ».</p><p><strong>Notre conseil :</strong> notez chaque soir une chose apprise. Le dernier jour, remplir votre Youthpass prendra dix minutes, et vous aurez des exemples précis à citer en entretien.</p>`, `<p>Youthpass is the European tool for recognising non-formal learning. It is issued at the end of an Erasmus+ Youth or European Solidarity Corps project.</p><p>It builds on the eight European key competences, including multilingual, digital, citizenship and entrepreneurship competences, as well as “learning to learn”.</p><p><strong>Our tip:</strong> each evening, write down one thing you learned. On the last day, filling in your Youthpass will take ten minutes, and you will have precise examples to quote in an interview.</p>`)],
        [x('Voyage et remboursement : le mode d’emploi', 'Travel and reimbursement: how it works'), x(`<p>Erasmus+ contribue aux frais de voyage selon la distance entre votre point de départ et le lieu du projet. Le plafond applicable à votre pays est indiqué dans l’infopack.</p><ol><li>Attendez la confirmation de votre participation avant d’acheter vos billets.</li><li>Privilégiez le train, le bus ou le covoiturage : le programme encourage le voyage écoresponsable.</li><li>Gardez <em>tout</em> : factures originales, billets, cartes d’embarquement.</li><li>Participez à l’ensemble des activités.</li><li>Remplissez votre rapport final de participant·e : le remboursement intervient après le projet.</li></ol>`, `<p>Erasmus+ contributes to travel costs according to the distance between your starting point and the project venue. The ceiling for your country is stated in the infopack.</p><ol><li>Wait for confirmation of your place before buying tickets.</li><li>Choose train, bus or carpooling where you can: the programme encourages green travel.</li><li>Keep <em>everything</em>: original invoices, tickets, boarding passes.</li><li>Take part in all activities.</li><li>Complete your final participant report: reimbursement comes after the project.</li></ol>`)],
        [x('Monter un projet : par où commencer ?', 'Setting up a project: where to start?'), x(`<p>Vous êtes une association et vous voulez porter votre propre échange ?</p><ol><li><strong>Enregistrez votre organisation</strong> pour obtenir un identifiant OID.</li><li><strong>Trouvez des partenaires</strong> : la plateforme OTLAS de SALTO-YOUTH est faite pour cela.</li><li><strong>Partez d’un besoin réel</strong> de vos jeunes et de votre territoire, pas d’un thème à la mode.</li><li><strong>Lisez le Guide du programme</strong> de l’année en cours : critères, dates limites et montants y figurent.</li><li><strong>Contactez votre agence nationale</strong>, qui accompagne les porteurs de projet.</li></ol><p>Vous cherchez un partenaire en France ? <a href="${url('join', '#partenaires')}">Parlons-en</a>.</p>`, `<p>Are you an NGO wanting to run your own exchange?</p><ol><li><strong>Register your organisation</strong> to obtain an OID.</li><li><strong>Find partners</strong>: SALTO-YOUTH’s OTLAS platform is built for that.</li><li><strong>Start from a real need</strong> of your young people and your area, not a fashionable theme.</li><li><strong>Read the current Programme Guide</strong>: criteria, deadlines and amounts are all there.</li><li><strong>Contact your National Agency</strong>, which supports applicants.</li></ol><p>Looking for a partner in France? <a href="${url('join', '#partenaires')}">Let’s talk</a>.</p>`)],
      ];
      const check = [
        ['id', x('Pièce d’identité ou passeport en cours de validité', 'Valid ID card or passport')],
        ['tickets', x('Billets de transport (et je garde tous les justificatifs)', 'Travel tickets (and I keep every receipt)')],
        ['ehic', x('Carte européenne d’assurance maladie', 'European Health Insurance Card')],
        ['meds', x('Médicaments personnels, et équipe informée de mon traitement', 'Personal medication, and the team informed of any treatment')],
        ['diet', x('Régime alimentaire et allergies signalés dans le formulaire', 'Diet and allergies stated in the form')],
        ['org', x('Supports de présentation de mon association (flyers, photos, vidéo)', 'Materials presenting my organisation (flyers, photos, video)')],
        ['food', x('Spécialités culinaires de mon pays pour la soirée interculturelle', 'Food specialities from my country for the intercultural evening')],
        ['culture', x('Drapeau, musique, tenue ou jeu pour présenter mon pays', 'Flag, music, outfit or game to present my country')],
        ['energizer', x('Une idée d’« energizer » à animer', 'An idea for an “energizer” to run')],
        ['towel', x('Serviette et affaires de toilette', 'Towel and toiletries')],
        ['laptop', x('Un ordinateur portable par association', 'One laptop per organisation')],
        ['infopack', x('Infopack lu, itinéraire jusqu’au lieu d’hébergement repéré', 'Infopack read, route to the venue checked')],
      ];
      const links = [
        ['off', 'Erasmus+', x('Le site officiel du programme de l’Union européenne.', 'The official site of the EU programme.'), 'https://erasmus-plus.ec.europa.eu/' + x('fr', '')],
        ['off', x('Guide du programme Erasmus+', 'Erasmus+ Programme Guide'), x('Les règles, critères et montants de l’année en cours.', 'The rules, criteria and amounts for the current year.'), 'https://erasmus-plus.ec.europa.eu/' + x('fr/', '') + 'erasmus-programme-guide'],
        ['off', x('Agence Erasmus+ France Jeunesse & Sport', 'Erasmus+ France Youth & Sport Agency'), x('L’agence nationale française pour le volet Jeunesse.', 'The French National Agency for the Youth strand.'), 'https://www.erasmusplus-jeunesse.fr/'],
        ['opp', x('Portail européen de la jeunesse', 'European Youth Portal'), x('Toutes les opportunités européennes pour les jeunes.', 'All European opportunities for young people.'), 'https://youth.europa.eu/home_' + x('fr', 'en')],
        ['opp', x('Corps européen de solidarité', 'European Solidarity Corps'), x('Volontariat et projets de solidarité, de 18 à 30 ans.', 'Volunteering and solidarity projects, ages 18–30.'), 'https://youth.europa.eu/solidarity_' + x('fr', 'en')],
        ['opp', 'DiscoverEU', x('Des pass de voyage pour découvrir l’Europe à 18 ans.', 'Travel passes to discover Europe at 18.'), 'https://youth.europa.eu/discovereu_' + x('fr', 'en')],
        ['opp', 'Eurodesk', x('Le réseau d’information sur la mobilité des jeunes.', 'The youth mobility information network.'), 'https://eurodesk.eu/'],
        ['opp', x('OFAJ', 'FGYO'), x('L’Office franco-allemand pour la Jeunesse.', 'The Franco-German Youth Office.'), 'https://www.ofaj.org/'],
        ['tool', 'Youthpass', x('Le certificat européen des apprentissages non formels.', 'The European certificate for non-formal learning.'), 'https://www.youthpass.eu/' + x('fr/', 'en/')],
        ['tool', 'Europass', x('Créer un CV européen et un profil de compétences.', 'Create a European CV and skills profile.'), 'https://europass.europa.eu/' + x('fr', 'en')],
        ['pro', 'SALTO-YOUTH · OTLAS', x('Trouver des organisations partenaires en Europe.', 'Find partner organisations across Europe.'), 'https://www.salto-youth.net/tools/otlas-partner-finding/'],
        ['pro', x('SALTO-YOUTH · Calendrier des formations', 'SALTO-YOUTH · Training Calendar'), x('Les formations européennes ouvertes aux acteurs de jeunesse.', 'European training courses open to youth workers.'), 'https://www.salto-youth.net/tools/european-training-calendar/'],
        ['pro', 'SALTO-YOUTH · Toolbox', x('Des centaines d’outils et d’activités d’éducation non formelle.', 'Hundreds of non-formal learning tools and activities.'), 'https://www.salto-youth.net/tools/toolbox/'],
      ];
      const cats = [['all', x('Tout', 'All')], ['off', x('Officiel', 'Official')], ['opp', x('Opportunités', 'Opportunities')], ['tool', x('Outils', 'Tools')], ['pro', x('Professionnels', 'Professionals')]];
      const glossary = [
        ['Erasmus+', x('Programme de l’Union européenne pour l’éducation, la formation, la jeunesse et le sport (2021-2027).', 'The EU programme for education, training, youth and sport (2021–2027).')],
        [x('Échange de jeunes', 'Youth exchange'), x('Rencontre de groupes de jeunes de plusieurs pays, de 5 à 21 jours, autour d’un thème commun.', 'A meeting of groups of young people from several countries, lasting 5 to 21 days, around a shared theme.')],
        ['Youthpass', x('Certificat européen qui reconnaît les compétences acquises dans un projet de jeunesse.', 'European certificate recognising competences gained in a youth project.')],
        [x('Éducation non formelle', 'Non-formal learning'), x('Apprentissage volontaire et structuré, hors du système scolaire, fondé sur la pratique et le groupe.', 'Voluntary, structured learning outside the school system, based on practice and group work.')],
        [x('Jeunes ayant moins d’opportunités (JAMO)', 'Young people with fewer opportunities'), x('Jeunes confrontés à des obstacles sociaux, économiques, géographiques, de santé ou liés à un handicap, qui limitent leur accès à la mobilité.', 'Young people facing social, economic, geographical, health or disability-related obstacles that limit their access to mobility.')],
        [x('Organisation d’envoi', 'Sending organisation'), x('L’association de votre pays qui vous sélectionne, vous prépare et vous accompagne.', 'The organisation in your country that selects, prepares and supports you.')],
        [x('Organisation d’accueil', 'Hosting organisation'), x('L’association qui organise le projet sur place : programme, hébergement, repas.', 'The organisation running the project on site: programme, accommodation, meals.')],
        [x('Responsable de groupe', 'Group leader'), x('Adulte qui accompagne un groupe national pendant l’échange. Pas de limite d’âge.', 'An adult accompanying a national group during the exchange. No age limit.')],
        ['Infopack', x('Document envoyé avant le départ : programme, lieu, itinéraire, règles de remboursement, liste d’affaires.', 'Document sent before departure: programme, venue, directions, reimbursement rules, packing list.')],
        [x('Voyage écoresponsable', 'Green travel'), x('Déplacement majoritairement en train, bus ou covoiturage, encouragé par Erasmus+.', 'Travel mainly by train, bus or carpooling, encouraged by Erasmus+.')],
        ['Energizer', x('Jeu court et dynamique pour lancer une session et souder le groupe.', 'A short, lively game to kick off a session and bond the group.')],
        [x('Soirée interculturelle', 'Intercultural evening'), x('Temps fort où chaque pays présente sa cuisine, sa musique et ses traditions.', 'A highlight where each country presents its food, music and traditions.')],
        [x('Agence nationale', 'National Agency'), x('Organisme qui gère Erasmus+ dans chaque pays et sélectionne les projets financés.', 'The body managing Erasmus+ in each country and selecting funded projects.')],
        ['OID', x('Identifiant d’organisation, obligatoire pour déposer ou rejoindre un projet Erasmus+.', 'Organisation ID, required to apply for or join an Erasmus+ project.')],
        [x('Diffusion des résultats', 'Dissemination'), x('Partage de ce que le projet a produit et appris, auprès de sa communauté et de ses réseaux.', 'Sharing what the project produced and taught with your community and networks.')],
        [x('Corps européen de solidarité', 'European Solidarity Corps'), x('Programme européen de volontariat et de projets solidaires pour les 18-30 ans.', 'EU programme for volunteering and solidarity projects for 18–30 year-olds.')],
      ];
      return `
${head(c, [[null, x('Ressources', 'Resources')]], x('Centre de ressources', 'Resource centre'), x('Tout pour comprendre, préparer et réussir sa mobilité', 'Everything to understand, prepare and succeed in your mobility'), x('Guides, outils interactifs, glossaire et liens officiels. Gratuit, sans inscription, pour les jeunes comme pour les associations.', 'Guides, interactive tools, a glossary and official links. Free, no sign-up, for young people and organisations alike.'))}
<div class="wrap"><nav class="subnav" aria-label="${x('Dans cette page', 'On this page')}"><a class="filter" href="#guides">${x('Guides', 'Guides')}</a><a class="filter" href="#checklist">${x('Liste de préparation', 'Checklist')}</a><a class="filter" href="#liens">${x('Liens officiels', 'Official links')}</a><a class="filter" href="#glossaire">${x('Glossaire', 'Glossary')}</a><a class="filter" href="#faq">FAQ</a></nav></div>

<section id="guides"><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Guides', 'Guides')}</p><h2>${x('L’essentiel, sans jargon', 'The essentials, jargon-free')}</h2><p class="lead">${x('Cinq guides courts écrits à partir de notre expérience de terrain.', 'Five short guides written from our field experience.')}</p></div>
  <div>${guides.map(([t, b], i) => `<details${i ? '' : ' open'}><summary>${t}</summary><div>${b}</div></details>`).join('')}</div>
</div></section>

<section class="alt" id="checklist"><div class="wrap split">
  <div class="sticky"><p class="eyebrow">${x('Outil interactif', 'Interactive tool')}</p><h2>${x('Ma liste de préparation', 'My packing checklist')}</h2>
    <p class="lead">${x('Cochez au fur et à mesure : votre progression est enregistrée sur votre appareil, et nulle part ailleurs.', 'Tick as you go: your progress is saved on your device, and nowhere else.')}</p>
    <p><strong data-progress>0 / ${check.length}</strong></p><div class="progress" aria-hidden="true"><i></i></div>
    <div class="cta-row"><button class="btn small" type="button" data-print>${x('Imprimer', 'Print')}</button><button class="btn small ghost" type="button" data-reset>${x('Tout décocher', 'Clear all')}</button></div></div>
  <ul class="checklist" data-checklist>${check.map(([v, l]) => `<li><label><input type="checkbox" value="${v}"><span>${l}</span></label></li>`).join('')}</ul>
</div></section>

<section id="liens"><div class="wrap" data-filterable>
  <div class="head"><div><p class="eyebrow">${x('Annuaire', 'Directory')}</p><h2>${x('Les liens officiels à connaître', 'The official links worth knowing')}</h2></div></div>
  <div class="toolbar"><input class="search" type="search" placeholder="${x('Rechercher une ressource…', 'Search a resource…')}" aria-label="${x('Rechercher une ressource', 'Search a resource')}">
    <div class="filters">${cats.map(([k, l], i) => `<button class="filter" type="button" data-cat="${k}" aria-pressed="${!i}">${l}</button>`).join('')}</div></div>
  <div class="grid g3">${links.map(([k, t, d, u]) => `<a class="card res" data-item data-cat="${k}" href="${u}" target="_blank" rel="noopener"><span class="tag">${cats.find(z => z[0] === k)[1]}</span><h3>${t}</h3><p>${d}</p><small>${u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗</small></a>`).join('')}</div>
  <p class="empty" hidden>${x('Aucune ressource ne correspond à votre recherche.', 'No resource matches your search.')}</p>
</div></section>

<section class="alt" id="glossaire"><div class="wrap" data-filterable>
  <div class="head"><div><p class="eyebrow">${x('Glossaire', 'Glossary')}</p><h2>${x('Le vocabulaire de la mobilité', 'The vocabulary of mobility')}</h2></div></div>
  <div class="toolbar"><input class="search" type="search" placeholder="${x('Rechercher un terme…', 'Search a term…')}" aria-label="${x('Rechercher un terme', 'Search a term')}"></div>
  <dl class="glossary">${glossary.map(([t, d]) => `<div class="term" data-item><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
  <p class="empty" hidden>${x('Aucun terme ne correspond.', 'No term matches.')}</p>
</div></section>

<section id="faq"><div class="wrap split">
  <div class="sticky"><p class="eyebrow">FAQ</p><h2>${x('Vos questions, nos réponses', 'Your questions, our answers')}</h2><p class="lead">${x('Une question manque ?', 'Is a question missing?')} <a href="${url('contact')}">${x('Posez-la nous', 'Ask us')}</a>.</p></div>
  <div>${pages.resources.faq(x).map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div>
</div></section>
${cta(c)}`; },
  },

  // ───────────────────────────── VIDÉOS
  videos: {
    slug: { fr: 'videos', en: 'en/videos' },
    title: { fr: 'Erasmus+ décrypté : la série vidéo', en: 'Erasmus+ decoded: the video series' },
    desc: { fr: 'Cinq vidéos d’une minute pour comprendre Erasmus+ : qui peut partir, les trois portes d’entrée, l’inclusion, monter un projet, et Cross Borders en action.', en: 'Five one-minute videos (in French) to understand Erasmus+: who can go, the three ways in, inclusion, setting up a project, and Cross Borders in action.' },
    ld: ({ x, site }, here) => episodes.map(([fr, en, dfr, den, dur], i) => ({ '@context': 'https://schema.org', '@type': 'VideoObject', name: `Erasmus+ décrypté — ${i + 1}. ${fr}`, description: x(dfr, den), inLanguage: 'fr', duration: dur, uploadDate: '2026-11-12',
      thumbnailUrl: new URL(`${x('../', '../../')}assets/videos/erasmus-decrypte-ep${i + 1}.jpg`, here).href, contentUrl: new URL(`${x('../', '../../')}assets/videos/erasmus-decrypte-ep${i + 1}.mp4`, here).href, publisher: { '@type': 'NGO', name: site.name } })),
    body: c => { const { x, url } = c; return `
${head(c, [[null, x('Vidéos', 'Videos')]], x('Série vidéo', 'Video series'), x('Erasmus+ décrypté', 'Erasmus+ decoded'), x('Cinq épisodes d’une minute pour comprendre le programme Erasmus+, sans jargon. Présentés par Hafid Boutchakkoucht, fondateur et président de Cross Borders.', 'Five one-minute episodes to understand the Erasmus+ programme, jargon-free. Presented by Hafid Boutchakkoucht, founder and president of Cross Borders. The videos are in French.'))}
<section><div class="wrap">
  <div class="episodes">${episodes.map(([fr, en, dfr, den], i) => `<article class="episode reveal" id="ep${i + 1}">
    <video controls playsinline preload="none" poster="${c.asset(`videos/erasmus-decrypte-ep${i + 1}.jpg`)}" width="1080" height="1920" aria-label="${x('Épisode', 'Episode')} ${i + 1} — ${x(fr, en)}"><source src="${c.asset(`videos/erasmus-decrypte-ep${i + 1}.mp4`)}" type="video/mp4"></video>
    <div><p class="num">${x('ÉPISODE', 'EPISODE')} ${String(i + 1).padStart(2, '0')}</p><h2>${x(fr, en)}</h2><p>${x(dfr, den)}</p>
    <p><a class="arrow" href="${c.asset(`videos/erasmus-decrypte-ep${i + 1}.mp4`)}" download>${x('Télécharger la vidéo', 'Download the video')}</a></p></div>
  </article>`).join('')}</div>
  <div class="eu" style="color:var(--ink-2);border-color:var(--line);margin-top:40px">${c.euFlag()}<p style="margin:0">${euNote(x)}</p></div>
  <p class="note" style="margin-top:20px">${x('Pour aller plus loin : nos guides, la liste de préparation et le glossaire sont dans le', 'To go further: our guides, checklist and glossary are in the')} <a href="${url('resources')}">${x('centre de ressources', 'resource centre')}</a>.</p>
</div></section>
${cta(c)}`; },
  },

  // ───────────────────────────── CONTACT
  contact: {
    slug: { fr: 'contact', en: 'en/contact' },
    title: { fr: 'Contact', en: 'Contact' },
    desc: { fr: 'Contacter l’association Cross Borders à Rezé (Nantes) : participation à un échange de jeunes, partenariat européen, presse.', en: 'Contact the Cross Borders association in Rezé (Nantes): joining a youth exchange, European partnership, press.' },
    body: c => { const { x, site } = c; return `
${head(c, [[null, 'Contact']], 'Contact', x('Parlons de votre projet', 'Let’s talk about your project'), x('Une question, une envie de partir, une idée de partenariat ? Écrivez-nous.', 'A question, an urge to go abroad, a partnership idea? Write to us.'))}
<section><div class="wrap split">
  <div>
    <ul class="contact-list">
      <li><div class="icon">✉️</div><div><strong>E-mail</strong><br><a href="mailto:${site.email}">${site.email}</a></div></li>
      <li><div class="icon">📍</div><div><strong>${x('Adresse', 'Address')}</strong><br>${site.name}<br>${site.street}<br>${site.zip} ${site.city}, France</div></li>
      <li><div class="icon">🚋</div><div><strong>${x('Venir', 'Getting here')}</strong><br>${x('Rezé se trouve au sud de Nantes, sur le réseau de transports en commun de la métropole (Naolib).', 'Rezé lies just south of Nantes, on the metropolitan public transport network (Naolib).')}</div></li>
    </ul>
    <p class="note">${x('Vos messages servent uniquement à vous répondre.', 'Your messages are used only to reply to you.')} <a href="${c.url('privacy')}">${x('Politique de confidentialité', 'Privacy policy')}</a></p>
  </div>
  <form class="contact" data-to="${site.email}">
    <div class="field"><label for="f-name">${x('Votre nom', 'Your name')}</label><input id="f-name" name="name" required autocomplete="name"></div>
    <div class="field"><label for="f-org">${x('Organisation (facultatif)', 'Organisation (optional)')}</label><input id="f-org" name="org" autocomplete="organization"></div>
    <div class="field"><label for="f-topic">${x('Sujet', 'Topic')}</label><select id="f-topic" name="topic">
      <option>${x('Participer à un projet', 'Join a project')}</option><option>${x('Prochain projet', 'Next project')}</option><option>${x('Partenariat', 'Partnership')}</option><option>${x('Presse', 'Press')}</option><option>${x('Autre', 'Other')}</option></select></div>
    <div class="field"><label for="f-msg">Message</label><textarea id="f-msg" name="message" required></textarea></div>
    <div><button class="btn" type="submit">${x('Préparer mon e-mail', 'Prepare my email')}</button></div>
    <p style="font-size:.88rem;color:var(--ink-2);margin:0">${x('Ce bouton ouvre votre messagerie avec le message prêt à envoyer. Rien n’est transmis par ce site.', 'This button opens your email app with the message ready to send. Nothing is transmitted through this site.')}</p>
  </form>
</div></section>`; },
  },

  // ───────────────────────────── LÉGAL
  legal: {
    slug: { fr: 'mentions-legales', en: 'en/legal-notice' },
    title: { fr: 'Mentions légales', en: 'Legal notice' },
    desc: { fr: 'Mentions légales du site de l’association Cross Borders.', en: 'Legal notice for the Cross Borders association website.' },
    body: c => { const { x, site } = c; return `
${head(c, [[null, x('Mentions légales', 'Legal notice')]], x('Informations légales', 'Legal information'), x('Mentions légales', 'Legal notice'))}
<section><div class="wrap prose">
  <h2>${x('Éditeur du site', 'Publisher')}</h2>
  <p>${site.name}<br>${x('Association déclarée, régie par la loi du 1<sup>er</sup> juillet 1901', 'Registered non-profit association under the French law of 1 July 1901')}<br>${site.street}, ${site.zip} ${site.city}, France<br>RNA : ${site.rna} · SIREN : ${site.siren} · SIRET : ${site.siret}<br>${x('Contact', 'Contact')} : <a href="mailto:${site.email}">${site.email}</a></p>
  <p>${x('Directeur de la publication : le représentant légal de l’association.', 'Publication director: the legal representative of the association.')}</p>
  <h2>${x('Hébergement', 'Hosting')}</h2>
  <p>GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, ${x('États-Unis', 'USA')}.</p>
  <h2>${x('Propriété intellectuelle', 'Intellectual property')}</h2>
  <p>${x('Les textes et éléments graphiques de ce site sont la propriété de Cross Borders, sauf mention contraire. Leur reproduction est autorisée à des fins non commerciales, à condition d’en citer la source.', 'The texts and graphics on this site belong to Cross Borders unless stated otherwise. They may be reproduced for non-commercial purposes provided the source is credited.')}</p>
  <h2>${x('Financement européen', 'European funding')}</h2>
  <p>${x('Les projets présentés sont cofinancés par l’Union européenne dans le cadre du programme Erasmus+. Les points de vue et avis exprimés n’engagent que leurs auteurs et ne reflètent pas nécessairement ceux de l’Union européenne.', 'The projects presented are co-funded by the European Union under the Erasmus+ programme. Views and opinions expressed are those of the authors only and do not necessarily reflect those of the European Union.')}</p>
  <h2>${x('Crédits', 'Credits')}</h2>
  <p>${x('Bricolage Grotesque et Inter, sous licence SIL Open Font License, hébergées sur ce site. Le logo utilise Montserrat et Kaushan Script (SIL Open Font License), des pictogrammes Lucide (licence ISC) et les données cartographiques Natural Earth (domaine public).', 'Bricolage Grotesque and Inter, under the SIL Open Font License, hosted on this site. The logo uses Montserrat and Kaushan Script (SIL Open Font License), Lucide icons (ISC licence) and Natural Earth map data (public domain).')}</p>
</div></section>`; },
  },

  privacy: {
    slug: { fr: 'confidentialite', en: 'en/privacy' },
    title: { fr: 'Politique de confidentialité', en: 'Privacy policy' },
    desc: { fr: 'Comment Cross Borders protège les données personnelles des participants à ses projets Erasmus+, conformément au RGPD.', en: 'How Cross Borders protects the personal data of participants in its Erasmus+ projects, in line with the GDPR.' },
    body: c => { const { x, site } = c; return `
${head(c, [[null, x('Confidentialité', 'Privacy')]], 'RGPD · GDPR', x('Politique de confidentialité', 'Privacy policy'), x('Dernière mise à jour : 1<sup>er</sup> mars 2026', 'Last updated: 1 March 2026'))}
<section><div class="wrap prose">
  <p class="note">${x('Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure d’audience ou de publicité. La liste de préparation et le choix du thème sont enregistrés uniquement dans votre navigateur.', 'This site sets no cookies and uses no analytics or advertising tools. The checklist and theme choice are stored only in your browser.')}</p>
  <h2>${x('Responsable du traitement', 'Data controller')}</h2>
  <p>${site.name}, ${x('association déclarée', 'registered non-profit association')} — RNA ${site.rna}, SIREN ${site.siren}<br>${site.street}, ${site.zip} ${site.city}, France<br>${x('Contact protection des données', 'Data protection contact')} : <a href="mailto:${site.email}">${site.email}</a></p>
  <h2>${x('Champ d’application', 'Scope')}</h2>
  <p>${x('Cette politique s’applique aux données collectées dans le cadre des projets Erasmus+, échanges de jeunes, formations et partenariats, des formulaires d’inscription en ligne, des échanges par e-mail et des événements.', 'This policy applies to data collected through Erasmus+ projects, youth exchanges, training courses and partnerships, online registration forms, email communications and events.')}</p>
  <h2>${x('Données traitées', 'Data processed')}</h2>
  <ul>
    <li>${x('Identification : nom, date et lieu de naissance, nationalité, numéro de pièce d’identité.', 'Identification: name, date and place of birth, nationality, ID number.')}</li>
    <li>${x('Contact : e-mail, téléphone, adresse, pays de résidence.', 'Contact: email, phone, address, country of residence.')}</li>
    <li>${x('Parcours : CV, formation, situation professionnelle, lettre de motivation.', 'Background: CV, education, employment status, motivation letter.')}</li>
    <li>${x('Mobilité : voyage, hébergement, régime alimentaire, contact d’urgence.', 'Mobility: travel, accommodation, dietary requirements, emergency contact.')}</li>
    <li>${x('Finances, si nécessaire : coordonnées bancaires, justificatifs de remboursement.', 'Financial, where needed: bank details, reimbursement documents.')}</li>
    <li>${x('Médias : photos, vidéos, témoignages.', 'Media: photos, videos, testimonials.')}</li>
  </ul>
  <p>${x('Les données sensibles (santé, religion, etc.) ne sont traitées que si elles sont strictement nécessaires et avec votre consentement explicite (article 9 du RGPD).', 'Special category data (health, religion, etc.) is processed only where strictly necessary and with your explicit consent (Article 9 GDPR).')}</p>
  <h2>${x('Finalités et bases légales', 'Purposes and legal bases')}</h2>
  <p>${x('Sélection des participant·es, organisation des mobilités, voyage et hébergement, remboursements, communication liée aux projets, obligations de rapport et d’audit auprès des agences nationales Erasmus+, diffusion non commerciale des résultats. Les données ne sont jamais vendues ni utilisées à des fins de prospection commerciale.', 'Participant selection, organisation of mobility activities, travel and accommodation, reimbursements, project-related communication, reporting and audit obligations towards Erasmus+ National Agencies, non-commercial dissemination. Data is never sold or used for commercial marketing.')}</p>
  <p>${x('Bases légales : exécution d’un contrat (art. 6.1.b), obligation légale (art. 6.1.c), intérêt légitime (art. 6.1.f) et consentement lorsqu’il est requis (art. 6.1.a).', 'Legal bases: performance of a contract (Art. 6(1)(b)), legal obligation (Art. 6(1)(c)), legitimate interest (Art. 6(1)(f)) and consent where required (Art. 6(1)(a)).')}</p>
  <h2>${x('Destinataires', 'Recipients')}</h2>
  <p>${x('Lorsque c’est strictement nécessaire : partenaires du projet, organisations d’accueil, agences nationales, prestataires de transport et d’hébergement, autorités publiques si la loi l’exige. Hors de l’Espace économique européen, les transferts reposent sur une décision d’adéquation de la Commission européenne ou sur des clauses contractuelles types.', 'Where strictly necessary: project partners, hosting organisations, National Agencies, travel and accommodation providers, public authorities where legally required. Outside the European Economic Area, transfers rely on a European Commission adequacy decision or Standard Contractual Clauses.')}</p>
  <h2>${x('Durée de conservation', 'Retention')}</h2>
  <p>${x('Pendant la durée du projet, puis pendant la période d’audit exigée par Erasmus+ (en général 5 à 10 ans). Les données sont ensuite supprimées ou anonymisées.', 'For the duration of the project, then for the audit period required by Erasmus+ (typically 5–10 years). Data is then securely deleted or anonymised.')}</p>
  <h2>${x('Sécurité', 'Security')}</h2>
  <p>${x('Stockage sécurisé dans l’Union européenne, accès limité aux personnes autorisées, systèmes protégés par mot de passe, obligation de confidentialité.', 'Secure EU-based storage, access restricted to authorised people, password-protected systems, confidentiality obligations.')}</p>
  <h2>${x('Vos droits', 'Your rights')}</h2>
  <p>${x('Vous pouvez accéder à vos données, les faire rectifier ou supprimer, en limiter le traitement, vous y opposer, demander leur portabilité et retirer votre consentement à tout moment. Écrivez à', 'You can access your data, have it corrected or deleted, restrict or object to processing, request portability and withdraw consent at any time. Write to')} <a href="mailto:${site.email}">${site.email}</a>${x(' : nous répondons dans un délai d’un mois. Vous pouvez aussi saisir la CNIL (cnil.fr) ou l’autorité de protection des données de votre pays.', ': we reply within one month. You may also contact the CNIL (cnil.fr) or your national data protection authority.')}</p>
  <h2>${x('Violation de données', 'Data breaches')}</h2>
  <p>${x('En cas de violation de données, l’autorité de contrôle est notifiée dans les 72 heures si nécessaire, et les personnes concernées sont informées en cas de risque élevé.', 'In the event of a data breach, the supervisory authority is notified within 72 hours where required, and affected individuals are informed where there is a high risk.')}</p>
</div></section>`; },
  },
};
