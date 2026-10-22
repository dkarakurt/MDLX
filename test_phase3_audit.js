// Phase 3 Language & Content Consistency Audit Script
const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

console.log('=== AŞAMA 3 DENETİMİ BAŞLIYOR: DİL VE İÇERİK TUTARLILIĞI ===\n');

// 1. Check locales/tr.json and locales/en.json exist and are valid JSON
let trLocale, enLocale;
try {
  trLocale = JSON.parse(fs.readFileSync(path.join(projectDir, 'locales', 'tr.json'), 'utf8'));
  assert(trLocale && trLocale.lang === 'TR', 'locales/tr.json başarıyla yüklendi ve lang=TR');
} catch (e) {
  assert(false, 'locales/tr.json yüklenemedi: ' + e.message);
}

try {
  enLocale = JSON.parse(fs.readFileSync(path.join(projectDir, 'locales', 'en.json'), 'utf8'));
  assert(enLocale && enLocale.lang === 'EN', 'locales/en.json başarıyla yüklendi ve lang=EN');
} catch (e) {
  assert(false, 'locales/en.json yüklenemedi: ' + e.message);
}

// 2. Founder experience: "15 yıllık" references must be eliminated from all active production code
const filesToCheckFor15Years = [
  'index.html',
  'app.js',
  'content.json',
  'products.js',
  'admin.js',
  'atelier-mgmt-x9k2.html',
  'locales/tr.json',
  'locales/en.json'
];

filesToCheckFor15Years.forEach(relPath => {
  const fullPath = path.join(projectDir, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const has15 = /15\s*yıllık|15\s*year/i.test(content);
    assert(!has15, `${relPath} içerisinde eski '15 yıllık' / '15-year' ifadesi kalmamış`);
  }
});

// 3. Category Names Uniformity
// TR: BLAZER CEKET, PANTOLON, GÖMLEK, TRİKO & ÜST, ELBİSE, ETEK
// EN: BLAZERS, TROUSERS, SHIRTS, KNITWEAR & TOPS, DRESSES, SKIRTS
const expectedTRCats = ['BLAZER CEKET', 'PANTOLON', 'GÖMLEK', 'TRİKO & ÜST', 'ELBİSE', 'ETEK'];
const expectedENCats = ['BLAZERS', 'TROUSERS', 'SHIRTS', 'KNITWEAR & TOPS', 'DRESSES', 'SKIRTS'];

if (trLocale && trLocale.categories && trLocale.categories.items) {
  const trItems = Object.values(trLocale.categories.items);
  const allTrMatched = expectedTRCats.every(c => trItems.includes(c));
  assert(allTrMatched, `tr.json kategorileri standart listeyle birebir uyumlu: ${JSON.stringify(trItems)}`);
}

if (enLocale && enLocale.categories && enLocale.categories.items) {
  const enItems = Object.values(enLocale.categories.items);
  const allEnMatched = expectedENCats.every(c => enItems.includes(c));
  assert(allEnMatched, `en.json kategorileri standart listeyle birebir uyumlu: ${JSON.stringify(enItems)}`);
}

// Check products.js CATEGORIES_DATA
const productsJsContent = fs.readFileSync(path.join(projectDir, 'products.js'), 'utf8');
assert(productsJsContent.includes('"KNITWEAR & TOPS"'), 'products.js CATEGORIES_DATA içerisinde "tops" adı "KNITWEAR & TOPS" olarak güncellenmiş');
assert(productsJsContent.includes('"TRİKO & ÜST"'), 'products.js CATEGORIES_DATA içerisinde "tops" nameTr "TRİKO & ÜST"');

// 4. Internal Badges Check: HERO CREATION and STORIES should NOT appear as user-facing badges
const indexHtmlContent = fs.readFileSync(path.join(projectDir, 'index.html'), 'utf8');
assert(!indexHtmlContent.includes('>HERO CREATION<'), 'index.html içerisinde kullanıcıya görünen HERO CREATION rozeti kalmamış (İMZA TASARIM ile değiştirildi)');
assert(indexHtmlContent.includes('ATELIER HİKAYESİ'), 'index.html içerisinde hero rozeti "ATELIER HİKAYESİ" olarak konumlandırılmış');

// 5. Brand Invariants Check
// Maison De Loup Atelier, THE ART OF THE BLAZER
assert(indexHtmlContent.includes('THE ART OF THE BLAZER'), 'index.html marka sloganı "THE ART OF THE BLAZER" korunuyor');
assert(indexHtmlContent.includes('Maison De Loup'), 'index.html marka adı "Maison De Loup" korunuyor');

console.log(`\nDENETİM SONUCU: ${passed} Başarılı, ${failed} Hatalı`);
if (failed > 0) {
  process.exit(1);
}
