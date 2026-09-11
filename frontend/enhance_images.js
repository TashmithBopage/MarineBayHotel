const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const imageFiles = ['hero.jpg', 'about.jpg', 'gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg'];

async function enhanceImages() {
  console.log('Starting high-resolution upscaling for exact UI images...');

  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const tempPath = path.join(imagesDir, `enhanced_${file}`);

    if (fs.existsSync(inputPath)) {
      try {
        const metadata = await sharp(inputPath).metadata();
        const targetWidth = Math.round(metadata.width * 2.2);
        const targetHeight = Math.round(metadata.height * 2.2);

        await sharp(inputPath)
          .resize(targetWidth, targetHeight, {
            kernel: sharp.kernel.lanczos3,
            fit: 'fill'
          })
          .sharpen({
            sigma: 1.2,
            flat: 1.0,
            jagged: 2.0
          })
          .jpeg({ quality: 95, mozjpeg: true })
          .toFile(tempPath);

        // Replace original with enhanced version
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        console.log(`Successfully upscaled and enhanced ${file} (${metadata.width}x${metadata.height} -> ${targetWidth}x${targetHeight})`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

enhanceImages();
