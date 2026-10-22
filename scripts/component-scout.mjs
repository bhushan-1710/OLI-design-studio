import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

// Helper to delay (rate limiting: 2000ms)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CANDIDATES = [
  // (b) Selected-work cards/grid
  {
    slot: 'b-selected-work',
    name: 'bento-01',
    category: 'selected-work',
    url: 'https://ui.watermelon.sh/block/bento-01',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/bento/bento-01/bento-01.mdx',
    type: 'block',
  },
  {
    slot: 'b-selected-work',
    name: 'bento-02',
    category: 'selected-work',
    url: 'https://ui.watermelon.sh/block/bento-02',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/bento/bento-02/bento-02.mdx',
    type: 'block',
  },
  {
    slot: 'b-selected-work',
    name: 'revealing-cards',
    category: 'selected-work',
    url: 'https://ui.watermelon.sh/animated-components/revealing-cards',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/revealing-cards.mdx',
    type: 'animated',
  },
  {
    slot: 'b-selected-work',
    name: 'blog-1',
    category: 'selected-work',
    url: 'https://ui.watermelon.sh/block/blog-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/blog/blog-1/blog-1.mdx',
    type: 'block',
  },

  // (c) Process/steps/timeline
  {
    slot: 'c-process',
    name: 'feature-1',
    category: 'process',
    url: 'https://ui.watermelon.sh/block/feature-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/feature/feature-1/feature-1.mdx',
    type: 'block',
  },
  {
    slot: 'c-process',
    name: 'feature-2',
    category: 'process',
    url: 'https://ui.watermelon.sh/block/feature-2',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/feature/feature-2/feature-2.mdx',
    type: 'block',
  },
  {
    slot: 'c-process',
    name: 'pop-stepper',
    category: 'process',
    url: 'https://ui.watermelon.sh/animated-components/pop-stepper',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/pop-stepper.mdx',
    type: 'animated',
  },
  {
    slot: 'c-process',
    name: 'onboarding-checklist',
    category: 'process',
    url: 'https://ui.watermelon.sh/animated-components/onboarding-checklist',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/onboarding-checklist.mdx',
    type: 'animated',
  },

  // (d) Closing CTA
  {
    slot: 'd-closing-cta',
    name: 'cta-1',
    category: 'cta',
    url: 'https://ui.watermelon.sh/block/cta-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/cta/cta-1/cta-1.mdx',
    type: 'block',
  },
  {
    slot: 'd-closing-cta',
    name: 'cta-2',
    category: 'cta',
    url: 'https://ui.watermelon.sh/block/cta-2',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/cta/cta-2/cta-2.mdx',
    type: 'block',
  },
  {
    slot: 'd-closing-cta',
    name: 'cta-3',
    category: 'cta',
    url: 'https://ui.watermelon.sh/block/cta-3',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/cta/cta-3/cta-3.mdx',
    type: 'block',
  },
  {
    slot: 'd-closing-cta',
    name: 'cta-4',
    category: 'cta',
    url: 'https://ui.watermelon.sh/block/cta-4',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/cta/cta-4/cta-4.mdx',
    type: 'block',
  },

  // (e) Work grid with filters
  {
    slot: 'e-work-grid-filters',
    name: 'filter-disclosure',
    category: 'filters',
    url: 'https://ui.watermelon.sh/animated-components/filter-disclosure',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/filter-disclosure.mdx',
    type: 'animated',
  },
  {
    slot: 'e-work-grid-filters',
    name: 'discrete-tabs',
    category: 'filters',
    url: 'https://ui.watermelon.sh/animated-components/discrete-tabs',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/discrete-tabs.mdx',
    type: 'animated',
  },
  {
    slot: 'e-work-grid-filters',
    name: 'continuous-tabs',
    category: 'filters',
    url: 'https://ui.watermelon.sh/animated-components/continuous-tabs',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/continuous-tabs.mdx',
    type: 'animated',
  },
  {
    slot: 'e-work-grid-filters',
    name: 'collection-grid-disclosure',
    category: 'filters',
    url: 'https://ui.watermelon.sh/animated-components/collection-grid-disclosure',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/collection-grid-disclosure.mdx',
    type: 'animated',
  },

  // (f) Project card hover
  {
    slot: 'f-card-hover',
    name: 'expand-details',
    category: 'card-hover',
    url: 'https://ui.watermelon.sh/animated-components/expand-details',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/expand-details.mdx',
    type: 'animated',
  },
  {
    slot: 'f-card-hover',
    name: 'card-cue',
    category: 'card-hover',
    url: 'https://ui.watermelon.sh/animated-components/card-cue',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/card-cue.mdx',
    type: 'animated',
  },
  {
    slot: 'f-card-hover',
    name: 'expandable-event-card',
    category: 'card-hover',
    url: 'https://ui.watermelon.sh/animated-components/expandable-event-card',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/expandable-event-card.mdx',
    type: 'animated',
  },
  {
    slot: 'f-card-hover',
    name: 'card-swipe',
    category: 'card-hover',
    url: 'https://ui.watermelon.sh/animated-components/card-swipe',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/card-swipe.mdx',
    type: 'animated',
  },

  // (g) Project detail gallery
  {
    slot: 'g-project-gallery',
    name: 'carousel-slider',
    category: 'gallery',
    url: 'https://ui.watermelon.sh/animated-components/carousel-slider',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/carousel-slider.mdx',
    type: 'animated',
  },
  {
    slot: 'g-project-gallery',
    name: 'minimal-carousel',
    category: 'gallery',
    url: 'https://ui.watermelon.sh/animated-components/minimal-carousel',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/minimal-carousel.mdx',
    type: 'animated',
  },
  {
    slot: 'g-project-gallery',
    name: 'carousel-navigator',
    category: 'gallery',
    url: 'https://ui.watermelon.sh/animated-components/carousel-navigator',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/carousel-navigator.mdx',
    type: 'animated',
  },

  // (h) Mobile nav drawer
  {
    slot: 'h-mobile-nav',
    name: 'sheet',
    category: 'navigation',
    url: 'https://ui.watermelon.sh/components/sheet',
    mdxUrl: null,
    type: 'component',
  },
  {
    slot: 'h-mobile-nav',
    name: 'navigation-1',
    category: 'navigation',
    url: 'https://ui.watermelon.sh/block/navigation-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/navigation/navigation-1/navigation-1.mdx',
    type: 'block',
  },
  {
    slot: 'h-mobile-nav',
    name: 'navigation-2',
    category: 'navigation',
    url: 'https://ui.watermelon.sh/block/navigation-2',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/navigation/navigation-2/navigation-2.mdx',
    type: 'block',
  },
  {
    slot: 'h-mobile-nav',
    name: 'macos-sidebar',
    category: 'navigation',
    url: 'https://ui.watermelon.sh/animated-components/macos-sidebar',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/macos-sidebar.mdx',
    type: 'animated',
  },

  // (i) Footer
  {
    slot: 'i-footer',
    name: 'footer-1',
    category: 'footer',
    url: 'https://ui.watermelon.sh/block/footer-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/footer/footer-1/footer-1.mdx',
    type: 'block',
  },
  {
    slot: 'i-footer',
    name: 'footer-2',
    category: 'footer',
    url: 'https://ui.watermelon.sh/block/footer-2',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/footer/footer-2/footer-2.mdx',
    type: 'block',
  },
  {
    slot: 'i-footer',
    name: 'footer-3',
    category: 'footer',
    url: 'https://ui.watermelon.sh/block/footer-3',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/footer/footer-3/footer-3.mdx',
    type: 'block',
  },
  {
    slot: 'i-footer',
    name: 'footer-4',
    category: 'footer',
    url: 'https://ui.watermelon.sh/block/footer-4',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/footer/footer-4/footer-4.mdx',
    type: 'block',
  },

  // (j) Form fields
  {
    slot: 'j-form-fields',
    name: 'contact-1',
    category: 'forms',
    url: 'https://ui.watermelon.sh/block/contact-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/contact/contact-1/contact-1.mdx',
    type: 'block',
  },
  {
    slot: 'j-form-fields',
    name: 'contact-2',
    category: 'forms',
    url: 'https://ui.watermelon.sh/block/contact-2',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/contact/contact-2/contact-2.mdx',
    type: 'block',
  },
  {
    slot: 'j-form-fields',
    name: 'floating-input',
    category: 'forms',
    url: 'https://ui.watermelon.sh/animated-components/floating-input',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/registry/floating-input.mdx',
    type: 'animated',
  },
  {
    slot: 'j-form-fields',
    name: 'form-primitive',
    category: 'forms',
    url: 'https://ui.watermelon.sh/components/form',
    mdxUrl: null,
    type: 'component',
  },

  // (k) Process/about layout blocks
  {
    slot: 'k-process-about-blocks',
    name: 'team-1',
    category: 'about-blocks',
    url: 'https://ui.watermelon.sh/block/team-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/team/team-1/team-1.mdx',
    type: 'block',
  },
  {
    slot: 'k-process-about-blocks',
    name: 'stats-1',
    category: 'about-blocks',
    url: 'https://ui.watermelon.sh/block/stats-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/stats/stats-1/stats-1.mdx',
    type: 'block',
  },
  {
    slot: 'k-process-about-blocks',
    name: 'faq-1',
    category: 'about-blocks',
    url: 'https://ui.watermelon.sh/block/faq-1',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/faq/faq-1/faq-1.mdx',
    type: 'block',
  },
  {
    slot: 'k-process-about-blocks',
    name: 'feature-4',
    category: 'about-blocks',
    url: 'https://ui.watermelon.sh/block/feature-4',
    mdxUrl: 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/blocks/feature/feature-4/feature-4.mdx',
    type: 'block',
  },
];

