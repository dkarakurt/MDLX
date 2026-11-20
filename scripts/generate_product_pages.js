// ==========================================================================
// SCRIPT: generate_product_pages.js
// Generates 12 SEO-optimized static HTML product pages in /urun/{slug}.html
// with Schema.org Product JSON-LD, OpenGraph, Twitter Card, and interactive UI.
// ==========================================================================

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://maisondeloup.com';
const productsJsonPath = path.join(__dirname, '..', 'products.json');
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

const outputDir = path.join(__dirname, '..', 'urun');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const CATEGORY_NAMES = {
  blazers: { tr: "Blazer Ceket", en: "Blazers" },
  trousers: { tr: "Pantolon", en: "Trousers" },
  shirts: { tr: "Gömlek", en: "Shirts" },
  tops: { tr: "Triko & Üst", en: "Knitwear & Tops" },
  dresses: { tr: "Elbise", en: "Dresses" },
  skirts: { tr: "Etek", en: "Skirts" }
};

const BADGE_MAP = {
  "HERO PIECE": "İMZA PARÇA",
  "SIGNATURE": "İMZA TASARIM",
  "TIMELESS": "ZAMANSIZ",
  "ATELIER COUTURE": "ATÖLYE COUTURE",
  "ESSENTIAL": "TEMEL PARÇA",
  "BESTSELLER": "ÇOK SATAN",
  "DNA ACCESSIBLE": "ERİŞİLEBİLİR LÜKS",
  "LIMITED RUN": "SINIRLI SAYIDA",
  "ATELIER": "ATELIER"
};

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPriceTRY(amount) {
  return `₺${amount.toLocaleString('tr-TR')}`;
}

products.forEach(product => {
  const slug = product.slug || product.id;
  const canonicalUrl = `${BASE_URL}/urun/${slug}`;
  const categoryTr = CATEGORY_NAMES[product.category]?.tr || "Koleksiyon";
  const badgeText = BADGE_MAP[product.badge] || product.badge || "ATELIER";

  const allImages = (product.images && product.images.length > 0)
    ? product.images
    : [product.primaryImage, product.secondaryImage || product.primaryImage];

  const primaryImgUrl = `${BASE_URL}/${product.primaryImage}`;
  const schemaImages = allImages.map(img => `${BASE_URL}/${img}`);

  const titleMeta = `${product.nameTr} | Maison De Loup Atelier`;
  const descMeta = product.descriptionTr || "Maison De Loup Atelier özel lüks tasarımı.";

  // Schema.org JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.nameTr,
    "image": schemaImages,
    "description": descMeta,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Maison De Loup Atelier"
    },
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "TRY",
      "price": product.priceTRY,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Kumaş",
        "value": product.fabricTr || product.fabric
      },
      {
        "@type": "PropertyValue",
        "name": "Kalıp",
        "value": product.fitTr || product.fit
      },
      {
        "@type": "PropertyValue",
        "name": "Astar",
        "value": product.liningTr || product.lining
      },
      {
        "@type": "PropertyValue",
        "name": "Bakım",
        "value": product.careTr || product.care
      }
    ]
  };

  const detailsListHtml = (product.detailsTr && product.detailsTr.length > 0)
    ? product.detailsTr.map(d => `<li>${escapeHtml(d)}</li>`).join('\n')
    : `<li>Maison De Loup Atelier özel terzi işçiliği</li><li>Yalnızca kuru temizleme</li>`;

  const sizes = product.sizes || ["34", "36", "38", "40", "42"];
  const colors = product.colors || [{ name: "Noir", hex: "#111111" }];

  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(titleMeta)}</title>
  <meta name="description" content="${escapeHtml(descMeta)}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product">
  <meta property="og:title" content="${escapeHtml(titleMeta)}">
  <meta property="og:description" content="${escapeHtml(descMeta)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${primaryImgUrl}">
  <meta property="og:price:amount" content="${product.priceTRY}">
  <meta property="og:price:currency" content="TRY">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(titleMeta)}">
  <meta name="twitter:description" content="${escapeHtml(descMeta)}">
  <meta name="twitter:image" content="${primaryImgUrl}">

  <!-- Schema.org Product Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="/styles.css">
  <link rel="icon" type="image/png" href="/assets/images/logo-black.png">
