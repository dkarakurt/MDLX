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
  "sigPretitleTR": "İMZA TASARIM",
  "sigPretitleEN": "SIGNATURE PIECE",
  "sigTitleTR": "MODERN KADIN GİYİM",
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
  "card1TextTR": "Tasarımdan kumaşa, işçilikten ürün deneyimine kadar kaliteden ödün vermeden. 20 yılı aşkın sektör deneyimiyle.",
  "card1TextEN": "From design to fabric, craftsmanship to experience — quality is our promise. Rooted in over 20 years of textile mastery.",
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
  "storyFounderTR": "Yaklaşık 20 yılı aşkın tekstil ve moda sektöründeki deneyimim, Maison De Loup Atelier’nin en güçlü yapı taşlarından biri olacak. Kariyerim boyunca triko, dokuma, denim ve deri gibi farklı ürün gruplarıyla çalışırken tasarımın ve üretimin bütününe hakim bir deneyim kazandım.\n\nHedefim sadece güzel ürünler tasarlayan bir marka değil; hangi ürünün neden üretileceğini, hangi müşteriye hitap edeceğini bilen sürdürülebilir bir global moda markası kurmak."
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

// Product Badge Localization Map
const BADGE_MAP = {
  TR: {
    'HERO PIECE': 'İMZA PARÇA',
    'SIGNATURE': 'İMZA TASARIM',
    'TIMELESS': 'ZAMANSIZ',
    'ATELIER COUTURE': 'ATÖLYE COUTURE',
    'ESSENTIAL': 'TEMEL PARÇA',
    'BESTSELLER': 'ÇOK SATAN',
    'DNA ACCESSIBLE': 'ERİŞİLEBİLİR LÜKS',
    'LIMITED RUN': 'SINIRLI SAYIDA',
    'ATELIER': 'ATELIER'
  },
  EN: {
    'HERO PIECE': 'HERO PIECE',
    'SIGNATURE': 'SIGNATURE',
    'TIMELESS': 'TIMELESS',
    'ATELIER COUTURE': 'ATELIER COUTURE',
    'ESSENTIAL': 'ESSENTIAL',
    'BESTSELLER': 'BESTSELLER',
    'DNA ACCESSIBLE': 'ACCESSIBLE LUXURY',
    'LIMITED RUN': 'LIMITED RUN',
    'ATELIER': 'ATELIER'
  }
};

