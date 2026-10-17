// Etiquetas de interfaz por idioma. Navegación principal: 6 ítems (PROMPT.md §6).

export type Locale = 'es' | 'en';

export const nav: Record<Locale, Array<{ href: string; label: string }>> = {
  es: [
    { href: '/investigacion/', label: 'Investigación' },
    { href: '/proyectos/', label: 'Proyectos' },
    { href: '/debate/', label: 'Debate' },
    { href: '/servicios/', label: 'Servicios' },
    { href: '/blog/', label: 'Blog' },
    { href: '/cv/', label: 'CV' },
  ],
  en: [
    { href: '/en/research/', label: 'Research' },
    { href: '/en/projects/', label: 'Projects' },
    { href: '/en/debate/', label: 'Debate' },
    { href: '/en/consulting/', label: 'Consulting' },
    { href: '/en/blog/', label: 'Blog' },
    { href: '/en/cv/', label: 'CV' },
  ],
};

export const footerLinks: Record<Locale, Array<{ href: string; label: string }>> = {
  es: [
    { href: '/medios/', label: 'Medios' },
    { href: '/contacto/', label: 'Contacto' },
  ],
  en: [
    { href: '/en/contact/', label: 'Contact' },
  ],
};

export const strings: Record<Locale, Record<string, string>> = {
  es: {
    switcher: 'EN',
    switcherLabel: 'Read in English',
    switcherHomeLabel: 'Esta página no tiene versión en inglés; ir a la portada en inglés',
    skip: 'Saltar al contenido',
    colophon: 'Hecho con Astro, R y D3.',
    license: 'Textos bajo CC BY 4.0',
    code: 'Código en GitHub',
  },
  en: {
    switcher: 'ES',
    switcherLabel: 'Leer en español',
    switcherHomeLabel: 'This page has no English version pair; go to the Spanish home',
    skip: 'Skip to content',
    colophon: 'Built with Astro, R and D3.',
    license: 'Texts under CC BY 4.0',
    code: 'Code on GitHub',
  },
};
