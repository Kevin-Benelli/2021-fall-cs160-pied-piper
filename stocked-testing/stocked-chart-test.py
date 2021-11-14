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

# import pandas as pd
# from pandas import ExcelWriter
# from pandas import ExcelFile
# from openpyxl import load_workbook
# import numpy as numpy

def main():
 
    global driver

    url = "http://localhost:3000/2021-fall-cs160-pied-piper/#/ticker/TSLA"

    driver = webdriver.Chrome()
    driver.get(url)    
   
    secondsToWaitIfElementIsNotFound = 3

    # Test opening from and to datetime selectors and making a selection
    # Expected result: first date to the last date in the date picker popups selected, 9:00 AM to 5:00 PM
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

    chart_to_button = driver.find_element(By.CSS_SELECTOR, ".chart-to-button")
    chart_to_button.click()
    to_dates = driver.find_elements(By.CSS_SELECTOR, ".DayPicker-Day")
    to_dates[-1].click()
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

    # Test setting the resolution
    # Expected result: resolution is set to 60 minutes
    resolution_picker = driver.find_element(By.CSS_SELECTOR, ".chart-resolution-select")
    resolution_picker.click()
    resolution_option = driver.find_element(By.CSS_SELECTOR, ".chart-resolution-select option[value='60']")
    resolution_option.click()

    chart = driver.find_element(By.CSS_SELECTOR, ".chart")
    chart.click()

if __name__ == "__main__":
    main()