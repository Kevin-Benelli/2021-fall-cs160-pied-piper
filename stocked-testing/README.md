Must have python installed.

Uses python bindings for selenium: https://pypi.org/project/selenium/

Download Chrome driver here: https://chromedriver.chromium.org/downloads

Sample run (in stocked-testing folder, with backend and client running): python .\stocked-login-test.py
Should open up a chrome window and take you to TSLA.
Depending on what you're testing, you may need to wait for the page to load. See: https://www.browserstack.com/guide/selenium-wait-for-page-to-load, or stocked-chart-test.py for an example.