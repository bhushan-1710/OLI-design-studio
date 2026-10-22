import http from 'http';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const PORT = 3456;
const OUT_DIR = path.resolve(process.cwd(), 'out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

const COMPRESSIBLE = new Set([
  'text/html; charset=utf-8',
  'text/css; charset=utf-8',
  'application/javascript; charset=utf-8',
  'application/json; charset=utf-8',
  'image/svg+xml',
  'application/xml',
  'text/plain',
]);

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }

  let filePath = path.join(OUT_DIR, reqPath);
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  const acceptEncoding = req.headers['accept-encoding'] || '';

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isDark = req.url.includes('theme=dark');

    if (contentType === 'text/html; charset=utf-8' && isDark) {
      let html = fs.readFileSync(filePath, 'utf-8');
      html = html.replace('<html lang="en"', '<html lang="en" data-theme="dark"');
      const canGzip = acceptEncoding.includes('gzip');
      const buf = Buffer.from(html, 'utf-8');
      if (canGzip) {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding',
        });
        zlib.gzip(buf, (err, compressed) => {
          res.end(compressed);
        });
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(buf);
      }
      return;
    }

    const canGzip = COMPRESSIBLE.has(contentType) && acceptEncoding.includes('gzip');

    if (canGzip) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
        'Vary': 'Accept-Encoding',
      });
      fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    const notFoundPath = path.join(OUT_DIR, '404.html');
    if (fs.existsSync(notFoundPath)) {
      const canGzip = acceptEncoding.includes('gzip');
      if (canGzip) {
        res.writeHead(404, {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding',
        });
        fs.createReadStream(notFoundPath).pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(notFoundPath).pipe(res);
      }
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`READY on http://127.0.0.1:${PORT}`);
});
