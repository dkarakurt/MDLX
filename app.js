// ==========================================================================
// MAISON DE LOUP ATELIER — APPLICATION LOGIC & INTERACTION CONTROLLER
// ==========================================================================

// Default Content from content.json (baked-in for static / Cloudflare / zero-FOUC support)
const DEFAULT_CONTENT = {
  "brandName": "MAISON DE LOUP ATELIER",
  "announcementTextTR": "Türkiye'de Tasarlandı — Dünyaya Açılan Türk Modası",
  "announcementTextEN": "Designed in Türkiye — Made for the World &bull; Worldwide Express Delivery",
  "heroTitle": "MAISON DE LOUP ATELIER",
  "heroSubTR": "THE ART OF THE BLAZER",
  "heroSubEN": "THE ART OF THE BLAZER",
  "heroProvTR": "Designed in Türkiye<br>Made for the world.",
  "heroProvEN": "Designed in Türkiye<br>Made for the world.",
  "heroCtaTR": "KOLEKSİYONU KEŞFET",
  "heroCtaEN": "EXPLORE COLLECTION",
  "heroSlide1": "assets/images/uploaded_1791785047520_Gemini_Generated_Image_wpltxzwpltxzwplt.jpg",
  "heroSlide2": "assets/images/product_blazer_noir.jpg",
  "heroSlide3": "assets/images/product_blazer_ecru.jpg",
  "sigPretitleTR": "HERO CREATION",
  "sigTitleTR": "MODERN WOMENSWEAR",
  "sigTitleEN": "THE SIGNATURE BLAZER",
  "sigDescTR": "Zamansız silüetler. Modern tavır.",
  "sigDescEN": "Timeless shapes. Modern attitude.",
  "sigLinkTR": "ÜRÜNLERİ İNCELE",
  "sigLinkEN": "SHOP BLAZERS",
  "sigImage": "assets/images/uploaded_1791788751605_Gemini_Generated_Image_fn3h8jfn3h8jfn3h.jpg",
  "wolfTitleTR": "KURDUN EVİ — THE HOUSE OF THE WOLF",
  "wolfTitleEN": "THE HOUSE OF THE WOLF",
  "wolfTextTR": "Maison de Loup, 'Kurdun Evi' anlamına gelir. Özgürlük, güç, bağımsızlık ve yol göstericiliği temsil eden kurt sembolünden ilham alan Maison De Loup Atelier, Türk tasarımını global moda dünyasıyla buluşturan modern ve zamansız bir kadın giyim markasıdır.",
  "wolfTextEN": "Maison de Loup translates to 'The House of the Wolf'. Inspired by the wolf's profound symbolism of freedom, power, and independence in Turkish culture, Maison De Loup Atelier merges Turkish design mastery with global high-fashion silhouettes.",
  "wolfLinkTR": "HİKAYEMİZ",
  "wolfLinkEN": "OUR STORY",
  "wolfImage": "assets/images/uploaded_1791784507432_Gemini_Generated_Image_1bwikn1bwikn1bwi.jpg",
  "catTitleTR": "KATEGORİLERE GÖRE KEŞFET",
  "catTitleEN": "SHOP BY CATEGORY",
  "catImages": {
    "blazers": "assets/images/cat_blazers_hd.jpg",
    "trousers": "assets/images/cat_trousers_hd.jpg",
    "shirts": "assets/images/cat_shirts_hd.jpg",
    "tops": "assets/images/cat_tops_hd.jpg",
    "dresses": "assets/images/cat_dresses_hd.jpg",
    "skirts": "assets/images/cat_skirts_hd.jpg"
  },
  "catalogHeadingTR": "KOLEKSİYON",
  "catalogHeadingEN": "THE COLLECTION",
  "catalogSubTR": "Kadın Blazer Ceket &bull; Tamamlayıcı Koleksiyon &bull; Erişilebilir Lüks",
  "catalogSubEN": "Hero Blazers &bull; Complementary Line &bull; Accessible Luxury",
  "journalHeadingTR": "THE JOURNAL",
  "journalHeadingEN": "THE JOURNAL",
  "journalSubTR": "Moda, İlham ve Maison De Loup Atelier Dünyası.",
  "journalSubEN": "Fashion, Inspiration. The Maison De Loup Atelier world.",
  "journalCtaTR": "EDİTORYAL YAZILARI OKU",
  "journalCtaEN": "EXPLORE EDITORIAL",
  "journalImage": "assets/images/uploaded_1791784583979_Gemini_Generated_Image_h3b9z6h3b9z6h3b9.jpg",
  "card1TitleTR": "HER DETAYDA MÜKEMMELİYET",
  "card1TitleEN": "QUALITY IN EVERY DETAIL",
  "card1TextTR": "Tasarımdan kumaşa, işçilikten ürün deneyimine kadar kaliteden ödün vermeden. 15 yıllık sektör birikimiyle.",
  "card1TextEN": "From design to fabric, craftsmanship to experience — quality is our promise. Rooted in 15 years of industry mastery.",
  "card1LinkTR": "DEĞERLERİMİZ",
  "card1LinkEN": "OUR VALUES",
  "card1Image": "assets/images/quality_label_hd.jpg",
  "card2TitleTR": "MİMARİ TERZİLİK & KALIP",
  "card2TitleEN": "THE ANATOMY OF FIT",
  "card2TextTR": "Keskin omuz hatları, hareket kabiliyeti sağlayan kavisler ve dökümlü saf yün kumaşlar.",
  "card2TextEN": "Sculpted shoulders, internal canvas structure, and engineered drape. Tailored to empower women.",
  "card2LinkTR": "ATÖLYE DETAYLARI",
  "card2LinkEN": "ATELIER CRAFT",
  "card2Image": "assets/images/tailoring_fit_hd.jpg",
  "newsletterTitleTR": "DÜNYAMIZA KATILIN",
  "newsletterTitleEN": "JOIN OUR WORLD",
  "newsletterDescTR": "Yeni koleksiyonlar, özel atölye sunumları ve öncelikli sipariş fırsatlarından haberdar olun.",
  "newsletterDescEN": "Be the first to know about new arrivals, private salon presentations and limited drops.",
  "storyVisionTR": "Maison de Loup… Fransızca karşılığıyla “Kurdun Evi.”\n\nMarkanın çıkış noktası, kurdun Türk kültüründeki güçlü ve sembolik anlamından ilham alıyor. Kurt; özgürlüğü, gücü, bağımsızlığı ve yol göstericiliği temsil ediyor. Biz bu güçlü sembolü, modern ve global bir moda markasının kimliğine dönüştürmek istiyoruz.\n\nMaison De Loup Atelier’nin amacı; Türk tasarımını yalnızca Türkiye’de değil, dünyanın farklı noktalarında erişilebilir ve tercih edilir hale getirmek. Bunu yaparken en önemli değerlerimizden biri kalite. Tasarımdan kumaşa, işçilikten ürün deneyimine kadar her aşamada kaliteden ödün vermeden; güncel trendleri takip eden ancak onları birebir kopyalamak yerine kendi kimliğiyle yorumlayan bir marka yaratmayı hedefliyoruz.",
  "storyMissionTR": "Türk tasarım kültüründen ve yerel üretim gücünden beslenerek; çağdaş tasarım anlayışını yüksek kalite, özgünlük ve erişilebilirlik ile buluşturmak.\n\nFarklı coğrafyalardaki kadınların ihtiyaçlarını ve yaşam tarzlarını anlayarak, onların stiline ilham veren, güçlü ve zamansız ürünler tasarlamak.\n\nMaison De Loup Atelier olarak misyonumuz; Türk tasarımının özgün karakterini global moda dünyasının dinamikleriyle birleştirerek, uluslararası ölçekte değer yaratan ve kadınların kendilerini ifade etmelerine alan açan bir moda markası olmak.",
  "storyFounderTR": "Yaklaşık 15 yıllık tekstil ve moda sektöründeki deneyimim, Maison De Loup Atelier’nin en güçlü yapı taşlarından biri olacak. Kariyerim boyunca triko, dokuma, denim ve deri gibi farklı ürün gruplarıyla çalışırken tasarımın ve üretimin bütününe hakim bir deneyim kazandım.\n\nHedefim sadece güzel ürünler tasarlayan bir marka değil; hangi ürünün neden üretileceğini, hangi müşteriye hitap edeceğini bilen sürdürülebilir bir global moda markası kurmak."
};

