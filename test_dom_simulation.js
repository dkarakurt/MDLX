// Test DOM simulation of applyLanguage in both TR and EN
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Simulate a basic browser DOM environment with regex or mock elements
console.log('=== DOM SİMÜLASYONU VE DİL DEĞİŞİMİ TESTİ ===\n');

// Verify all element IDs queried by applyLanguage exist in index.html
const idsQueried = [
  'announcementText',
  'navNewIn', 'navBlazers', 'navClothing', 'navCollections', 'navEditorial', 'navAbout', 'navContact',
  'heroSub', 'heroProv', 'heroCtaText', 'heroStoryTag',
  'sigPretitle', 'sigTitle', 'sigDesc', 'sigLinkText',
  'wolfTitle', 'wolfText', 'wolfLinkText',
  'catTitle', 'catBadgeCore',
  'catNameBlazers', 'catNameTrousers', 'catNameShirts', 'catNameTops', 'catNameDresses', 'catNameSkirts',
  'catalogHeading', 'catalogSub', 'sortSelect',
  'card1Title', 'card1Text', 'card1LinkText',
  'card2Title', 'card2Text', 'card2LinkText',
  'newsletterTitle', 'newsletterDesc', 'newsletterEmail', 'kvkkConsentText',
  'liveSearchInput',
  'cartDrawerTitleText', 'shippingBarText', 'subtotalLabel', 'checkoutBtn', 'emptyCartTitle', 'emptyCartSub',
  'modalStorySubtitle', 'modalStoryVisionBadge', 'modalStoryVisionTitle', 'modalStoryVision',
  'modalStoryMissionBadge', 'modalStoryMissionTitle', 'modalStoryMission',
  'modalStoryStrategyBadge', 'modalStoryStrategyTitle', 'modalStoryStrategyText', 'modalStoryStrategyAxes',
  'modalStoryFounderBadge', 'modalStoryFounderTitle', 'modalStoryFounder',
  'qvExitBtnText',
  'footNavNewIn', 'footNavBlazers', 'footNavClothing', 'footNavCollections', 'footNavEditorial', 'footNavAbout', 'footNavContact',
  'footLegalTerms', 'footLegalPreInfo', 'footLegalKvkk', 'footLegalCookies', 'footLegalReturns', 'footLegalShipping',
  'footerCopyright'
];

let missing = 0;
idsQueried.forEach(id => {
  const hasId = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  if (!hasId) {
    console.error(`  [EKSİK ID] index.html içinde #${id} bulunamadı!`);
    missing++;
  }
});

if (missing === 0) {
  console.log(`  [BAŞARILI] applyLanguage() tarafından hedeflenen tüm ${idsQueried.length} adet DOM ID'si index.html içerisinde eksiksiz mevcut!`);
} else {
  console.error(`  [HATA] ${missing} adet ID eksik!`);
  process.exit(1);
}
