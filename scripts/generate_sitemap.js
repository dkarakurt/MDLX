// ==========================================================================
// SCRIPT: generate_sitemap.js
// Generates root sitemap.xml with home, 7 legal/contact pages, and 12 product pages.
// ==========================================================================

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://maisondeloup.com';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_PAGES = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/iletisim', changefreq: 'monthly', priority: '0.8' },
  { url: '/mesafeli-satis-sozlesmesi', changefreq: 'monthly', priority: '0.5' },
  { url: '/on-bilgilendirme-formu', changefreq: 'monthly', priority: '0.5' },
  { url: '/kvkk-aydinlatma-metni', changefreq: 'monthly', priority: '0.5' },
  { url: '/cerez-politikasi', changefreq: 'monthly', priority: '0.5' },
  { url: '/iade-ve-degisim', changefreq: 'monthly', priority: '0.6' },
  { url: '/kargo-ve-teslimat', changefreq: 'monthly', priority: '0.6' }
];

const productsJsonPath = path.join(__dirname, '..', 'products.json');
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

const productEntries = products.map(p => {
  const slug = p.slug || p.id;
  return {
    url: `/urun/${slug}`,
    changefreq: 'weekly',
    priority: '0.9'
  };
});

const allPages = [...STATIC_PAGES, ...productEntries];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

allPages.forEach(page => {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
fs.writeFileSync(sitemapPath, xml, 'utf8');

console.log(`Generated sitemap.xml with ${allPages.length} URLs (Home + 7 Legal/Contact + ${productEntries.length} Products).`);
