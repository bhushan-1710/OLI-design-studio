import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const PORT = 3457;
const OUT_DIR = path.resolve(process.cwd(), 'out');
const REVIEW_DIR = path.resolve(process.cwd(), 'review/enrichment');

if (!fs.existsSync(REVIEW_DIR)) {
  fs.mkdirSync(REVIEW_DIR, { recursive: true });
}

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

// Start minimal server
const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(OUT_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) filePath += '.html';
  else if (fs.existsSync(path.join(filePath, 'index.html'))) filePath = path.join(filePath, 'index.html');

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isDark = req.url.includes('theme=dark');

    if (contentType === 'text/html; charset=utf-8') {
      let html = fs.readFileSync(filePath, 'utf-8');
      const themeAttr = isDark ? 'data-theme="dark"' : 'data-theme="light"';
      html = html.replace('<html lang="en"', `<html lang="en" ${themeAttr}`);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(html);
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(PORT, async () => {
  console.log(`Capture server running on http://127.0.0.1:${PORT}`);

  const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const CDP_PORT = 9225;
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${CDP_PORT}`,
    '--hide-scrollbars',
  ]);

  await new Promise(r => setTimeout(r, 1500));

  async function cdp(method, params = {}, wsUrl) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl);
      const id = Math.floor(Math.random() * 100000);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id, method, params }));
      };
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === id) {
          ws.close();
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.onerror = reject;
    });
  }

  try {
    const targetsRes = await fetch(`http://127.0.0.1:${CDP_PORT}/json`);
    const targets = await targetsRes.json();
    const pageTarget = targets.find(t => t.type === 'page');
    const wsUrl = pageTarget.webSocketDebuggerUrl;

    const views = [
      { slug: 'home-work-section', path: '/#work', scrollTo: 1600, name: 'Home Selected Work' },
      { slug: 'work-index', path: '/work/', scrollTo: 0, name: 'Work Index' },
      { slug: 'project-detail', path: '/work/placeholder-project-01/', scrollTo: 1200, name: 'Project Detail Scrub & Outcomes' },
      { slug: 'about-page', path: '/about/', scrollTo: 0, name: 'About Page' },
    ];

    const widths = [1280, 390];
    const themes = ['light', 'dark'];

    for (const v of views) {
      for (const width of widths) {
        for (const theme of themes) {
          const isMobile = width === 390;
          await cdp('Emulation.setDeviceMetricsOverride', {
            width,
            height: isMobile ? 844 : 900,
            deviceScaleFactor: 1,
            mobile: isMobile,
          }, wsUrl);

          await cdp('Emulation.setEmulatedMedia', {
            media: 'screen',
            features: [{ name: 'prefers-color-scheme', value: theme }],
          }, wsUrl);

          const url = `http://127.0.0.1:${PORT}${v.path}${theme === 'dark' ? (v.path.includes('?') ? '&' : '?') + 'theme=dark' : ''}`;
          await cdp('Page.navigate', { url }, wsUrl);
          await new Promise(r => setTimeout(r, 1200));

          await cdp('Runtime.evaluate', {
            expression: `
              localStorage.setItem('oli-theme', '${theme}');
              document.documentElement.setAttribute('data-theme', '${theme}');
              window.dispatchEvent(new Event('storage'));
            `,
          }, wsUrl);
          await new Promise(r => setTimeout(r, 200));

          if (v.scrollTo > 0) {
            await cdp('Runtime.evaluate', {
              expression: `window.scrollTo(0, ${v.scrollTo}); window.dispatchEvent(new Event('scroll'));`,
            }, wsUrl);
            await new Promise(r => setTimeout(r, 600));
          }

          const screenshot = await cdp('Page.captureScreenshot', { format: 'png' }, wsUrl);
          const filename = `${v.slug}-${theme}-${width}.png`;
          const filePath = path.join(REVIEW_DIR, filename);
          fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
          console.log(`Saved screenshot: review/enrichment/${filename}`);
        }
      }
    }
  } catch (err) {
    console.error('Capture error:', err);
  } finally {
    chromeProc.kill();
    server.close();
    process.exit(0);
  }
});