// Application State
const STATE = {
  currentCategory: 'blazers',
  currentCurrency: 'TRY',
  currentLang: 'TR',
  currentHeroSlide: 0,
  cart: JSON.parse(localStorage.getItem('mdl_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('mdl_wishlist') || '[]'),
  products: [...PRODUCTS_DATA],
  content: DEFAULT_CONTENT
};

// Language Dictionary
const TRANSLATIONS = {
  TR: {
    announcement: "Türkiye'de Tasarlandı — Dünyaya Açılan Türk Modası",
    heroSub: "THE ART OF THE BLAZER",
    heroProv: "Designed in Türkiye<br>Made for the world.",
    heroCta: "KOLEKSİYONU KEŞFET",
    sigTitle: "MODERN WOMENSWEAR",
    sigDesc: "Zamansız silüetler. Modern tavır.",
    sigLink: "ÜRÜNLERİ İNCELE",
    wolfTitle: "KURDUN EVİ — THE HOUSE OF THE WOLF",
    wolfText: "Maison de Loup, 'Kurdun Evi' anlamına gelir. Özgürlük, güç, bağımsızlık ve yol göstericiliği temsil eden kurt sembolünden ilham alan Maison De Loup Atelier, Türk tasarımını global moda dünyasıyla buluşturan modern ve zamansız bir kadın giyim markasıdır.",
    wolfLink: "HİKAYEMİZ",
    catTitle: "KATEGORİLERE GÖRE KEŞFET",
    catalogHeading: "KOLEKSİYON",
    catalogSub: "Kadın Blazer Ceket &bull; Tamamlayıcı Koleksiyon &bull; Erişilebilir Lüks",
    journalHeading: "THE JOURNAL",
    journalSub: "Moda, İlham ve Maison De Loup Atelier Dünyası.",
    journalCta: "EDİTORYAL YAZILARI OKU",
    card1Title: "HER DETAYDA MÜKEMMELİYET",
    card1Text: "Tasarımdan kumaşa, işçilikten ürün deneyimine kadar kaliteden ödün vermeden. 15 yıllık sektör birikimiyle.",
    card1Link: "DEĞERLERİMİZ",
    card2Title: "MİMARİ TERZİLİK & KALIP",
    card2Text: "Keskin omuz hatları, hareket kabiliyeti sağlayan kavisler ve dökümlü saf yün kumaşlar.",
    card2Link: "ATÖLYE DETAYLARI",
    newsletterTitle: "DÜNYAMIZA KATILIN",
    newsletterDesc: "Yeni koleksiyonlar, özel atölye sunumları ve öncelikli sipariş fırsatlarından haberdar olun.",
    shippingLimit: "Ücretsiz Dünya Çapında Ekspres Kargo için ₺8.000 limit",
    emptyCart: "Alışveriş çantanız henüz boş.",
    subtotal: "ARA TOPLAM",
    checkout: "GÜVENLİ ÖDEMEYE GEÇ",
    quickView: "HIZLI BAKIŞ",
    addToBag: "ÇANTAYA EKLE"
  },
  EN: {
    announcement: "Designed in Türkiye — Made for the World &bull; Worldwide Express Delivery",
    heroSub: "THE ART OF THE BLAZER",
    heroProv: "Designed in Türkiye<br>Made for the world.",
    heroCta: "EXPLORE COLLECTION",
    sigTitle: "THE SIGNATURE BLAZER",
    sigDesc: "Timeless shapes. Modern attitude.",
    sigLink: "SHOP BLAZERS",
    wolfTitle: "THE HOUSE OF THE WOLF",
    wolfText: "Maison de Loup translates to 'The House of the Wolf'. Inspired by the wolf's profound symbolism of freedom, power, and independence in Turkish culture, Maison De Loup Atelier merges Turkish design mastery with global high-fashion silhouettes.",
    wolfLink: "OUR STORY",
    catTitle: "SHOP BY CATEGORY",
    catalogHeading: "THE COLLECTION",
    catalogSub: "Hero Blazers &bull; Complementary Line &bull; Accessible Luxury",
    journalHeading: "THE JOURNAL",
    journalSub: "Fashion, Inspiration. The Maison De Loup Atelier world.",
    journalCta: "EXPLORE EDITORIAL",
    card1Title: "QUALITY IN EVERY DETAIL",
    card1Text: "From design to fabric, craftsmanship to experience — quality is our promise. Rooted in 15 years of industry mastery.",
    card1Link: "OUR VALUES",
    card2Title: "THE ANATOMY OF FIT",
    card2Text: "Sculpted shoulders, internal canvas structure, and engineered drape. Tailored to empower women.",
    card2Link: "ATELIER CRAFT",
    newsletterTitle: "JOIN OUR WORLD",
    newsletterDesc: "Be the first to know about new arrivals, private salon presentations and limited drops.",
    shippingLimit: "Complimentary Worldwide Express Delivery on orders over €250 / $270",
    emptyCart: "Your shopping bag is currently empty.",
    subtotal: "SUBTOTAL",
    checkout: "PROCEED TO CHECKOUT",
    quickView: "QUICK VIEW",
    addToBag: "ADD TO BAG"
  }
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  await loadCustomContentAndProducts();
  initHeaderScroll();
  initHeroSlider();
  initCurrencyAndLang();
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
});

// Load customized content and products from API, static JSON, or localStorage
async function loadCustomContentAndProducts() {
  // Apply baked-in latest default content immediately so there is zero flash
  applyCustomContent(DEFAULT_CONTENT);

  // 1. Check customized products in localStorage
  const savedProducts = localStorage.getItem('mdl_custom_products');
  if (savedProducts) {
    try {
      STATE.products = JSON.parse(savedProducts);
    } catch(e) {}
  } else {
    // Try fetching from server API or static products.json
    try {
      let res = await fetch('/api/products');
      if (!res.ok) res = await fetch('products.json');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          STATE.products = data;
        }
      }
    } catch(e) {
      try {
        const res = await fetch('products.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) STATE.products = data;
        }
      } catch(err) {}
    }
  }

  // 2. Check customized content (images, banners, texts)
  const savedContent = localStorage.getItem('mdl_custom_content');
  if (savedContent) {
    try {
      STATE.content = JSON.parse(savedContent);
      // Migrate old cached image paths if present in user's browser localStorage
      if (!STATE.content.card1Image || STATE.content.card1Image.includes('quality_label.jpg')) {
        STATE.content.card1Image = 'assets/images/quality_label_hd.jpg';
      }
      if (!STATE.content.card2Image || STATE.content.card2Image.includes('tailoring_back.jpg')) {
        STATE.content.card2Image = 'assets/images/tailoring_fit_hd.jpg';
      }
      if (STATE.content.catImages) {
        Object.keys(STATE.content.catImages).forEach(k => {
          if (!STATE.content.catImages[k] || !STATE.content.catImages[k].includes('_hd')) {
            STATE.content.catImages[k] = `assets/images/cat_${k}_hd.jpg`;
          }
        });
      }
      localStorage.setItem('mdl_custom_content', JSON.stringify(STATE.content));
      applyCustomContent(STATE.content);
    } catch(e) {}
  } else {
    // Try fetching from server API or static content.json
    try {
      let res = await fetch('/api/content');
      if (!res.ok) res = await fetch('content.json');
      if (res.ok) {
        STATE.content = await res.json();
        applyCustomContent(STATE.content);
      }
    } catch(e) {
      try {
        const res = await fetch('content.json');
        if (res.ok) {
          STATE.content = await res.json();
          applyCustomContent(STATE.content);
        }
      } catch(err) {}
    }
  }
}

