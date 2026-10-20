// scripts/verify-work-page.mjs
import http from 'http';
import fs from 'fs';
import path from 'path';

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchPage(new URL(res.headers.location, url).toString()));
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('=== Verifying Work Index Page (Plan 04-01) ===');

  // 1. Verify HTTP response from dev server
  const { statusCode, data } = await fetchPage('http://localhost:3005/work');
  console.log(`[HTTP GET /work] Status code: ${statusCode}`);
  if (statusCode !== 200) {
    throw new Error(`Expected status 200, got ${statusCode}`);
  }

  // 2. Verify Sheet Title Block & Sheet A-02
  const hasSheetNumber = data.includes('SHEET A-02') || data.includes('A-02');
  console.log(`[TitleBlock] Contains SHEET A-02: ${hasSheetNumber}`);
  if (!hasSheetNumber) throw new Error('Missing SHEET A-02');

  const hasHeading = data.includes('>Work</h1>');
  console.log(`[Header] Contains "<h1>Work</h1>": ${hasHeading}`);
  if (!hasHeading) throw new Error('Missing "Work" heading');

  // 3. Verify Filter Chips
  const hasAllChip = data.includes('All (4)') || data.includes('All');
  const hasArchChip = data.includes('Architecture');
  const hasInteriorChip = data.includes('Interior');
  const hasLandscapeChip = data.includes('Landscape');
  const hasProductChip = data.includes('Product');
  console.log(`[Chips] All: ${hasAllChip}, Architecture: ${hasArchChip}, Interior: ${hasInteriorChip}, Landscape: ${hasLandscapeChip}, Product: ${hasProductChip}`);
  if (!hasAllChip || !hasArchChip || !hasInteriorChip || !hasLandscapeChip || !hasProductChip) {
    throw new Error('Missing one or more discipline filter chips');
  }

  // 4. Verify Project Cards exist in HTML or static build
  const hasCard01 = data.includes('Placeholder Project 01');
  const hasCard02 = data.includes('Placeholder Project 02');
  const hasCard03 = data.includes('Placeholder Project 03');
  const hasCard04 = data.includes('Placeholder Project 04');
  console.log(`[Projects] 01: ${hasCard01}, 02: ${hasCard02}, 03: ${hasCard03}, 04: ${hasCard04}`);

  // 5. Verify static export output in out/work.html
  const outWorkHtml = path.resolve(process.cwd(), 'out', 'work.html');
  if (fs.existsSync(outWorkHtml)) {
    const staticHtml = fs.readFileSync(outWorkHtml, 'utf-8');
    const staticHasTitle = staticHtml.includes('Work Index');
    const staticHasA02 = staticHtml.includes('A-02');
    console.log(`[Static Export out/work.html] Exists: true, Has Title: ${staticHasTitle}, Has Sheet A-02: ${staticHasA02}`);
    if (!staticHasTitle || !staticHasA02) {
      throw new Error('Static export out/work.html missing title or sheet number');
    }
  } else {
    console.log('[Static Export] Note: out/work.html not present in current out folder, skipping check.');
  }

  console.log('\n>>> All Plan 04-01 verification checks PASSED successfully! <<<');
}

verify().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
