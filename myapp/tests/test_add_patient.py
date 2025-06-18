import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_add_new_patient():
    """
    A Selenium test case to add a new patient and verify its addition.
    This test runs in headless mode as required by the assignment.
    """
    print("--- Starting Test: Add New Patient ---")

    # --- 1. Configure Headless Chrome ---
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")

    # --- 2. Initialize the WebDriver (Simplified Path) ---
    # **ERROR FIX 2:** This version makes finding the driver much easier.
    #
    # Instructions:
    # 1. Download chromedriver that MATCHES your Google Chrome version from:
    #    https://googlechromelabs.github.io/chrome-for-testing/
    # 2. Unzip the file.
    # 3. Place `chromedriver.exe` IN THE SAME DIRECTORY as this Python script.
    #
    # The code below will automatically find it, so you don't need to edit any paths.
    try:
        script_dir = os.path.dirname(os.path.abspath(__file__))
        driver_path = os.path.join(script_dir, "chromedriver-win64/chromedriver.exe")
        
        service = Service(executable_path=driver_path)
        driver = webdriver.Chrome(service=service, options=chrome_options)

    except Exception as e:
        print("--- WebDriver Initialization Failed ---")
        print("Could not find 'chromedriver.exe'. Please make sure it is in the same folder as this script.")
        print(f"Attempted to find it at: {driver_path}")
        print(f"Error details: {e}")
        return

    # Patient data to be entered
    patient_name = "John Doe"
    patient_age = "35"
    patient_gender = "Male"

    try:
        # --- 3. Navigate to the Application ---
        driver.get("http://localhost:3000/patients")
        print(f"Navigated to {driver.current_url}")

        # --- 4. Find Form Elements ---
        wait = WebDriverWait(driver, 10)
        print("Locating form fields...")
        name_field = wait.until(EC.presence_of_element_located((By.ID, "name")))
        age_field = wait.until(EC.presence_of_element_located((By.ID, "age")))
        gender_field = wait.until(EC.presence_of_element_located((By.ID, "gender")))
        add_button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Patient')]")))
        print("All form fields and button located successfully.")

        # --- 5. Interact with the Form ---
        print(f"Entering patient data: Name={patient_name}, Age={patient_age}, Gender={patient_gender}")
        name_field.send_keys(patient_name)
        age_field.send_keys(patient_age)
        gender_field.send_keys(patient_gender)
        add_button.click()
        print("Clicked the 'Add Patient' button.")

        # --- 6. Assert the Outcome ---
        print(f"Verifying if '{patient_name}' was added to the patient list...")
        new_patient_locator = (By.XPATH, f"//*[contains(text(), '{patient_name}')]")
        added_patient_element = wait.until(EC.visibility_of_element_located(new_patient_locator))
        assert added_patient_element.is_displayed()
        print(f"SUCCESS: Patient '{patient_name}' was found on the page.")
        print("--- Test Case Passed ---")

    except Exception as e:
        print(f"--- Test Case Failed: An error occurred during test execution ---")
        print(e)
        driver.save_screenshot("add_patient_failure.png")
        print("Screenshot 'add_patient_failure.png' saved for debugging.")

    finally:
        # --- 7. Clean Up ---
        if 'driver' in locals() and driver:
            print("Closing the browser.")
            driver.quit()

# --- Run the test function ---
if __name__ == "__main__":
    test_add_new_patient()
