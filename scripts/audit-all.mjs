import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const PORT = 3456;
const reportsDir = path.resolve(process.cwd(), 'scripts/lighthouse-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const routes = [
  { name: 'Home (/) [Light]', path: '/', slug: 'home' },
  { name: 'Work (/work) [Light]', path: '/work', slug: 'work' },
  { name: 'Project (/work/placeholder-project-01) [Light]', path: '/work/placeholder-project-01', slug: 'project' },
  { name: 'Contact (/contact) [Light]', path: '/contact', slug: 'contact' },
  { name: 'About (/about) [Light]', path: '/about', slug: 'about' },
  { name: 'Process (/process) [Light]', path: '/process', slug: 'process' },
  { name: '404 (/404.html) [Light]', path: '/404.html', slug: '404' },
  { name: 'Home Dark (/?theme=dark)', path: '/?theme=dark', slug: 'home-dark' },
  { name: 'Contact Dark (/contact?theme=dark)', path: '/contact?theme=dark', slug: 'contact-dark' },
];

const results = [];

for (const r of routes) {
  const jsonPath = path.join(reportsDir, `${r.slug}.json`);
  const targetUrl = `http://127.0.0.1:${PORT}${r.path}`;

  console.log(`\n========================================`);
  console.log(`[AUDIT] Running Lighthouse Mobile on ${r.name}`);
  console.log(`========================================`);

  const cmd = `cmd /c npx --yes lighthouse "${targetUrl}" --output=json --output-path="${jsonPath}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile --only-categories=performance,accessibility,best-practices,seo --quiet`;

  try {
    execSync(cmd, { stdio: 'inherit' });
    const report = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const cats = report.categories;
    const audits = report.audits;

    const a11yFailures = [];
    if (cats.accessibility?.auditRefs) {
      for (const ref of cats.accessibility.auditRefs) {
        const audit = audits[ref.id];
        if (audit && audit.score !== null && audit.score < 1) {
          a11yFailures.push({
            id: ref.id,
            title: audit.title,
            score: audit.score,
            description: audit.description,
            items: audit.details?.items?.map((it) => it.node?.snippet || it.node?.nodeLabel).filter(Boolean) || [],
          });
        }
      }
    }

    results.push({
      route: r.name,
      path: r.path,
      scores: {
        performance: Math.round(cats.performance.score * 100),
        accessibility: Math.round(cats.accessibility.score * 100),
        bestPractices: Math.round(cats['best-practices'].score * 100),
        seo: Math.round(cats.seo.score * 100),
      },
      metrics: {
        fcp: audits['first-contentful-paint']?.displayValue,
        lcp: audits['largest-contentful-paint']?.displayValue,
        cls: audits['cumulative-layout-shift']?.displayValue,
        tbt: audits['total-blocking-time']?.displayValue,
        speedIndex: audits['speed-index']?.displayValue,
      },
      a11yFailures,
    });
  } catch (err) {
    console.error(`Failed to audit ${r.name}:`, err.message);
    results.push({
      route: r.name,
      error: err.message,
    });
  }
}

const summaryPath = path.join(reportsDir, 'summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2), 'utf-8');

console.log('\n\n========================================');
console.log('SUMMARY OF LIGHTHOUSE MOBILE RESULTS');
console.log('========================================');
for (const res of results) {
  if (res.error) {
    console.log(`\n${res.route}: ERROR (${res.error})`);
    continue;
  }
  console.log(`\nRoute: ${res.route}`);
  console.log(`  Performance:    ${res.scores.performance} / 100 (target >= 85)`);
  console.log(`  Accessibility:  ${res.scores.accessibility} / 100 (target >= 95)`);
  console.log(`  Best Practices: ${res.scores.bestPractices} / 100`);
  console.log(`  SEO:            ${res.scores.seo} / 100 (target >= 95)`);
  console.log(`  LCP: ${res.metrics.lcp} | CLS: ${res.metrics.cls} | TBT: ${res.metrics.tbt}`);
  if (res.a11yFailures.length > 0) {
    console.log(`  A11y (Axe) Issues:`);
    for (const f of res.a11yFailures) {
      console.log(`    - [${f.id}] ${f.title}`);
      if (f.items?.length) {
        console.log(`      Snippet: ${f.items.slice(0, 2).join(' | ')}`);
      }
    }
  } else {
    console.log(`  A11y (Axe): 0 issues detected!`);
  }
}
