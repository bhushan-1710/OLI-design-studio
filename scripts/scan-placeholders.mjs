import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'out');
const STATIC_JS_DIR = path.resolve(OUT_DIR, '_next', 'static');

const HTML_PATTERNS = [
  { label: '[NEEDED', regex: /\[NEEDED/i },
  { label: '[DRAFT', regex: /\[DRAFT/i },
  { label: 'TBC', regex: /\bTBC\b/i },
  { label: 'placeholder', regex: /placeholder/i },
];

const JS_LITERAL_PATTERNS = ['[NEEDED', '[DRAFT'];

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function getAllJsFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllJsFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function scan() {
  if (!fs.existsSync(OUT_DIR)) {
    console.log('[scan-placeholders] Out directory does not exist yet. Skipping scan.');
    return;
  }

  const htmlFiles = getAllHtmlFiles(OUT_DIR);
  const jsFiles = getAllJsFiles(STATIC_JS_DIR);
  const findings = [];

  // 1. Scan exported HTML files
  for (const filePath of htmlFiles) {
    const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, lineIndex) => {
      for (const p of HTML_PATTERNS) {
        if (p.regex.test(line)) {
          const matchIndex = line.search(p.regex);
          const start = Math.max(0, matchIndex - 30);
          const snippet = line.substring(start, start + 80).trim();
          findings.push({
            file: relPath,
            targetType: 'HTML',
            line: lineIndex + 1,
            pattern: p.label,
            snippet,
          });
        }
      }
    });
  }

  // 2. Scan static JS bundles in out/_next/static/**/*.js for literal "[NEEDED" and "[DRAFT"
  for (const filePath of jsFiles) {
    const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf-8');

    for (const pat of JS_LITERAL_PATTERNS) {
      let pos = content.indexOf(pat);
      while (pos !== -1) {
        const start = Math.max(0, pos - 30);
        const snippet = content.substring(start, pos + pat.length + 50).replace(/[\r\n]+/g, ' ').trim();
        findings.push({
          file: relPath,
          targetType: 'JS',
          line: 1,
          pattern: pat,
          snippet,
        });
        pos = content.indexOf(pat, pos + pat.length);
      }
    }
  }

  const isProd = process.env.OLI_PRODUCTION === '1';

  if (findings.length > 0) {
    console.log('\n======================================================');
    console.log(`[scan-placeholders] Found ${findings.length} placeholder match(es) in out/ (HTML & static JS):`);
    console.log('======================================================');

    // Group by file
    const byFile = {};
    for (const f of findings) {
      if (!byFile[f.file]) byFile[f.file] = [];
      byFile[f.file].push(f);
    }

    for (const [file, items] of Object.entries(byFile)) {
      console.log(`\n  File: ${file} [${items[0].targetType}] (${items.length} match(es))`);
      for (const item of items) {
        console.log(`    [${item.pattern}]: "...${item.snippet}..."`);
      }
    }
    console.log('======================================================\n');

    if (isProd) {
      console.error(
        `[scan-placeholders ERROR] Build failed because OLI_PRODUCTION=1 is active and ${findings.length} placeholder marker(s) were found in exported HTML / JS bundles.`
      );
      console.error('All placeholder content must be replaced with real studio assets before production export.\n');
      process.exit(1);
    } else {
      console.warn(
        `[scan-placeholders WARN] Normal build: ${findings.length} placeholder marker(s) detected. Continuing because OLI_PRODUCTION is not set to 1.\n`
      );
    }
  } else {
    console.log('[scan-placeholders] No placeholder markers found in exported HTML or static JS bundles.');
  }
}

scan();