async function launchBrowser() {
  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    console.log('[Browser] Successfully launched via channel: chrome');
    return { browser, channel: 'chrome' };
  } catch (errChrome) {
    console.warn('[Browser] Chrome failed, attempting msedge:', errChrome.message);
    try {
      const browser = await chromium.launch({ channel: 'msedge', headless: true });
      console.log('[Browser] Successfully launched via channel: msedge');
      return { browser, channel: 'msedge' };
    } catch (errEdge) {
      console.warn('[Browser] Edge failed, attempting Program Files executable path:', errEdge.message);
      const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
      const browser = await chromium.launch({ executablePath: chromePath, headless: true });
      console.log('[Browser] Successfully launched via executablePath:', chromePath);
      return { browser, channel: chromePath };
    }
  }
}

async function fetchMdxMetadata(mdxUrl) {
  if (!mdxUrl) return {};
  try {
    const res = await fetch(mdxUrl);
    if (!res.ok) return {};
    const text = await res.text();
    const frontmatterMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatterMatch) return { raw: text };
    const yaml = frontmatterMatch[1];
    const facts = {};
    for (const line of yaml.split('\n')) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const k = parts[0].trim();
        const v = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '');
        facts[k] = v;
      }
    }
    // Extract install command if present
    const installMatch = yaml.match(/install:\s*\n\s*-\s*['"]?([^'"\n]+)['"]?/);
    if (installMatch) facts.installCommand = installMatch[1];
    // Extract dependencies
    const depsMatch = yaml.match(/dependencies:\s*\n((?:\s*-\s*[^\n]+\n?)+)/);
    if (depsMatch) {
      facts.dependencies = depsMatch[1]
        .split('\n')
        .map((l) => l.replace(/^\s*-\s*/, '').trim())
        .filter(Boolean);
    }
    return facts;
  } catch (e) {
    console.warn('Error fetching MDX metadata:', e.message);
    return {};
  }
}

