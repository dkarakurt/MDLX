// ==========================================================================
// MAISON DE LOUP ATELIER — PRODUCT DETAIL PAGE (PDP) CONTROLLER
// ==========================================================================

const PDP_CURRENCY_RATES = {
  TRY: { symbol: "₺", rate: 1, position: "after" },
  EUR: { symbol: "€", rate: 0.0265, position: "before" },
  USD: { symbol: "$", rate: 0.0289, position: "before" },
  GBP: { symbol: "£", rate: 0.0228, position: "before" }
};

const PDP_SHIPPING_THRESHOLDS = {
  TRY: 8000,
  EUR: 250,
  USD: 270,
  GBP: 220
};

const PDP_STATE = {
  currentCurrency: localStorage.getItem('mdl_currency') || 'TRY',
  cart: JSON.parse(localStorage.getItem('mdl_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('mdl_wishlist') || '[]'),
  selectedSize: '36'
};

document.addEventListener('DOMContentLoaded', () => {
  initCurrencySelector();
  updateCartBadge();
  updatePriceDisplay();
  initAccordion();

  // Initialize selected size
  const firstSizeBtn = document.querySelector('.pdp-size-btn');
  if (firstSizeBtn) {
    PDP_STATE.selectedSize = firstSizeBtn.getAttribute('data-size') || '36';
  }

  // Escape key closes modals/drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const sgModal = document.getElementById('sizeGuideModal');
      if (sgModal && sgModal.classList.contains('active')) {
        closeSizeGuideModal();
        return;
      }
      closeAllDrawers();
    }
  });
});

function formatPdpPrice(tryAmount) {
  const cur = PDP_CURRENCY_RATES[PDP_STATE.currentCurrency] || PDP_CURRENCY_RATES.TRY;
  const converted = Math.round(tryAmount * cur.rate);
  if (cur.position === 'before') {
    return `${cur.symbol}${converted.toLocaleString('en-US')}`;
  } else {
    return `₺${converted.toLocaleString('tr-TR')}`;
  }
}

function initCurrencySelector() {
  const curSelect = document.getElementById('currencySelect');
  if (curSelect) {
    curSelect.value = PDP_STATE.currentCurrency;
    curSelect.addEventListener('change', (e) => {
      PDP_STATE.currentCurrency = e.target.value;
      localStorage.setItem('mdl_currency', PDP_STATE.currentCurrency);
      updatePriceDisplay();
      renderCart();
      showPdpToast(`Para birimi güncellendi: ${PDP_STATE.currentCurrency}`);
    });
  }
}

function updatePriceDisplay() {
  const priceEl = document.getElementById('pdpPrice');
  const addBtnText = document.getElementById('pdpAddBtnText');
  const tryAmount = window.CURRENT_PRODUCT ? window.CURRENT_PRODUCT.priceTRY : 0;

  if (priceEl && tryAmount) {
    priceEl.innerText = formatPdpPrice(tryAmount);
  }
  if (addBtnText && tryAmount) {
    addBtnText.innerText = `ÇANTAYA EKLE • ${formatPdpPrice(tryAmount)}`;
  }
}

function switchPdpImage(src, thumbEl) {
  const mainImg = document.getElementById('pdpMainImg');
  if (mainImg) {
    mainImg.src = src;
  }
  document.querySelectorAll('.pdp-thumb-item').forEach(el => el.classList.remove('active'));
  if (thumbEl) {
    thumbEl.classList.add('active');
  }
}
window.switchPdpImage = switchPdpImage;

function selectPdpSize(size, btnEl) {
  PDP_STATE.selectedSize = size;
  document.querySelectorAll('.pdp-size-btn').forEach(b => b.classList.remove('selected'));
  if (btnEl) {
    btnEl.classList.add('selected');
  }
}
window.selectPdpSize = selectPdpSize;

function addCurrentProductToCart() {
  if (!window.CURRENT_PRODUCT) return;
  const p = window.CURRENT_PRODUCT;
  const size = PDP_STATE.selectedSize || '36';

  PDP_STATE.cart = JSON.parse(localStorage.getItem('mdl_cart') || '[]');
  const existing = PDP_STATE.cart.find(item => item.id === p.id && item.size === size);

  if (existing) {
    existing.quantity += 1;
  } else {
    PDP_STATE.cart.push({
      id: p.id,
      name: p.name,
      nameTr: p.nameTr,
      priceTRY: p.priceTRY,
      size: size,
      image: p.primaryImage,
      quantity: 1
    });
  }

  localStorage.setItem('mdl_cart', JSON.stringify(PDP_STATE.cart));
  updateCartBadge();
  renderCart();
  openCartDrawer();
  showPdpToast(`${p.nameTr} (EU ${size}) alışveriş çantasına eklendi.`);
}
window.addCurrentProductToCart = addCurrentProductToCart;