function applyCustomContent(c) {
  if (!c) return;

  // 1. Signature Blazer (Split Sol Kolon) - Kullanıcının görselinde işaret ettiği alan
  if (c.sigPretitleTR) {
    const el = document.getElementById('sigPretitle');
    if (el) el.innerText = c.sigPretitleTR;
  }
  if (c.sigTitleTR) {
    const el = document.getElementById('sigTitle');
    if (el) el.innerText = c.sigTitleTR;
    TRANSLATIONS.TR.sigTitle = c.sigTitleTR;
  }
  if (c.sigDescTR) {
    const el = document.getElementById('sigDesc');
    if (el) el.innerText = c.sigDescTR;
    TRANSLATIONS.TR.sigDesc = c.sigDescTR;
  }
  if (c.sigLinkTR) {
    const el = document.getElementById('sigLinkText');
    if (el) el.innerText = c.sigLinkTR;
    TRANSLATIONS.TR.sigLink = c.sigLinkTR;
  }

  // 2. The House of the Wolf (Split Sağ Kolon)
  if (c.wolfTitleTR) {
    const el = document.getElementById('wolfTitle');
    if (el) el.innerText = c.wolfTitleTR;
    TRANSLATIONS.TR.wolfTitle = c.wolfTitleTR;
  }
  if (c.wolfTextTR) {
    const el = document.getElementById('wolfText');
    if (el) el.innerText = c.wolfTextTR;
    TRANSLATIONS.TR.wolfText = c.wolfTextTR;
  }
  if (c.wolfLinkTR) {
    const el = document.getElementById('wolfLinkText');
    if (el) el.innerText = c.wolfLinkTR;
    TRANSLATIONS.TR.wolfLink = c.wolfLinkTR;
  }

  // 3. Hero & Tepe Banner
  if (c.heroTitle) {
    const el = document.getElementById('heroTitle');
    if (el) el.innerText = c.heroTitle;
  }
  if (c.heroSubTR) {
    const el = document.getElementById('heroSub');
    if (el) el.innerText = c.heroSubTR;
    TRANSLATIONS.TR.heroSub = c.heroSubTR;
  }
  if (c.heroProvTR) {
    const el = document.getElementById('heroProv');
    if (el) el.innerHTML = c.heroProvTR;
    TRANSLATIONS.TR.heroProv = c.heroProvTR;
  }
  if (c.heroCtaTR) {
    const el = document.getElementById('heroCtaText');
    if (el) el.innerText = c.heroCtaTR;
    TRANSLATIONS.TR.heroCta = c.heroCtaTR;
  }
  if (c.announcementTextTR) {
    const el = document.getElementById('announcementText');
    if (el) el.innerHTML = c.announcementTextTR;
    TRANSLATIONS.TR.announcement = c.announcementTextTR;
  }

  // 4. Kategoriler & Koleksiyon
  if (c.catTitleTR) {
    const el = document.getElementById('catTitle');
    if (el) el.innerText = c.catTitleTR;
    TRANSLATIONS.TR.catTitle = c.catTitleTR;
  }
  if (c.catalogHeadingTR) {
    const el = document.getElementById('catalogHeading');
    if (el) el.innerText = c.catalogHeadingTR;
    TRANSLATIONS.TR.catalogHeading = c.catalogHeadingTR;
  }
  if (c.catalogSubTR) {
    const el = document.getElementById('catalogSub');
    if (el) el.innerHTML = c.catalogSubTR;
    TRANSLATIONS.TR.catalogSub = c.catalogSubTR;
  }

  // 5. The Journal
  if (c.journalHeadingTR) {
    const el = document.getElementById('journalHeading');
    if (el) el.innerText = c.journalHeadingTR;
    TRANSLATIONS.TR.journalHeading = c.journalHeadingTR;
  }
  if (c.journalSubTR) {
    const el = document.getElementById('journalSub');
    if (el) el.innerText = c.journalSubTR;
    TRANSLATIONS.TR.journalSub = c.journalSubTR;
  }
  if (c.journalCtaTR) {
    const el = document.getElementById('journalCtaText');
    if (el) el.innerText = c.journalCtaTR;
    TRANSLATIONS.TR.journalCta = c.journalCtaTR;
  }

  // 6. Marka Değerleri & Bülten Kartları
  if (c.card1TitleTR) {
    const el = document.getElementById('card1Title');
    if (el) el.innerText = c.card1TitleTR;
    TRANSLATIONS.TR.card1Title = c.card1TitleTR;
  }
  if (c.card1TextTR) {
    const el = document.getElementById('card1Text');
    if (el) el.innerText = c.card1TextTR;
    TRANSLATIONS.TR.card1Text = c.card1TextTR;
  }
  if (c.card1LinkTR) {
    const el = document.getElementById('card1LinkText');
    if (el) el.innerText = c.card1LinkTR;
    TRANSLATIONS.TR.card1Link = c.card1LinkTR;
  }

  if (c.card2TitleTR) {
    const el = document.getElementById('card2Title');
    if (el) el.innerText = c.card2TitleTR;
    TRANSLATIONS.TR.card2Title = c.card2TitleTR;
  }
  if (c.card2TextTR) {
    const el = document.getElementById('card2Text');
    if (el) el.innerText = c.card2TextTR;
    TRANSLATIONS.TR.card2Text = c.card2TextTR;
  }
  if (c.card2LinkTR) {
    const el = document.getElementById('card2LinkText');
    if (el) el.innerText = c.card2LinkTR;
    TRANSLATIONS.TR.card2Link = c.card2LinkTR;
  }

  if (c.newsletterTitleTR) {
    const el = document.getElementById('newsletterTitle');
    if (el) el.innerText = c.newsletterTitleTR;
    TRANSLATIONS.TR.newsletterTitle = c.newsletterTitleTR;
  }
  if (c.newsletterDescTR) {
    const el = document.getElementById('newsletterDesc');
    if (el) el.innerText = c.newsletterDescTR;
    TRANSLATIONS.TR.newsletterDesc = c.newsletterDescTR;
  }

  // 7. Modals
  if (c.storyVisionTR) {
    const el = document.getElementById('modalStoryVision');
    if (el) el.innerHTML = c.storyVisionTR.replace(/\n/g, '<br>');
  }
  if (c.storyMissionTR) {
    const el = document.getElementById('modalStoryMission');
    if (el) el.innerHTML = c.storyMissionTR.replace(/\n/g, '<br>');
  }
  if (c.storyFounderTR) {
    const el = document.getElementById('modalStoryFounder');
    if (el) el.innerHTML = c.storyFounderTR.replace(/\n/g, '<br>');
  }

  // Images
  if (c.heroSlide1) document.getElementById('heroImg1')?.setAttribute('src', c.heroSlide1);
  if (c.heroSlide2) document.getElementById('heroImg2')?.setAttribute('src', c.heroSlide2);
  if (c.heroSlide3) document.getElementById('heroImg3')?.setAttribute('src', c.heroSlide3);
  if (c.sigImage) document.getElementById('sigImage')?.setAttribute('src', c.sigImage);
  if (c.wolfImage) document.getElementById('wolfImage')?.setAttribute('src', c.wolfImage);
  if (c.journalImage) document.getElementById('journalImage')?.setAttribute('src', c.journalImage);
  // Pillar cards
  let c1 = c.card1Image || 'assets/images/quality_label_hd.jpg';
  if (c1.includes('quality_label.jpg')) c1 = 'assets/images/quality_label_hd.jpg';
  document.getElementById('card1Image')?.setAttribute('src', c1.split('?')[0] + '?t=179248');

  let c2 = c.card2Image || 'assets/images/tailoring_fit_hd.jpg';
  if (c2.includes('tailoring_back.jpg')) c2 = 'assets/images/tailoring_fit_hd.jpg';
  document.getElementById('card2Image')?.setAttribute('src', c2.split('?')[0] + '?t=179248');

  // Categories images
  if (c.catImages) {
    const getCatUrl = (val, fallback) => {
      let u = val || fallback;
      if (!u.includes('_hd')) u = fallback;
      return u.split('?')[0] + '?t=179249';
    };
    document.getElementById('catImgBlazers')?.setAttribute('src', getCatUrl(c.catImages.blazers, 'assets/images/cat_blazers_hd.jpg'));
    document.getElementById('catImgTrousers')?.setAttribute('src', getCatUrl(c.catImages.trousers, 'assets/images/cat_trousers_hd.jpg'));
    document.getElementById('catImgShirts')?.setAttribute('src', getCatUrl(c.catImages.shirts, 'assets/images/cat_shirts_hd.jpg'));
    document.getElementById('catImgTops')?.setAttribute('src', getCatUrl(c.catImages.tops, 'assets/images/cat_tops_hd.jpg'));
    document.getElementById('catImgDresses')?.setAttribute('src', getCatUrl(c.catImages.dresses, 'assets/images/cat_dresses_hd.jpg'));
    document.getElementById('catImgSkirts')?.setAttribute('src', getCatUrl(c.catImages.skirts, 'assets/images/cat_skirts_hd.jpg'));
  }
}

