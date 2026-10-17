// Entrada por sección al hacer scroll (PROMPT.md §5): una sola por sección,
// hijos escalonados 40 ms.
//
// Mejora progresiva: el contenido es visible por defecto en el CSS y solo se
// oculta cuando este script marca <html class="js-reveal">. Así, si el
// JavaScript falla o no se ejecuta, nada queda invisible. Una red de seguridad
// revela todo a los 5 s por si el observador nunca dispara.
export function initReveal() {
  const sections = document.querySelectorAll('[data-reveal]');
  if (!sections.length) return;

  const revealAll = () => sections.forEach((el) => el.classList.add('in'));

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    revealAll();
    return;
  }

  document.documentElement.classList.add('js-reveal');

  sections.forEach((el) => {
    el.querySelectorAll('[data-child]').forEach((c, i) => {
      c.style.transitionDelay = `${i * 40}ms`;
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  sections.forEach((el) => io.observe(el));

  setTimeout(revealAll, 5000);
}
