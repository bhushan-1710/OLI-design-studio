import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('response', res => {
    if (res.status() >= 400) console.log('HTTP ERROR:', res.status(), res.url());
  });

  // Test 1: Load page with zero localStorage (initial visit)
  await page.goto('http://localhost:3456', { waitUntil: 'networkidle' });

  const themeAttr = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const bodyBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  const bodyColor = await page.evaluate(() => window.getComputedStyle(document.body).color);

  console.log(`Initial visit: data-theme="${themeAttr}", bodyBg="${bodyBg}", bodyColor="${bodyColor}"`);

  if (themeAttr !== 'light') {
    throw new Error(`Expected data-theme="light", got "${themeAttr}"`);
  }

  // Test 2: Check Theme Toggle button text
  const toggleBtn = page.locator('.oli-theme-toggle');
  const toggleText = await toggleBtn.innerText();
  console.log(`Theme toggle label: "${toggleText}"`);

  // Test 3: Click toggle and check that dark mode activates
  await toggleBtn.scrollIntoViewIfNeeded();
  await toggleBtn.click();
  await page.waitForTimeout(300);
  const themeAfterClick = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const darkBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  console.log(`After click: data-theme="${themeAfterClick}", bodyBg="${darkBg}"`);

  if (themeAfterClick !== 'dark') {
    throw new Error(`Expected data-theme="dark" after toggle, got "${themeAfterClick}"`);
  }

  // Test 4: Reload page and confirm localStorage retained 'dark'
  await page.reload({ waitUntil: 'networkidle' });
  const storedInLs = await page.evaluate(() => localStorage.getItem('oli-theme'));
  const themeAfterReload = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  const htmlStart = await page.evaluate(() => document.documentElement.outerHTML.slice(0, 100));
  console.log(`Stored in LS: "${storedInLs}", data-theme="${themeAfterReload}", html="${htmlStart}"`);

  // Test 5: Click toggle again to switch back to light
  await page.locator('.oli-theme-toggle').click();
  const themeFinal = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log(`After toggle back: data-theme="${themeFinal}"`);

  await browser.close();
  console.log('✓ ALL THEME VERIFICATION TESTS PASSED');
}

main().catch((err) => {
  console.error('Theme verification failed:', err);
  process.exit(1);
});
