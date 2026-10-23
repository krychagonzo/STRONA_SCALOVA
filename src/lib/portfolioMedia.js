// Ścieżki do lekkich wersji mediów portfolio generowanych przez optimize_portfolio.py.
// W danych (portfolioData.js) zostają ścieżki do oryginałów.
const withSuffix = (src, suffix) => src.replace(/\.[^/.]+$/, suffix);

export const isVideo = (src) => src.toLowerCase().endsWith('.mp4');

// Obraz na podstronie projektu
export const imageFull = (src) => withSuffix(src, '.webp');

// Kafelek w siatce portfolio
export const imageThumb = (src) => withSuffix(src, '_thumb.webp');
export const imageMobile = (src) => withSuffix(src, '_mobile.webp');
// Szeroki kafel strony w mozaice na desktopie (zrzut z screenshot_website.py w proporcjach kafla)
export const imageWideThumb = (src) => withSuffix(src, '_WIDE_thumb.webp');

// Wideo na podstronie projektu
export const videoWeb = (src) => withSuffix(src, '_web.mp4');

// Zapętlone wideo w kafelku + pierwsza klatka
export const videoThumb = (src) => withSuffix(src, '_thumb.mp4');
export const videoPoster = (src) => withSuffix(src, '_poster.webp');
