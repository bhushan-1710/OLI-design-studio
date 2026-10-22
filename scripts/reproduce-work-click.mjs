import { chromium } from 'playwright';

async function testFullNavigation() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER LOG ERROR:', msg.text());
      errors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    console.log('BROWSER PAGEERROR:', err.message);
    errors.push(err.message);
  });

  console.log('1. Loading Home page...');
  await page.goto('http://localhost:3456/', { waitUntil: 'networkidle' });

  console.log('2. Navigating Home -> Work...');
  await page.locator('.oli-nav-links a[href="/work/"]').click();
  await page.waitForTimeout(600);
  console.log('   URL:', page.url());

  console.log('3. Navigating Work -> Process...');
  await page.locator('.oli-nav-links a[href="/process/"]').click();
  await page.waitForTimeout(600);
  console.log('   URL:', page.url());

  console.log('4. Navigating Process -> About...');
  await page.locator('.oli-nav-links a[href="/about/"]').click();
  await page.waitForTimeout(600);
  console.log('   URL:', page.url());

  console.log('5. Navigating About -> Contact...');
  await page.locator('.oli-nav-links a[href="/contact/"]').click();
  await page.waitForTimeout(600);
  console.log('   URL:', page.url());

  console.log('6. Navigating Contact -> Home (via logo)...');
  await page.locator('a.oli-logo').click();
  await page.waitForTimeout(600);
  console.log('   URL:', page.url());

  console.log('7. Navigating Home -> Work again...');
  await page.locator('.oli-nav-links a[href="/work/"]').click();
  await page.waitForTimeout(600);
  console.log('   URL:', page.url());

  const hasAppError = await page.evaluate(() => {
    return document.body.innerText.includes('Application error: a client-side exception has occurred');
  });

  console.log('Has "Application error":', hasAppError);
  console.log('Total console/page errors:', errors.length);

  await browser.close();

  if (hasAppError || errors.length > 0) {
    throw new Error('Navigation test failed with errors!');
  }

  console.log('🎉 ALL CLIENT-SIDE ROUTE TRANSITIONS PASSED FLAWLESSLY WITH 0 ERRORS!');
}

testFullNavigation().catch((err) => {
  console.error(err);
  process.exit(1);
});
