// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio personal de Luis Valverde Ramos — dirección de arte «Puerto».
// ES en la raíz, EN bajo /en/ (espejo parcial). Ver PROMPT.md.
export default defineConfig({
  site: 'https://luiseduardovalverderamos.github.io',

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-PE', en: 'en-GB' },
      },
    }),
  ],

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Piazzolla',
      cssVariable: '--font-display',
      subsets: ['latin'],
      weights: ['400 700'],
      styles: ['normal'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      // La itálica solo la usan las frases separadoras: sin precarga.
      provider: fontProviders.fontsource(),
      name: 'Piazzolla',
      cssVariable: '--font-display-italic',
      subsets: ['latin'],
      weights: ['400 500'],
      styles: ['italic'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Archivo',
      cssVariable: '--font-text',
      subsets: ['latin'],
      weights: ['400', '500', '600'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Spline Sans Mono',
      cssVariable: '--font-mono',
      subsets: ['latin'],
      weights: ['400', '500'],
      styles: ['normal'],
      fallbacks: ['Consolas', 'monospace'],
    },
  ],

  // Redirecciones desde las URLs del sitio Hugo anterior (PROMPT.md §6).
  // El idioma por defecto se invierte: antes EN vivía en la raíz y ES en /es/.
  redirects: {
    '/es/': '/',
    '/about/': '/en/',
    '/es/about/': '/',
    '/experience/': '/en/cv/',
    '/es/experience/': '/cv/',
    '/projects/': '/en/projects/',
    '/es/projects/': '/proyectos/',
    '/publications/': '/en/research/',
    '/es/publications/': '/investigacion/',
    '/work/': '/en/projects/',
    '/es/work/': '/proyectos/',
    '/media/': '/medios/',
    '/es/media/': '/medios/',
    '/education/': '/en/cv/',
    '/es/education/': '/cv/',
    '/research/': '/en/research/',
    '/es/research/': '/investigacion/',
    '/contact/': '/en/contact/',
    '/es/contact/': '/contacto/',
  },
});
