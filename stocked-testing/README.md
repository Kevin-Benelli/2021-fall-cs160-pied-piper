Must have python installed.

Uses python bindings for selenium: https://pypi.org/project/selenium/

Download Chrome driver here: https://chromedriver.chromium.org/downloads

Sample run (in stocked-testing folder, with backend and client running): python .\stocked-login-test.py
Should open up a chrome window and take you to TSLA.
Depending on what you're testing, you may need to wait for the page to load. See: https://www.browserstack.com/guide/selenium-wait-for-page-to-load, or stocked-chart-test.py for an example.
#  Test Chat feature
 1. test-chat.py test cases:
 - Pre-condition: User is not logged in
 - Test Steps: 
 - Verify chat header text is visible and correct with name: “Join Stocked Chat Room Now!”
 - Verify chat join room fields exists based on placeholder text
 - Verify chat join room button text exists and button text is correct with text: “Join Chat Room”
 - Verify open chat by entering username and ticker: TSLA then verify chat opens with TSLA chat header. 
 - Input: 
    - name_field_elem.send_keys("Kbenelli")
    - ticker_field_elem.send_keys("TSLA")

 - Expected Output:
    - expected_chat_header_text = "Join Stocked Chat Room Now!"
    - expected_chat_join_room_field_placeholder_text = True
    - expected_chat_button_text = "Join Chat Room"
    - expected_open_chat_session_header_text = "Live Chat Room for TSLA"

- Post-conditions:
    - Chat room is open and webdriver closes
    - STDout is printed on console
    - Assertion failures are printed to console if failure occurs
