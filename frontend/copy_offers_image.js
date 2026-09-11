const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcPath = 'C:/Users/mesit/.gemini/antigravity/brain/14a5b055-7b33-41e4-afd1-66206d0089ed/.user_uploaded/media_1788857141878.jpg';
const destPath = path.join(__dirname, 'src', 'assets', 'images', 'offers-hero.jpg');

async function processImage() {
  if (fs.existsSync(srcPath)) {
    try {
      const metadata = await sharp(srcPath).metadata();
      const targetWidth = Math.round(metadata.width * 1.5);
      const targetHeight = Math.round(metadata.height * 1.5);

      await sharp(srcPath)
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
        .toFile(destPath);

      console.log(`Saved enhanced offers-hero.jpg: ${metadata.width}x${metadata.height} -> ${targetWidth}x${targetHeight}`);
    } catch (err) {
      console.warn('Sharp processing failed, copying directly:', err.message);
      fs.copyFileSync(srcPath, destPath);
      console.log('Copied directly: offers-hero.jpg');
    }
  } else {
    console.error('Source not found:', srcPath);
  }
}

processImage();
