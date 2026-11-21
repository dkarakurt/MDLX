/**
 * MAISON DE LOUP ATELIER — PHASE 6 AUTOMATED AUDIT TEST SUITE
 * Verifies Performance, Accessibility (A11y), WebP, CLS Prevention, and Focus Trap
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (details) console.error(`    Details: ${details}`);
    failedTests++;
  }
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runPhase6Audit() {
  console.log('\n=============================================================');
  console.log('   MAISON DE LOUP ATELIER — PHASE 6 COMPREHENSIVE AUDIT');
  console.log('=============================================================\n');

  // Test 1: WebP Image Generation & File System Checks
  console.log('1. WebP Assets & Optimization Audit:');
  const webpFiles = [
    'assets/images/cat_blazers_hd.webp',
    'assets/images/cat_blazers_hd-400w.webp',
    'assets/images/cat_trousers_hd.webp',
    'assets/images/cat_shirts_hd.webp',
    'assets/images/cat_tops_hd.webp',
    'assets/images/cat_dresses_hd.webp',
    'assets/images/cat_skirts_hd.webp',
    'assets/images/quality_label_hd.webp',
    'assets/images/tailoring_fit_hd.webp',
    'assets/images/uploaded_1791785047520_Gemini_Generated_Image_wpltxzwpltxzwplt.webp',
    'assets/images/uploaded_1791788751605_Gemini_Generated_Image_fn3h8jfn3h8jfn3h.webp',
    'assets/images/product_blazer_noir.webp',
    'assets/images/product_blazer_ecru.webp'
  ];

  const allWebpExist = webpFiles.every(f => fs.existsSync(path.join(__dirname, f)));
  assert(allWebpExist, 'Critical WebP and responsive variants exist in assets/images/', `Checked ${webpFiles.length} files`);

  // Test 2: index.html Performance Markup
  console.log('\n2. index.html Performance & CLS Prevention Audit:');
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  assert(
    indexHtml.includes('<link rel="preconnect" href="https://fonts.googleapis.com">') &&
    indexHtml.includes('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'),
    'Google Fonts preconnect hints present in <head>'
  );

  assert(
    indexHtml.includes('id="heroImg1"') &&
    indexHtml.includes('fetchpriority="high"') &&
    indexHtml.includes('type="image/webp"'),
    'Hero Slide 0 has WebP <picture> with fetchpriority="high" for optimal LCP'
  );

  assert(
    indexHtml.includes('class="category-img-box"') &&
    indexHtml.includes('cat_blazers_hd-400w.webp') &&
    indexHtml.includes('sizes="(max-width: 768px) 50vw, 300px"'),
    'Category cards feature responsive WebP picture tags with srcset & sizes'
  );

  assert(
    indexHtml.includes('id="card1Image"') &&
    indexHtml.includes('loading="lazy"') &&
    indexHtml.includes('width="400"') &&
    indexHtml.includes('height="250"'),
    'Brand Pillars images have loading="lazy" and explicit width/height for CLS prevention'
  );

  // Test 3: Accessibility (A11y) & Focus Visibility in styles.css
  console.log('\n3. Accessibility & CSS Styling Audit:');
  const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

  assert(
    stylesCss.includes(':focus-visible') &&
    stylesCss.includes('--color-gold'),
    ':focus-visible high-visibility luxury gold outline rule defined in styles.css'
  );

  assert(
    stylesCss.includes('@media (prefers-reduced-motion: reduce)'),
    'prefers-reduced-motion media query implemented for vestibular accessibility'
  );

  assert(
    stylesCss.includes('picture') &&
    stylesCss.includes('display: block;') &&
    stylesCss.includes('.hero-slide picture'),
    'Responsive picture container rules prevent layout reflow'
  );

  // Test 4: Modals & ARIA Dialog Roles in index.html
  console.log('\n4. Modal Dialogs & ARIA Roles Audit:');
  assert(
    indexHtml.includes('id="storyModal"') &&
    indexHtml.includes('role="dialog"') &&
    indexHtml.includes('aria-modal="true"') &&
    indexHtml.includes('aria-label="Maison De Loup Atelier Hikâyesi"'),
    'storyModal has role="dialog", aria-modal="true", and descriptive aria-label'
  );

  assert(
    indexHtml.includes('id="journalModal"') &&
    indexHtml.includes('role="dialog"') &&
    indexHtml.includes('aria-modal="true"'),
    'journalModal has role="dialog" and aria-modal="true"'
  );

  assert(
    indexHtml.includes('id="sizeGuideModal"') &&
    indexHtml.includes('role="dialog"') &&
    indexHtml.includes('aria-modal="true"') &&
    indexHtml.includes('aria-label="Beden Rehberi"'),
    'sizeGuideModal has role="dialog" and aria-label="Beden Rehberi"'
  );

  // Test 5: Focus Trap & Keyboard Navigation in app.js
  console.log('\n5. Focus Trap & Keyboard Controls in app.js:');
  const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

  assert(
    appJs.includes('trapFocusToModal') &&
    appJs.includes('handleModalFocusTrap') &&
    appJs.includes('restoreLastFocus'),
    'Accessible focus trap and focus restoration implemented in app.js'
  );

  assert(
    appJs.includes('switchCardPreviewImage') &&
    appJs.includes('picture.querySelector(\'source\')'),
    'switchCardPreviewImage updates WebP picture source on hover/click'
  );

  // Test 6: Static PDP Pages & Generator Audit
  console.log('\n6. Static PDP Pages & Generator Audit:');
  const pdpFiles = fs.readdirSync(path.join(__dirname, 'urun')).filter(f => f.endsWith('.html'));
  assert(pdpFiles.length === 12, 'All 12 product static pages exist in /urun/');

  const samplePdp = fs.readFileSync(path.join(__dirname, 'urun', 'noir-atelier-blazer.html'), 'utf8');
  assert(
    samplePdp.includes('<picture id="pdpMainPicture">') &&
    samplePdp.includes('type="image/webp"') &&
    samplePdp.includes('fetchpriority="high"'),
    'PDP main stage features <picture id="pdpMainPicture"> with WebP and fetchpriority="high"'
  );

  assert(
    samplePdp.includes('<link rel="preconnect" href="https://fonts.googleapis.com">'),
    'PDP pages have preconnect hints for Google Fonts'
  );

  // Test 7: Live HTTP Server Delivery
  console.log('\n7. Live HTTP Server Delivery Audit:');
  try {
    const webpRes = await fetchUrl('http://localhost:3000/assets/images/cat_blazers_hd.webp');
    assert(
      webpRes.status === 200 && webpRes.headers['content-type'] === 'image/webp',
      'WebP images served with 200 OK and Content-Type: image/webp'
    );

    const pdpRes = await fetchUrl('http://localhost:3000/urun/noir-atelier-blazer.html');
    assert(pdpRes.status === 200, 'PDP static page served with 200 OK');

    const sitemapRes = await fetchUrl('http://localhost:3000/sitemap.xml');
    assert(
      sitemapRes.status === 200 && sitemapRes.headers['content-type'].includes('application/xml'),
      'sitemap.xml served with 200 OK and application/xml header'
    );
  } catch (err) {
    assert(false, 'Live HTTP server checks failed', err.message);
  }

  // Summary
  console.log('\n=============================================================');
  console.log(`   PHASE 6 AUDIT COMPLETE: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('=============================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runPhase6Audit();
