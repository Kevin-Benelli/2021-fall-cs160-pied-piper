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

    #Get the URL and parse
    # url = input("Enter URL: ")
    url = "http://localhost:3000"
    
    login_button_locator = "//span [contains(@icon, 'log-in')]/parent::button"
    search_input_field_locator = "//input [contains(@type, 'text')]"
    search_button_locator = "//span [contains(@icon, 'search')]/parent::button"
    canvas_graph_locator = "//canvas"
    header_logo = "//div[contains(@class, 'header-navbar')]"




    driver = webdriver.Chrome()
    driver.get(url)
   

    search_input_field = driver.find_element_by_xpath(search_input_field_locator)
    search_input_field.click()
    search_input_field.clear()
    search_input_field.send_keys("TSLA")

    search_button = driver.find_element_by_xpath(search_button_locator)
    search_button.click() 

    


if __name__ == "__main__":
    main()