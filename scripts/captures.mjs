// Capturas de pantalla para el cierre de fase (PROMPT.md §14).
// Hace scroll hasta el final antes de fotografiar, para que las entradas por
// IntersectionObserver estén resueltas en la imagen.
//
//   node scripts/captures.mjs <carpeta> <url> [ancho,alto ...]
//   node scripts/captures.mjs fase4 http://localhost:4321/ 390,844 1280,900

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const [, , folder = 'tmp', url = 'http://localhost:4321/', ...sizes] = process.argv;
const viewports = (sizes.length ? sizes : ['390,844', '768,1024', '1280,900', '1920,1080']).map((s) => {
  const [width, height] = s.split(',').map(Number);
  return { width, height };
});

const slug = new URL(url).pathname.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
const dir = `design/captures/${folder}`;
await mkdir(dir, { recursive: true });

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: vp });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800); // entrada del mapa
  // scroll progresivo para disparar las entradas por sección; sin scroll suave,
  // porque si no la barra pegajosa queda congelada a media página en la captura
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  const file = `${dir}/${slug}-${vp.width}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(`${file}  (${vp.width}×${vp.height})`);
  await page.close();
}
await browser.close();
