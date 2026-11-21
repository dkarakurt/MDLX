// ==========================================================================
// PHASE 4 AUDIT TEST SUITE
// Maison De Loup Atelier (MDL) - Catalog & UX Enhancement Verification
// ==========================================================================

const fs = require('fs');
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

console.log('--- AŞAMA 4: KATALOG VE KULLANICI DENEYİMİ DENETİMİ ---\n');

// 1. Ürün Özellikleri (4 Attributes) Denetimi
console.log('1. Ürün Özellikleri (4 Attributes: Kumaş, Kalıp, Astar, Bakım)');
const productsFile = fs.readFileSync('products.js', 'utf8');
const productsJson = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Extract PRODUCTS_DATA from products.js
const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);
const productsJs = vm.runInContext(productsFile + '; PRODUCTS_DATA;', sandbox);

it('products.js ve products.json içinde 27 ürünün tümü mevcut olmalı', () => {
  assert.strictEqual(productsJs.length, 27, `products.js içinde 27 ürün olmalı, bulundu: ${productsJs.length}`);
  assert.strictEqual(productsJson.length, 27, `products.json içinde 27 ürün olmalı, bulundu: ${productsJson.length}`);
});

it('Tüm 27 üründe fabric, fabricTr, fit, fitTr, lining, liningTr, care, careTr eksiksiz tanımlı olmalı', () => {
  productsJs.forEach(p => {
    assert.ok(p.fabric && p.fabric.length > 0, `Ürün ${p.id} fabric eksik`);
    assert.ok(p.fabricTr && p.fabricTr.length > 0, `Ürün ${p.id} fabricTr eksik`);
    assert.ok(p.fit && p.fit.length > 0, `Ürün ${p.id} fit eksik`);
    assert.ok(p.fitTr && p.fitTr.length > 0, `Ürün ${p.id} fitTr eksik`);
    assert.ok(p.lining && p.lining.length > 0, `Ürün ${p.id} lining eksik`);
    assert.ok(p.liningTr && p.liningTr.length > 0, `Ürün ${p.id} liningTr eksik`);
    assert.ok(p.care && p.care.length > 0, `Ürün ${p.id} care eksik`);
    assert.ok(p.careTr && p.careTr.length > 0, `Ürün ${p.id} careTr eksik`);
  });
});

it('products.json dosyası da aynı 4 attribute alanlarına sahip olmalı', () => {
  productsJson.forEach(p => {
    assert.ok(p.lining && p.liningTr, `JSON Ürün ${p.id} astar eksik`);
    assert.ok(p.care && p.careTr, `JSON Ürün ${p.id} bakım eksik`);
  });
});