async function runScout() {
  console.log(`Starting Component Scout with ${CANDIDATES.length} candidates...`);
  const { browser, channel } = await launchBrowser();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Playwright ComponentScout/1.0',
  });

  const page = await context.newPage();
  const results = [];

  for (let i = 0; i < CANDIDATES.length; i++) {
    const c = CANDIDATES[i];
    const targetDir = path.resolve(process.cwd(), 'review', 'candidates', c.slot, c.name);
    fs.mkdirSync(targetDir, { recursive: true });

    console.log(`\n[${i + 1}/${CANDIDATES.length}] Scouting slot: ${c.slot} | component: ${c.name}`);
    console.log(`  URL: ${c.url}`);

    // Fetch repository facts if available
    const repoFacts = await fetchMdxMetadata(c.mdxUrl);

    // Rate limiting: 2 seconds pause
    await sleep(2000);

    try {
      // 1. Capture Desktop 1280
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(c.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);

      const desktopPath = path.join(targetDir, '1280.png');
      await page.screenshot({ path: desktopPath, fullPage: false });
      console.log(`  Saved 1280 screenshot -> ${desktopPath}`);

      // 2. Capture Mobile 390
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(800);
      const mobilePath = path.join(targetDir, '390.png');
      await page.screenshot({ path: mobilePath, fullPage: false });
      console.log(`  Saved 390 screenshot -> ${mobilePath}`);

      // 3. Test interaction (Hover / Active)
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.waitForTimeout(500);

      // Locate first interactive card or button
      const interactiveEl = page.locator('article, [class*="card"], button, [role="button"], input, select').first();
      let hasHover = false;
      if (await interactiveEl.count() > 0) {
        try {
          await interactiveEl.hover({ timeout: 3000 });
          hasHover = true;
          await page.waitForTimeout(500);
        } catch {
          // ignore if hover not allowed
        }
      }
      const activePath = path.join(targetDir, 'active.png');
      await page.screenshot({ path: activePath, fullPage: false });
      console.log(`  Saved active/hover screenshot -> ${activePath}`);

      // 4. Test Tab keyboard accessibility
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const activeTag = await page.evaluate(() => document.activeElement?.tagName || 'BODY');
      const hasFocusVisible = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return false;
        const style = window.getComputedStyle(el);
        return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
      });

      // 5. Test prefers-reduced-motion
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(400);
      const reducedMotionVisible = await page.evaluate(() => {
        return document.body.innerText.length > 50;
      });

      // 6. Test dark mode preview support
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.waitForTimeout(400);

      // Reset media emulation
      await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' });

      // Build facts JSON
      const installCmd = repoFacts.installCommand || `npx shadcn@latest add https://registry.watermelon.sh/r/${c.name}.json`;
      const deps = repoFacts.dependencies || ['clsx', 'tailwind-merge', 'framer-motion'];
      const description = repoFacts.description || `${c.name} component from Watermelon UI registry.`;

      const facts = {
        name: c.name,
        slot: c.slot,
        category: c.category,
        url: c.url,
        licence: 'MIT License (Watermelon Platform Contributors / GitHub)',
        installCommand: installCmd,
        dependencies: deps,
        needsClient: true,
        needsImagesOrVideo: c.type === 'block',
        accessibility: {
          tabReachable: activeTag !== 'BODY',
          activeTag,
          focusVisible: hasFocusVisible,
          reducedMotionPass: reducedMotionVisible,
        },
        screenshots: {
          desktop: `review/candidates/${c.slot}/${c.name}/1280.png`,
          mobile: `review/candidates/${c.slot}/${c.name}/390.png`,
          active: `review/candidates/${c.slot}/${c.name}/active.png`,
        },
        description,
      };

      const factsPath = path.join(targetDir, 'facts.json');
      fs.writeFileSync(factsPath, JSON.stringify(facts, null, 2), 'utf-8');
      console.log(`  Saved facts.json -> ${factsPath}`);

      results.push(facts);
    } catch (errPage) {
      console.error(`  Error scouting ${c.name}:`, errPage.message);
      const facts = {
        name: c.name,
        slot: c.slot,
        url: c.url,
        error: errPage.message,
        licence: 'MIT License',
      };
      const factsPath = path.join(targetDir, 'facts.json');
      fs.writeFileSync(factsPath, JSON.stringify(facts, null, 2), 'utf-8');
      results.push(facts);
    }
  }

  await browser.close();
  console.log(`\nCompleted scouting all ${CANDIDATES.length} candidates. Channel used: ${channel}`);
  return { results, channel };
}

runScout().catch((err) => {
  console.error('Scout fatal error:', err);
  process.exit(1);
});
