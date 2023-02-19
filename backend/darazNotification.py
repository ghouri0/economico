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
# driver.maximize_window()
driver.set_window_position(-10000, 0)
driver.get(url)

time.sleep(2)

availability = driver.find_element(
    By.CSS_SELECTOR, "body > div.comm-error > div > h3"
)

if(availability):
    newDetails["availability"].append(availability.text)
    print(json.dumps(newDetails))
    
else:
    # scrap hq image
    image = driver.find_element(
        By.CSS_SELECTOR, "#module_item_gallery_1 > div > div.gallery-preview-panel > div > img.pdp-mod-common-image.gallery-preview-panel__image")

    newDetails["image"].append(image.get_attribute("src"))


    price = driver.find_element(
        By.CSS_SELECTOR, "#module_product_price_1 > div > div > span"
    )

    newDetails["price"].append(price.text)

    print(json.dumps(newDetails))

driver.quit()