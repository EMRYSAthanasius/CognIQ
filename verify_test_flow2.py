from playwright.sync_api import sync_playwright
import time
import os

def test_flow():
    os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")
    os.system("npm run start > /dev/null 2>&1 &")
    time.sleep(5)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            page.goto('http://localhost:3000/test', wait_until='networkidle')
            time.sleep(2)

            for _ in range(60):
                if "results" in page.url:
                    break

                options = page.query_selector_all(".opt")
                if options:
                    options[0].click()
                    time.sleep(0.05)
                    next_btn = page.query_selector(".bnext")
                    if next_btn:
                        next_btn.click()
                        time.sleep(0.05)
                else:
                    break

            time.sleep(3)

            # Print the entire HTML of the results page to understand what is rendering
            print(page.content())

        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            browser.close()
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == '__main__':
    test_flow()
