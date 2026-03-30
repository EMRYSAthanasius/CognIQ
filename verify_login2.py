from playwright.sync_api import sync_playwright
import time
import os

def test_login_page():
    os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")
    os.system("npm run start &")
    time.sleep(5)

    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Go to the login page
            page.goto('http://localhost:3000/login', wait_until='networkidle')

            # Fill with invalid credentials to test error
            page.fill("input[name='email']", "test@example.com")
            page.fill("input[name='password']", "wrongpassword")

            # Click sign in button
            page.click("button:text('Sign In')")
            time.sleep(3)

            # Take a screenshot to see if the error appears
            os.makedirs('/home/jules/verification/screenshots', exist_ok=True)
            page.screenshot(path='/home/jules/verification/screenshots/login_error_filled.png')
            print("Screenshot saved to /home/jules/verification/screenshots/login_error_filled.png")

        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            browser.close()
            # Kill the server
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == '__main__':
    test_login_page()
