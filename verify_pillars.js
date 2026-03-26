const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('file://' + __dirname + '/index.html');

  // Set viewport to a typical desktop size
  await page.setViewportSize({ width: 1200, height: 1800 });

  // Take a full page screenshot
  await page.screenshot({ path: 'frontend_verify.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved to frontend_verify.png');
})();