// ==========================================================================
// HEADER SCROLL EFFECT
// ==========================================================================
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==========================================================================
// HERO SLIDER CONTROLS
// ==========================================================================
let heroInterval;

function initHeroSlider() {
  const steps = document.querySelectorAll('.hero-step');
  const slides = document.querySelectorAll('.hero-slide');

  window.switchHeroSlide = function(index) {
    STATE.currentHeroSlide = index;
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });
    steps.forEach((st, idx) => {
      st.classList.toggle('active', idx === index);
    });
  };

  heroInterval = setInterval(() => {
    let nextIndex = (STATE.currentHeroSlide + 1) % slides.length;
    switchHeroSlide(nextIndex);
  }, 6500);
}

// ==========================================================================
// CURRENCY & LANGUAGE CONTROLLER
// ==========================================================================
function initCurrencyAndLang() {
  const curSelect = document.getElementById('currencySelect');
  const langSelect = document.getElementById('langSelect');

  curSelect.addEventListener('change', (e) => {
    STATE.currentCurrency = e.target.value;
    renderProducts();
    renderCart();
    showToast(`Para birimi güncellendi: ${STATE.currentCurrency}`);
  });

  langSelect.addEventListener('change', (e) => {
    STATE.currentLang = e.target.value;
    applyLanguage();
    renderProducts();
    showToast(STATE.currentLang === 'TR' ? 'Dil Türkçe olarak ayarlandı' : 'Language set to English');
  });
}

