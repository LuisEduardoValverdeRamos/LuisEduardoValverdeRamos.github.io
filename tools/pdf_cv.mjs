// Prints the CV PDFs (static/files/cv-en.pdf and cv-es.pdf) from the /cv/ page.
//
// It builds the site in production mode into a temporary folder, so the
// address in the contact line is the real one (a preview server would print
// localhost), serves that folder on a free port, opens the folded tails of
// the CV and prints A4 with the page's own print styles (assets/css/main.css).
//
// Run from the repository root, after any change to the data the CV reads
// (experience, education, author, blogs, research, debate, skills):
//
//   npm i --no-save playwright-core   (once; package.json stays untouched)
//   node tools/pdf_cv.mjs
//
// It uses the Microsoft Edge that ships with Windows; set CHROME_PATH to use
// another Chromium browser.
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = mkdtempSync(join(tmpdir(), 'cv-site-'));
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.png': 'image/png', '.pdf': 'application/pdf',
};

execFileSync('hugo', ['--minify', '--destination', out], {
  cwd: root, stdio: 'inherit', env: { ...process.env, HUGO_ENVIRONMENT: 'production' },
});

const server = createServer((req, res) => {
  let file = join(out, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  try { if (statSync(file).isDirectory()) file = join(file, 'index.html'); } catch {}
  try {
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch(process.env.CHROME_PATH
  ? { executablePath: process.env.CHROME_PATH } : { channel: 'msedge' });
try {
  for (const [lang, path] of [['en', '/cv/'], ['es', '/es/cv/']]) {
    const page = await browser.newPage();
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('details.s-cv-fold').forEach(d => { d.open = true; });
      await document.fonts.ready;
    });
    const pdf = join(root, 'static', 'files', `cv-${lang}.pdf`);
    // Footer on every page: name, «CV» and page number, small and grey
    await page.pdf({
      path: pdf, format: 'A4', preferCSSPageSize: true, printBackground: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#525A54">'
        + 'Luis Valverde Ramos · CV · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
    });
    console.log('wrote', pdf);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
  rmSync(out, { recursive: true, force: true });
}
