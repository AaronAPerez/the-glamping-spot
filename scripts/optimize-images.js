const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images/optimized';

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(inputDir, file);
      const baseName = path.parse(file).name;
      
      // Generate WebP
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, `${baseName}.webp`));
      
      // Generate AVIF
      await sharp(inputPath)
        .avif({ quality: 60 })
        .toFile(path.join(outputDir, `${baseName}.avif`));
      
      // Generate responsive sizes
      const sizes = [640, 750, 828, 1080, 1200, 1920];
      for (const size of sizes) {
        await sharp(inputPath)
          .resize(size)
          .webp({ quality: 80 })
          .toFile(path.join(outputDir, `${baseName}-${size}w.webp`));
      }
    }
  }
}

optimizeImages().catch(console.error);