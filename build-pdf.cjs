const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');
const pagesDir = path.join(__dirname, 'src', 'pages');

const componentFiles = [
  'Hero.jsx', 'Features.jsx', 'Philosophy.jsx', 'Protocol.jsx', 'Services.jsx', 'Team.jsx', 'ScalingDefinition.jsx'
];

let mdContent = '# STRONA SCALOVA - KOD ŹRÓDŁOWY / COPY\n\nNależy wykorzystać ten dokument do utrzymania kontekstu dotyczącego treści (copy), sekcji produktowych oraz budowy wizualnej brutalistycznej strony głównej oraz podstron.\n\n';

function appendFiles(dir, files) {
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      if (stats.isFile()) {
         const content = fs.readFileSync(fullPath, 'utf-8');
         mdContent += `\n\n## Plik: ${file}\n\`\`\`jsx\n${content}\n\`\`\`\n`;
      }
    }
  }
}

appendFiles(componentsDir, componentFiles);

if (fs.existsSync(pagesDir)) {
  const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));
  appendFiles(pagesDir, pages);
}

fs.writeFileSync('site-copy.md', mdContent);
console.log('Utworzono site-copy.md');
