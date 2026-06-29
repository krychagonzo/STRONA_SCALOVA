const fs = require('fs');
const path = require('path');

const newFooter = `  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logos">
          <a href="/">
            <img src="../logo.png" alt="Scalova" class="footer-logo-main" />
          </a>
          <div class="footer-logo-separator"></div>
          <a href="index.html">
            <img src="assets/LOGO_ARCH.svg" alt="Scalova Arch" class="footer-logo-arch" />
          </a>
        </div>
        <div class="footer-social">
          <a href="https://www.facebook.com/people/Scalova/61563223480934/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/scalova.pl/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/scalova/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Usługi</h4>
        <ul>
          <li><a href="strona-internetowa.html">Strona internetowa</a></li>
          <li><a href="marketing.html">Marketing</a></li>
          <li><a href="wizualizacje-3d.html">Wizualizacje 3D</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Kontakt</h4>
        <ul>
          <li><a href="mailto:kontakt@scalova.pl">kontakt@scalova.pl</a></li>
          <li><a href="tel:+48618300000">61 830 00 00</a></li>
          <li><span>Poznań, Polska</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Scalova. Wszelkie prawa zastrzeżone.</p>
      <div class="footer-bottom-links">
        <a href="/polityka-prywatnosci">Polityka Prywatności</a>
        <a href="/regulamin">Regulamin</a>
      </div>
    </div>
  </footer>`;

const dir = 'c:/Users/Kryst/Desktop/SCALOVA/STRONA/SCALOVA_STRONA/STRONA_SCALOVA/public/scalova_arch';
const files = ['index.html', 'marketing.html', 'strona-internetowa.html', 'wizualizacje-3d.html'];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace everything from <!-- FOOTER --> to </footer>
  const regex = /<!-- FOOTER -->[\s\S]*?<\/footer>/;
  content = content.replace(regex, newFooter);
  
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
});