function formatPrice(tryAmount) {
  const cur = CURRENCY_RATES[STATE.currentCurrency];
  const converted = Math.round(tryAmount * cur.rate);

  if (cur.position === 'before') {
    return `${cur.symbol}${converted.toLocaleString('en-US')}`;
  } else {
    return `₺${converted.toLocaleString('tr-TR')}`;
  }
}

function applyLanguage() {
  if (STATE.currentLang === 'TR' && STATE.content) {
    applyCustomContent(STATE.content);
  }

  const t = TRANSLATIONS[STATE.currentLang];
  document.getElementById('announcementText').innerHTML = t.announcement;
  document.getElementById('heroSub').innerText = t.heroSub;
  document.getElementById('heroProv').innerHTML = t.heroProv;
  document.getElementById('heroCtaText').innerText = t.heroCta;

  const sigPre = document.getElementById('sigPretitle');
  if (sigPre) {
    sigPre.innerText = STATE.currentLang === 'TR'
      ? (STATE.content?.sigPretitleTR || 'HERO CREATION')
      : (STATE.content?.sigPretitleEN || 'HERO CREATION');
  }

  document.getElementById('sigTitle').innerText = t.sigTitle;
  document.getElementById('sigDesc').innerText = t.sigDesc;
  document.getElementById('sigLinkText').innerText = t.sigLink;
  document.getElementById('wolfTitle').innerText = t.wolfTitle;
  document.getElementById('wolfText').innerText = t.wolfText;
  document.getElementById('wolfLinkText').innerText = t.wolfLink;
  document.getElementById('catTitle').innerText = t.catTitle;
  document.getElementById('catalogHeading').innerText = t.catalogHeading;
  document.getElementById('catalogSub').innerText = t.catalogSub;
  document.getElementById('journalHeading').innerText = t.journalHeading;
  document.getElementById('journalSub').innerText = t.journalSub;
  document.getElementById('journalCtaText').innerText = t.journalCta;
  document.getElementById('card1Title').innerText = t.card1Title;
  document.getElementById('card1Text').innerText = t.card1Text;
  document.getElementById('card1LinkText').innerText = t.card1Link;
  document.getElementById('card2Title').innerText = t.card2Title;
  document.getElementById('card2Text').innerText = t.card2Text;
  document.getElementById('card2LinkText').innerText = t.card2Link;
  document.getElementById('newsletterTitle').innerText = t.newsletterTitle;
  document.getElementById('newsletterDesc').innerText = t.newsletterDesc;
  document.getElementById('shippingBarText').innerText = t.shippingLimit;
  document.getElementById('subtotalLabel').innerText = t.subtotal;
  document.getElementById('checkoutBtn').innerText = t.checkout;
}