// 2. Beden Rehberi (Size Guide Modal) Denetimi
console.log('\n2. Beden Rehberi Modalı (#sizeGuideModal) & Ölçü Tablosu');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const stylesCss = fs.readFileSync('styles.css', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

it('index.html içinde #sizeGuideModal ve overlay/card bileşenleri mevcut olmalı', () => {
  assert.ok(indexHtml.includes('id="sizeGuideModal"'), '#sizeGuideModal ID bulunamadı');
  assert.ok(indexHtml.includes('class="size-guide-card"'), '.size-guide-card bulunamadı');
  assert.ok(indexHtml.includes('closeSizeGuideModal()'), 'closeSizeGuideModal tetikleyicisi bulunamadı');
});

it('Beden tablosunda EU 34-42 bedenleri ve ölçüm sütunları yer almalı', () => {
  ['34 (XS)', '36 (S)', '38 (M)', '40 (L)', '42 (XL)'].forEach(size => {
    assert.ok(indexHtml.includes(size), `Tabloda ${size} bedeni eksik`);
  });
  assert.ok(indexHtml.includes('id="thBust"'), 'Göğüs sütunu başlığı eksik');
  assert.ok(indexHtml.includes('id="thWaist"'), 'Bel sütunu başlığı eksik');
  assert.ok(indexHtml.includes('id="thHips"'), 'Basen sütunu başlığı eksik');
  assert.ok(indexHtml.includes('id="thLength"'), 'Boy sütunu başlığı eksik');
});

it('Beden tablosunda "Nasıl Ölçülür?" ve kalıp tavsiyesi rehberi bulunmalı', () => {
  assert.ok(indexHtml.includes('id="sgMeasureTitle"'), 'sgMeasureTitle eksik');
  assert.ok(indexHtml.includes('id="sgBustTitle"'), 'sgBustTitle eksik');
  assert.ok(indexHtml.includes('id="sgWaistTitle"'), 'sgWaistTitle eksik');
  assert.ok(indexHtml.includes('id="sgHipsTitle"'), 'sgHipsTitle eksik');
  assert.ok(indexHtml.includes('id="sgFitTitle"'), 'sgFitTitle eksik');
});

it('app.js içinde openSizeGuideModal ve closeSizeGuideModal fonksiyonları tanımlı olmalı', () => {
  assert.ok(appJs.includes('function openSizeGuideModal()'), 'openSizeGuideModal fonksiyonu eksik');
  assert.ok(appJs.includes('function closeSizeGuideModal()'), 'closeSizeGuideModal fonksiyonu eksik');
  assert.ok(appJs.includes('window.openSizeGuideModal = openSizeGuideModal;'), 'openSizeGuideModal export eksik');
  assert.ok(appJs.includes('closeSizeGuideModal();'), 'closeAllDrawers içinde closeSizeGuideModal eksik');
});

it('Escape tuşu basıldığında sizeGuideModal kapanmalı', () => {
  assert.ok(appJs.includes("e.key === 'Escape'"), 'Escape dinleyicisi eksik');
  assert.ok(appJs.includes("closeSizeGuideModal();"), 'Escape ile modal kapatma eksik');
});

// 3. Quick View Geliştirmeleri (4 Özellik Grid, Beden Rehberi Butonu, Güven Rozetleri)
console.log('\n3. Quick View Geliştirmeleri');
it('Quick View içinde 4-özellik ızgarası (.qv-specs-grid) yer almalı', () => {
  assert.ok(appJs.includes('class="qv-specs-grid"'), 'qv-specs-grid eksik');
  assert.ok(appJs.includes('${fabric}'), 'Kumaş render eksik');
  assert.ok(appJs.includes('${fit}'), 'Kalıp render eksik');
  assert.ok(appJs.includes('${lining}'), 'Astar render eksik');
  assert.ok(appJs.includes('${care}'), 'Bakım render eksik');
});

it('Quick View içinde Beden Rehberi butonu (.qv-size-guide-btn) yer almalı', () => {
  assert.ok(appJs.includes('class="qv-size-guide-btn"'), 'qv-size-guide-btn eksik');
  assert.ok(appJs.includes('onclick="openSizeGuideModal()"'), 'Beden rehberi açılış butonu eksik');
});

it('Quick View içinde Atelier Güven Rozetleri (.atelier-trust-badges) yer almalı', () => {
  assert.ok(appJs.includes('class="atelier-trust-badges"'), 'Quick View trust badges eksik');
});

// 4. Dinamik Çoklu Para Birimli Kargo İlerleme Çubuğu
console.log('\n4. Dinamik Çoklu Para Birimli Kargo İlerleme Çubuğu');
it('SHIPPING_THRESHOLDS tanımlı ve TRY (8000), EUR (250), USD (270), GBP (220) olmalı', () => {
  assert.ok(appJs.includes('const SHIPPING_THRESHOLDS ='), 'SHIPPING_THRESHOLDS tanımlı değil');
  assert.ok(appJs.includes('TRY: 8000'), 'TRY: 8000 eksik');
  assert.ok(appJs.includes('EUR: 250'), 'EUR: 250 eksik');
  assert.ok(appJs.includes('USD: 270'), 'USD: 270 eksik');
  assert.ok(appJs.includes('GBP: 220'), 'GBP: 220 eksik');
});

it('renderCart() fonksiyonu çoklu para birimine duyarlı eşik ve kalan tutar hesaplamalı', () => {
  assert.ok(appJs.includes('SHIPPING_THRESHOLDS[STATE.currentCurrency]'), 'Dinamik para birimi eşiği sorgusu eksik');
  assert.ok(appJs.includes('subtotalCurr >= threshold'), 'Eşik aşımı kontrolü eksik');
  assert.ok(appJs.includes('threshold - subtotalCurr'), 'Kalan tutar fark hesabı eksik');
});

// 5. URL State / Deep Linking & Popstate
console.log('\n5. URL State & Deep Linking (?kategori=...&sirala=...)');
it('updateUrlParams fonksiyonu kategori ve sirala parametrelerini yönetmeli', () => {
  assert.ok(appJs.includes('function updateUrlParams'), 'updateUrlParams eksik');
  assert.ok(appJs.includes("url.searchParams.set('kategori'"), "searchParams 'kategori' eksik");
  assert.ok(appJs.includes("url.searchParams.set('sirala'"), "searchParams 'sirala' eksik");
});

it('handleSortChange fonksiyonu sıralama değişiminde URL parametresini senkronize etmeli', () => {
  assert.ok(appJs.includes('function handleSortChange()'), 'handleSortChange fonksiyonu eksik');
  assert.ok(indexHtml.includes('onchange="handleSortChange()"'), 'sortSelect onchange handleSortChange bağlı değil');
});

it('initUrlState fonksiyonu sayfa ilk açıldığında URL parametrelerini okuyup filtre ve sıralamayı ayarlamalı', () => {
  assert.ok(appJs.includes('function initUrlState()'), 'initUrlState eksik');
  assert.ok(appJs.includes("params.get('kategori')"), "params.get('kategori') eksik");
  assert.ok(appJs.includes("params.get('sirala')"), "params.get('sirala') eksik");
});

it('Browser back/forward butonları için window popstate dinleyicisi bağlı olmalı', () => {
  assert.ok(appJs.includes("window.addEventListener('popstate'"), 'popstate dinleyicisi eksik');
});

// 6. Güven Rozetleri (Sepet Çekmecesi & Quick View)
console.log('\n6. Güven Rozetleri (Sepet Çekmecesi & Quick View)');
it('Sepet çekmecesinde 4 adet güven rozeti mevcut olmalı', () => {
  assert.ok(indexHtml.includes('id="trustSslText"'), 'trustSslText eksik');
  assert.ok(indexHtml.includes('id="trustAuthText"'), 'trustAuthText eksik');
  assert.ok(indexHtml.includes('id="trustReturnText"'), 'trustReturnText eksik');
  assert.ok(indexHtml.includes('id="trustShipText"'), 'trustShipText eksik');
});

// 7. Dil & Çeviri Bütünlüğü
console.log('\n7. Dil Sözlükleri ve applyLanguage Güncellemeleri');
const trLocale = JSON.parse(fs.readFileSync('locales/tr.json', 'utf8'));
const enLocale = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

it('TR ve EN sözlük dosyalarında sizeGuide ve trust anahtarları tam olmalı', () => {
  assert.ok(trLocale.sizeGuide && trLocale.sizeGuide.badge && trLocale.sizeGuide.thBust, 'TR sizeGuide eksik');
  assert.ok(enLocale.sizeGuide && enLocale.sizeGuide.badge && enLocale.sizeGuide.thBust, 'EN sizeGuide eksik');
  assert.ok(trLocale.trust && trLocale.trust.ssl && trLocale.trust.returns, 'TR trust eksik');
  assert.ok(enLocale.trust && enLocale.trust.ssl && enLocale.trust.returns, 'EN trust eksik');
});

it('applyLanguage fonksiyonu sizeGuide ve cart trust rozetlerini yerelleştirmeli', () => {
  assert.ok(appJs.includes('sg.badge'), 'applyLanguage sg.badge eksik');
  assert.ok(appJs.includes('trst.ssl'), 'applyLanguage trst.ssl eksik');
});

console.log(`\n==================================================`);
console.log(`SONUÇ: ${passedTests}/${totalTests} Test Başarıyla Geçti.`);
console.log(`==================================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
} else {
  process.exit(0);
}
