from playwright.sync_api import sync_playwright
import time
import os
import glob

def test_flow():
    os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")
    os.system("npm run start > /dev/null 2>&1 &")
    time.sleep(5)

    os.makedirs('/home/jules/verification/screenshots', exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Go directly to the test page
            page.goto('http://localhost:3000/test', wait_until='networkidle')
            time.sleep(2)

            # We need to answer the questions to reach the end.
            # How many questions are there? Let's check by evaluating page.content() or repeatedly clicking options
            # Since the questions are loaded dynamically, we just need to keep clicking until test is over
            for _ in range(60): # there should be 60 questions based on index.html
                # Check if we are on results page
                if "results" in page.url:
                    break

                # Find an option button and click it
                options = page.query_selector_all(".opt")
                if options:
                    options[0].click()
                    time.sleep(0.1)
                    # Click next
                    next_btn = page.query_selector(".bnext")
                    if next_btn:
                        next_btn.click()
                        time.sleep(0.1)
                else:
                    break

            time.sleep(3)
            page.screenshot(path='/home/jules/verification/screenshots/test_end.png')
            print("Current URL:", page.url)

        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            browser.close()
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == '__main__':
    test_flow()
