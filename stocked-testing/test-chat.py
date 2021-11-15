from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import selenium.webdriver.support.ui as ui
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains 

chat_header_locator = "//h3[contains(text(), 'Join Stocked Chat Room Now!')]"
chat_join_room_name_locator = "//input[contains(@placeholder, 'Enter Name')]"
chat_join_room_ticker_locator = "//input[contains(@placeholder, 'Enter Ticker')]"
chat_join_room_button_locator = "//button[contains(@class, 'joinChatRoomButton')]"

def verify_chat_header_text():
    try:
        chat_header_field = driver.find_element(By.XPATH, chat_header_locator)
        print(chat_header_field.text)
        return chat_header_field.text
    except NoSuchElementException:
        return False

def verify_chat_join_room_fields_exist():
    try:
        driver.find_element(By.XPATH, chat_join_room_name_locator)
        driver.find_element(By.XPATH, chat_join_room_ticker_locator)
    except NoSuchElementException:
        return False
    
    print("Both Chat Room Fields Were Found!")
    return True


def verify_chat_join_room_button_text():
    try:
        join_room_button_text = driver.find_element(By.XPATH, chat_join_room_button_locator)
        print(join_room_button_text.text)
        return join_room_button_text.text
    except NoSuchElementException:
        return False
    

def verify_open_chat():
    pass    

def main():
 
    global driver

    # url = input("Enter URL: ")
    url = "http://localhost:3000/2021-fall-cs160-pied-piper#/chat"
    
    driver = webdriver.Chrome()
    driver.get(url)
   
    # Expected Test Values
    expected_chat_header_text = "Join Stocked Chat Room Now!"
    expected_chat_join_room_field_placeholder_text = True
    expected_chat_button_text = "Join Chat Room"


    assert verify_chat_header_text() == expected_chat_header_text # verifies if chat header text is correct
    
    assert verify_chat_join_room_fields_exist() == expected_chat_join_room_field_placeholder_text # verifies that both input fields exist
    
    assert verify_chat_join_room_button_text() == expected_chat_button_text # verifies button and button text is correct
    
    
    driver.close() # closes webdriver after test completion 


if __name__ == "__main__":
    main()