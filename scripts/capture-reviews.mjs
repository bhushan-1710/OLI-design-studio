import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const PORT = 3456;
const REVIEW_DIR = path.resolve(process.cwd(), 'review');
if (!fs.existsSync(REVIEW_DIR)) {
  fs.mkdirSync(REVIEW_DIR, { recursive: true });
}

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

class CdpClient {
  constructor(ws) {
    this.ws = ws;
    this.id = 1;
    this.callbacks = new Map();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && this.callbacks.has(data.id)) {
        const { resolve, reject } = this.callbacks.get(data.id);
        this.callbacks.delete(data.id);
        if (data.error) reject(new Error(JSON.stringify(data.error)));
        else resolve(data.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

async function connectCdp() {
  const versionRes = await fetch('http://127.0.0.1:9222/json/version');
  const versionData = await versionRes.json();
  const ws = new WebSocket(versionData.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  return new CdpClient(ws);
}

async function run() {
  console.log('Launching headless Chrome with remote debugging on port 9222...');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--disable-gpu',
    'about:blank',
  ]);

  for (let i = 0; i < 25; i++) {
    try {
      const r = await fetch('http://127.0.0.1:9222/json/version');
      if (r.ok) break;
    } catch (e) {
      await new Promise((res) => setTimeout(res, 200));
    }
  }

  const cdp = await connectCdp();

  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const targets = await (await fetch('http://127.0.0.1:9222/json')).json();
  const pageTarget = targets.find((t) => t.id === targetId);

  const pageWs = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => (pageWs.onopen = resolve));
  const page = new CdpClient(pageWs);

  await page.send('Page.enable');
  await page.send('Runtime.enable');

  const widths = [
    { name: '390', width: 390, height: 844, isMobile: true },
    { name: '1280', width: 1280, height: 800, isMobile: false },
  ];
  const themes = ['light', 'dark'];
  const progressPoints = [0, 0.5, 0.7, 1.0];

  const generatedFiles = [];

  // ==========================================
  // 1. HERO CAPTURES (/)
  // ==========================================
  console.log('\n--- Capturing Hero Screenshots ---');
  for (const w of widths) {
    for (const theme of themes) {
      await page.send('Emulation.setDeviceMetricsOverride', {
        width: w.width,
        height: w.height,
        deviceScaleFactor: 1,
        mobile: w.isMobile,
      });

      const url = `http://127.0.0.1:${PORT}/?theme=${theme}`;
      await page.send('Page.navigate', { url });
      await new Promise((res) => setTimeout(res, 1500)); // allow fonts + intro timeline

      for (const p of progressPoints) {
        await page.send('Runtime.evaluate', {
          expression: `
            (async function() {
              document.documentElement.setAttribute('data-theme', '${theme}');
              const h = window.innerHeight;
              const targetScroll = ${p} * 3 * h;
              window.scrollTo(0, targetScroll);
              await new Promise(r => setTimeout(r, 800));
            })()
          `,
          awaitPromise: true,
        });

        await new Promise((res) => setTimeout(res, 200));

        const screenshot = await page.send('Page.captureScreenshot', { format: 'png' });
        const filename = `hero-${theme}-${w.name}-p${p.toFixed(1)}.png`;
        const filePath = path.join(REVIEW_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
        console.log(`Saved: review/${filename}`);
        generatedFiles.push(`review/${filename}`);
      }
    }
  }

  // ==========================================
  // 2. PROJECT SCRUB CAPTURES (/work/placeholder-project-01)
  // ==========================================
  console.log('\n--- Capturing Project Scrub Screenshots ---');
  for (const w of widths) {
    for (const theme of themes) {
      await page.send('Emulation.setDeviceMetricsOverride', {
        width: w.width,
        height: w.height,
        deviceScaleFactor: 1,
        mobile: w.isMobile,
      });

      const url = `http://127.0.0.1:${PORT}/work/placeholder-project-01/?theme=${theme}`;
      await page.send('Page.navigate', { url });
      await new Promise((res) => setTimeout(res, 1500));

      for (const p of progressPoints) {
        await page.send('Runtime.evaluate', {
          expression: `
            (async function() {
              document.documentElement.setAttribute('data-theme', '${theme}');
              const scrubSection = document.querySelector('[aria-label*="Scroll-scrubbed"]') || document.querySelector('#sketch-scrub');
              const scrubTop = scrubSection ? scrubSection.offsetTop : 300;
              const h = window.innerHeight;
              const targetScroll = scrubTop + ${p} * (1.5 * h);
              window.scrollTo(0, targetScroll);
              await new Promise(r => setTimeout(r, 800));
            })()
          `,
          awaitPromise: true,
        });

        await new Promise((res) => setTimeout(res, 200));

        const screenshot = await page.send('Page.captureScreenshot', { format: 'png' });
        const filename = `project-${theme}-${w.name}-p${p.toFixed(1)}.png`;
        const filePath = path.join(REVIEW_DIR, filename);
        fs.writeFileSync(filePath, Buffer.from(screenshot.data, 'base64'));
        console.log(`Saved: review/${filename}`);
        generatedFiles.push(`review/${filename}`);
      }
    }
  }

  console.log(`\nSuccessfully captured all ${generatedFiles.length} screenshots to /review/!`);
  chrome.kill();
  process.exit(0);
}

run().catch((err) => {
  console.error('Error capturing review screenshots:', err);
  process.exit(1);
});