</head>
<body class="page-wrapper">

  <!-- Top Announcement Bar -->
  <div class="announcement-bar">
    <div class="currency-lang-toggle">
      <select id="langSelect" aria-label="Dil Seçimi">
        <option value="TR" selected>TR (Türkçe)</option>
        <option value="EN">EN (English)</option>
      </select>
      <select id="currencySelect" aria-label="Para Birimi">
        <option value="TRY" selected>TRY (₺)</option>
        <option value="EUR">EUR (€)</option>
        <option value="USD">USD ($)</option>
        <option value="GBP">GBP (£)</option>
      </select>
    </div>
    <span id="announcementText">Türkiye'de Tasarlandı — Dünyaya Açılan Türk Modası</span>
    <div style="display: flex; align-items: center; gap: 16px;">
      <span style="font-size: 0.68rem; letter-spacing: 0.15em; color: #a1a1aa;">
        ATELIER ISTANBUL
      </span>
    </div>
  </div>

  <!-- Main Sticky Header -->
  <header class="site-header" id="siteHeader">
    <a href="/" class="brand-logo" aria-label="Maison De Loup Atelier Ana Sayfa">
      <img src="/assets/images/logo-white.png" alt="Maison De Loup Atelier" id="headerLogo">
    </a>

    <!-- Center Navigation Links -->
    <nav class="main-nav" aria-label="Ana Menü">
      <a href="/?kategori=all" class="nav-link" id="navNewIn">YENİ GELENLER</a>
      <a href="/?kategori=blazers" class="nav-link ${product.category === 'blazers' ? 'active' : ''}" id="navBlazers">BLAZER CEKET</a>
      <a href="/#categorySection" class="nav-link" id="navClothing">GİYİM</a>
      <a href="/#splitSection" class="nav-link" id="navCollections">KOLEKSİYONLAR</a>
      <a href="/#journalSection" class="nav-link" id="navEditorial">EDİTORYAL</a>
      <a href="/iletisim" class="nav-link" id="navContact">İLETİŞİM</a>
    </nav>

    <!-- Right Header Actions -->
    <div class="nav-actions">
      <a href="/" class="icon-btn" aria-label="Ana Sayfaya Dön" title="Ana Sayfa">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      </a>
      <button class="action-btn cart-btn" id="btnOpenCart" onclick="openCartDrawer()" aria-label="Alışveriş Çantası">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
        </svg>
        <span class="cart-count" id="cartCount">0</span>
      </button>
    </div>
  </header>

  <!-- Product Detail Container -->
  <main class="pdp-container">
    <!-- Breadcrumb Navigation -->
    <nav class="pdp-breadcrumb" aria-label="Breadcrumb">
      <a href="/">Ana Sayfa</a>
      <span>/</span>
      <a href="/?kategori=${product.category}">${escapeHtml(categoryTr)}</a>
      <span>/</span>
      <span class="current">${escapeHtml(product.nameTr)}</span>
    </nav>

    <!-- Left Column: Image Gallery -->
    <div class="pdp-gallery">
      <!-- Thumbnails Rail -->
      <div class="pdp-thumb-rail">
        ${allImages.map((img, idx) => {
          const clean = img.split('?')[0];
          const webpImg = clean.replace(/\.(jpe?g|png)$/i, '.webp');
          return `
          <div class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchPdpImage('/${img}', this)" title="Açı 0${idx + 1}">
            <picture>
              <source srcset="/${webpImg}" type="image/webp">
              <img src="/${img}" alt="${escapeHtml(product.nameTr)} Görsel ${idx + 1}" loading="lazy" width="70" height="93">
            </picture>
          </div>
        `;}).join('')}
      </div>

      <!-- Main Stage Viewport -->
      <div class="pdp-main-stage">
        <picture id="pdpMainPicture">
          <source srcset="/${allImages[0].split('?')[0].replace(/\.(jpe?g|png)$/i, '.webp')}" type="image/webp">
          <img src="/${allImages[0]}" alt="${escapeHtml(product.nameTr)}" id="pdpMainImg" class="pdp-main-img" width="600" height="800" fetchpriority="high">
        </picture>
      </div>
    </div>

    <!-- Right Column: Product Details & Purchase -->
    <div class="pdp-details">
      <span class="pdp-badge">${escapeHtml(badgeText)}</span>
      <h1 class="pdp-title">${escapeHtml(product.nameTr)}</h1>
      <div class="pdp-price" id="pdpPrice">${formatPriceTRY(product.priceTRY)}</div>
      <p class="pdp-desc">${escapeHtml(descMeta)}</p>

      <!-- Color Swatches -->
      <div class="pdp-color-row">
        <span class="pdp-section-label">RENK SEÇENEĞİ: <strong>${escapeHtml(colors[0].name)}</strong></span>
        <div class="pdp-swatches">
          ${colors.map((c, idx) => `
            <div class="pdp-swatch ${idx === 0 ? 'active' : ''}" style="background-color: ${c.hex};" title="${escapeHtml(c.name)}"></div>
          `).join('')}
        </div>
      </div>

      <!-- Size Selector & Size Guide Button -->
      <div class="pdp-sizes-row">
        <div class="pdp-size-header-row">
          <span class="pdp-section-label">BEDEN SEÇİMİ (EU)</span>
          <button type="button" class="qv-size-guide-btn" onclick="openSizeGuideModal()">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zM7 7h10M7 11h6M7 15h4"/>
            </svg>
            <span>Beden Rehberi</span>
          </button>
        </div>
        <div class="pdp-sizes">
          ${sizes.map((s, idx) => `
            <button type="button" class="pdp-size-btn ${idx === 0 ? 'selected' : ''}" data-size="${s}" onclick="selectPdpSize('${s}', this)">${s}</button>
          `).join('')}
        </div>
      </div>

      <!-- 4 Product Attributes (Phase 4 & 5 Specifications Grid) -->
      <div class="qv-specs-grid" style="margin: 20px 0;">
        <div class="qv-spec-item">
          <span class="qv-spec-label">KUMAŞ</span>
          <span class="qv-spec-val">${escapeHtml(product.fabricTr || product.fabric)}</span>
        </div>
        <div class="qv-spec-item">
          <span class="qv-spec-label">KALIP</span>
          <span class="qv-spec-val">${escapeHtml(product.fitTr || product.fit)}</span>
        </div>
        <div class="qv-spec-item">
          <span class="qv-spec-label">ASTAR</span>
          <span class="qv-spec-val">${escapeHtml(product.liningTr || product.lining)}</span>
        </div>
        <div class="qv-spec-item">
          <span class="qv-spec-label">BAKIM</span>
          <span class="qv-spec-val">${escapeHtml(product.careTr || product.care)}</span>
        </div>
      </div>

      <!-- Add to Cart & Wishlist Actions -->
      <div class="pdp-actions-row">
        <button type="button" class="pdp-add-to-cart" id="pdpAddBtn" onclick="addCurrentProductToCart()">
          <span id="pdpAddBtnText">ÇANTAYA EKLE • ${formatPriceTRY(product.priceTRY)}</span>
        </button>
        <button type="button" class="qv-wishlist-toggle" id="pdpWishBtn" onclick="togglePdpWishlist()" aria-label="Favorilere Ekle">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>

      <!-- Atelier Trust Badges -->
      <div class="atelier-trust-badges">
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <span>256-Bit SSL Güvenli Ödeme</span>
        </div>
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"/></svg>
          <span>Orijinal Atelier İşçiliği</span>
        </div>
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>14 Gün Koşulsuz İade</span>
        </div>
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span>Global Ekspres Kurye</span>
        </div>
      </div>

      <!-- Luxury Accordion Details -->
      <div class="pdp-accordion">
        <div class="pdp-acc-item">
          <div class="pdp-acc-header">
            <span>Tasarım Felsefesi &amp; Silüet</span>
            <span class="acc-icon">+</span>
          </div>
          <div class="pdp-acc-content">
            <p>${escapeHtml(descMeta)}</p>
          </div>
        </div>

        <div class="pdp-acc-item">
          <div class="pdp-acc-header">
            <span>Terzilik &amp; Detaylar</span>
            <span class="acc-icon">+</span>
          </div>
          <div class="pdp-acc-content">
            <ul>
              ${detailsListHtml}
            </ul>
          </div>
        </div>

        <div class="pdp-acc-item">
          <div class="pdp-acc-header">
            <span>Teslimat, İade &amp; Orijinallik</span>
            <span class="acc-icon">+</span>
          </div>
          <div class="pdp-acc-content">
            <p>Maison De Loup Atelier parçaları siparişinize özel lüks koruma kılıfı ve imza kutusuyla sevk edilir. Tüm siparişlerde 14 gün koşulsuz iade ve değişim güvencesi sunulmaktadır. İstanbul içi aynı gün veya ertesi gün ekspres kurye imkanı mevcuttur.</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Size Guide Modal -->
  <div class="size-guide-modal" id="sizeGuideModal" role="dialog" aria-modal="true" aria-label="Beden Rehberi">
    <div class="story-modal-overlay" onclick="closeSizeGuideModal()"></div>
    <div class="size-guide-card">
      <button class="story-modal-close" onclick="closeSizeGuideModal()" aria-label="Kapat">&times;</button>
      
      <div class="size-guide-header">
        <span class="size-guide-badge" id="sgBadge">ATELIER KESİM REHBERİ</span>
        <h2 class="size-guide-title" id="sgTitle">KADIN BEDEN ÖLÇÜ TABLOSU</h2>
        <p class="size-guide-sub" id="sgSubtitle">Tüm ölçüler standart santimetre (cm) bazındadır. Rahat ve kusursuz terzilik silüeti için tasarlanmıştır.</p>
      </div>

      <div class="size-guide-table-wrap">
        <table class="size-guide-table">
          <thead>
            <tr>
              <th id="thSizeEu">Beden (EU)</th>
              <th id="thSizeTr">TR / FR</th>
              <th id="thSizeUk">UK</th>
              <th id="thSizeUs">US</th>
              <th id="thBust">Göğüs (cm)</th>
              <th id="thWaist">Bel (cm)</th>
              <th id="thHips">Basen (cm)</th>
              <th id="thLength">Ceket Boyu (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>34 (XS)</strong></td>
              <td>34</td>
              <td>6</td>
              <td>2</td>
              <td>82 - 85</td>
              <td>62 - 65</td>
              <td>88 - 91</td>
              <td>72</td>
            </tr>
            <tr>
              <td><strong>36 (S)</strong></td>
              <td>36</td>
              <td>8</td>
              <td>4</td>
              <td>86 - 89</td>
              <td>66 - 69</td>
              <td>92 - 95</td>
              <td>73</td>
            </tr>
            <tr>
              <td><strong>38 (M)</strong></td>
              <td>38</td>
              <td>10</td>
              <td>6</td>
              <td>90 - 93</td>
              <td>70 - 73</td>
              <td>96 - 99</td>
              <td>74</td>
            </tr>
            <tr>
              <td><strong>40 (L)</strong></td>
              <td>40</td>
              <td>12</td>
              <td>8</td>
              <td>94 - 97</td>
              <td>74 - 77</td>
              <td>100 - 103</td>
              <td>75</td>
            </tr>
            <tr>
              <td><strong>42 (XL)</strong></td>
              <td>42</td>
              <td>14</td>
              <td>10</td>
              <td>98 - 102</td>
              <td>78 - 82</td>
              <td>104 - 108</td>
              <td>76</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="size-guide-measure-box">
        <h3 class="size-guide-measure-title" id="sgMeasureTitle">DOĞRU BEDEN NASIL ÖLÇÜLÜR?</h3>
        <div class="size-guide-measure-list">
          <div>
            <strong style="color: #fff;" id="sgBustTitle">1. Göğüs Ölçüsü:</strong>
            <p id="sgBustDesc">Mezurayı sırtınızdan öne doğru, göğsünüzün en dolgun noktasından geçirerek yere paralel tutarak ölçünüz.</p>
          </div>
          <div>
            <strong style="color: #fff;" id="sgWaistTitle">2. Bel Ölçüsü:</strong>
            <p id="sgWaistDesc">Doğal bel kıvrımınızın en dar noktasından, mezurayı aşırı sıkmadan ve gevşetmeden ölçünüz.</p>
          </div>
          <div>
            <strong style="color: #fff;" id="sgHipsTitle">3. Basen Ölçüsü:</strong>
            <p id="sgHipsDesc">Ayaklarınız bitişik vaziyette dururken, kalçanızın en geniş ve dolgun noktasından çevre ölçüsü alınız.</p>
          </div>
          <div>
            <strong style="color: #fff;" id="sgFitTitle">4. Terzilik &amp; Kalıp Notu:</strong>
            <p id="sgFitDesc">Blazer ceketlerimiz İtalyan mimari omuz vatkalı kesime sahiptir. İki beden arasında kaldığınızda ceketlerde bir üst bedeni tercih etmeniz önerilir.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Cart Drawer -->
  <aside class="cart-drawer" id="cartDrawer" aria-label="Alışveriş Çantası">
    <div class="drawer-header">
      <h3 class="drawer-title" id="cartDrawerTitleText">ALIŞVERİŞ ÇANTASI (<span id="cartDrawerCount">0</span>)</h3>
      <button class="close-drawer-btn" onclick="closeAllDrawers()" aria-label="Kapat">&times;</button>
    </div>

    <!-- Free Shipping Progress Bar -->
    <div class="cart-free-shipping-bar">
      <span id="shippingBarText">Ücretsiz Dünya Çapında Ekspres Kargo için ₺8.000 limit</span>
      <div class="progress-track">
        <div class="progress-fill" id="shippingProgress" style="width: 0%;"></div>
      </div>
    </div>

    <!-- Cart Items List Container -->
    <div class="cart-items-container" id="cartItemsContainer">
      <div class="empty-cart-state">
        <p>Alışveriş çantanız henüz boş.</p>
        <p style="font-size: 0.72rem; margin-top: 8px;">Koleksiyonumuzdaki imza parçaları keşfedin.</p>
      </div>
    </div>

    <!-- Drawer Footer -->
    <div class="drawer-footer">
      <div class="subtotal-row">
        <span id="subtotalLabel">ARA TOPLAM</span>
        <span class="subtotal-amount" id="cartSubtotalAmount">₺0</span>
      </div>
      <button class="checkout-btn" onclick="alert('Maison De Loup Atelier güvenli ödeme sistemine yönlendiriliyorsunuz.')" id="checkoutBtn">
        GÜVENLİ ÖDEMEYE GEÇ
      </button>

      <!-- Atelier Trust & Security Badges -->
      <div class="atelier-trust-badges">
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          <span class="trust-text">256-Bit SSL Güvenli Ödeme</span>
        </div>
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"/></svg>
          <span class="trust-text">Orijinal Atelier İşçiliği</span>
        </div>
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span class="trust-text">14 Gün Koşulsuz İade</span>
        </div>
        <div class="trust-badge-item">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#c5a880"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <span class="trust-text">Global Ekspres Kurye</span>
        </div>
      </div>
    </div>
  </aside>

  <!-- Drawer Backdrop -->
  <div class="drawer-backdrop" id="drawerBackdrop" onclick="closeAllDrawers()"></div>

  <!-- Toast Container -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="footer-grid">
      <div class="footer-brand-col">
        <img src="/assets/images/logo-white.png" alt="Maison De Loup Atelier" class="footer-logo">
        <p class="footer-about">
          Maison De Loup Atelier — Kurdun bağımsız ruhundan ve 20 yılı aşkın terzilik ustalığından doğan lüks kadın giyim evi. Türkiye'de tasarlandı, dünyaya açıldı.
        </p>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">KOLEKSİYON</h4>
        <ul class="footer-links">
          <li><a href="/?kategori=blazers">Blazer Ceket (İmza)</a></li>
          <li><a href="/?kategori=trousers">Pantolon</a></li>
          <li><a href="/?kategori=shirts">Gömlek</a></li>
          <li><a href="/?kategori=tops">Triko &amp; Üst</a></li>
          <li><a href="/?kategori=dresses">Elbise</a></li>
          <li><a href="/?kategori=skirts">Etek</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">ATELIER &amp; İLETİŞİM</h4>
        <ul class="footer-links">
          <li><a href="/iletisim">Showroom &amp; Randevu</a></li>
          <li><a href="/#splitSection">Hikayemiz: Kurdun Evi</a></li>
          <li><a href="/#journalSection">The Journal (Editoryal)</a></li>
          <li><a href="/kargo-ve-teslimat">Kargo &amp; Teslimat</a></li>
          <li><a href="/iade-ve-degisim">İade &amp; Değişim</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-heading">YASAL &amp; GÜVENLİK</h4>
        <ul class="footer-links">
          <li><a href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a></li>
          <li><a href="/on-bilgilendirme-formu">Ön Bilgilendirme Formu</a></li>
          <li><a href="/kvkk-aydinlatma-metni">KVKK Aydınlatma Metni</a></li>
          <li><a href="/cerez-politikasi">Çerez Politikası</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">© 2026 Maison De Loup Atelier. Tüm hakları saklıdır. Türkiye'de Tasarlandı.</p>
    </div>
  </footer>

  <!-- Product Data Injection for PDP Script -->
  <script>
    window.CURRENT_PRODUCT = ${JSON.stringify({
      id: product.id,
      name: product.name,
      nameTr: product.nameTr,
      priceTRY: product.priceTRY,
      primaryImage: product.primaryImage,
      slug: slug,
      category: product.category
    })};
  </script>
  <script src="/product-page.js"></script>
  <script src="/site-nav.js" defer></script>
</body>
</html>`;

  const outputPath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`Generated: urun/${slug}.html`);
});

console.log(`All ${products.length} product pages generated successfully in /urun/.`);
