// ==========================================================================
// MAISON DE LOUP ATELIER — ADMIN CONTROLLER (admin.js)
// ==========================================================================

let adminProducts = [];
let adminContent = {};

document.addEventListener('DOMContentLoaded', async () => {
  await loadAdminData();
  renderAdminProducts();
  populateMediaFields();
  populateTextFields();
});

// Load data from Server, Static JSON or LocalStorage
async function loadAdminData() {
  // 1. Products
  const savedProds = localStorage.getItem('mdl_custom_products');
  if (savedProds) {
    try {
      adminProducts = JSON.parse(savedProds);
    } catch(e) {}
  } else {
    try {
      let res = await fetch('/api/products');
      if (!res.ok) res = await fetch('products.json');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) adminProducts = data;
      }
    } catch(e) {
      try {
        const res = await fetch('products.json');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) adminProducts = data;
        }
      } catch(err) {}
    }
  }
  if (!adminProducts || adminProducts.length === 0) {
    adminProducts = typeof PRODUCTS_DATA !== 'undefined' ? [...PRODUCTS_DATA] : [];
  }

  // 2. Content
  const savedContent = localStorage.getItem('mdl_custom_content');
  if (savedContent) {
    try {
      adminContent = JSON.parse(savedContent);
      if (!adminContent.card1Image || adminContent.card1Image.includes('quality_label.jpg')) {
        adminContent.card1Image = 'assets/images/quality_label_hd.jpg';
      }
      if (!adminContent.card2Image || adminContent.card2Image.includes('tailoring_back.jpg')) {
        adminContent.card2Image = 'assets/images/tailoring_fit_hd.jpg';
      }
      localStorage.setItem('mdl_custom_content', JSON.stringify(adminContent));
    } catch(e) {}
  } else {
    try {
      let res = await fetch('/api/content');
      if (!res.ok) res = await fetch('content.json');
      if (res.ok) {
        adminContent = await res.json();
      }
    } catch(e) {
      try {
        const res = await fetch('content.json');
        if (res.ok) {
          adminContent = await res.json();
        }
      } catch(err) {}
    }
  }

  // Fallbacks if empty
  if (!adminContent || Object.keys(adminContent).length === 0) {
    adminContent = {
      brandName: "MAISON DE LOUP ATELIER",
      announcementTextTR: "Türkiye'de Tasarlandı — Dünyaya Açılan Türk Modası",
      announcementTextEN: "Designed in Türkiye — Made for the World • Worldwide Express Delivery",
      heroTitle: "MAISON DE LOUP ATELIER",
      heroSubTR: "THE ART OF THE BLAZER",
      heroProvTR: "Designed in Türkiye<br>Made for the world.",
      heroSlide1: "assets/images/uploaded_1791785047520_Gemini_Generated_Image_wpltxzwpltxzwplt.jpg",
      heroSlide2: "assets/images/product_blazer_noir.jpg",
      heroSlide3: "assets/images/product_blazer_ecru.jpg",
      sigPretitleTR: "HERO CREATION",
      sigTitleTR: "MODERN WOMENSWEAR",
      sigDescTR: "Zamansız silüetler. Modern tavır.",
      sigLinkTR: "ÜRÜNLERİ İNCELE",
      sigImage: "assets/images/uploaded_1791788751605_Gemini_Generated_Image_fn3h8jfn3h8jfn3h.jpg",
      wolfTitleTR: "KURDUN EVİ — THE HOUSE OF THE WOLF",
      wolfImage: "assets/images/uploaded_1791784507432_Gemini_Generated_Image_1bwikn1bwikn1bwi.jpg",
      journalImage: "assets/images/uploaded_1791784583979_Gemini_Generated_Image_h3b9z6h3b9z6h3b9.jpg",
      card1Image: "assets/images/quality_label_hd.jpg",
      card2Image: "assets/images/tailoring_fit_hd.jpg",
      wolfTextTR: "Maison de Loup, 'Kurdun Evi' anlamına gelir. Özgürlük, güç, bağımsızlık ve yol göstericiliği temsil eden kurt sembolünden ilham alan Maison De Loup Atelier, Türk tasarımını global moda dünyasıyla buluşturan modern ve zamansız bir kadın giyim markasıdır.",
      storyVisionTR: "Maison de Loup… Fransızca karşılığıyla “Kurdun Evi.”\n\nMarkanın çıkış noktası, kurdun Türk kültüründeki güçlü ve sembolik anlamından ilham alıyor. Kurt; özgürlüğü, gücü, bağımsızlığı ve yol göstericiliği temsil ediyor. Biz bu güçlü sembolü, modern ve global bir moda markasının kimliğine dönüştürmek istiyoruz.",
      storyMissionTR: "Türk tasarım kültüründen ve yerel üretim gücünden beslenerek; çağdaş tasarım anlayışını yüksek kalite, özgünlük ve erişilebilirlik ile buluşturmak.",
      storyFounderTR: "Yaklaşık 15 yıllık tekstil ve moda sektöründeki deneyimim, Maison De Loup Atelier’nin en güçlü yapı taşlarından biri olacak."
    };
  }
}

