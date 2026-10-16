# Master prompt — Sitio personal de Luis Valverde Ramos (v2.1 · Astro)

Versión 2.1 — 16 de octubre de 2026. Sustituye por completo al master prompt anterior (versión Quarto). Las decisiones de stack, idioma, alcance y contenido ya fueron evaluadas y tomadas; no se relitigan. El contenido de la sección 9 está contrastado contra el CV real de Luis (oct-2026), su sitio Hugo actual y fuentes públicas en línea — cada afirmación indica su fuente («consta en CV» o URL pública). La sección 10 fija qué se puede publicar y qué no; es ley. Esta versión incorpora la revisión de un panel de cuatro lentes (comité académico, cliente, ingeniero, auditor de confidencialidad).

## 0. Cómo usar este prompt

Este archivo vive en la raíz del repositorio de la web actual (`C:\personal_page_v2`). Abre Claude Code en ese repositorio y escribe como primer mensaje: «Lee PROMPT.md completo. Es tu brief. Empieza por la Fase 0 y no avances de la Fase 1 sin mi aprobación del style tile».

Hay un único punto de parada obligatorio: el style tile de la Fase 1. Todo lo demás avanza por fases con un commit, capturas de pantalla y un resumen de tres líneas al cierre de cada una.

---

## 1. Rol y forma de trabajo

Eres un desarrollador front-end senior y director de arte digital con experiencia en sitios editoriales, visualización de datos con D3 y flujos reproducibles con R. Vas a construir, de principio a fin, el sitio web personal de Luis Valverde Ramos, politólogo peruano. El sitio reemplaza su web actual en Hugo (tema hugo-noir) y se publica en GitHub Pages en `https://luiseduardovalverderamos.github.io/`.

Forma de trabajar:

- Trabaja en español. Los commits siguen Conventional Commits en inglés (`feat:`, `fix:`, `content:`, `style:`).
- **Nunca incluyas el trailer `Co-Authored-By: Claude` ni ninguna mención a Claude en los commits.** Es un repositorio público profesional a nombre de Luis.
- Decide solo todo lo que puedas decidir con este brief. Pregunta únicamente lo que no puedes inventar; agrupa las preguntas (máximo diez, solo en Fase 0).
- **Nunca inventes publicaciones, premios, cifras, clientes ni testimonios.** Donde falte un dato, deja un placeholder `[CONFIRMAR: qué falta]` **en los archivos fuente (YAML, .md)**, nunca en el HTML renderizado de producción.
- **Regla de degradación de placeholders**: todo bloque cuyo dato siga en `[CONFIRMAR]` al llegar a producción se **omite del render** — la sección se encoge o desaparece (sin confirmación de un cliente no hay su logo; sin URL de un informe, la entrada aparece sin enlace). Los `[CONFIRMAR]` viven solo en los fuentes y en el resumen de la Fase 8. Así «placeholder y seguir», «sin placeholders visibles en producción» y «lanzar con pendientes anotados» son compatibles.
- **Respeta la matriz de confidencialidad (sección 10) sin excepciones.** Ante la duda entre publicar y no publicar un dato de un trabajo institucional o de terceros, no se publica.
- Cierra cada fase con un commit, una captura de escritorio y otra de móvil tomadas con Playwright, y un resumen de tres líneas: qué se hizo, qué quedó pendiente y con qué marcador, y qué decisión tomaste solo que Luis deba conocer. No pases a la siguiente fase con errores de build.
- Al terminar, escribe un `CLAUDE.md` en la raíz con las convenciones del proyecto (ver Fase 8).

## 2. Misión y públicos

La misión tiene tres condiciones que no se negocian entre sí:

1. Debe leerse como el sitio de un investigador serio ante un comité académico o de becas (Chevening, LSE, Oxford). Desconfían de superlativos y efectos; buscan método, publicaciones y voz propia.
2. Debe permitir que una organización (colegio, ONG, medio, institución pública, organización de debate de América Latina) entienda en treinta segundos qué servicios ofrece y cómo contratarlo.
3. Debe ser original: nadie debe poder confundirlo con una plantilla académica ni con un portafolio de desarrollador.

Tres públicos, en orden de prioridad: (1) evaluadores académicos — en buena parte fuera del Perú, leen `/en/`; (2) contratantes — leen la raíz en español; (3) comunidad — estudiantes, debatientes, periodistas. **Cada versión de idioma prioriza a su lector**: la jerarquía de la portada difiere por idioma (sección 7), aunque el contenido es el mismo.

Lección de los referentes (oct-2026: andrewheiss.com, joseincio.com, visualcinnamon.com, stephanieevergreen.com, cedricscherer.com): ninguno integra bien las dos patas — Incio tiene la arquitectura académica bilingüe perfecta y cero capa comercial; Evergreen y Scherer venden bien y sepultan la credencial académica. Este sitio hace ambas: investigación por preguntas (Incio), servicios productizados con nombre, formato y siguiente paso (Evergreen), social proof concreto (Bremer), materiales docentes abiertos como demo (Heiss). Errores a evitar: menú-inventario de 8-9 ítems, capa comercial invisible, portada-bio sin jerarquía de acción.

## 3. Decisiones ya tomadas (no relitigar)

1. **Stack: Astro, no Quarto ni Hugo.** La prioridad número uno declarada por Luis es el diseño; Astro da control total del HTML, i18n nativo y ecosistema vigente. El flujo R se conserva: los posts computacionales se escriben en `.qmd` y se renderizan localmente a Markdown (sección 11).
2. **Idiomas: español en la raíz, inglés en `/en/` como espejo parcial.** El espejo EN cubre: portada, investigación, proyectos (índice y fichas), debate, CV, contacto, un resumen breve de servicios (`/en/consulting/`) y el blog con los posts traducidos (como mínimo, el post metodológico del mapa desde el lanzamiento). `/medios/` solo ES en v1. Nada de mezclar idiomas en una página.
3. **Alcance v1**: las páginas de la sección 6. Docencia como página propia, Charlas, /ahora y /herramientas NO existen en v1 (backlog, sección 15); docencia vive como bloque en /investigacion/ y en el CV.
4. **Dirección de arte: Litoral** (sección 5), aprobación por style tile obligatoria.
5. **La pieza central es la visualización del Perú por distritos** (sección 8), con un cuarto estado de infraestructura pública: titular y mapa cubren las dos líneas maestras (voto + Estado).
6. **El contenido de la sección 9 se usa tal cual; la matriz de la sección 10 es ley.**
7. **Nada de frameworks UI** (React/Preact/Svelte/Vue): el único JavaScript del sitio son módulos ES propios + D3 para el mapa.

## 4. Stack técnico

**Generador**: Astro (última versión estable; a oct-2026 es la serie 7.x — requiere Node 22+). Proyecto estático (`output: 'static'`), sin SSR.

**Arquitectura de datos** (fijada; no elegir otra):
- **Colecciones Markdown** (Content Layer, `glob()` loader): `src/content/blog/` y `src/content/proyectos/` — contenido largo, un archivo por idioma (`brechas-obras.es.md` / `brechas-obras.en.md` o subcarpeta por slug; elegir una convención y documentarla).
- **Colecciones de datos** (`file()` loader o import directo): `src/data/publications.yaml`, `src/data/media.yaml`, `src/data/cv.yaml` — datos tabulares renderizados por plantilla. Esquemas exactos en el Apéndice A.
- El `projects.yaml` que se crea en Fase 0 es un **seed** que se migra a la colección `proyectos` en Fase 5a; queda dicho aquí para que no convivan dos fuentes de verdad.

**i18n**: routing nativo de Astro:
```js
i18n: {
  defaultLocale: 'es',
  locales: ['es', 'en'],
  routing: { prefixDefaultLocale: false },
}
```
Las rutas localizadas se crean por estructura de archivos (`src/pages/investigacion.astro` ↔ `src/pages/en/research.astro`). Un módulo **`src/i18n/routes.ts`** contiene el mapa completo ES↔EN de rutas y slugs (Apéndice A.4); de él se alimentan el conmutador de idioma y los `hreflang`. Regla para páginas sin espejo (p. ej. /medios/): el conmutador lleva a `/en/` con `aria-label` que lo indique, y esas páginas no emiten `hreflang` de alternate. Integración `@astrojs/sitemap` con `i18n: { defaultLocale: 'es', locales: { es: 'es-PE', en: 'en-GB' } }` para que el sitemap emita las alternates.

