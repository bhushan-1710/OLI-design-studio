import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outPath = path.resolve(outDir, 'og.png');
const tmpHtmlPath = path.resolve(process.cwd(), 'scripts/tmp-og.html');

// We use the exact SVG from HeroElevation on the #F2EEE4 paper background
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background-color: #F2EEE4;
      position: relative;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .sheet-frame {
      position: absolute;
      inset: 12px;
      border: 1.5px solid #2B2926;
      pointer-events: none;
    }
    .drawing-container {
      position: absolute;
      inset: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      width: 100%;
      height: 100%;
    }
    .cl { stroke: #2B2926; stroke-width: 0.5px; opacity: 0.35; fill: none; }
    .s1 { stroke: #2B2926; stroke-width: 2px; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .s2 { stroke: #2B2926; stroke-width: 1px; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    .dim { stroke: #2B2926; stroke-width: 0.8px; opacity: 0.65; fill: none; }
    .note { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; letter-spacing: 0.12em; fill: #2B2926; opacity: 0.75; }
    .stamp rect { stroke: #C8412B; stroke-width: 2px; fill: none; }
    .stamp text { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 18px; font-weight: bold; letter-spacing: 0.2em; fill: #C8412B; }
  </style>
</head>
<body>
  <div class="sheet-frame"></div>
  <div class="drawing-container">
    <svg viewBox="0 0 1200 640" preserveAspectRatio="xMidYMid meet">
      <!-- Marker Washes -->
      <g id="washes" opacity="0.88">
        <rect x="40" y="520" width="1120" height="10" fill="#bdb4a1" />
        <rect x="220" y="340" width="540" height="180" fill="#d8c8aa" />
        <rect x="330" y="210" width="650" height="130" fill="#cdc6b8" />
        <rect x="310" y="196" width="690" height="14" fill="#4a4743" />
        <rect x="380" y="240" width="360" height="70" fill="#9db6ba" />
        <rect x="790" y="240" width="150" height="70" fill="#9db6ba" />
        <rect x="420" y="380" width="280" height="140" fill="#9db6ba" />
        <rect x="300" y="410" width="70" height="110" fill="#8a5a3c" />
        <rect x="956" y="340" width="8" height="180" fill="#8d877c" />
        <rect x="116" y="430" width="8" height="90" fill="#6b5238" />
        <path d="M120 432C70 424 56 366 98 344C88 300 150 282 172 322C216 330 208 396 162 418C152 436 132 440 120 432Z" fill="#8fa27a" />
        <path d="M1100 520q8-34 26-34q18 0 26 34Z M1135 520q8-26 22-26q14 0 20 26Z" fill="#7c9168" />
      </g>

      <!-- Ink Linework -->
      <g class="ink">
        <!-- Construction Lines (.cl) -->
        <path class="cl" d="M40 520H1160" />
        <path class="cl" d="M120 196H1100" />
        <path class="cl" d="M120 340H1000" />
        <path class="cl" d="M220 150V570" />
        <path class="cl" d="M330 150V570" />
        <path class="cl" d="M760 300V570" />
        <path class="cl" d="M980 150V570" />

        <!-- Primary Outline (.s1) -->
        <path class="s1" d="M40 520H1160" />
        <path class="s1" d="M220 340V520M220 340H330M760 340V520M330 520H760" />
        <path class="s1" d="M330 340V210H980V340H760" />
        <path class="s1" d="M310 196H1000M310 210H1000M310 196V210M1000 196V210" />
        <path class="s1" d="M960 340V520M968 340V520" />

        <!-- Secondary Detail Linework (.s2) -->
        <path class="s2" d="M380 240H740V310H380ZM470 240V310M560 240V310M650 240V310M790 240H940V310H790Z" />
        <path class="s2" d="M420 380H700V520H420ZM490 380V520M560 380V520M630 380V520M300 410H370V520H300ZM360 470h4" />
        <path class="s2" d="M120 520V430M120 432C70 424 56 366 98 344C88 300 150 282 172 322C216 330 208 396 162 418C152 436 132 440 120 432" />
        <path class="s2" d="M1100 520q8-34 26-34q18 0 26 34M1135 520q8-26 22-26q14 0 20 26" />
        <path class="s2" d="M60 532l-10 14M110 532l-10 14M160 532l-10 14M210 532l-10 14M260 532l-10 14M310 532l-10 14M360 532l-10 14M410 532l-10 14M460 532l-10 14M510 532l-10 14M560 532l-10 14M610 532l-10 14M660 532l-10 14M710 532l-10 14M760 532l-10 14M810 532l-10 14M860 532l-10 14M910 532l-10 14M960 532l-10 14" />

        <!-- Dimension Lines (.dim) -->
        <path class="dim" d="M220 592H980M220 582V602M980 582V602" />
        <path class="dim" d="M1060 210V520M1050 210H1070M1050 520H1070" />
        <path class="dim" d="M790 176C830 170 880 180 912 204M902 190l10 14l-16 2" />

        <!-- Annotations (.note) -->
        <text class="note" x="600" y="578" text-anchor="middle">12.40 M</text>
        <text class="note" transform="translate(1044 370) rotate(-90)" text-anchor="middle">6.20 M</text>
        <text class="note" x="640" y="172">CANTILEVER · 3.0 M</text>
        <text class="note" x="436" y="366">FULL-HEIGHT GLAZING</text>
        <text class="note" x="302" y="402">ENTRY</text>

        <!-- Handed Over Stamp -->
        <g class="stamp" transform="rotate(-3 1015 72)">
          <rect x="890" y="40" width="250" height="64" />
          <text x="1015" y="82" text-anchor="middle">HANDED OVER</text>
        </g>
      </g>
    </svg>
  </div>
</body>
</html>`;

fs.writeFileSync(tmpHtmlPath, html, 'utf-8');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const fileUrl = `file:///${tmpHtmlPath.replace(/\\/g, '/')}`;

console.log(`Generating OG image (1200x630) via Headless Chrome...`);
const cmd = `"${chromePath}" --headless=new --disable-gpu --screenshot="${outPath}" --window-size=1200,630 --hide-scrollbars "${fileUrl}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Successfully generated: ${outPath}`);
} catch (err) {
  console.error('Failed to capture screenshot with Chrome:', err);
} finally {
  if (fs.existsSync(tmpHtmlPath)) {
    fs.unlinkSync(tmpHtmlPath);
  }
}
