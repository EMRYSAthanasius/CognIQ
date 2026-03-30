from playwright.sync_api import sync_playwright
import time
import os

def test_login_page():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Start server in background
        os.system("npm run build")
        os.system("npm run start &")
        time.sleep(5) # wait for server to start

        try:
            # Go to the login page
            page.goto('http://localhost:3000/login', wait_until='networkidle')

            # Click sign in button without filling form
            page.click("button:text('Sign In')")
            time.sleep(2)

            # Since dummy url and key are used, the error should be something about Invalid API key or failed to fetch
            # In our case it will probably try to contact dummy url and fail, displaying error message

            # Take a screenshot to see if the error appears
            os.makedirs('/home/jules/verification/screenshots', exist_ok=True)
            page.screenshot(path='/home/jules/verification/screenshots/login_error.png')
            print("Screenshot saved to /home/jules/verification/screenshots/login_error.png")

        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            browser.close()
            # Kill the server
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == '__main__':
    test_login_page()
