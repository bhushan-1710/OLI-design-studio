import fs from 'fs';
import path from 'path';

// Clean dev routes from production static export
const devDir = path.resolve(process.cwd(), 'out', 'dev');
if (fs.existsSync(devDir)) {
  fs.rmSync(devDir, { recursive: true, force: true });
  console.log('[clean-dev-export] Successfully excluded /dev routes from production export directory (out/dev).');
}
