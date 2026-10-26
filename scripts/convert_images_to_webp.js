// ==========================================================================
// SCRIPT: convert_images_to_webp.js
// Converts JPG/PNG assets to high-efficiency WebP format and generates
// responsive srcset variants (400w, 800w) for superior performance.
// ==========================================================================

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images');

async function processImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter(f => /\.(jpe?g|png)$/i.test(f) && !f.endsWith('.webp'));

  console.log(`Found ${imageFiles.length} images to optimize in assets/images/...\n`);

  let originalBytesTotal = 0;
  let webpBytesTotal = 0;
  let convertedCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const parsed = path.parse(file);
    const outputBase = parsed.name;
    const outputWebp = path.join(IMAGES_DIR, `${outputBase}.webp`);

    const stat = fs.statSync(inputPath);
    originalBytesTotal += stat.size;

    try {
      const img = sharp(inputPath);
      const metadata = await img.metadata();

      // 1. Full-size WebP
      await img
        .clone()
        .webp({ quality: 85, effort: 4 })
        .toFile(outputWebp);

      const webpStat = fs.statSync(outputWebp);
      webpBytesTotal += webpStat.size;
      convertedCount++;

      // 2. Responsive variants for hero, categories, and products if width > 400
      if (metadata.width && metadata.width >= 600) {
        // 400w variant
        const out400 = path.join(IMAGES_DIR, `${outputBase}-400w.webp`);
        await img
          .clone()
          .resize(400)
          .webp({ quality: 82, effort: 4 })
          .toFile(out400);

        // 800w variant if original is larger than 800
        if (metadata.width >= 900) {
          const out800 = path.join(IMAGES_DIR, `${outputBase}-800w.webp`);
          await img
            .clone()
            .resize(800)
            .webp({ quality: 85, effort: 4 })
          .toFile(out800);
        }
      }

      const ratio = (((stat.size - webpStat.size) / stat.size) * 100).toFixed(1);
      console.log(`✓ ${file} (${(stat.size / 1024).toFixed(0)} KB) -> ${outputBase}.webp (${(webpStat.size / 1024).toFixed(0)} KB) [-%${ratio}]`);
    } catch (err) {
      console.error(`✗ Error processing ${file}: ${err.message}`);
    }
  }

  const savedMb = ((originalBytesTotal - webpBytesTotal) / (1024 * 1024)).toFixed(2);
  const totalRatio = (((originalBytesTotal - webpBytesTotal) / originalBytesTotal) * 100).toFixed(1);

  console.log(`\n==================================================`);
  console.log(`Dönüştürülen Görseller: ${convertedCount} / ${imageFiles.length}`);
  console.log(`Orijinal Boyut: ${(originalBytesTotal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`WebP Boyutu: ${(webpBytesTotal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Kazanılan Bant Genişliği: ${savedMb} MB (-%${totalRatio})`);
  console.log(`==================================================\n`);
}

processImages().catch(err => {
  console.error('Fatal error during image optimization:', err);
  process.exit(1);
});
