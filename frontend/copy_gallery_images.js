const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadedDir = 'C:/Users/mesit/.gemini/antigravity/brain/14a5b055-7b33-41e4-afd1-66206d0089ed/.user_uploaded';
const targetDir = path.join(__dirname, 'src', 'assets', 'images');

const imageMap = [
  {
    src: 'media_1788854608020.jpg',
    dest: 'gallery-hero.jpg',
    scale: 1.5
  },
  {
    src: 'media_1788854686509.jpg',
    dest: 'gallery-curved-pool.jpg',
    scale: 2.0
  },
  {
    src: 'media_1788854576725.jpg',
    dest: 'gallery-resort-building.jpg',
    scale: 2.0
  },
  {
    src: 'media_1788854627742.jpg',
    dest: 'gallery-beach.jpg',
    scale: 2.0
  }
];

async function processImages() {
  for (const item of imageMap) {
    const srcPath = path.join(uploadedDir, item.src);
    const destPath = path.join(targetDir, item.dest);

    if (fs.existsSync(srcPath)) {
      try {
        const metadata = await sharp(srcPath).metadata();
        const targetWidth = Math.round(metadata.width * item.scale);
        const targetHeight = Math.round(metadata.height * item.scale);

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

        console.log(`Saved enhanced ${item.dest}: ${metadata.width}x${metadata.height} -> ${targetWidth}x${targetHeight}`);
      } catch (err) {
        console.warn(`Sharp processing failed for ${item.src}, falling back to copy:`, err.message);
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied directly: ${item.dest}`);
      }
    } else {
      console.error(`Source not found: ${srcPath}`);
    }
  }
}

processImages();
