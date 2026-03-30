const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    recordVideo: {
      dir: path.join(__dirname, 'verification', 'videos'),
    }
  });
  const page = await context.newPage();

  // Create mock localStorage data
  const testAnswers = Array(60).fill({ pts: 1, max: 1, t: 1000, c: "LA" });
  testAnswers[10] = { pts: 1, max: 1, t: 1000, c: "MA" }; // just to mix it up

  await page.goto('http://localhost:3000/');

  await page.evaluate(({ answers }) => {
    localStorage.setItem('testAnswers', JSON.stringify(answers));
    localStorage.setItem('testAge', '25');
  }, { answers: testAnswers });

  // Now go to results
  await page.goto('http://localhost:3000/results');

  // Wait for the result data to render
  await page.waitForSelector('.rsco');

  // Take screenshot
  if (!fs.existsSync(path.join(__dirname, 'verification', 'screenshots'))) {
      fs.mkdirSync(path.join(__dirname, 'verification', 'screenshots'), { recursive: true });
  }
  await page.screenshot({ path: path.join(__dirname, 'verification', 'screenshots', 'results_with_cat_pcts.png'), fullPage: true });

  await context.close();
  await browser.close();
  console.log('Results page verification done.');
})();
