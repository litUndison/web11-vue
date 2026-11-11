import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5500;
const DIST = path.join(__dirname, 'dist');

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
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outFull = path.join(__dirname, 'screenshot_fullpage.png');
  
  // Full page screenshot
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,2600',
    `--screenshot=${outFull}`,
    `http://localhost:${PORT}/`
  ];
  
  const edgeProc = spawn(edgePath, args);
  
  edgeProc.on('close', (code) => {
    console.log(`Fullpage screenshot created! Size:`, fs.statSync(outFull).size, 'bytes');
    server.close(() => process.exit(0));
  });

  setTimeout(() => {
    edgeProc.kill();
    server.close(() => process.exit(0));
  }, 10000);
});