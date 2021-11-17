import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import time 

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import selenium.webdriver.support.ui as ui
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains 

# Chart behavior verification
secondsToWaitIfElementIsNotFound = 3

def verify_chart_exists():
    try:
        chart = driver.find_element(By.CSS_SELECTOR, ".chart")
        return True
    except NoSuchElementException:
        return False

def verify_from_datetime_selector():
    try:
        chart_from_button = WebDriverWait(driver, secondsToWaitIfElementIsNotFound).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, ".chart-from-button")))
        chart_from_button.click()
        from_date = driver.find_element(By.CSS_SELECTOR, ".DayPicker-Day")
        from_date.click()
        driver.implicitly_wait(secondsToWaitIfElementIsNotFound) # Allow time for a new month to load if needed
        from_hour_picker = driver.find_element(By.CSS_SELECTOR, ".bp3-timepicker-input.bp3-timepicker-hour")
        from_hour_picker.click()
        from_hour_picker.send_keys(Keys.ARROW_RIGHT)
        from_hour_picker.send_keys(Keys.BACK_SPACE)
        from_hour_picker.send_keys("9")

    except NoSuchElementException:
        return False

    return verify_chart_exists()

def verify_to_datetime_selector():
    try:
        chart_to_button = driver.find_element(By.CSS_SELECTOR, ".chart-to-button")
        chart_to_button.click()
        to_dates = driver.find_elements(By.CSS_SELECTOR, ".DayPicker-Day")
        to_dates[-1].click() # Python way to index last element in a list
        driver.implicitly_wait(secondsToWaitIfElementIsNotFound) # Allow time for a new month to load if needed
        try:
          to_hour_picker = driver.find_element(By.CSS_SELECTOR, ".bp3-timepicker-input.bp3-timepicker-hour")
          to_hour_picker.click()
        except:
          to_hour_picker = driver.find_element(By.CSS_SELECTOR, ".bp3-timepicker-input.bp3-timepicker-hour")
          to_hour_picker.click()
        to_hour_picker.send_keys(Keys.ARROW_RIGHT)
        to_hour_picker.send_keys(Keys.BACK_SPACE)
        to_hour_picker.send_keys("17")

    except NoSuchElementException:
        return False

    return verify_chart_exists()

def verify_resolution_picker():
    try:
      resolution_picker = WebDriverWait(driver, secondsToWaitIfElementIsNotFound).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".chart-resolution-select")))
      resolution_picker.click()
      resolution_option = driver.find_element(By.CSS_SELECTOR, ".chart-resolution-select option[value='60']")
      resolution_option.click()

    except NoSuchElementException:
        return False

    return verify_chart_exists()

  
# UI Text verification
def verify_label(className):
    try:
      full_label = WebDriverWait(driver, secondsToWaitIfElementIsNotFound).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, className))).text
      parsed_label = full_label[:full_label.index("\n")] # Substring out the button bit which can change depending on what the user has selected
      return parsed_label

    except NoSuchElementException:
        return False

def main():
 
    global driver

    url = "http://localhost:3000/2021-fall-cs160-pied-piper/#/ticker/TSLA"

    driver = webdriver.Chrome()
    driver.get(url)    

    # Verify UI text
    # Expected UI text
    expected_from_label = "From:"
    expected_to_label = "To:"
    expected_res_label = "Resolution:"
    res = verify_label(".fromLabel")
    print(res)
    assert verify_label(".fromLabel") == expected_from_label
    assert verify_label(".toLabel") == expected_to_label
    assert verify_label(".resLabel") == expected_res_label


    # Verify chart behavior
    assert verify_chart_exists() == True

    # Test opening from and to datetime selectors and making a selection
    # Expected result: first date to the last date in the date picker popups selected, 9:00 AM to 5:00 PM. Chart still exists.
    assert verify_from_datetime_selector() == True
    assert verify_to_datetime_selector() == True

    # Test setting the resolution
    # Expected result: resolution is set to 60 minutes
    assert verify_resolution_picker() == True

    # Click on the chart to get out of resolution picker
    chart = driver.find_element(By.CSS_SELECTOR, ".chart")
    chart.click()

if __name__ == "__main__":
    main()