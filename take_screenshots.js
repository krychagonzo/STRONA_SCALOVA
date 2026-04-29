const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to a typical desktop size
  await page.setViewport({ width: 1920, height: 1080 });

  const sites = [
    { url: 'https://hocomoholding.eu/', out: 'public/PORTFOLIO/STRONY/HOCOMO_FULL.png' },
    { url: 'https://www.geo-arch.com.pl/', out: 'public/PORTFOLIO/STRONY/GEOARCH_FULL.png' },
    { url: 'https://renatarogalska.pl/', out: 'public/PORTFOLIO/STRONY/RENATA_FULL.png' }
  ];

  for (const site of sites) {
    console.log(`Navigating to ${site.url}...`);
    await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Auto-scroll to load lazy images
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 300;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    // Wait for any fixed headers to settle
    await new Promise(r => setTimeout(r, 1000));
    
    console.log(`Taking full page screenshot for ${site.out}...`);
    await page.screenshot({ path: site.out, fullPage: true });
  }

  await browser.close();
  console.log('Done!');
})();
