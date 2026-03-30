from playwright.sync_api import sync_playwright
import time
import os
import glob

def test_login_flow():
    os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")
    os.system("npm run start > /dev/null 2>&1 &")
    time.sleep(5)

    os.makedirs('/home/jules/verification/screenshots', exist_ok=True)
    os.makedirs('/home/jules/verification/videos', exist_ok=True)

    # Clear old videos
    for f in glob.glob('/home/jules/verification/videos/*.webm'):
        os.remove(f)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()

        try:
            # Go to the login page
            page.goto('http://localhost:3000/login', wait_until='networkidle')
            page.wait_for_timeout(500)

            # Try invalid email
            page.fill("input[name='email']", "invalid_email")
            page.wait_for_timeout(500)
            page.click("button:text('Sign In')")
            page.wait_for_timeout(1000)

            # Take a screenshot to show email validation error
            page.screenshot(path='/home/jules/verification/screenshots/login_invalid_email.png')

            # Now fill with valid email but it's using the dummy URL so we should get network error
            page.fill("input[name='email']", "test@example.com")
            page.fill("input[name='password']", "password123")
            page.wait_for_timeout(500)

            # Click sign in button
            page.click("button:text('Sign In')")
            page.wait_for_timeout(2000) # wait for the supabase failure

            # Take a screenshot to see the Supabase specific error
            page.screenshot(path='/home/jules/verification/screenshots/login_supabase_error.png')
            print(page.content())
        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            context.close()
            browser.close()
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

if __name__ == '__main__':
    test_login_flow()
