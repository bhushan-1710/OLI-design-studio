import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import http from 'http';

const OUT_DIR = path.resolve(process.cwd(), 'out');
const REVIEW_DIR = path.resolve(process.cwd(), 'review', 'step3');
const PORT = 3590;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);
      if (reqPath.endsWith('/')) {
        reqPath += 'index.html';
      }

      let filePath = path.join(OUT_DIR, reqPath);
      if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
        filePath += '.html';
      } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const isDark = req.url.includes('theme=dark');

        if (contentType === 'text/html; charset=utf-8' && isDark) {
          let html = fs.readFileSync(filePath, 'utf-8');
          html = html.replace('<html lang="en"', '<html lang="en" data-theme="dark"');
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(html);
          return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    server.listen(PORT, () => {
      console.log(`Review server listening on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function capture() {
  if (!fs.existsSync(REVIEW_DIR)) {
    fs.mkdirSync(REVIEW_DIR, { recursive: true });
  }

  const server = await startServer();
  let browser;

  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch (err) {
    console.log('Falling back to msedge...');
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const viewports = [
    { name: '1280', width: 1280, height: 900 },
    { name: '390', width: 390, height: 844 },
  ];

  const themes = ['light', 'dark'];

  const pages = [
    { name: 'home', path: '/' },
    { name: 'work', path: '/work/' },
    { name: 'project-detail', path: '/work/placeholder-project-01/' },
    { name: 'process', path: '/process/' },
    { name: 'about', path: '/about/' },
    { name: 'contact', path: '/contact/' },
  ];

  for (const vp of viewports) {
    for (const theme of themes) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme,
      });
      const page = await context.newPage();

      for (const p of pages) {
        const url = `http://localhost:${PORT}${p.path}${theme === 'dark' ? '?theme=dark' : ''}`;
        console.log(`Capturing ${p.name} at ${vp.name} (${theme})...`);
        await page.goto(url, { waitUntil: 'networkidle' });

        // If dark theme, also set data-theme attribute directly on document
        if (theme === 'dark') {
          await page.evaluate(() => {
            document.documentElement.setAttribute('data-theme', 'dark');
          });
        }

        await page.waitForTimeout(600);

        // Full page screenshot
        const screenshotPath = path.join(
          REVIEW_DIR,
          `${p.name}-${vp.name}-${theme}.png`
        );
        await page.screenshot({ path: screenshotPath, fullPage: false });

        // Page specific interactions
        if (p.name === 'home') {
          // Capture Disciplines section specifically
          const disciplinesSection = await page.$('#disciplines');
          if (disciplinesSection) {
            await disciplinesSection.scrollIntoViewIfNeeded();
            await page.waitForTimeout(600);
            await page.screenshot({
              path: path.join(REVIEW_DIR, `disciplines-section-${vp.name}-${theme}.png`),
            });
          }

          // Capture Closing CTA section specifically
          const closingCta = await page.$('.closing-cta-section');
          if (closingCta) {
            await closingCta.scrollIntoViewIfNeeded();
            await page.waitForTimeout(400);
            await page.screenshot({
              path: path.join(REVIEW_DIR, `closing-cta-${vp.name}-${theme}.png`),
            });
          }
        }

        if (p.name === 'work') {
          // Hover over the first project card to capture expand-details state
          const firstCard = await page.$('.project-card');
          if (firstCard) {
            await firstCard.scrollIntoViewIfNeeded();
            await firstCard.hover();
            await page.waitForTimeout(500);
            await page.screenshot({
              path: path.join(REVIEW_DIR, `work-card-expand-${vp.name}-${theme}.png`),
            });
          }
        }

        if (p.name === 'project-detail') {
          // Scroll to CarouselSlider and capture
          const carousel = await page.$('.oli-carousel-slider');
          if (carousel) {
            await carousel.scrollIntoViewIfNeeded();
            await page.waitForTimeout(500);
            await page.screenshot({
              path: path.join(REVIEW_DIR, `project-carousel-${vp.name}-${theme}.png`),
            });
          }
        }

        // Test mobile navigation sheet on 390
        if (vp.name === '390' && p.name === 'home') {
          const menuToggle = await page.$('.oli-nav-menu-toggle');
          if (menuToggle) {
            await menuToggle.click();
            await page.waitForTimeout(400);
            await page.screenshot({
              path: path.join(REVIEW_DIR, `mobile-nav-sheet-${vp.name}-${theme}.png`),
            });
            // Close menu
            const closeBtn = await page.$('.oli-mobile-drawer-close');
            if (closeBtn) await closeBtn.click();
          }
        }
      }

      await context.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`\nAll Step 3 review screenshots captured into: ${REVIEW_DIR}`);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
