import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5588;
const DIST = path.join(__dirname, 'dist');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(DIST, 'index.html')).pipe(res);
  }
});

server.listen(PORT, async () => {
  try {
    const shots = [
      { name: 'screenshot_fullpage.png', url: `http://localhost:${PORT}/`, size: '1280,2800' },
      { name: 'screenshot_dashboard.png', url: `http://localhost:${PORT}/#dashboard`, size: '1280,1400' },
      { name: 'screenshot_ecommerce.png', url: `http://localhost:${PORT}/#ecommerce`, size: '1280,1600' },
      { name: 'screenshot_adslot.png', url: `http://localhost:${PORT}/#dashboard`, size: '1280,900' }
    ];

    for (const s of shots) {
      const outPath = path.join(__dirname, s.name);
      await execFileAsync(EDGE, [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        `--window-size=${s.size}`,
        `--screenshot=${outPath}`,
        s.url
      ]);
      console.log(`Saved ${s.name}: ${fs.statSync(outPath).size} bytes`);
    }
  } catch (err) {
    console.error('Snapshot error:', err);
  } finally {
    server.close(() => process.exit(0));
  }
});

