# luiseduardovalverderamos.github.io

Página personal de **Luis Valverde Ramos**, politólogo (PUCP): investigación sobre comportamiento electoral, implementación de políticas públicas y comportamiento legislativo en el Perú, e investigación aplicada para instituciones.

En vivo: https://luiseduardovalverderamos.github.io (inglés en la raíz, español en `/es/`).

## Stack

- **Hugo** 0.159.2 extended, sin tema: todas las plantillas están en `layouts/`.
- **Tailwind CSS 4**, compilado por Hugo (`css.TailwindCSS`) desde `assets/css/main.css`, que también guarda la paleta y los estilos del sitio.
- Deploy a **GitHub Pages** con GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`.

## Páginas

Portada · Sobre mí · Investigación · Medios · Debate · CV · Trabajemos (botón). Cada página tiene su plantilla en `layouts/_default/` (la portada en `layouts/index.html`, con un parcial por bloque en `layouts/partials/home/`).

## Contenido

- Casi todo vive en `data/{es,en}/*.toml`, un archivo por tema: `home`, `research`, `projects`, `blogs` (escritos), `debate`, `services` (Trabajemos), `media`, `cv`, `author`.
- La prosa de Sobre mí está en `content/{es,en}/about.md`; los demás `.md` solo traen título, descripción y plantilla.
- Textos de interfaz: `i18n/{es,en}.toml`.
- **Bilingüe espejo**: todo cambio en un idioma se replica en el otro, con la misma estructura de datos.
- **TOML**: las claves sueltas van arriba; debajo de una tabla `[x]` o `[[x]]` quedan dentro de ella.

## CV

El CV se escribe en LaTeX, en `tools/cv/` (`estilo.tex`, `cv-es.tex`, `cv-en.tex`; compila con pdfLaTeX, también en Overleaf).

```bash
python tools/cv/build.py            # PDF de la web, sin referencias
python tools/cv/build.py --privado  # versión con referencias, solo local
```

La versión pública se copia a `static/files/cv-{es,en}.pdf`, deja la miniatura en `assets/images/cv/` y anota páginas y fecha en `data/cvfiles.toml`. Las referencias (`tools/cv/privado/`) no se suben al repositorio: son datos de terceros.

## Desarrollo

```bash
npm ci                    # Tailwind (versión fijada en package-lock.json)
hugo server               # vista previa en http://localhost:1313/
hugo --gc --minify        # build de producción (lo hace el deploy)
```
