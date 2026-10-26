// ==========================================================================
// SCRIPT: add_product_slugs.js
// Enriches products.json and products.js with unique SEO slugs and
// fills in any empty descriptions with luxury atelier copy.
// ==========================================================================

const fs = require('fs');
const path = require('path');

const SLUG_MAP = {
  "mdl-prod-1791792766078": "ceket002-atelier-blazer",
  "mdl-prod-1791792518739": "pntln002-tailored-trousers",
  "mdl-prod-1791792265725": "elbise003-couture-dress",
  "mdl-prod-1791785220112": "white-classic-blazer",
  "mdl-blz-01": "noir-atelier-blazer",
  "mdl-blz-02": "sculpted-hourglass-wool-blazer",
  "mdl-blz-03": "peak-lapel-camel-wool-blazer",
  "mdl-blz-04": "architectural-tuxedo-blazer-dress",
  "mdl-trs-01": "pleated-wide-leg-wool-trousers",
  "mdl-shr-01": "loversize-cotton-poplin-shirt",
  "mdl-top-01": "fine-gauge-ribbed-knit-top",
  "mdl-skt-01": "high-slit-pleated-silk-skirt"
};

const DEFAULT_DESCRIPTIONS = {
  "mdl-prod-1791792766078": {
    tr: "Maison De Loup Atelier imzasını taşıyan, %100 saf kaşmir dokumasıyla soğuk havalarda benzersiz bir zarafet sunan lüks kruvaze blazer ceket. Keskin omuz yapısı ve akıcı silüetiyle zamansız bir duruş.",
    en: "Crafted from 100% pure cashmere, this double-breasted atelier blazer delivers unparalleled elegance and warmth. Features sculpted shoulders and a fluid silhouette tailored to perfection."
  },
  "mdl-prod-1791792518739": {
    tr: "Yüksek bel, dökümlü paça kesimi ve kusursuz terzilik çizgileriyle blazer ceketleri tamamlayan modern kadın kumaş pantolonu. Gün boyu konfor ve asil bir duruş.",
    en: "High-waisted tailored trousers with an engineered drape and clean sartorial lines. Designed to seamlessly complement Maison De Loup blazers from boardroom to evening."
  },
  "mdl-prod-1791792265725": {
    tr: "Minimalist mimari hatlar ve feminen dökümün buluştuğu atelier couture elbise. Özel davetlerden modern şehir yaşamına uzanan lüks ve zamansız tasarım.",
    en: "An atelier couture dress merging clean architectural lines with fluid femininity. A versatile luxury piece created for discerning occasions."
  },
  "mdl-prod-1791785220112": {
    tr: "Saf beyazın zamansız zarafetiyle tasarlanmış klasik terzi işi blazer ceket. Akıcı kumaş dokusu, kusursuz telalı kalıbı ve sedef tonlu düğme detaylarıyla gardırobun vazgeçilmezi.",
    en: "A tailored classic blazer in crisp white, crafted with canvassed construction and luminous tonal buttons. A commanding wardrobe cornerstone for every season."
  }
};

const productsJsonPath = path.join(__dirname, '..', 'products.json');
const productsJsPath = path.join(__dirname, '..', 'products.js');

const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

products.forEach(p => {
  p.slug = SLUG_MAP[p.id] || p.id;
  if (!p.descriptionTr && DEFAULT_DESCRIPTIONS[p.id]) {
    p.descriptionTr = DEFAULT_DESCRIPTIONS[p.id].tr;
  }
  if (!p.description && DEFAULT_DESCRIPTIONS[p.id]) {
    p.description = DEFAULT_DESCRIPTIONS[p.id].en;
  }
});

// Write updated products.json
fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Updated products.json with slugs & descriptions for ${products.length} products.`);

// Now read products.js, keep CATEGORIES_DATA and CURRENCY_RATES intact
const jsFile = fs.readFileSync(productsJsPath, 'utf8');
const catMatch = jsFile.match(/const CATEGORIES_DATA = \[[\s\S]*?\];/);
const curMatch = jsFile.match(/const CURRENCY_RATES = \{[\s\S]*?\};/);

if (catMatch && curMatch) {
  const updatedJs = `// Maison De Loup Atelier - Product Catalog Data\nconst PRODUCTS_DATA = ${JSON.stringify(products, null, 2)};\n\n${catMatch[0]}\n\n${curMatch[0]}\n`;
  fs.writeFileSync(productsJsPath, updatedJs, 'utf8');
  console.log(`Updated products.js with slugs & descriptions.`);
} else {
  console.error(`Could not locate CATEGORIES_DATA or CURRENCY_RATES in products.js`);
}
