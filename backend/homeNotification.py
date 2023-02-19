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

stock = driver.find_element(By.XPATH, "/html/body/div/form/div[2]/div/div[3]/div[2]/div[2]/ul/li[3]/div[2]/a[1]")

if(stock.text == "Sold Out"):
    newDetails["availability"].append(stock.text)
    print(json.dumps(newDetails))

else:
    image = driver.find_element(
        By.CSS_SELECTOR, "#prodcut-desc > div.col-md-5.pad0 > div > div > div.gc-display-area > div.gc-display-container > img")

    newDetails["image"].append(image.get_attribute("src"))

    price = driver.find_element(By.CLASS_NAME, "ActualPrice")

    newDetails["price"].append(price.text)

    print(json.dumps(newDetails))

driver.quit()