import fs from 'fs';
import path from 'path';
import https from 'https';

const downloads = [
  {
    name: 'studio-drafting.jpg',
    dir: 'public/images/about',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    credit: 'Daniel McCullough (@dmcca)',
    source: 'https://unsplash.com/photos/an-architect-working-on-a-draft-with-a-pencil-and-ruler-503387762',
    licence: 'Unsplash Licence (free for commercial and non-commercial use)'
  },
  {
    name: 'product-scrub.jpg',
    dir: 'public/images/projects',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
    credit: 'Ksenia Chernaya',
    source: 'https://unsplash.com/photos/minimalist-furniture-design',
    licence: 'Unsplash Licence'
  },
  {
    name: 'product-outcome-1.jpg',
    dir: 'public/images/projects',
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80',
    credit: 'Deconovo',
    source: 'https://unsplash.com/photos/wooden-chair-and-minimal-shadows',
    licence: 'Unsplash Licence'
  },
  {
    name: 'product-outcome-2.jpg',
    dir: 'public/images/projects',
    url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1600&q=80',
    credit: 'Spacejoy',
    source: 'https://unsplash.com/photos/minimalist-credenza-wood',
    licence: 'Unsplash Licence'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.resolve(process.cwd(), item.dir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(dest); });
        }).on('error', reject);
      } else if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(dest); });
      } else {
        reject(new Error(`Failed with status ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const item of downloads) {
    console.log(`Downloading ${item.name}...`);
    try {
      const dest = await download(item);
      const stats = fs.statSync(dest);
      console.log(`Saved ${item.name} (${Math.round(stats.size / 1024)} KB)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
}

run();