// Tab Switching
function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  btn.classList.add('active');
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.add('active');
}

// ==========================================================================
// PRODUCTS TAB LOGIC
// ==========================================================================
function renderAdminProducts() {
  const grid = document.getElementById('adminProductGrid');
  if (!grid) return;

  grid.innerHTML = adminProducts.map(p => `
    <div class="admin-prod-card" data-id="${p.id}">
      <div class="admin-prod-thumb">
        <img src="${p.primaryImage}" alt="${p.nameTr || p.name}">
        <span class="admin-prod-badge">${p.badge || 'ATELIER'}</span>
      </div>
      <div class="admin-prod-body">
        <div>
          <h4 class="admin-prod-title">${p.nameTr || p.name}</h4>
          <div class="admin-prod-meta">${p.category.toUpperCase()} &bull; ${p.fabricTr || p.fabric || 'Özel Dokuma'}</div>
          <div class="admin-prod-price">₺${(p.priceTRY || 0).toLocaleString('tr-TR')}</div>
        </div>
        <div class="admin-prod-actions">
          <button class="btn-edit" onclick="openProductModal('${p.id}')">✏️ Düzenle</button>
          <button class="btn-delete" onclick="deleteProduct('${p.id}')">🗑️ Sil</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openProductModal(productId = null) {
  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('modalProdTitle');
  const form = document.getElementById('productForm');

  const defaultImages = [
    "assets/images/product_blazer_noir.jpg",
    "assets/images/product_blazer_detail.jpg",
    "assets/images/tailoring_back.jpg",
    "assets/images/product_blazer_side.jpg",
    "assets/images/product_blazer_style.jpg"
  ];

  if (productId) {
    const prod = adminProducts.find(p => p.id === productId);
    if (!prod) return;

    modalTitle.innerText = "Ürünü Düzenle: " + (prod.nameTr || prod.name);
    document.getElementById('prodEditId').value = prod.id;
    document.getElementById('prodNameTr').value = prod.nameTr || prod.name;
    document.getElementById('prodNameEn').value = prod.name || prod.nameTr;
    document.getElementById('prodCategory').value = prod.category;
    document.getElementById('prodBadge').value = prod.badge || 'SIGNATURE';
    document.getElementById('prodPriceTRY').value = prod.priceTRY || 10000;
    document.getElementById('prodSizes').value = (prod.sizes || ["34", "36", "38", "40"]).join(', ');
    document.getElementById('prodFabricTr').value = prod.fabricTr || prod.fabric || '';
    document.getElementById('prodDescTr').value = prod.descriptionTr || prod.description || '';

    const imgs = (prod.images && prod.images.length > 0)
      ? prod.images
      : [prod.primaryImage, prod.secondaryImage || prod.primaryImage];

    for (let i = 0; i < 5; i++) {
      const src = imgs[i] || imgs[0] || defaultImages[i];
      const inEl = document.getElementById(`prodImgInput${i}`);
      const prevEl = document.getElementById(`prevProdImg${i}`);
      if (inEl) inEl.value = src;
      if (prevEl) prevEl.src = src;
    }
  } else {
    modalTitle.innerText = "Yeni Ürün Ekle (5 Görsel)";
    form.reset();
    document.getElementById('prodEditId').value = '';
    document.getElementById('prodSizes').value = '34, 36, 38, 40, 42';
    document.getElementById('prodPriceTRY').value = '14500';
    document.getElementById('prodFabricTr').value = '%100 Saf Anadolu Yünü';

    for (let i = 0; i < 5; i++) {
      const src = defaultImages[i];
      const inEl = document.getElementById(`prodImgInput${i}`);
      const prevEl = document.getElementById(`prevProdImg${i}`);
      if (inEl) inEl.value = src;
      if (prevEl) prevEl.src = src;
    }
  }

  modal.classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

function handleProductFormSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('prodEditId').value;
  const nameTr = document.getElementById('prodNameTr').value.trim();
  const nameEn = document.getElementById('prodNameEn').value.trim();
  const category = document.getElementById('prodCategory').value;
  const badge = document.getElementById('prodBadge').value;
  const priceTRY = parseFloat(document.getElementById('prodPriceTRY').value) || 0;
  const sizes = document.getElementById('prodSizes').value.split(',').map(s => s.trim()).filter(Boolean);
  const fabricTr = document.getElementById('prodFabricTr').value.trim();
  const descTr = document.getElementById('prodDescTr').value.trim();

  // Gather 5 images
  const images = [];
  for (let i = 0; i < 5; i++) {
    const val = document.getElementById(`prodImgInput${i}`)?.value.trim();
    if (val) images.push(val);
  }
  while (images.length < 5 && images.length > 0) {
    images.push(images[0]);
  }
  const primaryImage = images[0] || 'assets/images/product_blazer_noir.jpg';
  const secondaryImage = images[1] || primaryImage;

  // Price conversions
  const priceEUR = Math.round(priceTRY * 0.0265);
  const priceUSD = Math.round(priceTRY * 0.0289);
  const priceGBP = Math.round(priceTRY * 0.0228);

  if (id) {
    // Update existing
    const index = adminProducts.findIndex(p => p.id === id);
    if (index > -1) {
      adminProducts[index] = {
        ...adminProducts[index],
        name: nameEn,
        nameTr: nameTr,
        category: category,
        badge: badge,
        priceTRY: priceTRY,
        priceEUR: priceEUR,
        priceUSD: priceUSD,
        priceGBP: priceGBP,
        sizes: sizes,
        primaryImage: primaryImage,
        secondaryImage: secondaryImage,
        images: images,
        fabricTr: fabricTr,
        descriptionTr: descTr
      };
    }
    showToast(`"${nameTr}" (5 görsel) başarıyla güncellendi.`);
  } else {
    // Create new
    const newId = `mdl-prod-${Date.now()}`;
    const newProd = {
      id: newId,
      name: nameEn,
      nameTr: nameTr,
      category: category,
      badge: badge,
      isHero: category === 'blazers',
      priceTRY: priceTRY,
      priceEUR: priceEUR,
      priceUSD: priceUSD,
      priceGBP: priceGBP,
      primaryImage: primaryImage,
      secondaryImage: secondaryImage,
      images: images,
      colors: [{ name: "Noir", hex: "#111111" }],
      sizes: sizes,
      description: descTr,
      descriptionTr: descTr,
      fabric: fabricTr,
      fabricTr: fabricTr,
      fit: "Tailored structured fit.",
      fitTr: "Kalıplı terzi formu.",
      details: ["Maison De Loup Atelier özel üretimi"],
      detailsTr: ["Maison De Loup Atelier özel üretimi"]
    };
    adminProducts.unshift(newProd);
    showToast(`"${nameTr}" (5 görsel ile) kataloğa eklendi.`);
  }

  closeProductModal();
  renderAdminProducts();
  saveAllChanges(false); // auto-save
}

function deleteProduct(productId) {
  const prod = adminProducts.find(p => p.id === productId);
  if (!prod) return;

  if (confirm(`"${prod.nameTr || prod.name}" ürününü silmek istediğinize emin misiniz?`)) {
    adminProducts = adminProducts.filter(p => p.id !== productId);
    renderAdminProducts();
    saveAllChanges(false);
    showToast(`Ürün silindi.`);
  }
}

// 5-Slot Product Image File Upload
async function handleProductSlotUpload(input, slotIndex) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Data = e.target.result;
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, base64Data: base64Data })
      });
      if (res.ok) {
        const data = await res.json();
        document.getElementById(`prodImgInput${slotIndex}`).value = data.url;
        document.getElementById(`prevProdImg${slotIndex}`).src = data.url;
        showToast(`Görsel 0${slotIndex + 1} sunucuya yüklendi!`);
        return;
      }
    } catch(err) {}

    // Fallback if no server
    document.getElementById(`prodImgInput${slotIndex}`).value = base64Data;
    document.getElementById(`prevProdImg${slotIndex}`).src = base64Data;
    showToast(`Görsel 0${slotIndex + 1} seçildi.`);
  };
  reader.readAsDataURL(file);
}

// ==========================================================================
// MEDIA TAB LOGIC
// ==========================================================================
function populateMediaFields() {
  const c = adminContent;
  if (c.heroSlide1) { document.getElementById('inpHero1').value = c.heroSlide1; document.getElementById('prevHero1').src = c.heroSlide1; }
  if (c.heroSlide2) { document.getElementById('inpHero2').value = c.heroSlide2; document.getElementById('prevHero2').src = c.heroSlide2; }
  if (c.heroSlide3) { document.getElementById('inpHero3').value = c.heroSlide3; document.getElementById('prevHero3').src = c.heroSlide3; }
  if (c.sigImage) { document.getElementById('inpSig').value = c.sigImage; document.getElementById('prevSig').src = c.sigImage; }
  if (c.wolfImage) { document.getElementById('inpWolf').value = c.wolfImage; document.getElementById('prevWolf').src = c.wolfImage; }
  if (c.journalImage) { document.getElementById('inpJournal').value = c.journalImage; document.getElementById('prevJournal').src = c.journalImage; }
}

function updateMediaPreview(imgId, url) {
  const img = document.getElementById(imgId);
  if (img && url) img.src = url;
}

async function handleFileUpload(input, targetInputId, previewImgId) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Data = e.target.result;
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, base64Data: base64Data })
      });
      if (res.ok) {
        const data = await res.json();
        document.getElementById(targetInputId).value = data.url;
        document.getElementById(previewImgId).src = data.url;
        showToast('Görsel yüklendi ve güncellendi!');
        return;
      }
    } catch(err) {}

    // Offline Base64 fallback
    document.getElementById(targetInputId).value = base64Data;
    document.getElementById(previewImgId).src = base64Data;
    showToast('Görsel yerel olarak seçildi.');
  };
  reader.readAsDataURL(file);
}

// ==========================================================================
// TEXTS TAB LOGIC
// ==========================================================================
function populateTextFields() {
  const c = adminContent;

  // 1. Signature Blazer (Split Sol Kolon)
  if (c.sigPretitleTR) document.getElementById('textSigPretitle').value = c.sigPretitleTR;
  if (c.sigTitleTR) document.getElementById('textSigTitle').value = c.sigTitleTR;
  if (c.sigDescTR) document.getElementById('textSigDesc').value = c.sigDescTR;
  if (c.sigLinkTR) document.getElementById('textSigLink').value = c.sigLinkTR;

  // 2. The House of the Wolf (Split Sağ Kolon)
  if (c.wolfTitleTR) document.getElementById('textWolfTitle').value = c.wolfTitleTR;
  if (c.wolfLinkTR) document.getElementById('textWolfLink').value = c.wolfLinkTR;
  if (c.wolfTextTR) document.getElementById('textWolfStoryTR').value = c.wolfTextTR;

  // 3. Hero & Tepe Banner
  if (c.brandName) document.getElementById('textBrandName').value = c.brandName;
  if (c.heroTitle) document.getElementById('textHeroTitle').value = c.heroTitle;
  if (c.heroSubTR) document.getElementById('textHeroSub').value = c.heroSubTR;
  if (c.heroProvTR) document.getElementById('textHeroProv').value = c.heroProvTR.replace(/<br>/g, ' / ');
  if (c.heroCtaTR) document.getElementById('textHeroCta').value = c.heroCtaTR;
  if (c.announcementTextTR) document.getElementById('textAnnouncementTR').value = c.announcementTextTR;

  // 4. Kategoriler & Koleksiyon
  if (c.catTitleTR) document.getElementById('textCatTitle').value = c.catTitleTR;
  if (c.catalogHeadingTR) document.getElementById('textCatalogHeading').value = c.catalogHeadingTR;
  if (c.catalogSubTR) document.getElementById('textCatalogSub').value = c.catalogSubTR;

  // 5. The Journal
  if (c.journalHeadingTR) document.getElementById('textJournalHeading').value = c.journalHeadingTR;
  if (c.journalSubTR) document.getElementById('textJournalSub').value = c.journalSubTR;
  if (c.journalCtaTR) document.getElementById('textJournalCta').value = c.journalCtaTR;

  // 6. Marka Değerleri & Bülten Kartları
  if (c.card1TitleTR) document.getElementById('textCard1Title').value = c.card1TitleTR;
  if (c.card1TextTR) document.getElementById('textCard1Text').value = c.card1TextTR;
  if (c.card1LinkTR) document.getElementById('textCard1Link').value = c.card1LinkTR;

  if (c.card2TitleTR) document.getElementById('textCard2Title').value = c.card2TitleTR;
  if (c.card2TextTR) document.getElementById('textCard2Text').value = c.card2TextTR;
  if (c.card2LinkTR) document.getElementById('textCard2Link').value = c.card2LinkTR;

  if (c.newsletterTitleTR) document.getElementById('textNewsletterTitle').value = c.newsletterTitleTR;
  if (c.newsletterDescTR) document.getElementById('textNewsletterDesc').value = c.newsletterDescTR;

  // 7. Kurdun Evi / Vizyon & Misyon Modalı
  if (c.storyVisionTR) document.getElementById('textStoryVisionTR').value = c.storyVisionTR;
  if (c.storyMissionTR) document.getElementById('textStoryMissionTR').value = c.storyMissionTR;
  if (c.storyFounderTR) document.getElementById('textStoryFounderTR').value = c.storyFounderTR;
}

// ==========================================================================
// SAVE ALL CHANGES (To LocalStorage & Server API)
// ==========================================================================
async function saveAllChanges(notify = true) {
  // 1. Signature Blazer (Split Sol Kolon)
  adminContent.sigPretitleTR = document.getElementById('textSigPretitle')?.value || "HERO CREATION";
  adminContent.sigTitleTR = document.getElementById('textSigTitle')?.value || "THE SIGNATURE BLAZER";
  adminContent.sigDescTR = document.getElementById('textSigDesc')?.value || "Timeless shapes. Modern attitude.";
  adminContent.sigLinkTR = document.getElementById('textSigLink')?.value || "BLAZERLARI İNCELE";

  // 2. The House of the Wolf (Split Sağ Kolon)
  adminContent.wolfTitleTR = document.getElementById('textWolfTitle')?.value || "KURDUN EVİ — THE HOUSE OF THE WOLF";
  adminContent.wolfLinkTR = document.getElementById('textWolfLink')?.value || "HİKAYEMİZ";
  adminContent.wolfTextTR = document.getElementById('textWolfStoryTR')?.value || adminContent.wolfTextTR;

  // 3. Hero & Tepe Banner
  adminContent.brandName = document.getElementById('textBrandName')?.value || "MAISON DE LOUP ATELIER";
  adminContent.heroTitle = document.getElementById('textHeroTitle')?.value || "MAISON DE LOUP ATELIER";
  adminContent.heroSubTR = document.getElementById('textHeroSub')?.value || "THE ART OF THE BLAZER";
  adminContent.heroProvTR = (document.getElementById('textHeroProv')?.value || "Designed in Türkiye / Made for the world").replace(' / ', '<br>');
  adminContent.heroCtaTR = document.getElementById('textHeroCta')?.value || "KOLEKSİYONU KEŞFET";
  adminContent.announcementTextTR = document.getElementById('textAnnouncementTR')?.value || "";

  // 4. Kategoriler & Koleksiyon
  adminContent.catTitleTR = document.getElementById('textCatTitle')?.value || "KATEGORİLERE GÖRE KEŞFET";
  adminContent.catalogHeadingTR = document.getElementById('textCatalogHeading')?.value || "KOLEKSİYON";
  adminContent.catalogSubTR = document.getElementById('textCatalogSub')?.value || "Kadın Blazer Ceket • Tamamlayıcı Koleksiyon • Erişilebilir Lüks";

  // 5. The Journal
  adminContent.journalHeadingTR = document.getElementById('textJournalHeading')?.value || "THE JOURNAL";
  adminContent.journalSubTR = document.getElementById('textJournalSub')?.value || "Moda, İlham ve Maison De Loup Atelier Dünyası.";
  adminContent.journalCtaTR = document.getElementById('textJournalCta')?.value || "EDİTORYAL YAZILARI OKU";

  // 6. Marka Değerleri & Bülten Kartları
  adminContent.card1TitleTR = document.getElementById('textCard1Title')?.value || "HER DETAYDA MÜKEMMELİYET";
  adminContent.card1TextTR = document.getElementById('textCard1Text')?.value || "";
  adminContent.card1LinkTR = document.getElementById('textCard1Link')?.value || "DEĞERLERİMİZ";

  adminContent.card2TitleTR = document.getElementById('textCard2Title')?.value || "MİMARİ TERZİLİK & KALIP";
  adminContent.card2TextTR = document.getElementById('textCard2Text')?.value || "";
  adminContent.card2LinkTR = document.getElementById('textCard2Link')?.value || "ATÖLYE DETAYLARI";

  adminContent.newsletterTitleTR = document.getElementById('textNewsletterTitle')?.value || "DÜNYAMIZA KATILIN";
  adminContent.newsletterDescTR = document.getElementById('textNewsletterDesc')?.value || "";

  // 7. Modals
  adminContent.storyVisionTR = document.getElementById('textStoryVisionTR')?.value || adminContent.storyVisionTR;
  adminContent.storyMissionTR = document.getElementById('textStoryMissionTR')?.value || adminContent.storyMissionTR;
  adminContent.storyFounderTR = document.getElementById('textStoryFounderTR')?.value || adminContent.storyFounderTR;

  // Media
  adminContent.heroSlide1 = document.getElementById('inpHero1')?.value || adminContent.heroSlide1;
  adminContent.heroSlide2 = document.getElementById('inpHero2')?.value || adminContent.heroSlide2;
  adminContent.heroSlide3 = document.getElementById('inpHero3')?.value || adminContent.heroSlide3;
  adminContent.sigImage = document.getElementById('inpSig')?.value || adminContent.sigImage;
  adminContent.wolfImage = document.getElementById('inpWolf')?.value || adminContent.wolfImage;
  adminContent.journalImage = document.getElementById('inpJournal')?.value || adminContent.journalImage;

  // 1. Save to Client LocalStorage
  localStorage.setItem('mdl_custom_products', JSON.stringify(adminProducts));
  localStorage.setItem('mdl_custom_content', JSON.stringify(adminContent));

  // 2. Save to Server Disk if available
  try {
    const resContent = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminContent)
    });
    if (resContent.status === 401) {
      showToast('⚠️ Yetki Hatası (401): Sunucuya kaydetme yetkiniz yok.');
      return;
    }
    const resProducts = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminProducts)
    });
    if (resProducts.status === 401) {
      showToast('⚠️ Yetki Hatası (401): Ürün verilerini kaydetme yetkiniz yok.');
      return;
    }
  } catch(e) {}

  if (notify) {
    showToast('✅ Tüm metinler kaydedildi ve canlı siteye aktarıldı!');
  }
}

// ==========================================================================
// BACKUP & RESTORE
// ==========================================================================
function exportBackupJSON() {
  const data = {
    brand: "Maison De Loup Atelier",
    exportedAt: new Date().toISOString(),
    content: adminContent,
    products: adminProducts
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MaisonDeLoupAtelier_Yedek_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Yedek JSON dosyası indirildi.');
}

function importBackupJSON(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.products && Array.isArray(data.products)) {
        adminProducts = data.products;
      }
      if (data.content && typeof data.content === 'object') {
        adminContent = data.content;
      }
      renderAdminProducts();
      populateMediaFields();
      populateTextFields();
      await saveAllChanges(false);
      showToast('✅ Yedek başarıyla geri yüklendi!');
    } catch(err) {
      alert('Geçersiz JSON dosyası: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function resetToDefaults() {
  if (confirm('Tüm özelleştirmeleri sıfırlayıp fabrika ayarlarına dönmek istediğinize emin misiniz?')) {
    localStorage.removeItem('mdl_custom_products');
    localStorage.removeItem('mdl_custom_content');
    location.reload();
  }
}

// Toast System
function showToast(message) {
  const container = document.getElementById('adminToastContainer');
  const toast = document.createElement('div');
  toast.className = 'admin-toast';
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
