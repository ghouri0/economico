import sys
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import json

newDetails = {
    "image": [],
    "price": [],
    "availability": []
}


url = str(sys.argv[1])


driver = webdriver.Chrome("chromedriver.exe")

driver.set_window_position(-10000, 0)
driver.get(url)

time.sleep(2)

stock = driver.find_element(By.ID, "price")

if(stock.text == "N/A"):
    newDetails["availability"].append(stock.text)
    print(json.dumps(newDetails))

else:
    price = driver.find_element(By.ID, "price")

    newDetails["price"].append(price.text)

    print(json.dumps(newDetails))

driver.quit()