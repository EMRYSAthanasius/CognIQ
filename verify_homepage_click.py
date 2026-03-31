import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        print("Navigating to http://localhost:3001...")
        await page.goto('http://localhost:3001')

        # Take a screenshot before clicking
        await page.screenshot(path='/home/jules/verification/screenshots/homepage_before_click.png')
        print("Screenshot taken: homepage_before_click.png")

        print("Clicking 'Start Your Assessment' button...")
        # Find the button by text
        button = page.locator('button:has-text("Start Your Assessment")')
        await button.click()

        print("Waiting for navigation to /assessment...")
        await page.wait_for_url('**/assessment', timeout=5000)

        # Take a screenshot after routing
        await page.screenshot(path='/home/jules/verification/screenshots/homepage_after_click.png')
        print("Screenshot taken: homepage_after_click.png")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
