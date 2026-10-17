// Mapa de portada: el Perú distrito por distrito (PROMPT.md §8).
// Módulo ES propio (sin frameworks UI). Se inicializa perezosamente con
// IntersectionObserver; con prefers-reduced-motion el SVG estático se queda.
import { select, pointer } from 'd3-selection';
import { scaleSqrt } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';
import { easeCubicOut } from 'd3-ease';
import 'd3-transition';

const NIEBLA = '#F1F3EF';
const MAR = '#11606F';
const MAR2 = '#062E36';
const TINTA = '#191E1B';

const ENTRY_MS = 1200;
const STATE_MS = 900;
const AUTO_MS = 6000;

export function initHero(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lang = root.dataset.lang === 'en' ? 'en' : 'es';
  const stage = root.querySelector('[data-stage]');
  const staticImg = root.querySelector('[data-static]');
  const legendLabel = root.querySelector('[data-legend-label]');
  const buttons = Array.from(root.querySelectorAll('[data-state]'));
  const tip = root.querySelector('[data-tip]');

  let started = false;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started) {
          started = true;
          start().catch(console.error);
        }
        root.dataset.visible = e.isIntersecting ? '1' : '';
      }
    },
    { threshold: 0.2 },
  );
  io.observe(root);

  async function start() {
    const [rows, meta] = await Promise.all([
      fetch('/data/hero.json').then((r) => r.json()),
      fetch('/data/hero_meta.json').then((r) => r.json()),
    ]);

    const states = meta.estados_mapa.filter((s) => !s.pendiente);
    const FIELD = { participacion: 3, nulos_blancos: 4, nec: 5 };
    let stateIdx = 0;
    let auto = null;
    let names = null;
    let namesLoading = null;

    const ramp = interpolateRgb(NIEBLA, MAR);
    const colorFor = (id, v) => {
      const rg = meta.rangos[id];
      if (v >= rg.p98) return MAR2;
      const t = Math.min(1, Math.max(0, (v - rg.p5) / (rg.p95 - rg.p5)));
      return ramp(t);
    };
    const rScale = scaleSqrt().domain([0, meta.rangos.electores.max]).range([1.2, 9]);

    const svg = select(stage)
      .append('svg')
      .attr('viewBox', `0 0 ${meta.box.w} ${meta.box.h}`)
      .attr('role', 'img')
      .attr('aria-hidden', 'true')
      .style('opacity', 0);

    const g = svg.append('g').attr('fill-opacity', 0.92);
    const dots = g
      .selectAll('circle')
      .data(rows)
      .join('circle')
      .attr('cx', (d) => d[0])
      .attr('cy', (d) => d[1])
      .attr('r', 0)
      .attr('fill', (d) => colorFor('participacion', d[FIELD.participacion]));

    // traspaso: el estático se desvanece mientras el país "se dibuja" de norte a sur
    svg.style('opacity', 1);
    staticImg.style.transition = 'opacity 300ms ease';
    staticImg.style.opacity = '0';
    dots
      .transition()
      .ease(easeCubicOut)
      .duration(600)
      .delay((d) => (d[1] / meta.box.h) * (ENTRY_MS - 600))
      .attr('r', (d) => rScale(d[2]));

    function setState(i, animate = true) {
      stateIdx = i;
      const st = states[i];
      const col = (d) => colorFor(st.id, d[FIELD[st.id]]);
      if (animate) dots.transition().duration(STATE_MS).attr('fill', col);
      else dots.attr('fill', col);
      buttons.forEach((b, j) => b.setAttribute('aria-pressed', j === i ? 'true' : 'false'));
      if (legendLabel) {
        legendLabel.textContent = `${st[lang]}${st.unidad ? ' · ' + st.unidad : ''} · EG 2021 (1.ª vuelta) · ONPE`;
      }
    }
    setState(0, false);

    function startAuto() {
      if (auto) return;
      auto = setInterval(() => {
        if (!root.dataset.visible) return; // pausa fuera de viewport
        setState((stateIdx + 1) % states.length);
      }, AUTO_MS);
    }
    function stopAutoForever() {
      if (auto) clearInterval(auto);
      auto = -1;
      startAuto = () => {};
    }
    setTimeout(() => auto !== -1 && startAuto(), ENTRY_MS);

    buttons.forEach((b, i) =>
      b.addEventListener('click', () => {
        stopAutoForever();
        setState(i);
      }),
    );

    // tooltip: distrito, provincia y valor de la variable activa
    async function ensureNames() {
      if (names) return names;
      namesLoading ??= fetch('/data/hero_names.json').then((r) => r.json());
      names = await namesLoading;
      return names;
    }
    const fmt = (v, st) => (st.id === 'nec' ? v.toFixed(1) : v.toFixed(1) + '%');
    dots
      .on('pointerenter', async function (event, d) {
        stopAutoForever();
        select(this).attr('stroke', TINTA).attr('stroke-width', 1.5);
        const st = states[stateIdx];
        const n = (await ensureNames())[d[6]];
        if (!tip) return;
        tip.textContent = n
          ? `${n[0]} · ${n[1]} — ${fmt(d[FIELD[st.id]], st)}`
          : `${d[6]} — ${fmt(d[FIELD[st.id]], st)}`;
        tip.hidden = false;
      })
      .on('pointermove', function (event) {
        if (!tip) return;
        const [mx, my] = pointer(event, stage);
        tip.style.left = mx + 14 + 'px';
        tip.style.top = my - 10 + 'px';
      })
      .on('pointerleave', function () {
        select(this).attr('stroke', null);
        if (tip) tip.hidden = true;
      });
  }
}
