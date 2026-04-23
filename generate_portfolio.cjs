const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'PORTFOLIO', 'TRESCI_WIZUALNE');
const dataFile = path.join(__dirname, 'src', 'data', 'portfolioData.js');

if (!fs.existsSync(path.dirname(dataFile))) {
  fs.mkdirSync(path.dirname(dataFile), { recursive: true });
}

const getCategoryByMedia = (media) => {
  const hasImages = media.some(m => m.type === 'image');
  const hasVideos = media.some(m => m.type === 'video');
  let cats = [];
  if (hasImages) cats.push('STATYCZNE TREŚCI WIZUALNE');
  if (hasVideos) cats.push('RUCHOME TREŚCI WIZUALNE');
  return cats;
};

const dirs = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

const portfolioData = [];

dirs.forEach((dir, index) => {
  const dirPath = path.join(baseDir, dir);
  const files = fs.readdirSync(dirPath);
  
  const copyFile = files.find(f => f.startsWith('COPY_') && f.endsWith('.txt'));
  let title = dir;
  let fullDesc = '';
  let shortDesc = '';
  
  if (copyFile) {
    const content = fs.readFileSync(path.join(dirPath, copyFile), 'utf8');
    const lines = content.split('\n').filter(l => l.trim() !== '');
    if (lines.length > 0) {
      if (lines[0].startsWith('Tytuł projektu:')) {
        title = lines[0].replace('Tytuł projektu:', '').trim();
        fullDesc = lines.slice(1).join('\n').trim();
      } else {
        title = lines[0].trim();
        fullDesc = lines.slice(1).join('\n').trim();
      }
      shortDesc = fullDesc.substring(0, 120) + '...';
    }
  }

  const mediaFiles = files.filter(f => !f.endsWith('.txt'));
  
  // Try to find a good thumbnail
  let thumbnail = '';
  const images = mediaFiles.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  if (images.length > 0) {
    // Prefer files with simple names like SOLO.png or WIZ_01.png or anything
    thumbnail = `/PORTFOLIO/TRESCI_WIZUALNE/${dir}/${images[0]}`;
  } else if (mediaFiles.length > 0) {
    // maybe a video as thumbnail? We'll just put the video path or need to handle in UI
    thumbnail = `/PORTFOLIO/TRESCI_WIZUALNE/${dir}/${mediaFiles[0]}`;
  }

  const media = mediaFiles.map(f => {
    const type = (f.endsWith('.mp4') || f.endsWith('.webm')) ? 'video' : 'image';
    return {
      type,
      src: `/PORTFOLIO/TRESCI_WIZUALNE/${dir}/${f}`
    };
  });

  const categories = getCategoryByMedia(media);

  portfolioData.push({
    id: dir.toLowerCase().replace(/\s+/g, '-'),
    title,
    client: dir,
    categories,
    desc: shortDesc,
    fullDesc,
    thumbnail,
    media
  });
});

const fileContent = `export const PORTFOLIO_DATA = ${JSON.stringify(portfolioData, null, 2)};\n`;

fs.writeFileSync(dataFile, fileContent);
console.log('Portfolio data generated successfully at', dataFile);
