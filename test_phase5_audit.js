// ==========================================================================
// PHASE 5 AUDIT TEST SUITE
// Maison De Loup Atelier (MDL) - Static Pages, SEO & Schema.org Verification
// ==========================================================================

const fs = require('fs');
const path = require('path');
const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function it(desc, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${desc}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    Error: ${err.message}`);
  }
}

console.log('--- AŞAMA 5: STATİK SAYFALAR, SEO VE SCHEMA.ORG DENETİMİ ---\n');

// 1. Ana Sayfa SEO ve Schema.org Denetimi
console.log('1. Ana Sayfa SEO ve Schema.org (Organization & WebSite)');
const indexHtml = fs.readFileSync('index.html', 'utf8');

it('index.html içinde Canonical, OpenGraph ve Twitter Card etiketleri bulunmalı', () => {
  assert.ok(indexHtml.includes('<link rel="canonical" href="https://maisondeloup.com/">'), 'Canonical eksik');
  assert.ok(indexHtml.includes('property="og:type" content="website"'), 'og:type website eksik');
  assert.ok(indexHtml.includes('property="og:title"'), 'og:title eksik');
  assert.ok(indexHtml.includes('property="og:image"'), 'og:image eksik');
  assert.ok(indexHtml.includes('name="twitter:card" content="summary_large_image"'), 'twitter:card eksik');
});

it('index.html içinde Organization ve WebSite JSON-LD şemaları bulunmalı', () => {
  assert.ok(indexHtml.includes('"@type": "Organization"'), 'Organization şeması eksik');
  assert.ok(indexHtml.includes('"name": "Maison De Loup Atelier"'), 'Marka adı eksik');
  assert.ok(indexHtml.includes('"@type": "WebSite"'), 'WebSite şeması eksik');
  assert.ok(indexHtml.includes('"sameAs"'), 'sameAs sosyal medya alanı eksik');
});

// 2. Statik Ürün Sayfaları Denetimi (/urun/{slug}.html)
console.log('\n2. Statik Ürün Sayfaları (/urun/{slug}.html)');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

it('27 ürünün her biri için urun/ dizininde .html sayfası oluşturulmuş olmalı', () => {
  assert.strictEqual(products.length, 27, '27 ürün bulunmalı');
  products.forEach(p => {
    const filePath = path.join('urun', `${p.slug}.html`);
    assert.ok(fs.existsSync(filePath), `Ürün sayfası eksik: ${filePath}`);
  });
});

it('Her ürün sayfasında Canonical, OpenGraph (product) ve Twitter Card etiketleri yer almalı', () => {
  products.forEach(p => {
    const content = fs.readFileSync(path.join('urun', `${p.slug}.html`), 'utf8');
    assert.ok(content.includes(`<link rel="canonical" href="https://maisondeloup.com/urun/${p.slug}">`), `${p.id} canonical eksik`);
    assert.ok(content.includes('property="og:type" content="product"'), `${p.id} og:type eksik`);
    assert.ok(content.includes(`property="og:price:amount" content="${p.priceTRY}"`), `${p.id} og:price:amount eksik`);
    assert.ok(content.includes('property="og:price:currency" content="TRY"'), `${p.id} og:price:currency eksik`);
    assert.ok(content.includes('name="twitter:card" content="summary_large_image"'), `${p.id} twitter:card eksik`);
  });
});

it('Her ürün sayfasında Schema.org Product JSON-LD yapılandırılmış verisi eksiksiz olmalı', () => {
  products.forEach(p => {
    const content = fs.readFileSync(path.join('urun', `${p.slug}.html`), 'utf8');
    assert.ok(content.includes('"@type": "Product"'), `${p.id} Product şeması eksik`);
    assert.ok(content.includes(`"sku": "${p.id}"`), `${p.id} sku eksik`);
    assert.ok(content.includes('"@type": "Offer"'), `${p.id} Offer şeması eksik`);
    assert.ok(content.includes(`"price": ${p.priceTRY}`), `${p.id} schema price eksik`);
    assert.ok(content.includes('https://schema.org/InStock'), `${p.id} InStock eksik`);
    assert.ok(content.includes('"name": "Kumaş"'), `${p.id} additionalProperty Kumaş eksik`);
    assert.ok(content.includes('"name": "Kalıp"'), `${p.id} additionalProperty Kalıp eksik`);
    assert.ok(content.includes('"name": "Astar"'), `${p.id} additionalProperty Astar eksik`);
    assert.ok(content.includes('"name": "Bakım"'), `${p.id} additionalProperty Bakım eksik`);
  });
});

it('Her ürün sayfasında UI bileşenleri (galeri, 4 özellik, beden rehberi, sepet çekmecesi, güven rozetleri) tam olmalı', () => {
  products.forEach(p => {
    const content = fs.readFileSync(path.join('urun', `${p.slug}.html`), 'utf8');
    assert.ok(content.includes('class="pdp-gallery"'), `${p.id} galeri eksik`);
    assert.ok(content.includes('class="qv-specs-grid"'), `${p.id} 4 özellik ızgarası eksik`);
    assert.ok(content.includes('id="sizeGuideModal"'), `${p.id} sizeGuideModal eksik`);
    assert.ok(content.includes('id="cartDrawer"'), `${p.id} cartDrawer eksik`);
    assert.ok(content.includes('class="atelier-trust-badges"'), `${p.id} trust badges eksik`);
    assert.ok(content.includes('addCurrentProductToCart()'), `${p.id} sepete ekleme butonu eksik`);
    assert.ok(content.includes('src="/product-page.js"'), `${p.id} product-page.js scripti eksik`);
  });
});

// 3. Sitemap.xml Denetimi
console.log('\n3. Sitemap.xml ve Otomasyon');
const sitemapXml = fs.readFileSync('sitemap.xml', 'utf8');

it('sitemap.xml kök dizinde mevcut ve geçerli XML formatında olmalı', () => {
  assert.ok(sitemapXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'XML başlığı eksik');
  assert.ok(sitemapXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'), 'urlset şeması eksik');
});

it('sitemap.xml içinde tam 35 adet URL bulunmalı (Ana Sayfa + 7 Yasal Sayfa + 27 Ürün)', () => {
  const urlMatches = sitemapXml.match(/<url>/g) || [];
  assert.strictEqual(urlMatches.length, 35, `35 URL bekleniyordu, ${urlMatches.length} bulundu`);
  
  // Ana sayfa ve yasal sayfalar kontrolü
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/</loc>'), 'Ana sayfa linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/iletisim</loc>'), 'İletişim linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/mesafeli-satis-sozlesmesi</loc>'), 'Mesafeli satış linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/on-bilgilendirme-formu</loc>'), 'Ön bilgilendirme linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/kvkk-aydinlatma-metni</loc>'), 'KVKK linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/cerez-politikasi</loc>'), 'Çerez politikası linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/iade-ve-degisim</loc>'), 'İade ve değişim linki eksik');
  assert.ok(sitemapXml.includes('<loc>https://maisondeloup.com/kargo-ve-teslimat</loc>'), 'Kargo ve teslimat linki eksik');

  // 27 ürün kontrolü
  products.forEach(p => {
    assert.ok(sitemapXml.includes(`<loc>https://maisondeloup.com/urun/${p.slug}</loc>`), `Sitemap içinde ${p.slug} eksik`);
  });
});

