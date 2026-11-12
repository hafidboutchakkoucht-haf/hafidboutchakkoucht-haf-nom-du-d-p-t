// Logo Cross Borders — « La ronde » : douze personnes se donnent la main autour d'un monde
// dont la frontière (pointillés) est franchie par un arc.
const P = { ink: '#0F1A3C', paper: '#F4EFE6', coral: '#F04E30', sun: '#FFC43D', sea: '#2F7BF5', leaf: '#12A983' };
const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [(60 + r * Math.cos(a)).toFixed(2), (60 + r * Math.sin(a)).toFixed(2)]; };

// mode: 'color' | 'mono' (une seule couleur) ; n: nombre de personnes ; globe: couleur du disque
export function mark({ mode = 'color', color = P.ink, globe = P.ink, line = P.paper, n = 12, title = 'Cross Borders' } = {}) {
  const cols = [P.coral, P.sun, P.sea, P.leaf], step = 360 / n, half = step / 2 - 4.4;
  const people = Array.from({ length: n }, (_, i) => {
    const t = i * step, c = mode === 'mono' ? color : cols[i % 4];
    const [x1, y1] = pt(t - half, 36.5), [x2, y2] = pt(t + half, 36.5), [cx, cy] = pt(t, 51), [hx, hy] = pt(t, 53.4);
    return `<path d="M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="4.6" fill="${c}"/>`;
  }).join('');
  const g = mode === 'mono' ? color : globe, l = mode === 'mono' ? 'none' : line;
  const arcCol = mode === 'mono' ? P.paper : P.sun, dotCol = mode === 'mono' ? P.paper : P.coral;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${title}"><title>${title}</title>${people}
<circle cx="60" cy="60" r="26.5" fill="${g}"/>
<path d="M60 35.5V84.5" stroke="${mode === 'mono' ? P.paper : l}" stroke-width="2.2" stroke-dasharray="3.4 3.6" stroke-linecap="round" opacity="${mode === 'mono' ? 1 : .9}"/>
<path d="M42 68 Q60 34 78 68" fill="none" stroke="${arcCol}" stroke-width="3.6" stroke-linecap="round"/>
<circle cx="42" cy="68" r="3.6" fill="${dotCol}"/><circle cx="78" cy="68" r="3.6" fill="${dotCol}"/></svg>`;
}
export const palette = P;
