const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        recordVideo: { dir: "/home/jules/verification/videos" }
    });
    const page = await context.newPage();

    try {
        await page.goto("file:///app/index.html");
        await page.waitForTimeout(500);

        // Click 'Test Yourself' on Home page
        await page.getByRole("button", { name: "Test Yourself →" }).click();
        await page.waitForTimeout(500);

        // Fill Age and begin assessment
        await page.getByPlaceholder("Your age (10 to 80)").fill("25");
        await page.waitForTimeout(500);
        await page.getByRole("button", { name: "Begin Assessment →" }).click();
        await page.waitForTimeout(1000);

        // Wait for first question to render and take a screenshot to ensure the DOM nodes were created correctly
        await page.screenshot({ path: "/home/jules/verification/screenshots/verification.png" });
        await page.waitForTimeout(1000);

    } finally {
        await context.close();
        await browser.close();
    }
})();