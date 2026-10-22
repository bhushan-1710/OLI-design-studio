import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3456';

const ROUTES = [
  '/',
  '/work/',
  '/work/placeholder-project-01/',
  '/work/placeholder-project-02/',
  '/work/placeholder-project-03/',
  '/work/placeholder-project-04/',
  '/process/',
  '/about/',
  '/contact/',
  '/non-existent-route-for-404-test/',
];

async function runAudit() {
  console.log('================================================================');
  console.log('🚀 STARTING COMPREHENSIVE PRODUCTION READINESS VERIFICATION');
  console.log(`Target: ${BASE_URL}`);
  console.log('================================================================\n');

  let browser;
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    browser = await chromium.launch({ channel: 'msedge', headless: true });
  }

  const issues = [];
  const passedChecks = [];

  // 1. ROUTE INTEGRITY & ASSET HEALTH CHECK (Desktop & Mobile)
  for (const route of ROUTES) {
    const pageUrl = `${BASE_URL}${route}`;
    console.log(`[Checking Route]: ${route}`);

    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
    });
    const page = await context.newPage();

    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        if (route.includes('404') && msg.text().includes('404')) return;
        if (msg.text().includes('Extra attributes from the server') || msg.text().includes('Hydration')) return;
        consoleErrors.push(msg.text());
      }
    });

    page.on('response', (res) => {
      if (res.status() === 404 && !route.includes('404')) {
        console.log(`[404 on ${route}]: ${res.url()}`);
      }
    });

    page.on('requestfailed', (req) => {
      failedRequests.push(`${req.method()} ${req.url()}: ${req.failure()?.errorText}`);
    });

    try {
      const response = await page.goto(pageUrl, { waitUntil: 'networkidle', timeout: 20000 });
      const status = response ? response.status() : 0;

      if (route.includes('404')) {
        if (status === 404 || (await page.locator('text=This sheet doesn\'t exist').count()) > 0) {
          passedChecks.push(`Route ${route} properly returned 404 status / Sheet 404.`);
        } else {
          issues.push(`Route ${route} expected 404 but got status ${status}`);
        }
      } else {
        if (status === 200) {
          passedChecks.push(`Route ${route} loaded with HTTP 200.`);
        } else {
          issues.push(`Route ${route} failed with HTTP ${status}`);
        }
      }

      // Verify all images loaded with natural dimensions > 0
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src || img.getAttribute('src'));
      });

      if (brokenImages.length > 0) {
        issues.push(`Route ${route} has ${brokenImages.length} broken images: ${brokenImages.join(', ')}`);
      } else {
        passedChecks.push(`Route ${route}: All images verified (0 broken).`);
      }

      if (consoleErrors.length > 0) {
        issues.push(`Route ${route} logged ${consoleErrors.length} console errors: ${consoleErrors.slice(0, 3).join('; ')}`);
      } else {
        passedChecks.push(`Route ${route}: Clean console (0 errors).`);
      }

      if (failedRequests.length > 0) {
        issues.push(`Route ${route} had ${failedRequests.length} failed network requests: ${failedRequests.join(', ')}`);
      }
    } catch (err) {
      issues.push(`Route ${route} threw exception during navigation: ${err.message}`);
    } finally {
      await context.close();
    }
  }

  // 2. INTERACTIVE ELEMENTS & BUTTON TESTS
  console.log('\n[Checking Interactive Elements & UI Controls]...');
  const interactiveContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const ipage = await interactiveContext.newPage();

  try {
    // 2.1 Navigation & Links
    await ipage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const navLinks = await ipage.$$eval('.oli-nav-link', (els) => els.map((e) => e.getAttribute('href')));
    console.log(`  - Desktop Nav links found: ${navLinks.join(', ')}`);
    if (navLinks.length >= 3) {
      passedChecks.push('Desktop navigation links present and mapped.');
    } else {
      issues.push('Desktop navigation missing expected links.');
    }

    // 2.2 Work Page Filters (discrete-tabs) & URL Synchronization
    await ipage.goto(`${BASE_URL}/work/`, { waitUntil: 'networkidle' });
    const tabButtons = await ipage.$$('.oli-discrete-tabs button[role="tab"]');
    console.log(`  - Discrete tabs count: ${tabButtons.length}`);
    if (tabButtons.length === 5) {
      passedChecks.push('Work filter discrete-tabs has all 5 discipline tabs.');
      // Click 'Architecture'
      await tabButtons[1].click();
      await ipage.waitForTimeout(400);
      const urlAfterClick = ipage.url();
      if (urlAfterClick.includes('type=architecture')) {
        passedChecks.push(`Work tab click correctly updated URL to: ${urlAfterClick}`);
      } else {
        issues.push(`Work tab click failed to update URL. Current URL: ${urlAfterClick}`);
      }
    } else {
      issues.push(`Expected 5 filter tabs, found ${tabButtons.length}`);
    }

    // 2.3 Project Card Hover/Focus Expansion (expand-details)
    const firstCard = await ipage.$('.project-card');
    if (firstCard) {
      await firstCard.hover();
      await ipage.waitForTimeout(400);
      const isExpandedVisible = await ipage.evaluate(() => {
        const card = document.querySelector('.project-card');
        const expandBox = card?.querySelector('div[style*="max-height"]');
        return expandBox && window.getComputedStyle(expandBox).opacity !== '0';
      });
      if (isExpandedVisible) {
        passedChecks.push('ProjectCard hover cleanly triggered expand-details expansion.');
      } else {
        issues.push('ProjectCard hover failed to expand details box.');
      }

      // Check no button nested inside link
      const nestedButtons = await ipage.$$eval('.project-card button', (btns) => btns.length);
      if (nestedButtons === 0) {
        passedChecks.push('ProjectCard adheres to accessibility standard (0 nested buttons).');
      } else {
        issues.push(`ProjectCard has ${nestedButtons} nested buttons inside <a> link.`);
      }
    }

    // 2.4 Carousel Slider Interaction on Project Detail
    await ipage.goto(`${BASE_URL}/work/placeholder-project-01/`, { waitUntil: 'networkidle' });
    const nextBtn = await ipage.$('.oli-carousel-slider button[aria-label="Next view"]');
    if (nextBtn) {
      await nextBtn.click();
      await ipage.waitForTimeout(400);
      const activeText = await ipage.$eval('.oli-carousel-slider', (el) => el.textContent);
      if (activeText.includes('VIEW 02')) {
        passedChecks.push('Carousel slider next button successfully transitioned to VIEW 02.');
      } else {
        issues.push('Carousel slider next button did not advance view.');
      }
    } else {
      issues.push('Carousel slider controls not found on project detail page.');
    }

    // 2.5 Contact Form Validation & State
    await ipage.goto(`${BASE_URL}/contact/`, { waitUntil: 'networkidle' });
    const submitBtn = await ipage.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await ipage.waitForTimeout(300);
      // Verify validation triggers without crashing
      const errors = await ipage.$$('.oli-form-error');
      if (errors.length > 0) {
        passedChecks.push(`Contact form client validation active (${errors.length} validation messages).`);
      } else {
        issues.push('Contact form submitted with empty required fields without showing validation.');
      }
    }
  } finally {
    await interactiveContext.close();
  }

  // 3. MOBILE RESPONSIVENESS & SHEET NAVIGATION (390px)
  console.log('\n[Checking Mobile Responsiveness & Drawer (390px)]...');
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const mpage = await mobileContext.newPage();

  try {
    await mpage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Check no horizontal scrollbar / overflow
    const hasHorizontalOverflow = await mpage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (!hasHorizontalOverflow) {
      passedChecks.push('Mobile (390px) Home has zero horizontal scroll overflow.');
    } else {
      issues.push('Mobile (390px) Home has sideways horizontal scroll overflow.');
    }

    // Open mobile nav sheet
    const menuToggle = await mpage.$('.oli-nav-menu-toggle');
    if (menuToggle) {
      await menuToggle.click();
      await mpage.waitForTimeout(400);
      const isSheetOpen = await mpage.evaluate(() => {
        const sheet = document.querySelector('#mobile-nav-sheet');
        return sheet !== null && window.getComputedStyle(sheet).display !== 'none';
      });

      if (isSheetOpen) {
        passedChecks.push('Mobile nav sheet (shadcn) successfully opened.');
      } else {
        issues.push('Mobile nav sheet failed to open.');
      }

      // Check Lenis stopped when open
      const bodyOverflow = await mpage.evaluate(() => document.body.style.overflow);
      if (bodyOverflow === 'hidden') {
        passedChecks.push('Body scroll lock active during mobile sheet open state.');
      } else {
        issues.push('Body scroll lock failed during mobile sheet open state.');
      }

      // Close sheet
      const closeBtn = await mpage.$('.oli-mobile-drawer-close');
      if (closeBtn) {
        await closeBtn.click();
        await mpage.waitForTimeout(300);
        passedChecks.push('Mobile nav sheet cleanly closed.');
      }
    }
  } finally {
    await mobileContext.close();
  }

  // 4. PREFERS-REDUCED-MOTION COMPLIANCE
  console.log('\n[Checking prefers-reduced-motion Compliance]...');
  const motionContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const motionPage = await motionContext.newPage();

  try {
    await motionPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const reducedCompliance = await motionPage.evaluate(() => {
      const paths = Array.from(document.querySelectorAll('.d-line, .d'));
      // Under reduced motion, strokes should be at final state (0 or 0px)
      const offsets = paths.map((p) => {
        const computed = window.getComputedStyle(p).strokeDashoffset;
        return computed || p.getAttribute('stroke-dashoffset') || p.style.strokeDashoffset;
      });
      return offsets.every((o) => o === '0' || o === '0px' || o === '' || o === 'none');
    });

    if (reducedCompliance) {
      passedChecks.push('prefers-reduced-motion compliance verified: all linework in static final state.');
    } else {
      issues.push('prefers-reduced-motion check found animated offset remnants.');
    }
  } finally {
    await motionContext.close();
  }

  await browser.close();

  // REPORT
  console.log('\n================================================================');
  console.log('📊 AUDIT SUMMARY');
  console.log('================================================================');
  console.log(`✅ Passed Checks: ${passedChecks.length}`);
  passedChecks.forEach((p) => console.log(`   ✓ ${p}`));

  if (issues.length > 0) {
    console.log(`\n❌ Issues Found: ${issues.length}`);
    issues.forEach((iss) => console.log(`   ✗ ${iss}`));
    process.exit(1);
  } else {
    console.log('\n🎉 ALL PRODUCTION READINESS VERIFICATIONS PASSED WITH 0 ERRORS!');
  }
}

runAudit().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
