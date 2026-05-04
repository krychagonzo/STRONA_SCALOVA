import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// We will read the public directory manually or just hardcode the folders
const publicDir = path.join(process.cwd(), 'public', 'PORTFOLIO');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.match(/\.(png|jpe?g)$/i) && !file.includes('_mobile')) {
            const outPath = fullPath.replace(/\.[^/.]+$/, '_mobile.webp');
            if (!fs.existsSync(outPath)) {
                console.log(`Compressing: ${file}`);
                await sharp(fullPath)
                    .resize(600) // Good mobile thumbnail size
                    .webp({ quality: 70 })
                    .toFile(outPath);
            }
        }
    }
}

async function run() {
    try {
        console.log('Starting compression...');
        await processDirectory(publicDir);
        console.log('Compression complete!');
    } catch (e) {
        console.error(e);
    }
}

run();
