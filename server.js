const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ADMIN_USER = process.env.MDL_ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.MDL_ADMIN_PASS || 'MDL_Atelier_2026!';
const OBSCURE_ADMIN_PATH = '/atelier-mgmt-x9k2.html';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

// Helper to check HTTP Basic Auth
function checkBasicAuth(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }
  const base64Credentials = authHeader.split(' ')[1];
  try {
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const separatorIndex = credentials.indexOf(':');
    if (separatorIndex === -1) return false;
    const user = credentials.substring(0, separatorIndex);
    const pass = credentials.substring(separatorIndex + 1);
    return user === ADMIN_USER && pass === ADMIN_PASS;
  } catch (e) {
    return false;
  }
}

// Helper to send 401 Unauthorized for API
function sendUnauthorizedAPI(res) {
  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm="Maison De Loup Atelier Admin"',
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(JSON.stringify({
    success: false,
    error: '401 Unauthorized: Bu işlem için yönetici oturumu gereklidir.'
  }));
}

// Helper to send 401 Unauthorized for Admin HTML Page
function sendUnauthorizedHTML(res) {
  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm="Maison De Loup Atelier Admin"',
    'Content-Type': 'text/html; charset=utf-8',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(`<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
  <title>401 — Yetkisiz Erişim | Maison De Loup Atelier</title>
  <style>
    body {
      background: #0c0b0a;
      color: #f7f5f0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      text-align: center;
    }
    .box {
      max-width: 440px;
      padding: 40px;
      border: 1px solid rgba(197, 168, 128, 0.3);
      border-radius: 4px;
      background: #141312;
    }
    h1 {
      font-size: 1.4rem;
      color: #c5a880;
      letter-spacing: 0.1em;
      margin-top: 0;
    }
    p {
      color: #a1a1aa;
      font-size: 0.9rem;
      line-height: 1.6;
    }
    a {
      color: #c5a880;
      text-decoration: none;
      display: inline-block;
      margin-top: 16px;
      font-size: 0.85rem;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>YÖNETİCİ GİRİŞİ GEREKLİDİR</h1>
    <p>Bu panel Maison De Loup Atelier yönetim yetkisine sahip kullanıcılar için sınırlandırılmıştır. Lütfen tarayıcı kimlik doğrulama penceresine yetkili bilgilerinizi giriniz.</p>
    <a href="/">← Ana Sayfaya Dön</a>
  </div>
</body>
</html>`);
}

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  const reqPath = decodeURI(urlParts[0]);

  // Security Headers applied to all responses
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  if (process.env.NODE_ENV !== 'production') {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }

  // Helper for JSON response
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(data));
  };

  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  // --- ROBOTS.TXT (Environment-Aware) ---
  if (reqPath === '/robots.txt' && req.method === 'GET') {
    const isProduction = process.env.NODE_ENV === 'production';
    let robotsContent = '';
    if (isProduction) {
      robotsContent = `# Maison De Loup Atelier — Production Robots\nUser-agent: *\nDisallow: ${OBSCURE_ADMIN_PATH}\nDisallow: /api/\nAllow: /\n\nSitemap: https://maisondeloup.com/sitemap.xml\n`;
    } else {
      robotsContent = `# Maison De Loup Atelier — Test / Staging Environment\n# Arama motoru indekslemesi kapalıdır.\nUser-agent: *\nDisallow: /\n`;
    }
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(robotsContent);
    return;
  }

  // --- BLOCK OLD ADMIN URLS ---
  if (reqPath === '/admin.html' || reqPath === '/admin' || reqPath === '/admin/') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  // --- OBSCURED ADMIN PAGE WITH AUTH ---
  if (reqPath === OBSCURE_ADMIN_PATH) {
    if (!checkBasicAuth(req)) {
      return sendUnauthorizedHTML(res);
    }
    const adminFilePath = path.join(__dirname, 'atelier-mgmt-x9k2.html');
    if (!fs.existsSync(adminFilePath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Admin file not found.');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet'
    });
    fs.createReadStream(adminFilePath).pipe(res);
    return;
  }

  // --- API: GET CONTENT (Public read) ---
  if (reqPath === '/api/content' && req.method === 'GET') {
    const contentPath = path.join(__dirname, 'content.json');
    if (fs.existsSync(contentPath)) {
      const data = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
      sendJSON(200, data);
    } else {
      sendJSON(404, { error: 'content.json not found' });
    }
    return;
  }

  // --- API: POST CONTENT (Protected write) ---
  if (reqPath === '/api/content' && req.method === 'POST') {
    if (!checkBasicAuth(req)) {
      return sendUnauthorizedAPI(res);
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const contentPath = path.join(__dirname, 'content.json');
        fs.writeFileSync(contentPath, JSON.stringify(parsed, null, 2), 'utf8');
        sendJSON(200, { success: true, message: 'Content saved successfully.' });
      } catch (err) {
        sendJSON(400, { error: err.message });
      }
    });
    return;
  }

  // --- API: GET PRODUCTS (Public read) ---
  if (reqPath === '/api/products' && req.method === 'GET') {
    const jsonPath = path.join(__dirname, 'products.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      sendJSON(200, data);
    } else {
      sendJSON(200, []);
    }
    return;
  }

  // --- API: POST PRODUCTS (Protected write) ---
  if (reqPath === '/api/products' && req.method === 'POST') {
    if (!checkBasicAuth(req)) {
      return sendUnauthorizedAPI(res);
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const products = JSON.parse(body);
        const jsonPath = path.join(__dirname, 'products.json');
        fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), 'utf8');

        // Also write back to products.js so static file retains it
        const jsContent = `// Maison De Loup Atelier - Product Catalog Data\nconst PRODUCTS_DATA = ${JSON.stringify(products, null, 2)};\n\nconst CATEGORIES_DATA = [\n  { id: "blazers", name: "BLAZERS", nameTr: "BLAZER CEKET", image: "assets/images/cat_blazers.jpg", count: 4, isHero: true },\n  { id: "trousers", name: "TROUSERS", nameTr: "PANTOLON", image: "assets/images/cat_trousers.jpg", count: 2 },\n  { id: "shirts", name: "SHIRTS", nameTr: "GÖMLEK", image: "assets/images/cat_shirts.jpg", count: 2 },\n  { id: "tops", name: "TOPS", nameTr: "TRİKO & ÜST", image: "assets/images/cat_tops.jpg", count: 2 },\n  { id: "dresses", name: "DRESSES", nameTr: "ELBİSE", image: "assets/images/cat_dresses.jpg", count: 2 },\n  { id: "skirts", name: "SKIRTS", nameTr: "ETEK", image: "assets/images/cat_skirts.jpg", count: 2 }\n];\n\nconst CURRENCY_RATES = {\n  TRY: { symbol: "₺", rate: 1, position: "after" },\n  EUR: { symbol: "€", rate: 0.0265, position: "before" },\n  USD: { symbol: "$", rate: 0.0289, position: "before" },\n  GBP: { symbol: "£", rate: 0.0228, position: "before" }\n};\n`;
        fs.writeFileSync(path.join(__dirname, 'products.js'), jsContent, 'utf8');

        sendJSON(200, { success: true, count: products.length });
      } catch (err) {
        sendJSON(400, { error: err.message });
      }
    });
    return;
  }

  // --- API: UPLOAD BASE64 IMAGE (Protected write) ---
  if (reqPath === '/api/upload' && req.method === 'POST') {
    if (!checkBasicAuth(req)) {
      return sendUnauthorizedAPI(res);
    }
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { fileName, base64Data } = JSON.parse(body);
        if (!fileName || !base64Data) {
          return sendJSON(400, { error: 'Missing fileName or base64Data' });
        }
        
        const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(base64Data, 'base64');
        
        const safeName = 'uploaded_' + Date.now() + '_' + fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const uploadDir = path.join(__dirname, 'assets', 'images');
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
        
        const targetPath = path.join(uploadDir, safeName);
        fs.writeFileSync(targetPath, buffer);
        
        const relativeUrl = `assets/images/${safeName}`;
        sendJSON(200, { success: true, url: relativeUrl });
      } catch (err) {
        sendJSON(500, { error: err.message });
      }
    });
    return;
  }

  // --- STATIC FILE SERVER ---
  let filePath = path.join(__dirname, reqPath === '/' ? 'index.html' : reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Maison De Loup Atelier server running at http://localhost:${PORT}`);
  console.log(`- Obscure Admin URL: http://localhost:${PORT}${OBSCURE_ADMIN_PATH}`);
  console.log(`- Security: Basic Auth enabled for Admin & Mutation APIs`);
});
