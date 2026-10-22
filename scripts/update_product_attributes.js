const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..');
const productsJsPath = path.join(projectDir, 'products.js');
const productsJsonPath = path.join(projectDir, 'products.json');

const code = fs.readFileSync(productsJsPath, 'utf8');

// Load current PRODUCTS_DATA, CATEGORIES_DATA, CURRENCY_RATES
const sandbox = {};
eval(code
  .replace('const PRODUCTS_DATA', 'sandbox.PRODUCTS_DATA')
  .replace('const CATEGORIES_DATA', 'sandbox.CATEGORIES_DATA')
  .replace('const CURRENCY_RATES', 'sandbox.CURRENCY_RATES')
);

const ATTRIBUTES_MAP = {
  'mdl-prod-1791792766078': {
    lining: "100% Cupro Silk & Italian Canvas Structured Lining",
    liningTr: "%100 Cupro İpek & İtalyan Telalı Astar",
    care: "Specialist dry clean only. Cool iron on reverse.",
    careTr: "Yalnızca uzman kuru temizleme. Düşük ısıda tersten ütüleyiniz."
  },
  'mdl-prod-1791792518739': {
    lining: "Pocket and inner waistband cupro lining",
    liningTr: "Ceplik ve bel içi cupro terzi astarı",
    care: "Specialist dry clean recommended. Cool iron.",
    careTr: "Kuru temizleme önerilir. Düşük ısıda ütüleyiniz."
  },
  'mdl-prod-1791792265725': {
    lining: "100% Habotai Silk Breathable Lining",
    liningTr: "%100 Habotai İpek Nefes Alan Astar",
    care: "Gentle hand wash at 30°C or dry clean.",
    careTr: "30°C hassas elde yıkama veya kuru temizleme."
  },
  'mdl-prod-1791785220112': {
    lining: "100% Bemberg Cupro Silk Monogram Lining",
    liningTr: "%100 Bemberg Cupro İpek Jakarlı Astar",
    care: "Specialist dry clean only. Steam iron.",
    careTr: "Yalnızca uzman kuru temizleme. Buharlı ütüleme önerilir."
  },
  'mdl-blz-01': {
    lining: "100% Bemberg Cupro Silk Italian Canvassed Lining",
    liningTr: "%100 Bemberg Cupro İpek & İtalyan Telalı Astar",
    care: "Specialist dry clean only. Cool iron on reverse.",
    careTr: "Yalnızca uzman kuru temizleme. Düşük ısıda tersten ütüleyiniz."
  },
  'mdl-blz-02': {
    lining: "100% Fine Viscose Tailored Breathable Lining",
    liningTr: "%100 İnce Viskon Terzilik Astarı",
    care: "Specialist dry clean only. Cool iron on reverse.",
    careTr: "Yalnızca uzman kuru temizleme. Düşük ısıda tersten ütüleyiniz."
  },
  'mdl-blz-03': {
    lining: "100% Bemberg Cupro Silk Half-Canvassed Lining",
    liningTr: "%100 Bemberg Cupro İpek & Yarı Telalı Terzi Astarı",
    care: "Specialist dry clean only. Do not wash.",
    careTr: "Yalnızca uzman kuru temizleme. Su ile temas ettirmeyiniz."
  },
  'mdl-blz-04': {
    lining: "100% Mulberry Silk Habotai Lining",
    liningTr: "%100 Saf Dut İpeği Habotai Astar",
    care: "Specialist dry clean only. Cool iron on reverse.",
    careTr: "Yalnızca uzman kuru temizleme. Düşük ısıda tersten ütüleyiniz."
  },
  'mdl-trs-01': {
    lining: "Half-lined to the knee with 100% Cupro",
    liningTr: "Dize kadar %100 Cupro yarım astar",
    care: "Specialist dry clean only. Medium iron with press cloth.",
    careTr: "Yalnızca uzman kuru temizleme. Ütü bezi ile orta ısıda ütüleyiniz."
  },
  'mdl-shr-01': {
    lining: "Unlined bespoke single-needle construction",
    liningTr: "Astarsız, tek iğne ince terzi dikişi",
    care: "Delicate wash at 30°C or dry clean. Hang dry.",
    careTr: "30°C hassas yıkama veya kuru temizleme. Asarak kurutunuz."
  },
  'mdl-top-01': {
    lining: "Unlined seamless fine luxury knitwear",
    liningTr: "Astarsız, dikişsiz ekstra ince lüks triko dokuma",
    care: "Gentle hand wash cold with wool detergent. Dry flat.",
    careTr: "Soğuk suda yün şampuanı ile elde nazikçe yıkayınız. Sererek kurutunuz."
  },
  'mdl-skt-01': {
    lining: "100% Breathable Silk-Feel Viscose Slip Lining",
    liningTr: "%100 İpek Dokulu Nefes Alan Viskon İç Astar",
    care: "Specialist dry clean recommended. Cool iron.",
    careTr: "Uzman kuru temizleme önerilir. Düşük ısıda ütüleyiniz."
  }
};

const updatedProducts = sandbox.PRODUCTS_DATA.map(p => {
  const attrs = ATTRIBUTES_MAP[p.id] || {
    lining: "100% Cupro Italian Lining",
    liningTr: "%100 Cupro İtalyan Astar",
    care: "Dry clean only.",
    careTr: "Yalnızca kuru temizleme."
  };
  return Object.assign({}, p, attrs);
});

// Write updated products.json
fs.writeFileSync(productsJsonPath, JSON.stringify(updatedProducts, null, 2), 'utf8');

// Write updated products.js
const updatedJs = `// Maison De Loup Atelier - Product Catalog Data
const PRODUCTS_DATA = ${JSON.stringify(updatedProducts, null, 2)};

const CATEGORIES_DATA = ${JSON.stringify(sandbox.CATEGORIES_DATA, null, 2)};

const CURRENCY_RATES = ${JSON.stringify(sandbox.CURRENCY_RATES, null, 2)};
`;

fs.writeFileSync(productsJsPath, updatedJs, 'utf8');
console.log('Successfully updated product attributes in products.js and products.json');
