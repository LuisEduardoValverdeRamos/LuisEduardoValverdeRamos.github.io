# luiseduardovalverderamos.github.io

Página personal de **Luis Valverde Ramos** — politólogo (PUCP), métodos mixtos, política electoral y políticas públicas.

🌐 **Live**: https://luiseduardovalverderamos.github.io (EN raíz · ES en `/es/`)

## Stack

- **Hugo** (v0.159.2 extended) + tema [hugo-noir](https://github.com/prxshetty/hugo-noir) como submódulo (no tocado — todo va por overrides del sitio)
- **Tailwind Play CDN** con config inline en `layouts/_default/baseof.html`
- Deploy automático a **GitHub Pages** vía Actions (`.github/workflows/deploy.yml`) en cada push a `main`

## Diseño ("editorial computacional")

- Paleta: marfil `#FAF7F2` · tinta `#1C1917` · burdeos `#8A3033` · teal `#2F5D62`; modo oscuro cálido secundario (light por defecto)
- Tipografía: **Fraunces** (títulos) · **Inter** (cuerpo) · **IBM Plex Mono** (metadatos, fechas, badges)
- Detalles de identidad: red de nodos animada en el hero (`hero-net`), franja de stats, secciones numeradas `01 /`, divisores scatter (`partials/scatter-divider.html`), retrato en card
- Todo el sistema vive en `layouts/_default/baseof.html`; la portada en `layouts/index.html`

## Estructura de contenido

- **Menú (5)**: Inicio · About (incluye Educación) · Experience · Research (`/projects`) · Writing & Media (`/publications`, incluye grid de medios con thumbnails) · Contact
- Datos en `data/{en,es}/*.toml` — bilingüe espejo: **todo cambio en EN debe replicarse en ES**
  - `author.toml`: perfil, roles actuales (`current`), stats del hero, honores, voluntariado
  - `experience.toml` / `projects.toml` / `media.toml` / `blogs.toml` (publicaciones y columnas)
- Prosa en `content/{en,es}/` (about, contact)
- Textos de secciones: `i18n/{en,es}.toml` (overrides del tema)

## Desarrollo

```bash
hugo server --port 1717   # http://localhost:1717/
hugo --minify             # build de producción (lo hace CI)
```

⚠️ Gotcha TOML: no insertar claves sueltas después de una tabla `[x]` o `[[x]]` — quedan absorbidas por ella (ya causó dos bugs: taxonomías fantasma `/true/` y links sociales desaparecidos).

## Estado (agosto 2026)

✅ Rediseño completo, contenido sincronizado con LinkedIn, media con prensa nacional (Exitosa, La República) e internacional (El Salto), repo renombrado a URL raíz, OG tags y favicon.

**Pendiente / ideas**:
- Gráfico interactivo embebido (candidato: hallazgos de voto joven 2026)
- Notas de datos breves durante el año electoral (sección Writing)
- Sección Teaching cuando avance el semestre como Jefe de Práctica
- Dominio propio (opcional)
