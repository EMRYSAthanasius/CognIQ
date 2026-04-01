import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        print("Navigating to http://localhost:3001/setup")
        await page.goto("http://localhost:3001/setup")

        # Don't fill out the form

        print("Clicking Start Assessment without filling the form...")
        await page.click("button:has-text('Start Assessment')")

        # Wait a moment for routing
        await page.wait_for_timeout(2000)

        print(f"Current URL: {page.url}")
        if "test" in page.url:
            print("Successfully navigated to /test without filling the form!")
        else:
            print("Failed to navigate. Still on /setup or an error occurred.")

        await browser.close()

asyncio.run(main())
