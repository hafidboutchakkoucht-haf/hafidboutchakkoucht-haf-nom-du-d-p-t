(() => {
  const d = document, root = d.documentElement;
  const store = { get(k){ try { return localStorage.getItem(k); } catch { return null; } }, set(k,v){ try { localStorage.setItem(k,v); } catch {} } };

  // Thème clair / sombre
  const themeBtn = d.querySelector('[data-theme-toggle]');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    store.set('cb-theme', root.dataset.theme);
  });

  // Menu mobile
  const burger = d.querySelector('.burger'), menu = d.querySelector('.menu');
  if (burger && menu) burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  // Apparition au défilement
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' }) : null;
  d.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

  // Quiz d'orientation
  const quizEl = d.querySelector('[data-quiz]'), quizData = d.getElementById('quiz-data');
  if (quizEl && quizData) {
    const Q = JSON.parse(quizData.textContent);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
    const show = (id, n) => {
      const node = Q.nodes[id];
      if (node.options) {
        quizEl.innerHTML = `<p class="step">${esc(Q.ui.step)} ${n}</p><h3>${esc(node.q)}</h3><div class="options">` +
          node.options.map((o, i) => `<button class="option" type="button" data-i="${i}">${esc(o.label)}</button>`).join('') + '</div>' +
          (n > 1 ? `<button class="restart" type="button">${esc(Q.ui.restart)}</button>` : '');
        quizEl.querySelectorAll('.option').forEach(b => b.addEventListener('click', () => show(node.options[b.dataset.i].next, n + 1)));
      } else {
        quizEl.innerHTML = `<p class="step">${esc(Q.ui.result)}</p><div class="result"><h3>${esc(node.title)}</h3><p>${esc(node.text)}</p>` +
          `<p><a class="btn small" href="${esc(node.href)}"${/^https?:/.test(node.href) ? ' target="_blank" rel="noopener"' : ''}>${esc(node.cta)}</a></p></div>` +
          `<button class="restart" type="button">${esc(Q.ui.restart)}</button>`;
      }
      const r = quizEl.querySelector('.restart');
      if (r) r.addEventListener('click', () => show('start', 1));
      if (n > 1) { const f = quizEl.querySelector('button, a'); if (f) f.focus({ preventScroll: true }); }
    };
    show('start', 1);
  }

  // Recherche + filtres (ressources)
  d.querySelectorAll('[data-filterable]').forEach(box => {
    const items = [...box.querySelectorAll('[data-item]')];
    const search = box.querySelector('.search'), filters = [...box.querySelectorAll('.filter')], empty = box.querySelector('.empty');
    let cat = 'all';
    const apply = () => {
      const q = (search ? search.value : '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      let n = 0;
      items.forEach(it => {
        const text = it.textContent.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        const ok = (cat === 'all' || it.dataset.cat === cat) && (!q || text.includes(q));
        it.hidden = !ok; if (ok) n++;
      });
      if (empty) empty.hidden = n > 0;
    };
    if (search) search.addEventListener('input', apply);
    filters.forEach(f => f.addEventListener('click', () => {
      cat = f.dataset.cat; filters.forEach(x => x.setAttribute('aria-pressed', x === f)); apply();
    }));
  });

  // Liste de préparation
  const cl = d.querySelector('[data-checklist]');
  if (cl) {
    const boxes = [...cl.querySelectorAll('input[type=checkbox]')], bar = d.querySelector('.progress i'), out = d.querySelector('[data-progress]');
    const saved = JSON.parse(store.get('cb-checklist') || '[]');
    const upd = () => {
      const done = boxes.filter(b => b.checked);
      store.set('cb-checklist', JSON.stringify(done.map(b => b.value)));
      if (bar) bar.style.width = (done.length / boxes.length * 100) + '%';
      if (out) out.textContent = done.length + ' / ' + boxes.length;
    };
    boxes.forEach(b => { b.checked = saved.includes(b.value); b.addEventListener('change', upd); });
    upd();
    const reset = d.querySelector('[data-reset]'); if (reset) reset.addEventListener('click', () => { boxes.forEach(b => b.checked = false); upd(); });
    const print = d.querySelector('[data-print]'); if (print) print.addEventListener('click', () => window.print());
  }

  // Formulaire de contact : ouvre la messagerie de la personne, rien n'est envoyé à un serveur
  const form = d.querySelector('form.contact');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const body = `${f.get('message')}\n\n— ${f.get('name')}${f.get('org') ? ' (' + f.get('org') + ')' : ''}`;
    location.href = `mailto:${form.dataset.to}?subject=${encodeURIComponent('[' + f.get('topic') + '] ' + f.get('name'))}&body=${encodeURIComponent(body)}`;
  });
})();