// Language Dictionary (with fallback for static / offline execution)
const TRANSLATIONS = {
  TR: {
    announcement: "Türkiye'de Tasarlandı — Dünyaya Açılan Türk Modası",
    nav: {
      newIn: "YENİ GELENLER",
      blazers: "BLAZER CEKET",
      clothing: "GİYİM",
      collections: "KOLEKSİYONLAR",
      editorial: "EDİTORYAL",
      about: "HAKKIMIZDA",
      contact: "İLETİŞİM"
    },
    heroSub: "THE ART OF THE BLAZER",
    heroProv: "Designed in Türkiye<br>Made for the world.",
    heroCta: "KOLEKSİYONU KEŞFET",
    heroStoryTag: "ATELIER HİKAYESİ",
    sigPretitle: "İMZA TASARIM",
    sigTitle: "MODERN KADIN GİYİM",
    sigDesc: "Zamansız silüetler. Modern tavır.",
    sigLink: "ÜRÜNLERİ İNCELE",
    wolfTitle: "KURDUN EVİ — THE HOUSE OF THE WOLF",
    wolfText: "Maison de Loup, 'Kurdun Evi' anlamına gelir. Özgürlük, güç, bağımsızlık ve yol göstericiliği temsil eden kurt sembolünden ilham alan Maison De Loup Atelier, Türk tasarımını global moda dünyasıyla buluşturan modern ve zamansız bir kadın giyim markasıdır.",
    wolfLink: "HİKAYEMİZ",
    catTitle: "KATEGORİLERE GÖRE KEŞFET",
    catBadge: "İMZA KOLEKSİYON",
    categories: {
      blazers: "BLAZER CEKET",
      trousers: "PANTOLON",
      shirts: "GÖMLEK",
      tops: "TRİKO & ÜST",
      dresses: "ELBİSE",
      skirts: "ETEK"
    },
    catalogHeading: "KOLEKSİYON",
    catalogSub: "Kadın Blazer Ceket • Tamamlayıcı Koleksiyon • Erişilebilir Lüks",
    sort: {
      featured: "ÖNE ÇIKANLAR",
      priceAsc: "FİYAT: DÜŞÜKTEN YÜKSEĞE",
      priceDesc: "FİYAT: YÜKSEKTEN DÜŞÜĞE",
      new: "YENİ GELENLER"
    },
    filterPills: {
      all: "TÜMÜ",
      blazers: "BLAZER CEKET (İMZA)",
      trousers: "PANTOLON",
      shirts: "GÖMLEK",
      tops: "TRİKO & ÜST",
      dresses: "ELBİSE",
      skirts: "ETEK"
    },
    journalHeading: "THE JOURNAL",
    journalSub: "Moda, İlham ve Maison De Loup Atelier Dünyası.",
    journalCta: "EDİTORYAL YAZILARI OKU",
    card1Title: "HER DETAYDA MÜKEMMELİYET",
    card1Text: "Tasarımdan kumaşa, işçilikten ürün deneyimine kadar kaliteden ödün vermeden. 20 yılı aşkın sektör deneyimiyle.",
    card1Link: "DEĞERLERİMİZ",
    card2Title: "MİMARİ TERZİLİK & KALIP",
    card2Text: "Keskin omuz hatları, hareket kabiliyeti sağlayan kavisler ve dökümlü saf yün kumaşlar.",
    card2Link: "ATÖLYE DETAYLARI",
    newsletterTitle: "DÜNYAMIZA KATILIN",
    newsletterDesc: "Yeni koleksiyonlar, özel atölye sunumları ve öncelikli sipariş fırsatlarından haberdar olun.",
    newsletterPlaceholder: "E-posta adresiniz",
    newsletterKvkk: "KVKK Aydınlatma Metni'ni okudum, kabul ediyorum.",
    searchPlaceholder: "Koleksiyonda ara (Blazer, Yün, Pantolon...)",
    cartTitle: "ALIŞVERİŞ ÇANTASI",
    shippingLimit: "Ücretsiz Dünya Çapında Ekspres Kargo için ₺8.000 limit",
    emptyCart: "Alışveriş çantanız henüz boş.",
    emptyCartSub: "Koleksiyonumuzdaki imza parçaları keşfedin.",
    subtotal: "ARA TOPLAM",
    checkout: "GÜVENLİ ÖDEMEYE GEÇ",
    quickView: "HIZLI BAKIŞ (5 GÖRSEL)",
    addToBag: "ÇANTAYA EKLE",
    storyModal: {
      subtitle: "KURDUN EVİ • THE HOUSE OF THE WOLF",
      visionBadge: "MARKA VİZYONU",
      visionTitle: "Kurdun Gücü ve Global Türk Tasarımı",
      visionText: "Maison de Loup… Fransızca karşılığıyla <strong>“Kurdun Evi.”</strong><br><br>Markanın çıkış noktası, kurdun Türk kültüründeki güçlü ve sembolik anlamından ilham alıyor. Kurt; özgürlüğü, gücü, bağımsızlığı ve yol göstericiliği temsil ediyor. Biz bu güçlü sembolü, modern ve global bir moda markasının kimliğine dönüştürmek istiyoruz.<br><br>Maison De Loup Atelier’nin amacı; Türk tasarımını yalnızca Türkiye’de değil, dünyanın farklı noktalarında erişilebilir ve tercih edilir hale getirmek. Bunu yaparken en önemli değerlerimizden biri kalite. Tasarımdan kumaşa, işçilikten ürün deneyimine kadar her aşamada kaliteden ödün vermeden; güncel trendleri takip eden ancak onları birebir kopyalamak yerine kendi kimliğiyle yorumlayan bir marka yaratmayı hedefliyoruz.",
      missionBadge: "MARKA MİSYONU",
      missionTitle: "Çağdaş Estetik ve Zamansız Değer",
      missionText: "Türk tasarım kültüründen ve yerel üretim gücünden beslenerek; çağdaş tasarım anlayışını yüksek kalite, özgünlük ve erişilebilirlik ile buluşturmak.<br><br>Farklı coğrafyalardaki kadınların ihtiyaçlarını ve yaşam tarzlarını anlayarak, onların stiline ilham veren, güçlü ve zamansız ürünler tasarlamak. Maison De Loup Atelier olarak misyonumuz; Türk tasarımının özgün karakterini global moda dünyasının dinamikleriyle birleştirerek, uluslararası ölçekte değer yaratan ve kadınların kendilerini ifade etmelerine alan açan bir moda markası olmak.",
      strategyBadge: "ÜRÜN VE TİCARİ HEDEFLERİMİZ",
      strategyTitle: "Kadın Blazer Ceket Merkezli 3 Temel Eksen",
      strategyText: "Maison De Loup Atelier’nin ürün stratejisinin merkezinde <strong>kadın blazer ceketi</strong> yer alır. Blazer; markanın imza ürünü ve tasarım kimliğini en güçlü şekilde yansıtan ana kategori olarak konumlandırılmıştır. Bunun yanında, blazerları tamamlayan ve kadınların günlük yaşamdan özel anlara kadar farklı kombin ihtiyaçlarına cevap verecek tamamlayıcı ürün grupları da koleksiyonun bir parçasıdır.",
      strategyAxes: "<strong>Ürün Stratejimizin 3 Temel Ekseni:</strong><br><strong>1. İmza Ürünler:</strong> Üst segment terzilik ve saf yün işçiliğiyle üretilen imza blazer ceketler.<br><strong>2. Tamamlayıcı Koleksiyon:</strong> Blazer silüetini kusursuz tamamlayan pantolon, poplin gömlek, ipek etek ve elbiseler.<br><strong>3. Markanın DNA’sını Taşıyan Erişilebilir Ürünler:</strong> Genç tüketicilerin dinamik beklentilerine cevap veren, kaliteden ödün vermeyen erişilebilir lüks parçalar.",
      founderBadge: "KURUCU VİZYONU",
      founderTitle: "20 Yılı Aşkın Tekstil ve Moda Birikimi",
      founderText: "Yaklaşık <strong>20 yılı aşkın tekstil ve moda sektöründeki deneyim</strong>, Maison De Loup Atelier’nin en güçlü yapı taşlarından biridir. Kariyer boyunca triko, dokuma, denim ve deri gibi farklı ürün gruplarında, kumaşlarda ve üretim tekniklerinde edinilen uzmanlık; koleksiyon oluşturma sürecinin tasarım aşamasından üretime kadar bütününü mükemmeliyetle yönetmeyi sağlamaktadır.<br><br>En büyük hedefimiz; markanın her koleksiyonunda aynı kimliği hissettiren ancak kendini tekrar etmeyen; güncel, özgün ve zamansız tasarımlar ortaya koymak. Tasarım ile ticari bakış açısını bir arada harmanlayarak, Türk tasarımını gururla temsil eden global bir moda evi inşa ediyoruz."
    },
    footer: {
      copyright: "© 2026 Maison De Loup Atelier. Tüm hakları saklıdır. Türkiye'de Tasarlandı.",
      nav: {
        newIn: "YENİ GELENLER",
        blazers: "BLAZER CEKET",
        clothing: "GİYİM",
        collections: "KOLEKSİYONLAR",
        editorial: "EDİTORYAL",
        about: "HAKKIMIZDA",
        contact: "İLETİŞİM"
      },
      legal: {
        terms: "Mesafeli Satış Sözleşmesi",
        preInfo: "Ön Bilgilendirme",
        kvkk: "KVKK",
        cookies: "Çerez Politikası",
        returns: "İade & Değişim",
        shipping: "Kargo & Teslimat"
      }
    }
  },
  EN: {
    announcement: "Designed in Türkiye — Made for the World &bull; Worldwide Express Delivery",
    nav: {
      newIn: "NEW ARRIVALS",
      blazers: "BLAZERS",
      clothing: "CLOTHING",
      collections: "COLLECTIONS",
      editorial: "EDITORIAL",
      about: "ABOUT ATELIER",
      contact: "CONTACT"
    },
    heroSub: "THE ART OF THE BLAZER",
    heroProv: "Designed in Türkiye<br>Made for the world.",
    heroCta: "EXPLORE COLLECTION",
    heroStoryTag: "ATELIER STORY",
    sigPretitle: "SIGNATURE PIECE",
    sigTitle: "THE SIGNATURE BLAZER",
    sigDesc: "Timeless shapes. Modern attitude.",
    sigLink: "SHOP BLAZERS",
    wolfTitle: "THE HOUSE OF THE WOLF",
    wolfText: "Maison de Loup translates to 'The House of the Wolf'. Inspired by the wolf's profound symbolism of freedom, power, and independence in Turkish culture, Maison De Loup Atelier merges Turkish design mastery with global high-fashion silhouettes.",
    wolfLink: "OUR STORY",
    catTitle: "SHOP BY CATEGORY",
    catBadge: "SIGNATURE CAPSULE",
    categories: {
      blazers: "BLAZERS",
      trousers: "TROUSERS",
      shirts: "SHIRTS",
      tops: "KNITWEAR & TOPS",
      dresses: "DRESSES",
      skirts: "SKIRTS"
    },
    catalogHeading: "THE COLLECTION",
    catalogSub: "Hero Blazers • Complementary Capsule • Accessible Luxury",
    sort: {
      featured: "FEATURED",
      priceAsc: "PRICE: LOW TO HIGH",
      priceDesc: "PRICE: HIGH TO LOW",
      new: "NEW ARRIVALS"
    },
    filterPills: {
      all: "ALL",
      blazers: "BLAZERS (SIGNATURE)",
      trousers: "TROUSERS",
      shirts: "SHIRTS",
      tops: "KNITWEAR & TOPS",
      dresses: "DRESSES",
      skirts: "SKIRTS"
    },
    journalHeading: "THE JOURNAL",
    journalSub: "Fashion, Inspiration & The Maison De Loup Atelier world.",
    journalCta: "EXPLORE EDITORIAL",
    card1Title: "QUALITY IN EVERY DETAIL",
    card1Text: "From design to fabric, craftsmanship to experience — quality is our promise. Rooted in over 20 years of textile mastery.",
    card1Link: "OUR VALUES",
    card2Title: "THE ANATOMY OF FIT",
    card2Text: "Sculpted shoulders, internal canvas structure, and engineered drape. Tailored to empower women.",
    card2Link: "ATELIER CRAFT",
    newsletterTitle: "JOIN OUR WORLD",
    newsletterDesc: "Be the first to know about new arrivals, private salon presentations and limited drops.",
    newsletterPlaceholder: "Your email address",
    newsletterKvkk: "I have read and agree to the Privacy Policy.",
    searchPlaceholder: "Search collection (Blazer, Wool, Trousers...)",
    cartTitle: "SHOPPING BAG",
    shippingLimit: "Complimentary Worldwide Express Delivery on orders over €250 / $270",
    emptyCart: "Your shopping bag is currently empty.",
    emptyCartSub: "Discover the signature creations in our collection.",
    subtotal: "SUBTOTAL",
    checkout: "PROCEED TO SECURE CHECKOUT",
    quickView: "QUICK VIEW (5 PHOTOS)",
    addToBag: "ADD TO BAG",
    storyModal: {
      subtitle: "THE HOUSE OF THE WOLF",
      visionBadge: "BRAND VISION",
      visionTitle: "The Power of the Wolf & Global Turkish Design",
      missionBadge: "BRAND MISSION",
      missionTitle: "Contemporary Aesthetics & Timeless Value",
      strategyBadge: "PRODUCT & COMMERCIAL PILLARS",
      strategyTitle: "3 Core Axes Centered on the Tailored Blazer",
      strategyText: "At the nucleus of Maison De Loup Atelier stands the <strong>tailored women’s blazer</strong>. The blazer is our signature silhouette and the ultimate embodiment of our brand DNA. Around it orbits an engineered capsule wardrobe designed to elevate women from day to evening.",
      strategyAxes: "<strong>3 Core Axes of Our Product Strategy:</strong><br><strong>1. Signature Creations:</strong> Masterfully tailored virgin wool blazers crafted with bespoke craftsmanship.<br><strong>2. Complementary Capsule:</strong> Wide-leg trousers, poplin shirts, silk skirts, and slip dresses tailored to frame the blazer.<br><strong>3. Accessible Brand DNA:</strong> Dynamic luxury essentials designed for modern urban rhythms without compromising quality.",
      founderBadge: "FOUNDER'S VISION",
      founderTitle: "Over 20 Years of Textile & Fashion Mastery",
      founderText: "More than <strong>20 years of deep textile and fashion industry mastery</strong> serves as the fundamental cornerstone of Maison De Loup Atelier. Spanning decades across fine knitwear, worsted tailoring, denim, and leathercraft, this comprehensive expertise allows us to govern every millimeter from conceptual sketch to fabric mill and atelier finish.<br><br>Our mission is not merely to craft aesthetic garments, but to build a lasting, sustainable, and globally revered fashion house that proudly champions Turkish design mastery on the world stage."
    },
    footer: {
      copyright: "© 2026 Maison De Loup Atelier. All rights reserved. Designed in Türkiye.",
      nav: {
        newIn: "NEW ARRIVALS",
        blazers: "BLAZERS",
        clothing: "CLOTHING",
        collections: "COLLECTIONS",
        editorial: "EDITORIAL",
        about: "ABOUT ATELIER",
        contact: "CONTACT"
      },
      legal: {
        terms: "Distance Sales Contract",
        preInfo: "Preliminary Information",
        kvkk: "Privacy Policy",
        cookies: "Cookie Policy",
        returns: "Returns & Exchanges",
        shipping: "Shipping & Delivery"
      }
    }
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
  applyLanguage();
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

  // 3. Load dynamic locale JSON files if available
  try {
    const [trRes, enRes] = await Promise.all([
      fetch('locales/tr.json'),
      fetch('locales/en.json')
    ]);
    if (trRes.ok) {
      const trData = await trRes.json();
      if (trData && trData.nav) {
        TRANSLATIONS.TR = Object.assign({}, TRANSLATIONS.TR, trData);
      }
    }
    if (enRes.ok) {
      const enData = await enRes.json();
      if (enData && enData.nav) {
        TRANSLATIONS.EN = Object.assign({}, TRANSLATIONS.EN, enData);
      }
    }
  } catch(e) {}
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
    renderCart();
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
  const isTr = STATE.currentLang === 'TR';
  const t = TRANSLATIONS[STATE.currentLang] || TRANSLATIONS.TR;

  // 1. Announcement bar
  const annEl = document.getElementById('announcementText');
  if (annEl) annEl.innerHTML = t.announcement;

  // 2. Navigation items
  const navMap = {
    navNewIn: t.nav.newIn,
    navBlazers: t.nav.blazers,
    navClothing: t.nav.clothing,
    navCollections: t.nav.collections,
    navEditorial: t.nav.editorial,
    navAbout: t.nav.about,
    navContact: t.nav.contact
  };
  Object.keys(navMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = navMap[id];
  });

  // 3. Hero
  const heroSub = document.getElementById('heroSub');
  if (heroSub) heroSub.innerText = t.heroSub;
  const heroProv = document.getElementById('heroProv');
  if (heroProv) heroProv.innerHTML = t.heroProv;
  const heroCtaText = document.getElementById('heroCtaText');
  if (heroCtaText) heroCtaText.innerText = t.heroCta;
  const heroStoryTag = document.getElementById('heroStoryTag');
  if (heroStoryTag) heroStoryTag.innerText = t.heroStoryTag;

  // 4. Signature Split Left
  const sigPre = document.getElementById('sigPretitle');
  if (sigPre) {
    sigPre.innerText = isTr
      ? (STATE.content?.sigPretitleTR || t.sigPretitle)
      : (STATE.content?.sigPretitleEN || t.sigPretitle);
  }
  const sigTitle = document.getElementById('sigTitle');
  if (sigTitle) sigTitle.innerText = isTr ? (STATE.content?.sigTitleTR || t.sigTitle) : (STATE.content?.sigTitleEN || t.sigTitle);
  const sigDesc = document.getElementById('sigDesc');
  if (sigDesc) sigDesc.innerText = isTr ? (STATE.content?.sigDescTR || t.sigDesc) : (STATE.content?.sigDescEN || t.sigDesc);
  const sigLinkText = document.getElementById('sigLinkText');
  if (sigLinkText) sigLinkText.innerText = isTr ? (STATE.content?.sigLinkTR || t.sigLink) : (STATE.content?.sigLinkEN || t.sigLink);

  // 5. Wolf Split Right
  const wolfTitle = document.getElementById('wolfTitle');
  if (wolfTitle) wolfTitle.innerText = isTr ? (STATE.content?.wolfTitleTR || t.wolfTitle) : (STATE.content?.wolfTitleEN || t.wolfTitle);
  const wolfText = document.getElementById('wolfText');
  if (wolfText) wolfText.innerText = isTr ? (STATE.content?.wolfTextTR || t.wolfText) : (STATE.content?.wolfTextEN || t.wolfText);
  const wolfLinkText = document.getElementById('wolfLinkText');
  if (wolfLinkText) wolfLinkText.innerText = isTr ? (STATE.content?.wolfLinkTR || t.wolfLink) : (STATE.content?.wolfLinkEN || t.wolfLink);

  // 6. Categories
  const catTitle = document.getElementById('catTitle');
  if (catTitle) catTitle.innerText = isTr ? (STATE.content?.catTitleTR || t.catTitle) : (STATE.content?.catTitleEN || t.catTitle);
  const catBadge = document.getElementById('catBadgeCore');
  if (catBadge) catBadge.innerText = t.catBadge;

  const catCardsMap = {
    catNameBlazers: t.categories.blazers,
    catNameTrousers: t.categories.trousers,
    catNameShirts: t.categories.shirts,
    catNameTops: t.categories.tops,
    catNameDresses: t.categories.dresses,
    catNameSkirts: t.categories.skirts
  };
  Object.keys(catCardsMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = catCardsMap[id];
  });

  // 7. Catalog
  const catHeading = document.getElementById('catalogHeading');
  if (catHeading) catHeading.innerText = isTr ? (STATE.content?.catalogHeadingTR || t.catalogHeading) : (STATE.content?.catalogHeadingEN || t.catalogHeading);
  const catSub = document.getElementById('catalogSub');
  if (catSub) catSub.innerHTML = isTr ? (STATE.content?.catalogSubTR || t.catalogSub) : (STATE.content?.catalogSubEN || t.catalogSub);

  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    const curVal = sortSelect.value;
    sortSelect.innerHTML = `
      <option value="featured" ${curVal === 'featured' ? 'selected' : ''}>${t.sort.featured}</option>
      <option value="price-asc" ${curVal === 'price-asc' ? 'selected' : ''}>${t.sort.priceAsc}</option>
      <option value="price-desc" ${curVal === 'price-desc' ? 'selected' : ''}>${t.sort.priceDesc}</option>
      <option value="new" ${curVal === 'new' ? 'selected' : ''}>${t.sort.new}</option>
    `;
  }

  // Filter pills
  const pillMap = t.filterPills;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const key = btn.getAttribute('data-filter');
    if (pillMap[key]) {
      btn.innerText = pillMap[key];
    }
  });

  // 8. Pillars
  const card1Title = document.getElementById('card1Title');
  if (card1Title) card1Title.innerText = isTr ? (STATE.content?.card1TitleTR || t.card1Title) : (STATE.content?.card1TitleEN || t.card1Title);
  const card1Text = document.getElementById('card1Text');
  if (card1Text) card1Text.innerText = isTr ? (STATE.content?.card1TextTR || t.card1Text) : (STATE.content?.card1TextEN || t.card1Text);
  const card1LinkText = document.getElementById('card1LinkText');
  if (card1LinkText) card1LinkText.innerText = isTr ? (STATE.content?.card1LinkTR || t.card1Link) : (STATE.content?.card1LinkEN || t.card1Link);

  const card2Title = document.getElementById('card2Title');
  if (card2Title) card2Title.innerText = isTr ? (STATE.content?.card2TitleTR || t.card2Title) : (STATE.content?.card2TitleEN || t.card2Title);
  const card2Text = document.getElementById('card2Text');
  if (card2Text) card2Text.innerText = isTr ? (STATE.content?.card2TextTR || t.card2Text) : (STATE.content?.card2TextEN || t.card2Text);
  const card2LinkText = document.getElementById('card2LinkText');
  if (card2LinkText) card2LinkText.innerText = isTr ? (STATE.content?.card2LinkTR || t.card2Link) : (STATE.content?.card2LinkEN || t.card2Link);

  // 9. Journal
  const journalHeading = document.getElementById('journalHeading');
  if (journalHeading) journalHeading.innerText = isTr ? (STATE.content?.journalHeadingTR || t.journalHeading) : (STATE.content?.journalHeadingEN || t.journalHeading);
  const journalSub = document.getElementById('journalSub');
  if (journalSub) journalSub.innerText = isTr ? (STATE.content?.journalSubTR || t.journalSub) : (STATE.content?.journalSubEN || t.journalSub);
  const journalCtaText = document.getElementById('journalCtaText');
  if (journalCtaText) journalCtaText.innerText = isTr ? (STATE.content?.journalCtaTR || t.journalCta) : (STATE.content?.journalCtaEN || t.journalCta);

  // 10. Newsletter
  const nlTitle = document.getElementById('newsletterTitle');
  if (nlTitle) nlTitle.innerText = isTr ? (STATE.content?.newsletterTitleTR || t.newsletterTitle) : (STATE.content?.newsletterTitleEN || t.newsletterTitle);
  const nlDesc = document.getElementById('newsletterDesc');
  if (nlDesc) nlDesc.innerText = isTr ? (STATE.content?.newsletterDescTR || t.newsletterDesc) : (STATE.content?.newsletterDescEN || t.newsletterDesc);
  const nlInput = document.getElementById('newsletterEmail');
  if (nlInput) nlInput.placeholder = t.newsletterPlaceholder;
  const nlKvkk = document.getElementById('kvkkConsentText');
  if (nlKvkk) nlKvkk.innerText = t.newsletterKvkk;

  // 11. Search
  const searchInput = document.getElementById('liveSearchInput');
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // 12. Cart Drawer
  const cartTitleEl = document.getElementById('cartDrawerTitleText');
  if (cartTitleEl) cartTitleEl.innerText = t.cartTitle;
  const shipBar = document.getElementById('shippingBarText');
  if (shipBar) shipBar.innerText = t.shippingLimit;
  const subLabel = document.getElementById('subtotalLabel');
  if (subLabel) subLabel.innerText = t.subtotal;
  const chkBtn = document.getElementById('checkoutBtn');
  if (chkBtn) chkBtn.innerText = t.checkout;
  const emptyCartTitle = document.getElementById('emptyCartTitle');
  if (emptyCartTitle) emptyCartTitle.innerText = t.emptyCart;
  const emptyCartSub = document.getElementById('emptyCartSub');
  if (emptyCartSub) emptyCartSub.innerText = t.emptyCartSub;

  // 13. Story Modal
  const smSub = document.getElementById('modalStorySubtitle');
  if (smSub) smSub.innerText = t.storyModal.subtitle;
  const smVisBadge = document.getElementById('modalStoryVisionBadge');
  if (smVisBadge) smVisBadge.innerText = t.storyModal.visionBadge;
  const smVisTitle = document.getElementById('modalStoryVisionTitle');
  if (smVisTitle) smVisTitle.innerText = t.storyModal.visionTitle;
  const smVision = document.getElementById('modalStoryVision');
  if (smVision) smVision.innerHTML = (isTr ? (STATE.content?.storyVisionTR || t.storyModal.visionText) : t.storyModal.visionText).replace(/\n/g, '<br>');

  const smMisBadge = document.getElementById('modalStoryMissionBadge');
  if (smMisBadge) smMisBadge.innerText = t.storyModal.missionBadge;
  const smMisTitle = document.getElementById('modalStoryMissionTitle');
  if (smMisTitle) smMisTitle.innerText = t.storyModal.missionTitle;
  const smMission = document.getElementById('modalStoryMission');
  if (smMission) smMission.innerHTML = (isTr ? (STATE.content?.storyMissionTR || t.storyModal.missionText) : t.storyModal.missionText).replace(/\n/g, '<br>');

  const smStratBadge = document.getElementById('modalStoryStrategyBadge');
  if (smStratBadge) smStratBadge.innerText = t.storyModal.strategyBadge;
  const smStratTitle = document.getElementById('modalStoryStrategyTitle');
  if (smStratTitle) smStratTitle.innerText = t.storyModal.strategyTitle;
  const smStratText = document.getElementById('modalStoryStrategyText');
  if (smStratText) smStratText.innerHTML = t.storyModal.strategyText;
  const smStratAxes = document.getElementById('modalStoryStrategyAxes');
  if (smStratAxes) smStratAxes.innerHTML = t.storyModal.strategyAxes;

  const smFoundBadge = document.getElementById('modalStoryFounderBadge');
  if (smFoundBadge) smFoundBadge.innerText = t.storyModal.founderBadge;
  const smFoundTitle = document.getElementById('modalStoryFounderTitle');
  if (smFoundTitle) smFoundTitle.innerText = t.storyModal.founderTitle;
  const smFounder = document.getElementById('modalStoryFounder');
  if (smFounder) smFounder.innerHTML = (isTr ? (STATE.content?.storyFounderTR || t.storyModal.founderText) : t.storyModal.founderText).replace(/\n/g, '<br>');

  // 14. Quick View Modal Exit Text
  const qvExit = document.getElementById('qvExitBtnText');
  if (qvExit) qvExit.innerText = isTr ? 'ANA SAYFAYA DÖN' : 'RETURN TO HOME';

  // 15. Footer
  const footNavMap = {
    footNavNewIn: t.footer.nav.newIn,
    footNavBlazers: t.footer.nav.blazers,
    footNavClothing: t.footer.nav.clothing,
    footNavCollections: t.footer.nav.collections,
    footNavEditorial: t.footer.nav.editorial,
    footNavAbout: t.footer.nav.about,
    footNavContact: t.footer.nav.contact
  };
  Object.keys(footNavMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = footNavMap[id];
  });

  const footLegalMap = {
    footLegalTerms: t.footer.legal.terms,
    footLegalPreInfo: t.footer.legal.preInfo,
    footLegalKvkk: t.footer.legal.kvkk,
    footLegalCookies: t.footer.legal.cookies,
    footLegalReturns: t.footer.legal.returns,
    footLegalShipping: t.footer.legal.shipping
  };
  Object.keys(footLegalMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = footLegalMap[id];
  });

  const footCopy = document.getElementById('footerCopyright');
  if (footCopy) footCopy.innerText = t.footer.copyright;
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
    const badgeText = BADGE_MAP[STATE.currentLang]?.[product.badge] || product.badge || 'ATELIER';
    const images = (product.images && product.images.length > 0)
      ? product.images
      : [product.primaryImage, product.secondaryImage || product.primaryImage];

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-img-container" onclick="openQuickView('${product.id}')">
          <img src="${images[0]}" alt="${title}" class="product-img primary" id="cardImg-${product.id}" loading="lazy">
          <span class="product-badge">${badgeText}</span>
          
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
  const badgeText = BADGE_MAP[STATE.currentLang]?.[product.badge] || product.badge || 'ATELIER';
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
          <span class="qv-badge">${badgeText}</span>
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
async function handleNewsletter(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletterEmail');
  const kvkkCheckbox = document.getElementById('newsletterKvkk');
  const email = emailInput ? emailInput.value.trim() : '';

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast(STATE.currentLang === 'TR' ? 'Lütfen geçerli bir e-posta adresi giriniz.' : 'Please enter a valid email address.');
    return;
  }

  // KVKK consent check
  if (kvkkCheckbox && !kvkkCheckbox.checked) {
    showToast(STATE.currentLang === 'TR' ? 'Lütfen KVKK Aydınlatma Metnini onaylayınız.' : 'Please accept the KVKK Privacy Notice.');
    return;
  }

  // Save locally
  try {
    const existing = JSON.parse(localStorage.getItem('mdl_subscribers') || '[]');
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem('mdl_subscribers', JSON.stringify(existing));
    }
  } catch (err) {}

  // Send to server
  try {
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, date: new Date().toISOString() })
    });
  } catch (err) {}

  showToast(STATE.currentLang === 'TR' 
    ? `Teşekkürler! ${email} adresi Maison De Loup Atelier ayrıcalıklar dünyasına kaydedildi.` 
    : `Thank you! ${email} has been subscribed to the Maison De Loup Atelier inner circle.`);

  if (emailInput) emailInput.value = '';
  if (kvkkCheckbox) kvkkCheckbox.checked = false;
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
