import puppeteer from 'puppeteer';

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
    
    // Hide cookie banners
    await page.addStyleTag({ content: `
      [id*="cookie" i], 
      [class*="cookie" i],
      [id*="gdpr" i],
      [class*="gdpr" i],
      #cmplz-cookiebanner-container,
      .cli-modal-dialog,
      #moove_gdpr_cookie_info_bar {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
    `});
    
    // Slow scroll to bottom to trigger ALL animations
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 400;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 250); // slow scroll
        });
    });
    
    // Wait for the very last animations at the bottom to finish
    console.log('Waiting 3 seconds for bottom animations to finish...');
    await new Promise(r => setTimeout(r, 3000));
    
    // Scroll back to top so the fixed navbar stays at the top of the screenshot!
    // Most GSAP animations are 'play once' so they shouldn't disappear.
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1000));
    
    console.log(`Taking full page screenshot for ${site.out}...`);
    await page.screenshot({ path: site.out, fullPage: true });
  }

  await browser.close();
  console.log('Done!');
})();
