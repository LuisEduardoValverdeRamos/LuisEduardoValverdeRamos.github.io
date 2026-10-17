// Mapa canónico de rutas ES ↔ EN (PROMPT.md §4 y Apéndice A.4).
// El conmutador de idioma y los hreflang se generan SOLO desde este archivo.

export const pagePairs: Record<string, string> = {
  '/': '/en/',
  '/investigacion/': '/en/research/',
  '/proyectos/': '/en/projects/',
  '/debate/': '/en/debate/',
  '/servicios/': '/en/consulting/',
  '/blog/': '/en/blog/',
  '/cv/': '/en/cv/',
  '/contacto/': '/en/contact/',
  // página interna de prueba tipográfica (se elimina antes del lanzamiento)
  '/estilo/': '/en/style/',
};

// Slugs de fichas de proyecto ES ↔ EN (Apéndice A.4)
export const projectSlugs: Record<string, string> = {
  'brechas-obras': 'infrastructure-gaps',
  'elector-peruano': 'peruvian-voter',
  'analitica-debate-lpde': 'lpde-debate-analytics',
  'voto-joven': 'young-vote',
  'tesis-nino-costero': 'el-nino-reconstruction',
  'padron-escale': 'escale-registry',
  'indicadores-bcrp': 'bcrp-indicators',
};

const enToEs: Record<string, string> = Object.fromEntries(
  Object.entries(pagePairs).map(([es, en]) => [en, es]),
);

function normalize(pathname: string): string {
  return pathname.endsWith('/') ? pathname : pathname + '/';
}

/** Par ES/EN para una ruta, o null si la página no tiene espejo. */
export function altFor(pathname: string): { es: string; en: string } | null {
  const p = normalize(pathname);
  if (p in pagePairs) return { es: p, en: pagePairs[p] };
  if (p in enToEs) return { es: enToEs[p], en: p };
  // fichas de proyecto
  const esMatch = p.match(/^\/proyectos\/([^/]+)\/$/);
  if (esMatch && projectSlugs[esMatch[1]]) {
    return { es: p, en: `/en/projects/${projectSlugs[esMatch[1]]}/` };
  }
  const enMatch = p.match(/^\/en\/projects\/([^/]+)\/$/);
  if (enMatch) {
    const es = Object.entries(projectSlugs).find(([, en]) => en === enMatch[1]);
    if (es) return { es: `/proyectos/${es[0]}/`, en: p };
  }
  return null;
}

/**
 * Destino del conmutador de idioma. Para páginas sin espejo (p. ej. /medios/),
 * lleva a la portada del otro idioma (regla del PROMPT §4).
 */
export function switchTarget(pathname: string): { href: string; exact: boolean } {
  const p = normalize(pathname);
  const alt = altFor(p);
  const isEn = p === '/en/' || p.startsWith('/en/');
  if (alt) return { href: isEn ? alt.es : alt.en, exact: true };
  return { href: isEn ? '/' : '/en/', exact: false };
}
