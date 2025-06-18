# test_appointment.py

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import unittest
import time

class AppointmentTest(unittest.TestCase):
    def setUp(self):
        # Configure Chrome options for headless mode
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        # Initialize the Chrome WebDriver
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 10)
        
        # Navigate to the application
        self.driver.get("http://localhost:3000")

    def tearDown(self):
        self.driver.quit()

    def test_add_appointment(self):
        """Test adding a new appointment with required fields"""
        try:
            # Navigate to Appointments page
            appointments_link = self.wait.until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Appointments')]"))
            )
            appointments_link.click()

            # Click Add Appointment button
            add_button = self.wait.until(
                EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add Appointment')]"))
            )
            add_button.click()

            # Fill in the required fields
            self.driver.find_element(By.NAME, "patientName").send_keys("John Doe")
            self.driver.find_element(By.NAME, "doctorName").send_keys("Dr. Smith")
            self.driver.find_element(By.NAME, "date").send_keys("2024-03-25")

            # Submit the form
            submit_button = self.wait.until(
                EC.element_to_be_clickable((By.XPATH, "//button[@type='submit']"))
            )
            submit_button.click()

            # Verify success message
            success_message = self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'alert-success')]"))
            )
            self.assertTrue("Appointment scheduled successfully" in success_message.text)

        except TimeoutException as e:
            self.fail(f"Test failed: Could not find element - {str(e)}")
        except Exception as e:
            self.fail(f"Test failed: {str(e)}")

if __name__ == '__main__':
    unittest.main()