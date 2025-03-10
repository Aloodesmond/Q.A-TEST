from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize WebDriver
driver = webdriver.Chrome()

# Open the page
driver.get("http://127.0.0.1:5501/albums.html")
driver.maximize_window()

# Wait for elements to load
wait = WebDriverWait(driver, 30)

# Find the search bar
search_box = wait.until(EC.presence_of_element_located((By.ID, "search-input")))

# Enter search term and search
search_box.send_keys("omnis laborum odio")
search_box.send_keys(Keys.RETURN)

# Wait for results to appear
time.sleep(3)
results = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "photo-title")))

# Print the number of results found
print(f"Found {len(results)} results.")

# Close the browser
driver.quit()
