// Phase 5 Comprehensive Verification Script
import http from 'http';

async function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3005${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- Verifying Phase 5 Routes & Requirements ---\n');

  // 1. Process Page
  const processRes = await fetchRoute('/process/');
  console.log(`[1] /process/: HTTP ${processRes.status}`);
  if (processRes.status !== 200) throw new Error('Expected 200 for /process/');
  const hasA03 = processRes.body.includes('SHEET A-03');
  const has4Stages = ['01', '02', '03', '04'].every((s) => processRes.body.includes(s));
  const hasProcessNeeded = processRes.body.includes('[NEEDED: Studio process details]');
  console.log(`    - Has Sheet A-03: ${hasA03}`);
  console.log(`    - Has 4 stages (01-04): ${has4Stages}`);
  console.log(`    - Has structured [NEEDED] placeholders: ${hasProcessNeeded}`);
  if (!hasA03 || !has4Stages || !hasProcessNeeded) throw new Error('Failed /process checks');

  // 2. About Page
  const aboutRes = await fetchRoute('/about/');
  console.log(`\n[2] /about/: HTTP ${aboutRes.status}`);
  if (aboutRes.status !== 200) throw new Error('Expected 200 for /about/');
  const hasA04 = aboutRes.body.includes('SHEET A-04');
  const hasPhilosophyNeeded = aboutRes.body.includes('[NEEDED: Studio\'s own words]');
  const hasHandCircle = aboutRes.body.includes('oli-hl');
  const hasTeamCards = aboutRes.body.includes('[NEEDED: Team portrait]');
  console.log(`    - Has Sheet A-04: ${hasA04}`);
  console.log(`    - Has philosophy placeholder: ${hasPhilosophyNeeded}`);
  console.log(`    - Has HandCircle highlight demo: ${hasHandCircle}`);
  console.log(`    - Has team placeholder cards: ${hasTeamCards}`);
  if (!hasA04 || !hasPhilosophyNeeded || !hasHandCircle || !hasTeamCards) throw new Error('Failed /about checks');

  // 3. Contact Page
  const contactRes = await fetchRoute('/contact/');
  console.log(`\n[3] /contact/: HTTP ${contactRes.status}`);
  if (contactRes.status !== 200) throw new Error('Expected 200 for /contact/');
  const hasA05 = contactRes.body.includes('SHEET A-05');
  const hasMailto = contactRes.body.includes('mailto:olidesignstudio06@gmail.com');
  const hasNoPlaceholderAttr = !/<(input|textarea)[^>]+placeholder=/i.test(contactRes.body);
  const hasNoLinkWA = contactRes.body.includes('[NEEDED: WhatsApp number]') && !contactRes.body.includes('wa.me');
  const hasNoLinkPhone = contactRes.body.includes('[NEEDED: Phone number]') && !contactRes.body.includes('href="tel:');
  const hasBotcheck = contactRes.body.includes('name="botcheck"');
  console.log(`    - Has Sheet A-05: ${hasA05}`);
  console.log(`    - Has mailto link: ${hasMailto}`);
  console.log(`    - Zero placeholder attributes: ${hasNoPlaceholderAttr}`);
  console.log(`    - Non-link WhatsApp: ${hasNoLinkWA}`);
  console.log(`    - Non-link Phone: ${hasNoLinkPhone}`);
  console.log(`    - Honeypot botcheck present: ${hasBotcheck}`);
  if (!hasA05 || !hasMailto || !hasNoPlaceholderAttr || !hasNoLinkWA || !hasNoLinkPhone || !hasBotcheck) {
    throw new Error('Failed /contact checks');
  }

  // 4. Custom 404 Sheet
  const notFoundRes = await fetchRoute('/non-existent-sheet-test-404/');
  console.log(`\n[4] Non-existent route: HTTP ${notFoundRes.status}`);
  if (notFoundRes.status !== 404) throw new Error('Expected 404 status code');
  const hasSheet404 = notFoundRes.body.includes('SHEET 404');
  const hasNotFoundCopy = notFoundRes.body.includes('This sheet doesn') && notFoundRes.body.includes('Back to Home');
  console.log(`    - Has SHEET 404 TitleBlock / Header: ${hasSheet404}`);
  console.log(`    - Has content.md copy: ${hasNotFoundCopy}`);
  if (!hasSheet404 || !hasNotFoundCopy) throw new Error('Failed 404 checks');

  console.log('\n=== All Phase 5 script-verifiable checks PASSED ===');
}

run().catch((err) => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