function updateCartBadge() {
  const count = PDP_STATE.cart.reduce((sum, i) => sum + i.quantity, 0);
  const badges = document.querySelectorAll('.cart-count, #cartCount, #cartDrawerCount');
  badges.forEach(b => {
    b.innerText = count;
  });
}

function changeCartQty(index, delta) {
  if (PDP_STATE.cart[index]) {
    PDP_STATE.cart[index].quantity += delta;
    if (PDP_STATE.cart[index].quantity <= 0) {
      PDP_STATE.cart.splice(index, 1);
    }
    localStorage.setItem('mdl_cart', JSON.stringify(PDP_STATE.cart));
    updateCartBadge();
    renderCart();
  }
}
window.changeCartQty = changeCartQty;

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  const progressEl = document.getElementById('shippingProgress');
  const shipBar = document.getElementById('shippingBarText');

  if (!container || !subtotalEl) return;

  const cur = PDP_CURRENCY_RATES[PDP_STATE.currentCurrency] || PDP_CURRENCY_RATES.TRY;
  const threshold = PDP_SHIPPING_THRESHOLDS[PDP_STATE.currentCurrency] || 8000;
  const formattedThreshold = cur.position === 'before'
    ? `${cur.symbol}${threshold.toLocaleString('en-US')}`
    : `₺${threshold.toLocaleString('tr-TR')}`;

  if (PDP_STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <p>Alışveriş çantanız henüz boş.</p>
        <p style="font-size: 0.72rem; margin-top: 8px;">Koleksiyonumuzdaki imza parçaları keşfedin.</p>
      </div>
    `;
    subtotalEl.innerText = formatPdpPrice(0);
    if (progressEl) progressEl.style.width = '0%';
    if (shipBar) {
      shipBar.innerText = `Ücretsiz Dünya Çapında Ekspres Kargo için ${formattedThreshold} limit`;
    }
    return;
  }

  let subtotalTRY = 0;
  container.innerHTML = PDP_STATE.cart.map((item, idx) => {
    const itemTotalTRY = item.priceTRY * item.quantity;
    subtotalTRY += itemTotalTRY;
    const title = item.nameTr || item.name;

    return `
      <div class="cart-item">
        <img src="/${item.image}" alt="${title}" class="cart-item-img">
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
            <span class="cart-item-price">${formatPdpPrice(itemTotalTRY)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  subtotalEl.innerText = formatPdpPrice(subtotalTRY);

  const subtotalCurr = Math.round(subtotalTRY * cur.rate);
  const pct = Math.min(100, Math.round((subtotalCurr / threshold) * 100));
  if (progressEl) progressEl.style.width = `${pct}%`;

  if (shipBar) {
    if (subtotalCurr >= threshold) {
      shipBar.innerHTML = '<strong>Tebrikler!</strong> Ücretsiz ekspres kargo hakkı kazandınız.';
    } else {
      const diff = threshold - subtotalCurr;
      const formattedDiff = cur.position === 'before'
        ? `${cur.symbol}${diff.toLocaleString('en-US')}`
        : `₺${diff.toLocaleString('tr-TR')}`;
      shipBar.innerText = `Ücretsiz ekspres kargo için ${formattedDiff} daha ekleyin`;
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer) drawer.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  renderCart();
}
window.openCartDrawer = openCartDrawer;

function openSizeGuideModal() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
window.openSizeGuideModal = openSizeGuideModal;

function closeSizeGuideModal() {
  const modal = document.getElementById('sizeGuideModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
window.closeSizeGuideModal = closeSizeGuideModal;

function closeAllDrawers() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (drawer) drawer.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  closeSizeGuideModal();
}
window.closeAllDrawers = closeAllDrawers;

function togglePdpWishlist() {
  if (!window.CURRENT_PRODUCT) return;
  const id = window.CURRENT_PRODUCT.id;
  const idx = PDP_STATE.wishlist.indexOf(id);
  if (idx > -1) {
    PDP_STATE.wishlist.splice(idx, 1);
    showPdpToast('Ürün favorilerden çıkarıldı.');
  } else {
    PDP_STATE.wishlist.push(id);
    showPdpToast('Ürün favorilerinize eklendi.');
  }
  localStorage.setItem('mdl_wishlist', JSON.stringify(PDP_STATE.wishlist));
  const svg = document.querySelector('#pdpWishBtn svg');
  if (svg) {
    svg.setAttribute('fill', idx > -1 ? 'none' : '#e11d48');
  }
}
window.togglePdpWishlist = togglePdpWishlist;

function initAccordion() {
  document.querySelectorAll('.pdp-acc-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const content = hdr.nextElementSibling;
      if (content) {
        content.classList.toggle('open');
        const icon = hdr.querySelector('.acc-icon');
        if (icon) {
          icon.innerText = content.classList.contains('open') ? '−' : '+';
        }
      }
    });
  });
}

function showPdpToast(msg) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>&bull;</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
