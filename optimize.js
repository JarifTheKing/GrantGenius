import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OPTIMIZE_TASKS = [
  {
    folder: 'src/assets/Story',
    width: 300,
    quality: 80
  },
  {
    folder: 'src/assets/New-Banner',
    width: 1920,
    quality: 80
  }
];

async function run() {
  for (const task of OPTIMIZE_TASKS) {
    const dir = path.join(process.cwd(), task.folder);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(dir, file);
        const outputName = file.substring(0, file.lastIndexOf('.')) + '.webp';
        const outputPath = path.join(dir, outputName);

        console.log(`Optimizing: ${inputPath} -> ${outputPath}`);
        await sharp(inputPath)
          .resize({ width: task.width, withoutEnlargement: true })
          .webp({ quality: task.quality })
          .toFile(outputPath);

        // Delete original
        fs.unlinkSync(inputPath);
        console.log(`Deleted original: ${inputPath}`);
      }
    }
  }
}

run().catch(console.error);
