from playwright.sync_api import sync_playwright
import time
import os
import glob

def test_login_page():
    # Make sure server is running
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

            # Fill with invalid credentials to test error
            page.fill("input[name='email']", "test@example.com")
            page.wait_for_timeout(500)
            page.fill("input[name='password']", "wrongpassword")
            page.wait_for_timeout(500)

            # Click sign in button
            page.click("button:text('Sign In')")
            page.wait_for_timeout(1000)

            # Take a screenshot to see if the error appears
            page.screenshot(path='/home/jules/verification/screenshots/login_error_fixed.png')
            print("Screenshot saved to /home/jules/verification/screenshots/login_error_fixed.png")

            # Click sign up button
            page.click("button:text('Sign Up')")
            page.wait_for_timeout(1000)

        except Exception as e:
            print(f"Error during test: {e}")
        finally:
            context.close()
            browser.close()
            # Kill the server
            os.system("kill $(lsof -t -i :3000) 2>/dev/null || true")

    # Find the generated video file
    videos = glob.glob('/home/jules/verification/videos/*.webm')
    if videos:
        print(f"Video saved to {videos[0]}")

if __name__ == '__main__':
    test_login_page()
