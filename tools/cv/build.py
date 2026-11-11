"""Compila el CV (cv-es.tex y cv-en.tex) y lo publica en la web.

    python tools/cv/build.py            versión pública, sin referencias
    python tools/cv/build.py --privado  versión con referencias, solo local

La versión pública se copia a static/files/cv-<idioma>.pdf; la primera página
se guarda como miniatura en assets/images/cv/cv-<idioma>.png (Hugo solo
publica su versión WebP) y data/cvfiles.toml recibe el número de páginas y la
fecha, que la página /cv/ muestra. La versión privada lleva privado/referencias-<idioma>.tex
y queda en tools/cv/privado/: nunca se copia a la web.

Requiere una distribución de LaTeX con latexmk (TinyTeX basta) y PyMuPDF
(pip install pymupdf).
"""
import datetime
import shutil
import subprocess
import sys
from pathlib import Path

import fitz  # PyMuPDF

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
LANGS = ("es", "en")


def compile_cv(lang, private=False):
    """Compila un idioma y devuelve la ruta del PDF."""
    outdir = HERE / ("privado" if private else "build")
    job = f"cv-{lang}-con-referencias" if private else f"cv-{lang}"
    cmd = ["latexmk", "-pdf", "-interaction=nonstopmode", "-halt-on-error",
           f"-outdir={outdir}", f"-jobname={job}"]
    if private:
        cmd.append(r"-usepretex=\def\conreferencias{}")
    subprocess.run(cmd + [f"cv-{lang}.tex"], cwd=HERE, check=True,
                   stdout=subprocess.DEVNULL)
    return outdir / f"{job}.pdf"


def main():
    private = "--privado" in sys.argv
    if private:
        for lang in LANGS:
            print("privado:", compile_cv(lang, private=True))
        return

    thumbs = ROOT / "assets" / "images" / "cv"
    thumbs.mkdir(parents=True, exist_ok=True)
    today = datetime.date.today().isoformat()
    data = ["# Lo escribe tools/cv/build.py: páginas y fecha de cada PDF del CV.", ""]
    for lang in LANGS:
        pdf = compile_cv(lang)
        shutil.copyfile(pdf, ROOT / "static" / "files" / f"cv-{lang}.pdf")
        doc = fitz.open(pdf)
        doc[0].get_pixmap(dpi=90).save(thumbs / f"cv-{lang}.png")
        data += [f"[{lang}]", f"  pages = {len(doc)}", f'  updated = "{today}"', ""]
        print(f"cv-{lang}.pdf: {len(doc)} páginas")
    (ROOT / "data" / "cvfiles.toml").write_text("\n".join(data), encoding="utf-8")


if __name__ == "__main__":
    main()