**Hosting y despliegue**: GitHub Pages con el action oficial `withastro/action` (build) + `actions/deploy-pages` (deploy) sobre push a `main`. `site: 'https://luiseduardovalverderamos.github.io'`, sin `base` (repo de usuario). **Un repo de usuario tiene UN solo sitio Pages: no existen deploy previews por rama.** El mecanismo de previsualización del proyecto es: build local + `astro preview` + las capturas Playwright exigidas en cada fase. El workflow nuevo se escribe en la rama `astro` configurado para desplegar solo desde `main`; el cutover está en la Fase 8. En Fase 0 se audita cómo se despliega el Hugo actual (hay un workflow `peaceiris/actions-hugo` + `deploy-pages`; verificar su estado y el source configurado en Pages).

**El CI no ejecuta R, Quarto, Typst ni Playwright.** Todo render computacional, PDF y captura ocurre en local y sus productos se versionan. El action de Astro solo hace `npm ci && astro build`.

**Datos y código R**: preprocesamiento en `R/` como scripts numerados con un `Makefile`. Datos crudos >5 MB no se versionan (se documenta fuente y script de descarga). Los datos que consume la web van en JSON compacto a `public/data/`.

**Front-end**: HTML semántico; CSS propio en `src/styles/` con tokens (`--color-*`, `--space-*`, `--type-*`); cero frameworks CSS y cero frameworks UI. JavaScript: módulos ES propios cargados con `<script>` de Astro (bundled). La única librería permitida es D3 v7 (solo los módulos necesarios). Presupuesto total de JS: 150 KB comprimidos, incluida D3. **El mapa de portada NO es una “island” de framework**: es un módulo propio que se auto-inicializa de forma perezosa con `IntersectionObserver` (sección 8); prohibido añadir Preact/Svelte/React para esto.

**Tipografía**: Fonts API de Astro (estable desde Astro 6) con provider Fontsource: Fraunces (variable) + IBM Plex Sans + IBM Plex Mono, `subsets: ['latin', 'latin-ext']` (ñ, tildes, comillas españolas), `font-display: swap`, fallbacks métricos anti-CLS y preloads generados por la API. Sin peticiones a Google Fonts. `pyftsubset` manual solo si hiciera falta recortar ejes de Fraunces — no empezar por ahí.

**Imágenes**: `astro:assets` (`<Image />`) con salida AVIF/WebP, `loading="lazy"` fuera del primer pantallazo, dimensiones explícitas siempre. Material de partida: las fotos que Luis aporte + `static/images/` del sitio viejo (retrato y 5 imágenes de proyectos), movidas a `src/assets/legacy/`.

**Video**: nunca iframes directos. `@astro-community/astro-embed-youtube` (lite-youtube: el iframe carga solo al clic) **con póster SIEMPRE local**: un script del repo descarga la miniatura una vez, se optimiza con `astro:assets` y se pasa como `poster` al componente. Cero peticiones a `*.ytimg.com` / `*.youtube.com` antes del clic (se verifica en Fase 7 con el panel de red). Videos propios pesados jamás al repo.

**Privacidad**: sin analytics ni rastreadores. Única petición a terceros permitida: YouTube después de un clic. Sin cookies, sin banner. Si Luis pide medición: GoatCounter o Plausible, solo entonces.

**Compatibilidad**: últimas dos versiones de Chrome, Firefox, Safari, Edge; iOS Safari y Chrome Android. Todo funciona sin JavaScript: la portada muestra el SVG estático del mapa y el resto es HTML puro.

**Transiciones de página**: view transitions nativas cross-document vía CSS (sin `<ClientRouter />`); el sitio sigue siendo MPA. Si un navegador no las soporta, simplemente no hay transición.

## 5. Dirección de arte: Litoral

Parte del paisaje de Piura (arena, sol bajo, mar frío), no de ninguna convención académica ni tecnológica. Cálida, luminosa y seria. Un solo acento fuerte. Nada de fondos oscuros.

| Token | Hex | Uso |
| --- | --- | --- |
| `--color-arena` | #F4EEE3 | fondo de página |
| `--color-arena-2` | #EAE1D1 | fondo de tarjetas y franjas |
| `--color-tinta` | #14181F | texto principal, titulares |
| `--color-tinta-2` | #4A5160 | texto secundario, metadatos |
| `--color-sol` | #D9572B | acento único: enlaces, botones, un dato destacado por pantalla |
| `--color-mar` | #1F5F6B | color de datos en gráficos, segundo plano de la visualización |
| `--color-linea` | #D6CBB8 | hairlines, bordes, separadores |

Reglas de color: `sol` una sola vez por pantallazo, en algo que importe; nunca como fondo de sección. `mar` exclusivo de datos. Contraste AA verificado para `tinta` y `tinta-2` sobre `arena` y `arena-2`. Nada de degradados, sombras de colores ni glassmorphism.

Tipografía, tres familias con rol fijo:

- **Display**: Fraunces (variable). Titulares grandes con `opsz` alto y tracking −0.02em.
- **Texto**: IBM Plex Sans. Cuerpo 18px escritorio / 17px móvil, interlineado 1.6, máximo 68 caracteres por línea.
- **Datos y metadatos**: IBM Plex Mono. Etiquetas del mapa, fechas, estados de los papers, números grandes; en etiquetas, mayúsculas pequeñas con tracking 0.06em.

Escala fluida con `clamp()`: titular de portada entre 56px y 112px. Nada de Inter, Roboto, Arial, Helvetica, Montserrat, Poppins ni Georgia como display.

Espacio: retícula de 12 columnas, canal 24px, contenedor máximo 1200px, márgenes 24px en móvil, espaciado en múltiplos de 8px. Secciones separadas por aire (96–128px) y una hairline, no por cambios de fondo.

Movimiento:

