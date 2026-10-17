import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// Escritos (PROMPT.md Apéndice A.1). Fuente única: src/data/publications.yaml.
const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    type: z.enum(['thesis', 'report', 'column', 'editorial', 'wip']),
    title: z.string(),
    authors: z
      .array(z.object({ name: z.string(), role: z.enum(['author', 'editor', 'team']).optional() }))
      .default([]),
    year: z.number().nullable(), // los trabajos en curso no llevan año
    venue: z.string().default(''),
    url: z.string().default(''),
    pdf: z.string().default(''),
    lang: z.string().default('es'),
    status: z.enum(['preparacion', 'enviado', 'revision', 'aceptado']).nullable().default(null),
    source: z.string().default(''),
    note: z.string().default(''),
  }),
});

// Apariciones en medios (Apéndice A.2). Fuente: src/data/media.yaml.
const media = defineCollection({
  loader: file('src/data/media.yaml'),
  schema: z.object({
    // YAML convierte 2026-07-22 en Date, pero hay fechas parciales («2026-07»):
    // se normaliza todo a cadena AAAA-MM-DD o AAAA-MM.
    date: z
      .union([z.string(), z.date()])
      .transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10))),
    outlet: z.string(),
    title: z.string(),
    format: z.enum(['tv', 'radio', 'prensa', 'panel']),
    url: z.string().default(''),
    youtube_id: z.string().default(''),
    nota: z.string().default(''),
    source: z.string().default(''),
  }),
});

// Casos de /servicios/ (§6). Solo se publican los aprobados por Luis.
const casos = defineCollection({
  loader: file('src/data/casos.yaml'),
  schema: z.object({
    cliente: z.string(),
    anio: z.string(),
    servicio: z.string(),
    estado: z.enum(['borrador', 'aprobado']),
    problema: z.object({ es: z.string() }),
    que_hizo: z.object({ es: z.string() }),
    resultado: z.object({ es: z.string() }),
  }),
});

// Fichas de proyecto: un archivo Markdown por idioma (slug.es.md / slug.en.md).
const proyectos = defineCollection({
  loader: glob({ base: 'src/content/proyectos', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    lang: z.enum(['es', 'en']),
    slug_es: z.string(),
    slug_en: z.string(),
    order: z.number(),
    status: z.enum(['activo', 'publicado', 'cerrado', 'en-curso']),
    summary: z.string(),
    problema: z.string(),
    para_quien: z.string(),
    datos: z.string(),
    open_data: z.boolean().default(false),
    repo: z.string().default(''),
    site: z.string().default(''),
    report: z.string().default(''),
  }),
});

export const collections = { publications, media, casos, proyectos };
