const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  const reqPath = decodeURI(urlParts[0]);

  // Helper for JSON response
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
  };

  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // --- API: GET CONTENT ---
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

  // --- API: POST CONTENT ---
  if (reqPath === '/api/content' && req.method === 'POST') {
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

  // --- API: GET PRODUCTS ---
  if (reqPath === '/api/products' && req.method === 'GET') {
    const jsonPath = path.join(__dirname, 'products.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      sendJSON(200, data);
    } else {
      // Return products from products.js regex/eval or default
      sendJSON(200, []);
    }
    return;
  }

  // --- API: POST PRODUCTS ---
  if (reqPath === '/api/products' && req.method === 'POST') {
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

  // --- API: UPLOAD BASE64 IMAGE ---
  if (reqPath === '/api/upload' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { fileName, base64Data } = JSON.parse(body);
        if (!fileName || !base64Data) {
          return sendJSON(400, { error: 'Missing fileName or base64Data' });
        }
        
        // Strip data:image/...;base64, header if present
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
      res.writeHead(404, { 'Content-Type': 'text/plain' });
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
});
