import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\9f1d092e-f4d5-4cc6-8455-13da6d7d5890';
const targetDir = path.resolve(process.cwd(), 'public/images/projects');
const aboutDir = path.resolve(process.cwd(), 'public/images/about');

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(aboutDir)) fs.mkdirSync(aboutDir, { recursive: true });

const files = fs.readdirSync(brainDir);

const map = [
  { prefix: 'arch_cover_', dest: path.join(targetDir, 'arch-cover.jpg') },
  { prefix: 'arch_scrub_', dest: path.join(targetDir, 'arch-scrub.jpg') },
  { prefix: 'arch_outcome_1_', dest: path.join(targetDir, 'arch-outcome-1.jpg') },
  { prefix: 'arch_outcome_2_', dest: path.join(targetDir, 'arch-outcome-2.jpg') },
  { prefix: 'interior_cover_', dest: path.join(targetDir, 'interior-cover.jpg') },
  { prefix: 'interior_scrub_', dest: path.join(targetDir, 'interior-scrub.jpg') },
  { prefix: 'interior_outcome_1_', dest: path.join(targetDir, 'interior-outcome-1.jpg') },
  { prefix: 'interior_outcome_2_', dest: path.join(targetDir, 'interior-outcome-2.jpg') },
  { prefix: 'landscape_cover_', dest: path.join(targetDir, 'landscape-cover.jpg') },
  { prefix: 'landscape_scrub_', dest: path.join(targetDir, 'landscape-scrub.jpg') },
  { prefix: 'landscape_outcome_1_', dest: path.join(targetDir, 'landscape-outcome-1.jpg') },
  { prefix: 'landscape_outcome_2_', dest: path.join(targetDir, 'landscape-outcome-2.jpg') },
  { prefix: 'product_cover_', dest: path.join(targetDir, 'product-cover.jpg') },
];

for (const item of map) {
  const match = files.find(f => f.startsWith(item.prefix) && f.endsWith('.jpg'));
  if (match) {
    fs.copyFileSync(path.join(brainDir, match), item.dest);
    console.log(`Copied ${match} -> ${path.relative(process.cwd(), item.dest)}`);
  } else {
    console.warn(`Could not find file with prefix ${item.prefix}`);
  }
}