// ==========================================================================
// PRODUCT CATALOG RENDERING & FILTERING
// ==========================================================================
function filterCatalog(category) {
  STATE.currentCategory = category;

  // Update filter pills
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-filter') === category);
  });

  renderProducts();

  // Scroll smoothly to catalog
  const catalogEl = document.getElementById('catalog');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const sort = document.getElementById('sortSelect').value;

  let items = [...STATE.products];

  // Filter
  if (STATE.currentCategory !== 'all') {
    items = items.filter(p => p.category === STATE.currentCategory);
  }

  // Sort
  if (sort === 'price-asc') {
    items.sort((a, b) => a.priceTRY - b.priceTRY);
  } else if (sort === 'price-desc') {
    items.sort((a, b) => b.priceTRY - a.priceTRY);
  } else if (sort === 'new') {
    items.reverse();
  }

  // Update count label
  document.getElementById('productCountLabel').innerText = 
    `${items.length} ${STATE.currentLang === 'TR' ? 'Parça' : 'Pieces'}`;

  // Render cards
  grid.innerHTML = items.map(product => {
    const isWishlisted = STATE.wishlist.includes(product.id);
    const title = STATE.currentLang === 'TR' ? (product.nameTr || product.name) : product.name;
    const fabric = STATE.currentLang === 'TR' ? (product.fabricTr || product.fabric) : product.fabric;
    const images = (product.images && product.images.length > 0)
      ? product.images
      : [product.primaryImage, product.secondaryImage || product.primaryImage];

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-container" onclick="openQuickView('${product.id}')">
          <img src="${images[0]}" alt="${title}" class="product-img primary" id="cardImg-${product.id}" loading="lazy">
          <span class="product-badge">${product.badge || 'ATELIER'}</span>
          
          <button class="wishlist-heart-btn ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
                  aria-label="Favorilere ekle">
            <svg width="16" height="16" fill="${isWishlisted ? '#e11d48' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>

          <!-- 5-Photo Indicator Dots on Catalog Card -->
          <div class="card-dots-bar" onclick="event.stopPropagation()">
            ${images.map((img, dotIdx) => `
              <span class="card-dot-pill ${dotIdx === 0 ? 'active' : ''}" 
                    title="Görsel 0${dotIdx + 1}"
                    onmouseenter="switchCardPreviewImage('${product.id}', '${img}', this)"
                    onclick="switchCardPreviewImage('${product.id}', '${img}', this)"></span>
            `).join('')}
          </div>

          <div class="quick-action-overlay">
            <button class="btn-quick-view" onclick="event.stopPropagation(); openQuickView('${product.id}')">
              ${STATE.currentLang === 'TR' ? 'HIZLI BAKIŞ (5 GÖRSEL)' : 'QUICK VIEW (5 PHOTOS)'}
            </button>
            <div class="size-quick-select" onclick="event.stopPropagation()">
              ${(product.sizes || ["36"]).map(size => `
                <button class="size-pill-btn" onclick="addToCart('${product.id}', '${size}')">${size}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="product-info">
          <div class="product-meta-row">
            <h3 class="product-title" onclick="openQuickView('${product.id}')">${title}</h3>
            <span class="product-price">${formatPrice(product.priceTRY)}</span>
          </div>
          <span class="product-fabric-hint">${fabric}</span>
          <div class="product-colors">
            ${(product.colors || []).map(c => `
              <span class="color-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function switchCardPreviewImage(productId, imgSrc, dotEl) {
  const img = document.getElementById(`cardImg-${productId}`);
  if (img) img.src = imgSrc;

  const parent = dotEl.parentElement;
  if (parent) {
    parent.querySelectorAll('.card-dot-pill').forEach(d => d.classList.remove('active'));
    dotEl.classList.add('active');
  }
}

// ==========================================================================
// QUICK VIEW MODAL (5-PHOTO INTERACTIVE GALLERY)
// ==========================================================================
let currentSelectedSize = null;
let qvActiveProduct = null;
let qvActiveImageIndex = 0;

function openQuickView(productId, initialImageIndex = 0) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  qvActiveProduct = product;
  qvActiveImageIndex = initialImageIndex;
  currentSelectedSize = (product.sizes && product.sizes[0]) || "36";

  const title = STATE.currentLang === 'TR' ? (product.nameTr || product.name) : product.name;
  const desc = STATE.currentLang === 'TR' ? (product.descriptionTr || product.description) : product.description;
  const fabric = STATE.currentLang === 'TR' ? (product.fabricTr || product.fabric) : product.fabric;
  const fit = STATE.currentLang === 'TR' ? (product.fitTr || product.fit) : product.fit;
  const categoryObj = CATEGORIES_DATA.find(c => c.id === product.category);
  const categoryName = STATE.currentLang === 'TR' 
    ? (categoryObj?.nameTr || 'BLAZER & KOLEKSİYON') 
    : (categoryObj?.name || 'COLLECTION');
  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.primaryImage, product.secondaryImage || product.primaryImage];

  const card = document.getElementById('quickViewCard');
  card.innerHTML = `
    <!-- Top Exit & Navigation Bar (Ana Sayfaya Dön & Çıkış) -->
    <div class="qv-top-bar">
      <button class="qv-bar-back-btn" onclick="closeQuickViewModal(true)" title="Ana Sayfaya Geri Dön">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span>${STATE.currentLang === 'TR' ? 'ANA SAYFAYA DÖN' : 'BACK TO HOME'}</span>
      </button>

      <div class="qv-bar-title">
        <span class="qv-bar-brand">MAISON DE LOUP ATELIER</span>
        <span class="qv-bar-sep">&bull;</span>
        <span class="qv-bar-cat">${categoryName}</span>
        <span class="qv-bar-sep">/</span>
        <span class="qv-bar-prod">${title}</span>
      </div>

      <button class="qv-bar-close-btn" onclick="closeQuickViewModal(false)" title="İncelemeden Çık (ESC)">
        <span>${STATE.currentLang === 'TR' ? 'ÇIKIŞ' : 'EXIT'}</span>
        <span class="qv-esc-tag">ESC</span>
        <span class="qv-bar-x">&times;</span>
      </button>
    </div>

    <!-- 5-Photo Interactive Gallery -->
    <div class="qv-gallery-wrapper">
      <!-- 5 Thumbnails Rail -->
      <div class="qv-thumb-rail" id="qvThumbRail">
        ${images.map((imgSrc, idx) => `
          <div class="qv-thumb-item ${idx === qvActiveImageIndex ? 'active' : ''}" 
               onclick="switchQvImage(${idx})" 
               title="Açı 0${idx + 1}">
            <img src="${imgSrc}" alt="${title} Açı ${idx + 1}" loading="lazy">
            <span class="qv-thumb-index">${idx + 1}</span>
          </div>
        `).join('')}
      </div>

      <!-- Main Stage Viewport -->
      <div class="qv-main-stage">
        <img src="${images[qvActiveImageIndex]}" alt="${title}" id="qvMainImg" class="qv-stage-img">

        <!-- Stage Home Shortcut Button -->
        <button class="qv-stage-home-shortcut" onclick="closeQuickViewModal(true)" title="Ana Sayfaya Dön">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>${STATE.currentLang === 'TR' ? 'Ana Sayfa' : 'Home'}</span>
        </button>

        <!-- Navigation Arrows -->
        <button class="qv-stage-arrow prev" onclick="navigateQvImage(-1)" aria-label="Önceki Görsel">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button class="qv-stage-arrow next" onclick="navigateQvImage(1)" aria-label="Sonraki Görsel">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Active Counter Badge -->
        <div class="qv-stage-counter" id="qvStageCounter">
          <span>0${qvActiveImageIndex + 1}</span> / <span>0${images.length}</span>
        </div>

        <!-- Fabric Zoom Badge -->
        <div class="qv-zoom-badge">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
          </svg>
          ${STATE.currentLang === 'TR' ? '5 FOTOĞRAF &bull; TERZİ DETAYI' : '5 ANGLES &bull; TAILORING'}
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div class="quick-view-details">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span class="qv-badge">${product.badge || 'ATELIER'}</span>
          <button class="qv-details-exit-btn" onclick="closeQuickViewModal(true)" title="Ana Sayfaya Geri Dön">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>${STATE.currentLang === 'TR' ? 'Ana Sayfaya Dön' : 'Back to Home'}</span>
          </button>
        </div>
        <h2 class="qv-title">${title}</h2>
        <div class="qv-price">${formatPrice(product.priceTRY)}</div>
        <p class="qv-desc" style="margin-top: 16px;">${desc || (STATE.currentLang === 'TR' ? 'Maison De Loup Atelier özel tasarımı.' : 'Maison De Loup Atelier bespoke design.')}</p>
      </div>

      <div>
        <div class="qv-section-label">${STATE.currentLang === 'TR' ? 'BEDEN SEÇİMİ (EU)' : 'SELECT SIZE (EU)'}</div>
        <div class="qv-sizes" id="qvSizesContainer">
          ${(product.sizes || ["36"]).map((s, idx) => `
            <button class="qv-size-btn ${idx === 0 ? 'selected' : ''}" onclick="selectQvSize('${s}', this)">${s}</button>
          `).join('')}
        </div>
      </div>

      <div style="font-size: 0.75rem; color: #a1a1aa; line-height: 1.8;">
        <div><strong>${STATE.currentLang === 'TR' ? 'Kumaş:' : 'Fabric:'}</strong> ${fabric}</div>
        <div><strong>${STATE.currentLang === 'TR' ? 'Kalıp:' : 'Fit:'}</strong> ${fit}</div>
      </div>

      <div>
        <div class="qv-actions-row">
          <button class="qv-add-to-cart" onclick="addToCart('${product.id}', currentSelectedSize); closeQuickViewModal(false);">
            ${STATE.currentLang === 'TR' ? 'ÇANTAYA EKLE' : 'ADD TO BAG'} &bull; ${formatPrice(product.priceTRY)}
          </button>
          <button class="qv-wishlist-toggle" onclick="toggleWishlist('${product.id}')" aria-label="Favorilere ekle">
            <svg width="20" height="20" fill="${STATE.wishlist.includes(product.id) ? '#e11d48' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </button>
        </div>

        <!-- Dedicated Exit / Return to Home Button at bottom of inspection -->
        <div class="qv-footer-nav-row">
          <button class="qv-back-to-home-full-btn" onclick="closeQuickViewModal(true)">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>${STATE.currentLang === 'TR' ? 'İNCELEMEYİ BİTİR &bull; ANA SAYFAYA GERİ DÖN' : 'EXIT INSPECTION &bull; RETURN TO HOME'}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('quickViewModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectQvSize(size, btnEl) {
  currentSelectedSize = size;
  const container = document.getElementById('qvSizesContainer');
  if (container) {
    container.querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('selected'));
  }
  if (btnEl) {
    btnEl.classList.add('selected');
  }
}
window.selectQvSize = selectQvSize;

function closeQuickViewModal(scrollToTop = false) {
  const modal = document.getElementById('quickViewModal');
  if (modal) {
    modal.classList.remove('active');
  }
  qvActiveProduct = null;
  document.body.style.overflow = '';

  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(STATE.currentLang === 'TR' ? 'Ana sayfaya dönüldü.' : 'Returned to Home.');
  }
}
window.closeQuickViewModal = closeQuickViewModal;

function switchQvImage(index) {
  if (!qvActiveProduct) return;
  const images = (qvActiveProduct.images && qvActiveProduct.images.length > 0)
    ? qvActiveProduct.images
    : [qvActiveProduct.primaryImage];

  if (index < 0 || index >= images.length) return;
  qvActiveImageIndex = index;

  const mainImg = document.getElementById('qvMainImg');
  if (mainImg) {
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = images[index];
      mainImg.style.opacity = '1';
    }, 150);
  }

  // Update thumbnail states
  const thumbItems = document.querySelectorAll('.qv-thumb-item');
  thumbItems.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });

  // Update counter
  const counterEl = document.getElementById('qvStageCounter');
  if (counterEl) {
    counterEl.innerHTML = `<span>0${index + 1}</span> / <span>0${images.length}</span>`;
  }
}

function navigateQvImage(direction) {
  if (!qvActiveProduct) return;
  const images = (qvActiveProduct.images && qvActiveProduct.images.length > 0)
    ? qvActiveProduct.images
    : [qvActiveProduct.primaryImage];

  let nextIndex = qvActiveImageIndex + direction;
  if (nextIndex < 0) nextIndex = images.length - 1;
  if (nextIndex >= images.length) nextIndex = 0;

  switchQvImage(nextIndex);
}

// Keyboard arrow navigation and ESC key for quick view modal
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('quickViewModal');
  if (!modal || !modal.classList.contains('active')) return;

  if (e.key === 'ArrowLeft') {
    navigateQvImage(-1);
  } else if (e.key === 'ArrowRight') {
    navigateQvImage(1);
  } else if (e.key === 'Escape') {
    closeQuickViewModal(false);
  }
});

// Scroll listener for floating Back-to-Top / Home button
window.addEventListener('scroll', () => {
  const topBtn = document.getElementById('backToTopBtn');
  if (topBtn) {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  }
});

// ==========================================================================
// CART FUNCTIONALITY
// ==========================================================================
function addToCart(productId, size = '36') {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = STATE.cart.findIndex(item => item.id === productId && item.size === size);

  if (existingIndex > -1) {
    STATE.cart[existingIndex].quantity += 1;
  } else {
    STATE.cart.push({
      id: product.id,
      name: product.name,
      nameTr: product.nameTr || product.name,
      priceTRY: product.priceTRY,
      image: product.primaryImage,
      size: size,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadge();
  renderCart();
  openCartDrawer();

  const title = STATE.currentLang === 'TR' ? (product.nameTr || product.name) : product.name;
  showToast(`${title} (${size}) çantaya eklendi.`);
}

function changeCartQty(index, delta) {
  if (!STATE.cart[index]) return;
  STATE.cart[index].quantity += delta;

  if (STATE.cart[index].quantity <= 0) {
    STATE.cart.splice(index, 1);
  }

  saveCart();
  updateCartBadge();
  renderCart();
}

function saveCart() {
  localStorage.setItem('mdl_cart', JSON.stringify(STATE.cart));
}

function updateCartBadge() {
  const total = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = total;
  document.getElementById('cartDrawerCount').innerText = total;
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  const progressEl = document.getElementById('shippingProgress');

  if (STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <p>${STATE.currentLang === 'TR' ? 'Alışveriş çantanız henüz boş.' : 'Your shopping bag is empty.'}</p>
        <p style="font-size: 0.72rem; margin-top: 8px;">${STATE.currentLang === 'TR' ? 'Koleksiyonumuzdaki imza parçaları keşfedin.' : 'Discover our signature collection.'}</p>
      </div>
    `;
    subtotalEl.innerText = formatPrice(0);
    progressEl.style.width = '0%';
    return;
  }

  let subtotalTRY = 0;

  container.innerHTML = STATE.cart.map((item, idx) => {
    const itemTotalTRY = item.priceTRY * item.quantity;
    subtotalTRY += itemTotalTRY;
    const title = STATE.currentLang === 'TR' ? item.nameTr : item.name;

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${title}" class="cart-item-img">
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-name">${title}</h4>
            <div class="cart-item-variant">EU ${item.size}</div>
          </div>
          <div class="cart-item-qty-row">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">&minus;</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">&plus;</button>
            </div>
            <span class="cart-item-price">${formatPrice(itemTotalTRY)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  subtotalEl.innerText = formatPrice(subtotalTRY);

  const freeThreshold = 8000;
  const pct = Math.min(100, Math.round((subtotalTRY / freeThreshold) * 100));
  progressEl.style.width = `${pct}%`;
}

function openCartDrawer() {
  document.getElementById('cartDrawer').classList.add('active');
  document.getElementById('drawerBackdrop').classList.add('active');
}

function proceedToCheckout() {
  if (STATE.cart.length === 0) {
    showToast(STATE.currentLang === 'TR' ? 'Çantanız boş.' : 'Your cart is empty.');
    return;
  }
  closeAllDrawers();
  showToast(STATE.currentLang === 'TR' 
    ? 'Güvenli Ödeme Altyapısına Yönlendiriliyorsunuz (Maison De Loup Atelier Checkout)...' 
    : 'Redirecting to Secure Atelier Checkout...');
}

// ==========================================================================
// WISHLIST CONTROLLER
// ==========================================================================
function toggleWishlist(productId) {
  const index = STATE.wishlist.indexOf(productId);
  if (index > -1) {
    STATE.wishlist.splice(index, 1);
    showToast(STATE.currentLang === 'TR' ? 'Ürün favorilerden kaldırıldı.' : 'Item removed from wishlist.');
  } else {
    STATE.wishlist.push(productId);
    showToast(STATE.currentLang === 'TR' ? 'Ürün favorilerinize eklendi.' : 'Item saved to wishlist.');
  }

  localStorage.setItem('mdl_wishlist', JSON.stringify(STATE.wishlist));
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  document.getElementById('wishlistCount').innerText = STATE.wishlist.length;
}

// ==========================================================================
// SEARCH DRAWER
// ==========================================================================
document.getElementById('btnOpenSearch').addEventListener('click', () => {
  document.getElementById('searchDrawer').classList.add('active');
  document.getElementById('drawerBackdrop').classList.add('active');
  document.getElementById('liveSearchInput').focus();
});

function handleLiveSearch(query) {
  const resultsBox = document.getElementById('searchResultsBox');
  const q = query.toLowerCase().trim();

  if (!q) {
    resultsBox.innerHTML = '';
    return;
  }

  const matches = STATE.products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    (p.nameTr && p.nameTr.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q) ||
    (p.fabric && p.fabric.toLowerCase().includes(q))
  );

  if (matches.length === 0) {
    resultsBox.innerHTML = `<p style="grid-column: 1/-1; color: #71717a; font-size: 0.85rem;">"${query}" ile eşleşen parça bulunamadı.</p>`;
    return;
  }

  resultsBox.innerHTML = matches.map(p => `
    <div style="display: flex; gap: 12px; cursor: pointer; background: #18181b; padding: 8px;" onclick="closeAllDrawers(); openQuickView('${p.id}')">
      <img src="${p.primaryImage}" style="width: 50px; height: 65px; object-fit: cover;">
      <div>
        <div style="font-size: 0.85rem; font-family: var(--font-serif);">${STATE.currentLang === 'TR' ? (p.nameTr || p.name) : p.name}</div>
        <div style="font-size: 0.75rem; color: #a1a1aa;">${formatPrice(p.priceTRY)}</div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// MODALS MANAGEMENT
// ==========================================================================
function openStoryModal() {
  closeAllDrawers();
  document.getElementById('storyModal').classList.add('active');
}

function closeStoryModal() {
  document.getElementById('storyModal').classList.remove('active');
}

function openJournalModal() {
  closeAllDrawers();
  document.getElementById('journalModal').classList.add('active');
}

function closeJournalModal() {
  document.getElementById('journalModal').classList.remove('active');
}

function openAtelierModal() {
  openStoryModal();
}

function openAccountModal() {
  showToast(STATE.currentLang === 'TR' ? 'Maison De Loup Atelier VIP Müşteri Portalı hazırlanıyor.' : 'VIP Client Portal opening soon.');
}

function closeAllDrawers() {
  document.getElementById('cartDrawer').classList.remove('active');
  document.getElementById('searchDrawer').classList.remove('active');
  document.getElementById('drawerBackdrop').classList.remove('active');
  closeStoryModal();
  closeJournalModal();
  closeQuickViewModal();
}

document.getElementById('btnOpenCart').addEventListener('click', openCartDrawer);
document.getElementById('btnOpenWishlist').addEventListener('click', () => {
  if (STATE.wishlist.length === 0) {
    showToast(STATE.currentLang === 'TR' ? 'Favori listeniz boş.' : 'Your wishlist is empty.');
    return;
  }
  filterCatalog('all');
  showToast(`${STATE.wishlist.length} favori parça filtrelendi.`);
});

// Newsletter Form
function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  if (email) {
    showToast(STATE.currentLang === 'TR' 
      ? `Teşekkürler! ${email} adresi Maison De Loup Atelier ayrıcalıklar dünyasına kaydedildi.` 
      : `Thank you! ${email} has been subscribed to the Maison De Loup Atelier inner circle.`);
    document.getElementById('newsletterEmail').value = '';
  }
}

// Toast Feedback System
function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>&bull;</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
