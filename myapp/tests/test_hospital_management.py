import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

class TestHospitalManagement:
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup WebDriver before each test"""
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--window-size=1920,1080')
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 20)
        
        yield
        
        # Cleanup after each test
        time.sleep(3)
        self.driver.quit()

    def test_login_functionality(self):
        """Test login functionality with valid credentials"""
        try:
            # Navigate to login page
            self.driver.get('http://localhost:3000/login')
            print("Navigated to login page")

            # Find and fill login form
            email = self.wait.until(EC.presence_of_element_located((By.NAME, "email")))
            email.send_keys('usman504747@gmail.com')
            print("Entered email")

            password = self.driver.find_element(By.NAME, "password")
            password.send_keys('Dadajan1212@')
            print("Entered password")

            # Click login button
            login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
            login_button.click()
            print("Clicked login button")

            # Wait for successful login
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Hospital Management')]")))
            print("Successfully logged in!")

            # Verify URL
            current_url = self.driver.current_url
            assert "appointments" in current_url
            
        except Exception as e:
            print(f"Test failed: {str(e)}")
            self.driver.save_screenshot("login_failure.png")
            raise

    def test_add_new_doctor(self):
        """Test adding a new doctor"""
        try:
            # Login first
            self.driver.get('http://localhost:3000/login')
            email = self.wait.until(EC.presence_of_element_located((By.NAME, "email")))
            email.send_keys('usman504747@gmail.com')
            password = self.driver.find_element(By.NAME, "password")
            password.send_keys('Dadajan1212@')
            login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
            login_button.click()

            # Navigate to doctors page
            self.driver.get('http://localhost:3000/doctors')

            # Fill doctor form
            name = self.wait.until(EC.presence_of_element_located((By.NAME, "name")))
            name.send_keys('Dr. John Smith')

            specialization = self.driver.find_element(By.NAME, "specialization")
            specialization.send_keys('Cardiology')

            experience = self.driver.find_element(By.NAME, "experience")
            experience.send_keys('10')

            contact = self.driver.find_element(By.NAME, "contact")
            contact.send_keys('1234567890')

            doctor_email = self.driver.find_element(By.NAME, "email")
            doctor_email.send_keys('john.smith@hospital.com')

            # Submit form
            submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Add Doctor')]")
            submit_button.click()

            # Verify doctor was added
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h3[contains(text(), 'Dr. John Smith')]")))
            print("Doctor added successfully!")
            
        except Exception as e:
            print(f"Test failed: {str(e)}")
            self.driver.save_screenshot("add_doctor_failure.png")
            raise

    def test_add_new_patient(self):
        """Test adding a new patient"""
        try:
            # Login first
            self.driver.get('http://localhost:3000/login')
            email = self.wait.until(EC.presence_of_element_located((By.NAME, "email")))
            email.send_keys('usman504747@gmail.com')
            password = self.driver.find_element(By.NAME, "password")
            password.send_keys('Dadajan1212@')
            login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
            login_button.click()

            # Navigate to patients page
            self.driver.get('http://localhost:3000/patients')

            # Fill patient form
            name = self.wait.until(EC.presence_of_element_located((By.NAME, "name")))
            name.send_keys('Jane Doe')

            age = self.driver.find_element(By.NAME, "age")
            age.send_keys('30')

            contact = self.driver.find_element(By.NAME, "contact")
            contact.send_keys('9876543210')

            # Submit form
            submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Add Patient')]")
            submit_button.click()

            # Verify patient was added
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//h3[contains(text(), 'Jane Doe')]")))
            print("Patient added successfully!")
            
        except Exception as e:
            print(f"Test failed: {str(e)}")
            self.driver.save_screenshot("add_patient_failure.png")
            raise

    def test_schedule_appointment(self):
        """Test scheduling a new appointment"""
        try:
            # Login first
            self.driver.get('http://localhost:3000/login')
            email = self.wait.until(EC.presence_of_element_located((By.NAME, "email")))
            email.send_keys('usman504747@gmail.com')
            password = self.driver.find_element(By.NAME, "password")
            password.send_keys('Dadajan1212@')
            login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
            login_button.click()

            # Navigate to appointments page
            self.driver.get('http://localhost:3000/appointments')

            # Fill appointment form
            patient_name = self.wait.until(EC.presence_of_element_located((By.NAME, "patientName")))
            patient_name.send_keys('Jane Doe')

            doctor_name = self.driver.find_element(By.NAME, "doctorName")
            doctor_name.send_keys('Dr. John Smith')

            date = self.driver.find_element(By.NAME, "date")
            date.send_keys('2024-03-20')

            # Submit form
            submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Add Appointment')]")
            submit_button.click()

            # Verify appointment was scheduled
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Jane Doe')]")))
            print("Appointment scheduled successfully!")
            
        except Exception as e:
            print(f"Test failed: {str(e)}")
            self.driver.save_screenshot("schedule_appointment_failure.png")
            raise

    def test_edit_appointment(self):
        """Test editing an existing appointment"""
        # Login and create an appointment first
        self.test_schedule_appointment()
        
        # Find and click edit button
        edit_button = self.wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Edit')]")))
        edit_button.click()
        
        # Update appointment date
        date = self.wait.until(EC.presence_of_element_located((By.NAME, "date")))
        date.clear()
        date.send_keys("2024-03-21")
        
        # Submit form
        update_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Update Appointment')]")
        update_button.click()
        
        # Verify appointment was updated
        self.wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(text(), '2024-03-21')]")))

    def test_delete_appointment(self):
        """Test deleting an appointment"""
        # Login and create an appointment first
        self.test_schedule_appointment()
        
        # Find and click delete button
        delete_button = self.wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Delete')]")))
        delete_button.click()
        
        # Verify appointment was deleted
        time.sleep(1)  # Wait for deletion to complete
        self.assertFalse(self.driver.find_elements(By.XPATH, "//div[contains(text(), 'Jane Doe')]"))

    def test_form_validation(self):
        """Test form validation for required fields"""
        # Login first
        self.test_login_functionality()
        
        # Navigate to appointments page
        self.driver.get("http://localhost:3000/appointments")
        
        # Try to submit empty form
        submit_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Add Appointment')]")
        submit_button.click()
        
        # Verify error message
        error_message = self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, "error-message")))
        self.assertIn("Please fill in all fields", error_message.text)

    def test_navigation(self):
        """Test navigation between different sections"""
        # Login first
        self.test_login_functionality()
        
        # Test navigation to Doctors
        doctors_link = self.wait.until(EC.presence_of_element_located((By.XPATH, "//a[contains(text(), 'Doctors')]")))
        doctors_link.click()
        self.assertIn("/doctors", self.driver.current_url)
        
        # Test navigation to Patients
        patients_link = self.wait.until(EC.presence_of_element_located((By.XPATH, "//a[contains(text(), 'Patients')]")))
        patients_link.click()
        self.assertIn("/patients", self.driver.current_url)
        
        # Test navigation to Appointments
        appointments_link = self.wait.until(EC.presence_of_element_located((By.XPATH, "//a[contains(text(), 'Appointments')]")))
        appointments_link.click()
        self.assertIn("/appointments", self.driver.current_url)

    def test_search_functionality(self):
        """Test search functionality for doctors"""
        # Login first
        self.test_login_functionality()
        
        # Add a doctor first
        self.test_add_new_doctor()
        
        # Navigate to doctors page
        self.driver.get("http://localhost:3000/doctors")
        
        # Find search input and search for doctor
        search_input = self.wait.until(EC.presence_of_element_located((By.NAME, "search")))
        search_input.send_keys("John Smith")
        search_input.send_keys(Keys.RETURN)
        
        # Verify search results
        self.wait.until(EC.presence_of_element_located((By.XPATH, "//h3[contains(text(), 'Dr. John Smith')]")))

    def test_logout_functionality(self):
        """Test logout functionality"""
        # Login first
        self.test_login_functionality()
        
        # Find and click logout button
        logout_button = self.wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Logout')]")))
        logout_button.click()
        
        # Verify redirected to login page
        self.wait.until(EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Login')]")))
        self.assertIn("/login", self.driver.current_url)

if __name__ == "__main__":
    pytest.main() 