1. Una sola entrada por sección al hacer scroll (`IntersectionObserver`): opacidad 0→1 y `translateY` 12px→0, 400ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`; hijos escalonados 40ms.
2. Hover en tarjetas y enlaces: elevación 2px + regla en `sol`, 180ms. Sin zooms ni rotaciones.
3. Barra fija y compacta tras 120px de scroll, fondo `arena` al 92% con `backdrop-filter` suave.
4. La única animación ambiciosa es el mapa de portada (sección 8).
5. `prefers-reduced-motion: reduce` apaga todo: sin transiciones, mapa resuelto, barra sin cambios.
6. Prohibido: parallax, scroll-jacking, carruseles, cursores personalizados, partículas, texto que se escribe solo.

Iconos: Lucide inline SVG, trazo 1.5px, color `tinta-2`. Nunca emoji. Fotografía: máximo tres fotos de Luis, blanco y negro con tinte cálido; paisajes de Piura solo si él los aporta. Nada de banco de imágenes ni imágenes generadas por IA.

**Convención de cifras** (vale para todo el sitio y para `theme_litoral`): cifra exacta con separador de miles en fichas, CV y cuerpo («747,836 titulares», «60,214 obras» — la exacta que salga de los datos); redondeo («747 mil», «60 mil») solo en titulares y números grandes de portada. Documentarla en `CLAUDE.md`.

## 6. Arquitectura del sitio

| Ruta ES | Ruta EN | Qué contiene |
| --- | --- | --- |
| `/` | `/en/` | Portada narrativa (sección 7; jerarquía distinta por idioma) |
| `/investigacion/` | `/en/research/` | Líneas como preguntas · escritos · formación y docencia · trabajos en curso |
| `/proyectos/` | `/en/projects/` | Índice de fichas; ficha por proyecto (slugs en Apéndice A.4) |
| `/debate/` | `/en/debate/` | Entrenador · juez · LPDE · recursos · bloque de conversión |
| `/servicios/` | `/en/consulting/` | ES: servicios productizados completos. EN: resumen de una pantalla con enlace a la versión ES |
| `/blog/` | `/en/blog/` | ES: todos los posts. EN: solo los traducidos (mínimo el post 1 al lanzar) |
| `/medios/` | — (v1) | Apariciones en prensa/radio/TV + bloque «Para prensa y medios» |
| `/cv/` | `/en/cv/` | CV en HTML con CSS de impresión + descarga PDF |
| `/contacto/` | `/en/contact/` | Rutas de contacto según necesidad |
| `/datos-del-mapa/` | — | Tabla de datos accesible de la visualización (enlazada desde la leyenda del mapa; fuera del menú) |
| `/404.html` | — | Error con el mapa en miniatura y enlaces útiles |

**Navegación principal (6 ítems)**: Investigación · Proyectos · Debate · Servicios · Blog · CV, más el conmutador ES/EN a la derecha. Medios y Contacto van en el pie y en el menú móvil; Medios además se enlaza desde la franja de social proof de /servicios/ (y viceversa), y Contacto como CTA en portada y en cada página orientada a clientes.

**Logotipo**: nombre completo en Fraunces; en barra compacta, «LVR» en Plex Mono.

**Pie**, tres columnas: enlaces secundarios (Medios, Contacto, CV PDF, RSS); perfiles (GitHub, LinkedIn, ORCID y Google Scholar — se crean en Fase 0, sección 14) como texto con icono; colofón: «Hecho con Astro, R y D3. Código en GitHub. Textos bajo CC BY 4.0» con enlaces.

**URLs**: minúsculas, sin tildes, estables. Posts en `/blog/aaaa/slug/`.

**Redirecciones desde el sitio Hugo actual** (el idioma por defecto se invierte: hoy EN vive en la raíz). Vía `redirects` de `astro.config.mjs` (meta-refresh en build estático). **Probar en Fase 2 que el router i18n y `redirects` conviven para rutas `/es/*`; si Astro se queja, plan B: páginas `.astro` mínimas con meta-refresh manual bajo `src/pages/es/`** — decidirlo en Fase 2, no en Fase 5. Todas las de esta tabla (19):

| URL vieja | Nueva |
| --- | --- |
| `/es/` | `/` |
| `/about/` | `/en/` |
| `/es/about/` | `/` |
| `/experience/` | `/en/cv/` |
| `/es/experience/` | `/cv/` |
| `/projects/` | `/en/projects/` |
| `/es/projects/` | `/proyectos/` |
| `/publications/` | `/en/research/` |
| `/es/publications/` | `/investigacion/` |
| `/work/` | `/en/projects/` |
| `/es/work/` | `/proyectos/` |
| `/media/` | `/medios/` |
| `/es/media/` | `/medios/` |
| `/education/` | `/en/cv/` |
| `/es/education/` | `/cv/` |
| `/research/` | `/en/research/` |
| `/es/research/` | `/investigacion/` |
| `/contact/` | `/en/contact/` |
| `/es/contact/` | `/contacto/` |

Las URLs basura del tema viejo (`/publications/my-first-blog/`, `/experience/experience-a/`, `/projects/project-a/`, taxonomías) no se redirigen: mueren en el 404 propio.

### Subsecciones por página

**/investigacion/** — en este orden:
1. **Las cuatro líneas de investigación** (retícula 2×2), definidas en la sección 9.3a — pregunta, método, evidencia, estado. No inventar una quinta ni recortar a tres.
2. **Escritos** (desde `publications.yaml`), agrupados así — y SOLO con estas categorías mientras no exista un artículo arbitrado: **Tesis** (lidera: es la pieza más fuerte, con enlace al repositorio PUCP) · **Informes técnicos e institucionales** · **Columnas y divulgación** · **Colaboraciones editoriales** (el volumen de clínicas, según la atribución literal que se verifique en Fase 0). Cuando exista el primer artículo arbitrado se crea la categoría «Artículos» — no antes: una categoría vacía o inflada es el error que un editor detecta primero.
3. **Formación y docencia** (bloque breve): intercambio en Ghent con cursos de maestría en métodos cuantitativos; Beca 18; Jefe de Práctica de Economía Política (PUCP); asistencias docentes de Introducción a R y Causal ML (Q-LAB); tutor del curso de la ESEG `[CONFIRMAR: nombre exacto del curso ESEG]`.
4. **Trabajos en curso**, con etiqueta de estado (en preparación / enviado / en revisión / aceptado) y coautor con afiliación: «con Daniel Encinas (Northwestern University)».

**/proyectos/** — índice con tarjetas; ficha por proyecto: qué problema resuelve, para quién, qué datos usa, estado, enlaces a código/sitio/informe. Una imagen o gráfico real por ficha; si no hay, ninguna. Etiqueta «datos y código abiertos» cuando aplique. **Antes de enlazar cualquier repo, auditarlo** (sección 10, regla de repos).

**/debate/** — cuatro bloques: (1) entrenador (selección nacional, Alpamayo, Sociedad de Debate PUCP, República Dominicana); (2) juez (CMUDE, TNDE, paneles); (3) LPDE (dirección académica, investigación del ecosistema — solo hallazgos agregados, sección 10); (4) **«Trabaja conmigo», el bloque de conversión**, segmentado: «Para colegios» / «Para universidades y selecciones», cada uno con 2-3 líneas de oferta concreta (qué incluye, modalidad, desde qué nivel) y contacto directo (mailto + WhatsApp si se confirma) EN la propia página — la directora de colegio aterriza aquí directo y no debe necesitar otro clic para escribir. Al final, recursos descargables. En portada, el acto 4 enlaza aquí con texto de acción.

**/servicios/** — la página ES completa:
1. Cuatro servicios, cada uno publicado con **cinco campos obligatorios**: nombre propio · para quién exactamente · formato y duración típica · entregables · **siguiente paso explícito** («Escríbeme contándome X; te respondo en 48 horas hábiles con una llamada de 20 minutos sin costo» `[CONFIRMAR: tiempos reales]`). Nombres propuestos (Luis puede renombrar): **Análisis electoral y de opinión pública** · **Formación en debate** (colegios, universidades, selecciones; coaching de duplas con diagnóstico en tres ejes `[CONFIRMAR: los ejes]`) · **Talleres de métodos en R** (análisis de texto, visualización) · **Acompañamiento metodológico** (tesis, investigaciones, evaluación de factibilidad y validez de indicadores).
2. Bloque **«Cómo trabajo»**: proceso en 3 pasos (diagnóstico → propuesta → entrega), modalidad («Trabajo entre Piura y Lima; talleres y entrenamientos presenciales en ambas ciudades; consultoría y coaching remoto para todo el país y América Latina»), y comprobantes `[CONFIRMAR: recibos por honorarios / factura]` — para un colegio o una ONG la pregunta administrativa decide.
3. Franja de instituciones (solo confirmadas en Fase 0) + enlace a /medios/.
4. **2-3 casos reales** (problema → qué hizo → resultado). **Bloqueante: /servicios/ no se publica con menos de 2 casos redactados con Luis.** Testimonios solo reales y con nombre; en Fase 0 se le pide a Luis gestionar 1-2 con contactos seguros (Alpamayo, LPDE, coordinador de RD).
5. Contacto: botón mailto **y** el correo como texto plano copiable; WhatsApp (`wa.me/...` con mensaje prellenado) si se confirma; Calendly recomendado para el servicio de análisis `[CONFIRMAR]`. Sin precios.

**/en/consulting/** — una pantalla: las cuatro líneas de servicio en una frase cada una, la línea de modalidad, contacto, y enlace a la versión ES completa. El lector EN prioritario es el comité; esta página existe para no esconder la pata profesional, no para vender.

**/medios/** — bloque superior **«Para prensa y medios»**: una línea de posicionamiento (temas que comenta: elecciones, comportamiento electoral, inversión pública), disponibilidad (Lima/remoto; respuesta el mismo día para coyuntura `[CONFIRMAR]`) y contacto directo. Debajo, lista editorial por año desde `media.yaml`: fecha, medio, título, formato, enlace; videos con astro-embed y póster local.

**/cv/** — generado desde `cv.yaml` (estructura bilingüe por campo, Apéndice A.3); hoja de impresión A4; botón «Descargar PDF». **PDF con Typst** (binario único, trivial en Windows), dos archivos versionados: `public/files/cv-es.pdf` y `public/files/cv-en.pdf`, regenerados con `make cv`. **El cv.yaml y los PDF públicos excluyen teléfono, dirección postal, DNI y fecha de nacimiento**; único contacto publicado: el correo PUCP y los perfiles.

**/contacto/** — reencuadrada como «Cómo contactarme según lo que necesitas», tres rutas: (1) quiero contratar un servicio → mailto con asunto prellenado por servicio + WhatsApp si existe; (2) soy periodista o productor → respuesta rápida, el canal más directo que Luis confirme; (3) soy estudiante o debatiente → correo, respuesta más lenta. El correo siempre visible como texto copiable. Invita, no advierte.

## 7. La portada, sección por sección

Siete actos de 60–100vh; hairlines y aire entre ellos; tres frases separadoras (centradas, Fraunces itálica 32px, hairline corta encima en `sol`). Nunca superlativos sobre él mismo.

**Jerarquía por idioma** (contenido igual, énfasis distinto):
- **ES** (lector prioritario: contratante): botón primario relleno `sol` = **«Trabajemos juntos»** (→ /servicios/); secundario de borde = «Ver investigación». Acto 5 completo.
- **EN** (lector prioritario: comité): botón primario relleno `sol` = **"View research"**; secundario = "Work with me" (→ /en/consulting/). El acto 5 se condensa a una franja breve de dos líneas con enlace.

**Acto 1 · Visualización y titular.** Pantalla completa. El mapa ocupa el 55% del ancho a la derecha en escritorio y el fondo completo atenuado en móvil. A la izquierda, en Fraunces a tamaño máximo, el titular — cubre las dos líneas maestras; propuesta base, afinable en el style tile: **«Estudio cómo vota el Perú y cómo el Estado cumple lo que promete»**. Debajo, línea de método: «Politólogo (PUCP). Ciencia social computacional sobre elecciones, prensa e infraestructura pública; formación en debate competitivo». Los dos botones según idioma. Debajo, en Plex Mono pequeña, la leyenda de la variable activa y su fuente.

**Acto 2 · Tres preguntas + escritos.** Título: «Lo que intento responder». Tres columnas (numeral Plex Mono, pregunta Fraunces, dos líneas, enlace a su línea): «¿Cómo vota la gente cuando los partidos no existen?» · «¿Qué decide nombrar la prensa, y qué calla?» · «¿Por qué lo que el Estado promete llega tarde o no llega?». Corresponden a las líneas 1–3 de 9.3a; la línea 4 (debate y educación cívica) tiene su propio acto, el 4. Debajo de las columnas, una mini-lista **«Escritos seleccionados»**: tres entradas en una línea cada una (la tesis, el informe JNE, una columna) con enlace a /investigacion/ — el comité encuentra evidencia escrita sin navegar.

**Frase separadora 1**: «Del distrito al Congreso, y de vuelta.»

**Acto 3 · Proyectos.** Título: **«Proyectos con datos públicos»** (EN: "Selected projects"). Cuatro tarjetas 2×2: número grande Plex Mono, nombre, una línea, etiqueta de estado. Las cuatro (sección 9.5): brechas de obras municipales con ML · tipología del elector peruano (informe JNE publicado) · analítica del debate escolar LPDE · voto joven 2026. Hover: regla `sol` + «Abrir proyecto». Enlace: «Todos los proyectos».

**Acto 4 · Debate.** Franja `arena-2`. Título: «Entrenar a discutir». Izquierda: párrafo de cuatro líneas sobre su trabajo como entrenador y juez. Derecha: tres datos en números grandes **rotulados como logros del equipo cuando lo son**: «4.º título consecutivo del Mundial de Debate Escolar en Español — MED (Panamá 2026) de la selección que entrena» · «Campeón nacional universitario (CNDI 2025)» · «países donde ha competido, juzgado o entrenado» (contar honesto desde 9.4). Dos enlaces: «Más sobre debate» y el de acción: **«¿Quieres entrenar a tu equipo? →»** (→ /debate/ bloque de conversión).

**Frase separadora 2**: «Enseñar a discutir es enseñar a pensar.»

**Acto 5 · Trabaja conmigo.** (ES completo; EN condensado.) Título: «En qué puedo ayudarte». Los cuatro servicios en dos columnas, título en Fraunces + dos líneas. Botón «Escríbeme» (mailto) y enlace «Ver servicios y casos».

**Acto 6 · Del blog.** Título: «Último publicado». Tres entradas: fecha Plex Mono, título Fraunces, una línea, etiquetas; miniatura del gráfico si existe. Enlace «Todo el blog».

**Frase separadora 3**: «Los datos públicos del Perú cuentan más de lo que solemos preguntarles.»

**Acto 7 · Cierre.** Foto de Luis en blanco y negro, pequeña, a la izquierda. Tres líneas: de dónde es (Pedregal Grande, Catacaos, Piura), dónde trabaja hoy (entre Piura y Lima), en qué está este trimestre. Enlaces a GitHub, LinkedIn, ORCID, Scholar y correo. Luego el pie.

Las frases separadoras en `/en/` se reescriben en inglés académico neutro y sobrio (no «británico» afectado); Luis revisa la versión EN completa antes del lanzamiento (Fase 7).

## 8. La visualización de portada: el Perú, distrito por distrito

Objeto gráfico, no dashboard. Tres capas: datos en R, JSON compacto, módulo D3.

**Concepto.** Cada distrito es un punto en su centroide. Tamaño = electores hábiles (escala raíz cuadrada, radio 1.2–9px). Color = variable activa en escala continua `arena-2` → `mar`, extremos tocando `sol`. El Perú dibujado solo con puntos, sin fronteras ni fondo. **Cuatro estados**: participación electoral · votos nulos y blancos · fragmentación del voto (número efectivo de candidatos) · **ejecución de inversión pública** (devengado/PIM distrital) — el cuarto estado es el puente entre las dos líneas maestras.

**Datos.** Electoral: resultados oficiales ONPE (datosabiertos.gob.pe) o INFOgob/JNE de la elección más reciente con cobertura distrital completa (ERM 2022 o EG 2021 primera vuelta). Inversión: MEF–Consulta Amigable `[CONFIRMAR: base exacta y año]` — este estado puede entrar después sin bloquear los otros tres. Centroides: shapefile INEI o GeoJSON público, verificando el cruce de ubigeos. Distritos sin cruce: reportar y excluir con nota; no inventar coordenadas. El conteo del titular se calcula de los datos.

**Pipeline R** (`R/01_hero_data.R`, tidyverse + sf): calcula por distrito las cuatro variables + electores; proyecta centroides (UTM 18S) y normaliza a un cuadro 0–1000; escribe `public/data/hero.json` (arreglo de arreglos `[x, y, electores, participacion, nulos, nec, inversion, ubigeo]`, 1 decimal, objetivo <80 KB) y `public/data/hero_meta.json` (fuentes, fechas, conteo, rangos). El mismo script genera `src/assets/hero-static.svg` con el primer estado resuelto y la tabla de `/datos-del-mapa/` (HTML o CSV que la página renderiza).

**Traspaso estático → dinámico (CLS = 0)**: el contenedor tiene `aspect-ratio` fijo derivado del cuadro 0–1000. El SVG estático se renderiza SIEMPRE (sirve a noscript, `prefers-reduced-motion` y como LCP); el módulo lo sustituye con crossfade de opacidad dentro del mismo contenedor ya dimensionado — nunca borrar y redibujar desde cero a la vista.

**Módulo D3** (`src/scripts/hero.js`, módulo ES propio cargado con `<script>` de Astro; se auto-inicializa al entrar en viewport con `IntersectionObserver`; importa solo `d3-selection`, `d3-scale`, `d3-transition`, `d3-ease`, `d3-interpolate`; SVG, <2,500 puntos):

1. Entrada de puntos desde radio 0, escalonada por coordenada y (norte a sur), 1,200ms, `easeCubicOut`.
2. Cada 6 segundos, o al pulsar los botones de la leyenda, el color transiciona al siguiente estado en 900ms. La leyenda indica variable, rango y fuente, y enlaza a `/datos-del-mapa/`. La alternancia se detiene al primer hover o clic.
3. Hover/tap: anillo `tinta` + rótulo Plex Mono con distrito, provincia y valor.
4. Fuera de viewport, la animación se pausa.
5. Con `prefers-reduced-motion`: el SVG estático se queda; sin alternancia.

**Accesibilidad**: `role="img"`, `aria-label` descriptivo, enlace a la tabla de `/datos-del-mapa/`. **Rendimiento**: JSON vía `fetch` tras el primer render; LCP <2.0s en 4G simulado.

**Primer post del blog**: la metodología de este mapa, en `.qmd` con el código R visible — y su versión EN desde el lanzamiento (es la mejor writing sample de métodos para el comité).

## 9. Contenido verificado (usar tal cual)

Cada afirmación lleva su fuente: «CV» = CV real de Luis (oct-2026, autodeclarado); «URL» = fuente pública verificada. En los YAML, registrar la fuente por entrada (`source: cv` | `source: <url>`). Lo `[CONFIRMAR]` se pregunta en Fase 0.

### 9.1 Identidad y bio

Luis Eduardo Valverde Ramos. Politólogo por la PUCP: primer puesto de su promoción (CV), tesis con mención sobresaliente (URL: repositorio PUCP); intercambio en Ghent University (2024, beca DARI, cursos de maestría en métodos cuantitativos — CV). Becario Beca 18 (PRONABEC, 2019–2024; CV y panel de La República). Bachillerato Internacional, COAR Amazonas. De **Pedregal Grande, Catacaos, Piura**; trabaja entre Piura y Lima. Fuera del trabajo practica muay thai (para el about, tono sobrio). Correo: luis.valverde@pucp.edu.pe. GitHub: `LuisEduardoValverdeRamos`. LinkedIn: `luisvalverderamos`. ORCID y Google Scholar: **se crean en Fase 0** (sección 14) y se integran a pie, CV y JSON-LD (`sameAs`).

En la web no se declaran niveles de idioma; el inglés se demuestra con la calidad de `/en/`.

### 9.2 Cargos y experiencia (CV oct-2026)

Actuales:
- Investigador, Escuela Electoral y de Gobernabilidad (ESEG), Jurado Nacional de Elecciones — jul. 2026–.
- Director Académico, Liga Peruana de Debate Escolar (LPDE) — sep. 2026– (antes Consultor de Investigación, ene.–ago. 2026).
- Jefe de Práctica de Economía Política, PUCP — ago. 2026–.
- Entrenador General, Sociedad de Debate PUCP — jul. 2026–.
- Entrenador de debate, Colegio Alpamayo — jun. 2026–.
- Entrenador, Selección Nacional de Debate Escolar del Perú — 2025–2026.
- Entrenador de debate universitario (remoto), República Dominicana — 2024–.
- Miembro investigador, GIES–PUCP (seguimiento legislativo, hechosynopalabras.pe) — 2025–.

Previa (para CV y casos): CISEPA–PUCP (asistente de investigación, oct. 2025–feb. 2026: **apoyo econométrico a proyectos de economía política con manuscritos en revisión en revistas internacionales** — sin nombrar revistas ni conteo de proyectos, ver matriz; scraping de **747,836 titulares** de El Comercio y La República 2016–2024); ProDiálogo–JNE (consultor, nov.–dic. 2025: instrumentos conductuales EG 2026 y clustering del electorado en 3 ciclos); Q-LAB–PUCP (asistente, 2024–2025: brechas de implementación en obras municipales con XGBoost+SHAP, proyecto con Cooperación Suiza; asistente docente de Introducción a R y Causal ML); **consultor de análisis de datos en el sector salud** (jul.–sep. 2025) — el cliente solo se nombra si se confirma `[CONFIRMAR: nombrar Sapienza/Roche]` y sin cifras del encargo; asistente de investigación de Daniel Encinas (Northwestern) y Rodrigo Barrenechea (2024: geografía del voto populista 1980–2021); practicante, IDEHPUCP (2023).

**Regla de encuadre**: el corpus de titulares y los manuscritos de CISEPA son proyectos de sus investigadores principales; Luis se presenta como asistente/equipo. Lo mismo con el informe JNE/ProDiálogo (equipo técnico: Monard, Encinas, Villena-Tagle, Valverde).

### 9.3 Investigación

#### 9.3a Las cuatro líneas (contenido de /investigacion/ y actos 2 y 4)

1. **Comportamiento electoral y política subnacional.** Pregunta: ¿cómo vota la gente cuando los partidos no existen? Método: encuestas postelectorales (JNE 2011/2016/2021), clustering, microeconometría de elección discreta, análisis espacial del padrón. Evidencia: informe JNE/ProDiálogo 2026; working paper con D. Encinas; proyecto voto joven 2026. Estado: activa.
2. **Prensa y agenda pública.** Pregunta: ¿qué decide nombrar la prensa, y qué calla? Método: análisis de texto a escala (el corpus de 747,836 titulares construido **como asistente de investigación en CISEPA-PUCP** — la ficha de línea declara este encuadre desde la primera oración). Estado: en desarrollo como línea propia.
3. **Brechas de implementación e infraestructura pública.** Pregunta: ¿por qué lo que el Estado promete llega tarde o no llega? Método: estudio de caso con método de diferencia y entrevistas (tesis sobre la reconstrucción post-Niño Costero en Piura); ML sobre obras municipales (como asistente en Q-LAB). Estado: activa — base de su tesis.
4. **Educación cívica y debate competitivo.** Pregunta: ¿qué forma ciudadanos capaces de deliberar? Método: analítica del ecosistema de debate escolar (LPDE, agregados); censo de la enseñanza electoral universitaria (ESEG-JNE, en curso, sin resultados publicables aún). Estado: activa.

La portada muestra las preguntas de las líneas 1–3 en el acto 2; la línea 4 vive en el acto 4 (Debate). En /investigacion/ están las cuatro.

#### 9.3b Escritos (para `publications.yaml`, con URLs verificadas)

**Tesis** — Valverde, L. (2025). *Desastres y brechas de implementación: estudio del proceso de reconstrucción de la infraestructura educativa en Piura entre julio de 2020 y enero de 2023, tras el Fenómeno de El Niño Costero*. Tesis de licenciatura (mención sobresaliente), PUCP. https://hdl.handle.net/20.500.12404/32370

**Informe institucional** — JNE (2026). *Análisis del elector peruano: aportes desde las ciencias del comportamiento*. JNE/ProDiálogo, 85 pp. Equipo técnico: Monard, Encinas, Villena-Tagle, Valverde. `[CONFIRMAR: URL pública del PDF]`.

**Colaboración editorial** — *Escrito sobre la opinión consultiva Emergencia climática y derechos humanos a la Corte Interamericana de Derechos Humanos* (2023). Alianza de Clínicas Jurídicas Ambientales de Latinoamérica y el Caribe, con SPDA e IDEHPUCP. PDF: https://alianzadeclinicasambientales.com/wp-content/uploads/2023/12/Informe-O.C.-Emergencia-Climatica-Corte-IDH-Alianza-Clinicas-Juridicas-Ambientales-LAC-IDEHPUCP-y-SPDA-1.pdf — **RESUELTO en Fase 0 (verificado en el PDF, p. 2 de créditos)**: Luis figura como miembro del «Equipo editor» (5 personas, bajo una coordinación general distinta). Se lista bajo «Colaboraciones editoriales» con la atribución textual «Equipo editor»; nunca con (Eds.).

**Columnas IDEHPUCP (2023, coautoría, grupo «Columnas y divulgación»)**:
- «El estancamiento de la democracia en el Perú» (con A. Benites, 21/03/2023) — https://idehpucp.pucp.edu.pe/boletin-eventos/el-estancamiento-de-la-democracia-en-el-peru-27949/
- «Reconstrucción sin cambios: cuando la prevención no es una prioridad» (con E. Solís, 20/06/2023) — https://idehpucp.pucp.edu.pe/boletin-eventos/reconstruccion-sin-cambios-cuando-la-prevencion-no-es-una-prioridad-28343/
- «Una agenda pendiente a veinte años del Informe final de la CVR…» (con M. Cépeda, 22/08/2023) — https://idehpucp.pucp.edu.pe/boletin-eventos/una-agenda-pendiente-a-veinte-anos-del-informe-final-de-la-cvr-apuntes-sobre-la-noensenanza-del-conflicto-armado-interno-en-las-universidades-peruanas-28539/
- «Cambio climático y derechos humanos: una relación que viene escalando en los tribunales» (con A. Domínguez, 19/09/2023) — https://idehpucp.pucp.edu.pe/boletin-eventos/cambio-climatico-y-derechos-humanos-una-relacion-que-viene-escalando-en-los-tribunales-28642/
- «Nuevo reporte del RENADE» (con I. Jave, 03/10/2023) — https://idehpucp.pucp.edu.pe/boletin-eventos/nuevo-reporte-del-registro-nacional-de-personas-desaparecidas-y-sitios-de-entierro-renade-28722/
- «La catástrofe humanitaria de la desaparición en el Perú…» (con M. Cépeda, 31/10/2023) — https://idehpucp.pucp.edu.pe/boletin-eventos/la-catastrofe-humanitaria-de-la-desaparicion-en-el-peru-retos-para-la-politica-de-busqueda-de-personas-desaparecidas-28811/

**Trabajos en curso**: «El mal menor y el voto en blanco: el voto expresivo en el balotaje presidencial peruano de 2021», con Daniel Encinas (Northwestern University) — estado: en preparación. **Solo título, coautor y estado** (sección 10).

El supuesto análisis para EnConsulta (debate 2021) no está indexado en ninguna parte — `[CONFIRMAR: enlace, o se omite]`.

### 9.4 Debate (hechos corregidos — usar estas formulaciones)

**Corrección capital**: el título de Panamá (agosto 2026) fue el **Mundial de Debate Escolar en Español (MED)** — Perú logró su **cuarto título consecutivo**. NO fue el WSDC (el mundial en inglés, que en 2026 se jugó en Nairobi). Jamás escribir «WSDC» para Panamá. La cobertura acredita el título del equipo (Andina, 10/09/2026: https://andina.pe/agencia/noticia-peru-se-corona-tetracampeon-el-mundial-debate-escolar-espanol-2026-1091241.aspx); el rol de Luis consta en su CV, no en prensa. **Formulación canónica** (evita atribuirle los cuatro títulos — él entrenó el ciclo 2025–2026): «Entrenador de la selección peruana que en Panamá 2026 obtuvo su cuarto título consecutivo del Mundial de Debate Escolar en Español (MED)».

Hechos (fuente: CV, salvo indicación):
- Campeón Nacional Interuniversitario de Debate (CNDI) 2025 — el nacional universitario del Perú, formato BP.
- Semifinalista CMUDE Madrid 2022; cuartofinalista CMUDE Panamá 2023; subcampeón Torneo Rosarista (Bogotá) 2023. CMUDE = Campeonato Mundial Universitario de Debate en Español; precisarlo así.
- Juez de la Gran Final del CMUDE 2026 (Ecuador). Jefe de Adjudicación del TNDE 2025.
- Entrenador universitario remoto para equipos de República Dominicana (2024–). «Duplas de RD a octavos del WUDC, primera vez para ese país»: NO verificado públicamente — `[CONFIRMAR: torneo, año, y si puede publicarse]`.
- Juez del Round Robin Hispanohablante 2026: `[CONFIRMAR]`.
- Programa de formación y acreditación de entrenadores de la LPDE: `[CONFIRMAR: nombre, estado y meta]`.
- Resultados citables de equipos que él entrenó directamente (Alpamayo, duplas RD): `[CONFIRMAR: 1-2 resultados con permiso]` — es el social proof que una dirección de colegio pide primero.

Recursos descargables de /debate/: taller de argumentos de principios y taller «¿Cómo se evalúa un debate?» (juzgamiento WSDC) `[CONFIRMAR: archivos]`.

### 9.5 Proyectos (fichas; slugs en Apéndice A.4)

1. **Brechas de infraestructura municipal con ML** — 60,000+ obras públicas municipales (2018–2024), XGBoost + SHAP, proyecto Q-LAB/Cooperación Suiza. Sitio: https://luiseduardovalverderamos.github.io/public_infrastructure_gaps/ — encuadre: trabajo como asistente en Q-LAB; citar solo lo ya público en ese sitio.
2. **Tipología del elector peruano** — clustering de 3 ciclos de encuestas JNE (2011, 2016, 2021); resultados publicados en el informe JNE/ProDiálogo 2026. Repo: `clustering-profile-peruvian-voter` (auditar antes de enlazar). Citar SOLO la solución oficial; presentar como trabajo institucional.
3. **Analítica del debate escolar (LPDE)** — análisis de resultados públicos de 16 torneos (2025, tabulaciones Tabbycat) + longitudinal TNDE 2023–2025; hallazgos agregados sobre equidad de acceso. Repo: `lpde-debate-analytics` (auditar antes de enlazar). **Nunca** describir el sistema de contactos ni nada individual (sección 10).
4. **Voto joven 2026** — padrón RENIEC, hot spots Getis-Ord Gi*; 6.7M de electores jóvenes (25.7% del padrón); «71 distritos concentran el 40% del electorado» `[CONFIRMAR: denominador exacto — recalcular del repo]`. Repo: `voto-joven-peru-2026`.
5. **Tesis: reconstrucción post-Niño Costero en Piura** — brechas de implementación en infraestructura educativa (2020–2023). Enlace: repositorio PUCP (9.3b).
6. **Nota de datos: padrón ESCALE de colegios del Perú** — aislamiento documentado del padrón MINEDU (corte mar-2026), script DBF→UTF-8 reproducible e informe de limitaciones. Publicable íntegro (sin mencionar la base de correos).
7. **Indicadores BCRP en R** — pipeline sobre la API pública de BCRPData, figuras tipo paper, códigos de serie documentados. Publicable íntegro.
8. **Herramienta de voto informado — Pedregal Grande (Catacaos)** `[CONFIRMAR: URL y estado; si no existe, va al backlog, no a la web]`.

### 9.6 Medios (para `media.yaml`, URLs verificadas)

- El Salto (España), 22/07/2026 — entrevista: «Qué se puede esperar de los primeros meses de Keiko Fujimori como presidenta de Perú» — https://www.elsaltodiario.com/peru/se-puede-esperar-primeros-meses-keiko-fujimori-presidenta-peru
- Radio Exitosa, 04/07/2026 — «Keiko Fujimori es la presidenta electa: ¿cuáles son los retos que debe enfrentar?» — https://www.youtube.com/watch?v=M2cBfmLUtGs&t=1690s
- La República — *Que No Se Te Olvide* (Carlos Cornejo), jul. 2026 — panel «Beca 18: ¿solución o problema?» — https://www.youtube.com/watch?v=m5zQ97rbRJ8&t=1349s
- Radio Exitosa, 18/06/2026 — «Discurso de irregularidades deslegitima a las instituciones» — https://www.youtube.com/watch?v=wKjABJHgjHs
- Colegio de Politólogos del Perú, 26/03/2026 — panel del primer debate presidencial 2026 — https://www.youtube.com/watch?v=dJxkPe9QxE4
- Canal 04 Catacaos, 2026 — entrevista `[CONFIRMAR: enlace]`.

### 9.7 Reconocimientos (CV; para el YAML del CV y, con sobriedad, el about)

Primer puesto de la promoción PUCP; tesis con mención sobresaliente; primer puesto del Concurso de Investigación de la Facultad de CC.SS. PUCP `[CONFIRMAR: 2023 o 2024 — CV y web actual difieren]`; Beca 18 (2019–2024); beca DARI (Ghent). Los hechos hablan; sin adjetivos.

## 10. Matriz de confidencialidad (LEY — leer antes de escribir cualquier página)

| Trabajo | Se puede publicar | Prohibido |
| --- | --- | --- |
| Paper «mal menor» (con D. Encinas) | Título, coautor con afiliación, una línea de tema, estado «en preparación» | Cualquier cifra, figura, hipótesis o hallazgo (el manuscrito dice «NO CITAR NI CIRCULAR»), hasta el OK de ambos autores |
| Clustering JNE / informe ProDiálogo | Referencia al informe publicado (2026); descripción del método; repo propio auditado; «equipo técnico» | Apropiarse la autoría institucional; citar soluciones exploratorias no oficiales; material interno de actualización |
| Censo de materia electoral (ESEG-JNE) | «Censo de la enseñanza electoral universitaria para la ESEG-JNE (en curso)» — una línea, sin resultados | Toda cifra o figura, hasta que el JNE publique o autorice |
| Compras públicas (Observatorio CAL) | Descripción genérica del encargo, idealmente con visto bueno `[CONFIRMAR]` | Toda cifra, hallazgo o crítica al borrador del cliente, antes de que el CAL publique |
| LPDE torneos/briefs | Hallazgos agregados de los briefs (brecha público/privado, concentración geográfica, paridad) con sus caveats | Datos individuales (los oradores son **menores de edad**); rankings por colegio nombrado; **todo el flujo de contactos de colegios, incluido nombrarlo** (ni los CSV, ni el scraping de correos, ni su existencia) |
| Corpus CISEPA | Mención como experiencia de asistente; la cifra del scraping (747,836) | Presentarse como autor de los papers; publicar el corpus; **nombrar la revista de destino o el estado editorial detallado de manuscritos ajenos** (decir solo «manuscritos en revisión en revistas internacionales»); el conteo interno de proyectos, salvo OK de los PIs |
| Voto joven 2026 | Agregados y hot spots (cifras del repo) | Redistribuir microdatos del padrón RENIEC |
| Q-LAB brechas (Cooperación Suiza) | Lo ya público en el sitio del proyecto; encuadre de asistente | Resultados no publicados del encargo |
| BCRP, padrón ESCALE, motions | Todo (datos públicos, trabajo propio). Motions: verificar procedencia del CSV fuente antes de redistribuir datos | — |
| Sector salud (Sapienza→Roche) | «Consultor de datos en el sector salud (2025)»; el nombre del cliente solo con `[CONFIRMAR]` | Cualquier dato del encargo (volúmenes, entregables, hallazgos) |

**Regla de repos**: antes de enlazar cualquier repositorio desde el sitio, auditar que no contenga datos individuales, bases de contactos, soluciones exploratorias no oficiales ni material interno de clientes. Si no está limpio, se nombra sin enlace hasta sanearlo. (Aplica en particular a `lpde-debate-analytics` y `clustering-profile-peruvian-voter`.)

**Regla general**: en la web solo hay dos categorías — publicado/público (se enlaza) y en curso (se nombra sin resultados). No existe «adelanto de resultados».

## 11. Blog: pipeline reproducible y calendario editorial

**Arquitectura híbrida**:
- Posts normales: `.md`/`.mdx` directos en `src/content/blog/`.
- Posts computacionales (con R): `.qmd` en `notebooks/`, renderizados **en local** con `quarto render --to gfm` (con `keep-yaml` para preservar el front matter). **Contrato exacto del pipeline** (`scripts/build-posts.R` o target del Makefile):
  1. Destino: `src/content/blog/AAAA/slug/index.md` **más su carpeta de figuras al lado** (`index_files/figure-commonmark/` u homóloga), con las rutas relativas intactas para que `astro:assets` las procese como imágenes colocalizadas.
  2. El schema de la colección usa `z.coerce.date()` (Quarto emite `date` como string) e `image()` para la miniatura relativa.
  3. La ruta pública `/blog/aaaa/slug/` sale de `src/pages/blog/[...slug].astro` usando el id de la entrada.
  4. El script valida el front matter contra el schema **antes** de mover; falla ruidosamente en local, nunca en CI.
- Code-folding: los bloques largos van envueltos en `<details><summary>Ver código</summary>` dentro del propio `.qmd` (sobrevive a gfm), o un plugin rehype que lo haga por clase. Citas: citeproc corre en el render (`bibliography` + `csl`).
- Front matter mínimo: `title`, `description`, `date`, `categories`, `image`, `lang`, `draft`.
- Pie de post: fecha de última actualización, enlace al fuente en GitHub, cómo citarlo.
- Figuras ggplot2 con `R/theme_litoral.R`: paleta de la sección 5, fuentes del sitio, **títulos descriptivo-técnicos** (la variable y el universo, nunca el hallazgo como titular — convención de Luis), notas y fuente al pie, versiones color y escala de grises cuando el post lo pida, ggrepel para etiquetas de scatter.
- Listado con filtro por categoría. RSS válido. Sin comentarios.

**Calendario editorial** (los tres primeros ya tienen el material hecho — cero invención):
1. **La metodología del mapa de portada** — se publica con el lanzamiento, **en ES y EN**.
2. **Cómo consumir la API del BCRP desde R, sin registro** (material en `C:\49_indicadores_bcrp`). Publicar.
3. **Cómo usar bien el padrón ESCALE** (material en `C:\47_padron_colegios_peru`; omitir toda referencia a la base de correos). Borrador o publicado.
4. Backlog: priorizar un matter file de debate con 37 mil mociones (`C:\46_motions`); cómo está hecho este sitio.

## 12. Criterios de aceptación (ejecutar completo en Fase 7)

**Rendimiento** (Lighthouse móvil, 4G simulado, portada + un post):
- [ ] Performance, Accessibility, Best Practices y SEO ≥ 95
- [ ] LCP < 2.0s; CLS = 0; INP < 200ms
- [ ] JS total < 150 KB comprimido; CSS < 60 KB
- [ ] Fuentes vía Fonts API con fallbacks métricos; **panel de red limpio: cero peticiones a terceros en carga, incluidas `*.ytimg.com`/`*.youtube.com` antes del clic**
- [ ] Imágenes AVIF/WebP con dimensiones explícitas

**Accesibilidad** (axe DevTools sin errores + revisión manual):
- [ ] Contraste AA en todo el texto, incluido `tinta-2` sobre `arena-2`
- [ ] Navegación completa por teclado; foco visible en `sol`; orden lógico
- [ ] Un solo `h1` por página; jerarquía sin saltos
- [ ] Mapa con `role="img"`, `aria-label` y enlace a `/datos-del-mapa/`
- [ ] `prefers-reduced-motion` respetado
- [ ] Enlaces con texto significativo

**Funcionalidad**:
- [ ] Todo legible sin JavaScript; portada muestra el SVG estático
- [ ] Conmutador ES/EN lleva a la página equivalente (mapa `routes.ts`); páginas sin espejo llevan a `/en/` con aria-label; `hreflang` recíproco solo entre pares reales
- [ ] Sin enlaces rotos (lychee o linkinator); **ningún enlace `http://`**; sin `[CONFIRMAR]` en el HTML de producción (regla de degradación aplicada)
- [ ] Todas las redirecciones de la tabla de la sección 6 funcionan
- [ ] 404 propia; RSS válido; sitemap.xml con alternates i18n; robots.txt
- [ ] OG + Twitter Card por página con imagen generada en build (sección Fase 5b)
- [ ] JSON-LD `Person` (con `sameAs`: GitHub, LinkedIn, ORCID, Scholar) y `Article` en posts
- [ ] CV descargable en PDF (ES y EN), regenerado desde el YAML (`make cv`), **sin teléfono, dirección, DNI ni fecha de nacimiento**
- [ ] **Auditoría contra la sección 10**: ninguna cifra ni afirmación de los trabajos restringidos aparece en el sitio; repos enlazados auditados

**Conversión** (misión 2):
- [ ] Desde cualquier página se llega a un medio de contacto en ≤2 clics
- [ ] Cada servicio publica sus cinco campos (nombre, para quién, formato, entregables, siguiente paso)
- [ ] /servicios/ tiene ≥2 casos reales y solo instituciones confirmadas
- [ ] /debate/ y /medios/ tienen su propio bloque de conversión
- [ ] El correo aparece como texto copiable además del mailto

**Idioma**:
- [ ] Pasada específica de estilo y naturalidad del inglés en todas las páginas `/en/` (y Luis consigue un revisor humano de nivel avanzado antes del merge)

**Diseño** (capturas Playwright a 390, 768, 1280 y 1920px, ES y EN):
- [ ] Sin scroll horizontal
- [ ] `sol` una vez por pantallazo, en algo que importa
- [ ] Frases separadoras presentes y centradas
- [ ] Mapa legible en móvil sin tapar el titular
- [ ] Nada que parezca plantilla o framework

**Repositorio**:
- [ ] `README.md`: instalación, render local (sitio, posts .qmd, CV), despliegue
- [ ] `CLAUDE.md`: convenciones, tokens, estructura, matriz de confidencialidad, convención de cifras, recetas (post normal, post computacional, publicación, CV, color), regla de commits sin trailer
- [ ] Actions en verde desde `main`; CI sin R/Quarto/Typst/Playwright
- [ ] Sin restos del sitio Hugo (archivos ni workflows)
- [ ] Licencias: código MIT, textos CC BY 4.0, datos con fuente citada

## 13. Lo que no se hace

- Fondos oscuros, estética de terminal, monoespaciada como cuerpo.
- Inter, Roboto, Arial, Helvetica, Montserrat, Poppins; serif genérica como display.
- Degradados, manchas difusas, borde izquierdo de color, sombras de colores, glassmorphism, bordes muy redondeados.
- Emoji como iconos; iconos rellenos; ilustraciones abstractas; imágenes generadas por IA.
- Superlativos sobre Luis. Los hechos hablan.
- Testimonios inventados, logos sin permiso, cifras que no salgan de datos.
- Barras de habilidades, contadores animados, líneas de tiempo decorativas.
- Parallax, scroll-jacking, carruseles, cursores custom, partículas, texto que se escribe solo, confeti.
- Foto a pantalla completa como portada: la portada es el mapa.
- Formularios con backend, chatbots, pop-ups, banners de cookies, Google Analytics, botones de compartir.
- Mezclar idiomas en una página.
- Copiar la estructura de joseincio.com o el aspecto de andrewheiss.com.
- Frameworks UI (React/Preact/Svelte/Vue) — ni para el mapa ni para nada.
- **Publicar datos de contacto de terceros, datos individuales de menores, resultados de informes institucionales no publicados, o el venue/estado editorial de manuscritos ajenos.** No es estilo: es ética y contratos.
- Llamar «WSDC» al Mundial de Debate Escolar en Español, atribuir a Luis los cuatro títulos del MED, o inflar cualquier credencial más allá de las formulaciones de la sección 9.4.

## 14. Plan de trabajo por fases

Cada fase cierra con commit, capturas Playwright (escritorio y móvil) y resumen de tres líneas. Parada obligatoria única: Fase 1. Si falta un dato: placeholder en el fuente, regla de degradación, y seguir.

**Fase 0 · Contenido y confirmaciones (sin código nuevo).**
(a) Seeds de datos desde la sección 9: `publications.yaml`, `media.yaml`, `cv.yaml` (base: CV oct-2026; sin teléfono/dirección/DNI/nacimiento), `projects.yaml` (seed), con `source:` por entrada.
(b) Toolchain local: Node 22+, R 4.5 (`"C:\Program Files\R\R-4.5.1\bin\Rscript.exe"` — Rscript no está en PATH), Quarto, Typst, `npx playwright install chromium`, lychee o linkinator, paquetes R (tidyverse, sf, jsonlite).
(c) Auditar el despliegue del Hugo actual: workflow, source de Pages, estado del último deploy.
(d) Verificar la atribución literal de Luis en los créditos del PDF del volumen de clínicas (9.3b).
(e) UNA lista de preguntas a Luis (máx. 10): dominio propio; fotos + CV definitivo; URL del informe JNE; EnConsulta (enlace o se omite); instituciones nombrables (Roche/Sapienza, CAL) + 2-3 casos + gestionar 1-2 testimonios con contactos seguros; WhatsApp para servicios (sí/no + número) y Calendly; confirmaciones de debate (WUDC RD, Round Robin, ejes del coaching, programa LPDE, resultados de equipos propios, archivos de talleres); formatos y proceso de cada servicio (tiempos de respuesta, recibos/factura); año del concurso FF.CC.SS.; **crear ORCID y perfil de Google Scholar esta semana** (tarea de Luis, ~1 hora: son las dos credenciales que un comité busca primero y deben existir al lanzar).
(f) Limpieza del Hugo vivo (borrar `my-first-blog`, `experience-a`, `project-a`): SOLO si la auditoría (c) confirma un pipeline automático verificable; si el deploy es opaco, va al backlog — el sitio nuevo lo reemplaza todo en semanas.

**Fase 1 · Style tile (PARADA OBLIGATORIA).** `design/style-tile.html`: paleta con nombres y hex; las tres familias con muestras reales (probar el titular propuesto y 1-2 variantes); botón relleno y de borde; tarjeta de proyecto con hover; frase separadora; fragmento de tabla de publicaciones; boceto estático del mapa con ~200 puntos en la silueta aproximada del Perú. Captura y stop.

**Fase 2 · Andamiaje Astro.** La rama `astro` arranca **eliminando todo lo Hugo** (config, themes, content, layouts, archetypes, i18n, data, y su workflow), conservando PROMPT.md, `.git` y `static/images/` movido a `src/assets/legacy/`. Scaffold de Astro en dir temporal y copia a la raíz si el CLI no acepta directorio no vacío. Configurar: i18n (snippet de la sección 4), Fonts API, `@astrojs/sitemap` con i18n, tokens CSS, layout base (barra, pie, conmutador con `routes.ts`), **las 19 redirecciones + 404 + prueba temprana de que i18n y redirects conviven** (plan B: meta-refresh manual bajo `src/pages/es/`), workflow de Actions (deploy solo desde `main`). Página de prueba tipográfica en ambos idiomas.

**Fase 3 · Datos y visualización.** `R/01_hero_data.R`; genera `hero.json`, `hero_meta.json`, `hero-static.svg` y la tabla de `/datos-del-mapa/`. `src/scripts/hero.js` probado en página aislada con el patrón de traspaso (aspect-ratio + crossfade). Reporta: conteo de distritos, excluidos sin cruce, peso del JSON y del bundle D3. El estado de inversión puede quedar pendiente sin bloquear.

**Fase 4 · Portada.** Siete actos en ES y EN con su jerarquía por idioma; integración del mapa; scroll reveal, barra fija, hovers. Capturas a 390/768/1280/1920 en ambos idiomas.

**Fase 5a · Páginas de contenido denso.** /investigacion/ (+ /en/research/), /proyectos/ + 7 fichas (+ EN; migrar el seed a la colección), /debate/ (+ EN, con bloque de conversión), /servicios/ (+ /en/consulting/). Bloqueante de /servicios/: ≥2 casos reales.
**Fase 5b · Resto.** /medios/, /cv/ + PDFs Typst (`make cv`), /contacto/, /datos-del-mapa/, y **las imágenes OG**: endpoint estático con satori + `@resvg/resvg-js` (o astro-og-canvas), con instancias TTF estáticas de Fraunces SemiBold y Plex Sans committeadas en `src/assets/og-fonts/` (satori no come woff2 variable).

**Fase 6 · Blog.** Colección con el contrato de la sección 11, listado, plantilla con pie de cita, `theme_litoral.R`, pipeline `.qmd`→gfm de punta a punta. Publica el post 1 (metodología del mapa) **en ES y EN** y el post 2 (BCRP); el 3 (ESCALE) al menos como borrador.

**Fase 7 · Calidad.** Checklist completa de la sección 12 (incluye auditoría de confidencialidad, auditoría de repos, pasada de inglés, panel de red, no-http). Corregir todo; listar pendientes.

**Fase 8 · Lanzamiento y entrega.** (1) Cambiar el source de Pages a «GitHub Actions» (vía UI de Luis o `gh api`), con plan de rollback (re-apuntar al source anterior). (2) Merge de `astro` a `main` reemplazando el árbol completo (verificar que no sobreviva ningún archivo ni workflow Hugo). (3) Verificar en vivo: deploy verde, redirecciones, hreflang, RSS. (4) `README.md` + `CLAUDE.md`. (5) Resumen final: URL, Lighthouse, placeholders pendientes, y las tres recetas más frecuentes (nuevo post, nueva publicación, actualizar CV) en comandos concretos.

## 15. Backlog post-lanzamiento

1. Página /docencia/ propia si la actividad docente crece (en v1 vive en /investigacion/ y el CV).
2. /ahora/ — solo si Luis se compromete a actualizarla mensualmente.
3. /medios/ en EN; más posts EN.
4. Ficha de la herramienta de voto informado de Pedregal Grande cuando exista.
5. Posts 4 y 5; migrar a `{targets}` si el pipeline R crece.
6. Cuando el JNE publique el censo de materia electoral y el CAL su informe: añadirlos a «Informes técnicos» con enlace.
7. Dominio propio si Luis lo decide (CNAME + redirecciones).
8. Evaluar subir Medios a la navegación si las apariciones crecen.

---

## Apéndice A · Esquemas de datos (fijos; no inventar campos distintos)

### A.1 `src/data/publications.yaml`
```yaml
- id: tesis-2025
  type: thesis        # thesis | report | column | editorial | wip  (article/chapter: crear solo cuando exista)
  title: ""
  authors:            # [{name: "", role: author|editor|team}]
  year: 2025
  venue: ""           # institución/medio
  url: ""             # omitible
  pdf: ""             # omitible
  lang: es
  status: null        # solo wip: preparacion | enviado | revision | aceptado
  source: cv          # cv | <url de verificación>
  note: ""            # p. ej. "mención sobresaliente"
```

### A.2 `src/data/media.yaml`
```yaml
- date: 2026-07-22
  outlet: ""
  title: ""
  format: prensa      # tv | radio | prensa | panel
  url: ""
  youtube_id: ""      # omitible; si existe, el build descarga y versiona el póster
```

### A.3 `src/data/cv.yaml`
Bilingüe por campo: cada texto visible es `{es: "...", en: "..."}`. Secciones: `perfil`, `formacion[]`, `cargos[]` (con `desde`/`hasta`), `experiencia[]`, `publicaciones` (referencia a A.1 por id), `reconocimientos[]`, `habilidades[]`. Excluye teléfono, dirección, DNI, fecha de nacimiento. `make cv` regenera `public/files/cv-es.pdf` y `cv-en.pdf` con Typst.

### A.4 `src/i18n/routes.ts` — mapa de rutas y slugs
Páginas: las de la tabla de la sección 6. Slugs de fichas (ES ↔ EN):
`brechas-obras ↔ infrastructure-gaps` · `elector-peruano ↔ peruvian-voter` · `analitica-debate-lpde ↔ lpde-debate-analytics` · `voto-joven ↔ young-vote` · `tesis-nino-costero ↔ el-nino-reconstruction` · `padron-escale ↔ escale-registry` · `indicadores-bcrp ↔ bcrp-indicators`.
El conmutador y los hreflang se generan SOLO desde este mapa.

### A.5 `projects.yaml` (seed de Fase 0, se migra a la colección en Fase 5a)
```yaml
- slug_es: ""
  slug_en: ""
  title_es: ""
  title_en: ""
  status: ""          # activo | publicado | cerrado | en-curso
  open_data: false
  repo: ""            # omitible; solo tras auditoría (sección 10)
  site: ""
  image: ""
```
