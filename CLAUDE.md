# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Serve locally with live reload
hugo server

# Build for production (output goes to public/)
hugo

# Build with drafts visible
hugo server -D
```

Hugo Extended v0.92.0+ is required.

## Architecture

This is a **Hugo static site** using the `hugo-noir` theme (in `themes/hugo-noir/`). The site is bilingual (English/Spanish) with content mirrored across two language trees.

### Content vs. Data split

Most sections are **data-driven**, not content-driven. The actual page text lives in `data/<lang>/*.toml` files, not in `content/`. The `content/` files are mostly stubs that just set layout and title.

| Data file | What it populates |
|-----------|------------------|
| `data/en/experience.toml` / `data/es/experience.toml` | Experience section |
| `data/en/education.toml` / `data/es/education.toml` | Education section |
| `data/en/projects.toml` / `data/es/projects.toml` | Projects section |
| `data/en/research.toml` / `data/es/research.toml` | Research section |
| `data/en/media.toml` / `data/es/media.toml` | Media section |
| `data/en/tech.toml` / `data/es/tech.toml` | Tech stack carousel on homepage |
| `data/en/author.toml` / `data/es/author.toml` | Author bio |

**When adding or editing content** (experience, projects, etc.), edit the corresponding `.toml` in `data/en/` and `data/es/`.

### Layouts

Custom layouts that override theme defaults live in `layouts/`. The theme's layouts are in `themes/hugo-noir/layouts/` — to override a theme template, copy it to `layouts/` at the same relative path.

### Static assets

Images go in `static/images/`. Profile image is `static/images/profile.jpeg`. Project images are referenced as `/images/projects/<file>.jpg` in the data files.

### Site config

`hugo.toml` at the root controls: base URL, languages, menu items (both EN/ES), and `[params]` for name, location, description, social links. Menu items must be updated in both `[languages.en.menu.main]` and `[languages.es.menu.main]` blocks.

### Deployment

The site deploys to GitHub Pages at `https://luiseduardovalverderamos.github.io/mypage/` (set as `baseURL` in `hugo.toml`). The built output is in `public/`.