it('sitemap.xml içindeki her kayıtta lastmod, changefreq ve priority bulunmalı', () => {
  const lastmodCount = (sitemapXml.match(/<lastmod>/g) || []).length;
  const changefreqCount = (sitemapXml.match(/<changefreq>/g) || []).length;
  const priorityCount = (sitemapXml.match(/<priority>/g) || []).length;
  assert.strictEqual(lastmodCount, 35, 'lastmod sayısı 35 olmalı');
  assert.strictEqual(changefreqCount, 35, 'changefreq sayısı 35 olmalı');
  assert.strictEqual(priorityCount, 35, 'priority sayısı 35 olmalı');
});

// 4. Sunucu MIME Type ve Yönlendirme Desteği
console.log('\n4. Sunucu .xml ve Temiz URL Desteği');
const serverJs = fs.readFileSync('server.js', 'utf8');

it('server.js içinde .xml MIME type tanımlı olmalı', () => {
  assert.ok(serverJs.includes("'.xml': 'application/xml; charset=utf-8'"), '.xml MIME type eksik');
});

it('app.js içerisinde ürün kartları ve Quick View statik ürün sayfalarına link vermeli', () => {
  const appJs = fs.readFileSync('app.js', 'utf8');
  assert.ok(appJs.includes('href="/urun/${product.slug || product.id}"'), 'Ürün kartında /urun/ linki eksik');
  assert.ok(appJs.includes('qv-product-page-link'), 'Quick View modalında ürün sayfası linki eksik');
});

console.log(`\n==================================================`);
console.log(`SONUÇ: ${passedTests}/${totalTests} Test Başarıyla Geçti.`);
console.log(`==================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
