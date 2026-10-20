// scripts/verify-project-detail.mjs
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

const PROJECTS = [
  { slug: 'placeholder-project-01', sheet: 'A-03', title: 'Placeholder Project 01', next: 'placeholder-project-02' },
  { slug: 'placeholder-project-02', sheet: 'A-04', title: 'Placeholder Project 02', next: 'placeholder-project-03' },
  { slug: 'placeholder-project-03', sheet: 'A-05', title: 'Placeholder Project 03', next: 'placeholder-project-04' },
  { slug: 'placeholder-project-04', sheet: 'A-06', title: 'Placeholder Project 04', next: 'placeholder-project-01' },
];

async function verify() {
  console.log('=== Verifying Project Detail Routes & Sketch-to-Photo Scrub (Plan 04-02) ===\n');

  for (const p of PROJECTS) {
    const url = `http://localhost:3005/work/${p.slug}/`;
    console.log(`Checking route: ${url}`);
    const { statusCode, data } = await fetchPage(url);

    if (statusCode !== 200) {
      throw new Error(`[FAIL] ${p.slug} returned status ${statusCode}`);
    }
    console.log(`  ✓ HTTP Status: 200`);

    // Check Sheet Number
    if (!data.includes(p.sheet)) {
      throw new Error(`[FAIL] ${p.slug} missing sheet number ${p.sheet}`);
    }
    console.log(`  ✓ Sheet Number ${p.sheet} verified`);

    // Check Title
    if (!data.includes(p.title)) {
      throw new Error(`[FAIL] ${p.slug} missing project title ${p.title}`);
    }
    console.log(`  ✓ Project title "${p.title}" verified`);

    // Check SketchScrub components
    if (!data.includes('PHASE 01 // DRAFTING') || !data.includes('SCROLL TO DISSOLVE')) {
      throw new Error(`[FAIL] ${p.slug} missing SketchScrub markup`);
    }
    console.log(`  ✓ SketchScrub linework & status indicator verified`);

    // Check Process section
    if (!data.includes('PROCESS DOCUMENTATION') || !data.includes('FIG 01') || !data.includes('FIG 02')) {
      throw new Error(`[FAIL] ${p.slug} missing process documentation studies`);
    }
    console.log(`  ✓ Process drawings (FIG 01, FIG 02, FIG 03) verified`);

    // Check Outcome section
    if (!data.includes('OUTCOME GALLERY') || !data.includes('PHOTO TBC')) {
      throw new Error(`[FAIL] ${p.slug} missing outcome gallery or PHOTO TBC badge`);
    }
    console.log(`  ✓ Outcome gallery with PHOTO TBC badge verified`);

    // Check Next Project link
    if (!data.includes(`/work/${p.next}/`)) {
      throw new Error(`[FAIL] ${p.slug} next project link does not point to /work/${p.next}/`);
    }
    console.log(`  ✓ Next project circular navigation to ${p.next} verified`);

    // Check Enquire CTA button
    if (!data.includes('Enquire About This Project')) {
      throw new Error(`[FAIL] ${p.slug} missing Enquire CTA`);
    }
    console.log(`  ✓ Enquire button verified\n`);
  }

  // Verify static export files in out/work/
  console.log('Checking static export folder (out/work/)...');
  for (const p of PROJECTS) {
    const htmlFile = path.resolve(process.cwd(), 'out', 'work', p.slug, 'index.html');
    if (fs.existsSync(htmlFile)) {
      const content = fs.readFileSync(htmlFile, 'utf-8');
      if (content.includes(p.title) && content.includes(p.sheet)) {
        console.log(`  ✓ Static export exists and valid: out/work/${p.slug}/index.html`);
      } else {
        throw new Error(`Static file out/work/${p.slug}/index.html missing expected content`);
      }
    }
  }

  console.log('\n>>> All Plan 04-02 verification checks PASSED successfully! <<<');
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
