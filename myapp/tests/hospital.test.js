const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

jest.setTimeout(30000);

describe('Hospital Management System Tests', () => {
    let driver;

    // Setup before each test
    beforeEach(async () => {
        const options = new chrome.Options();
        options.addArguments('--headless=new');
        options.addArguments('--window-size=1920,1080');
        
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
            
        await driver.manage().window().maximize();
        await driver.get('http://localhost:3000');
    });

    // Cleanup after each test
    afterEach(async () => {
        if (driver) {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
            await driver.quit();
        }
    });

    // Test login functionality
    test('should login successfully with valid credentials', async () => {
        try {
            // Navigate to login page
            await driver.get('http://localhost:3000/login');
            console.log('Navigated to login page');

            // Find and fill login form
            const email = await driver.wait(until.elementLocated(By.name('email')), 10000);
            await email.sendKeys('usman504747@gmail.com');
            console.log('Entered email');

            const password = await driver.findElement(By.name('password'));
            await password.sendKeys('Dadajan1212@');
            console.log('Entered password');

            // Click login button
            const loginButton = await driver.findElement(By.xpath("//button[contains(text(), 'Login')]"));
            await loginButton.click();
            console.log('Clicked login button');

            // Wait for successful login
            await driver.wait(until.elementLocated(By.xpath("//h1[contains(text(), 'Hospital Management')]")), 10000);
            console.log('Successfully logged in!');

            // Verify URL
            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toContain('appointments');
        } catch (error) {
            console.error('Test failed:', error);
            await driver.takeScreenshot().then(
                data => require('fs').writeFileSync('login_failure.png', data, 'base64')
            );
            throw error;
        }
    });

    // Test adding a new doctor
    test('should add a new doctor successfully', async () => {
        try {
            // Login first
            await driver.get('http://localhost:3000/login');
            const email = await driver.wait(until.elementLocated(By.name('email')), 10000);
            await email.sendKeys('usman504747@gmail.com');
            const password = await driver.findElement(By.name('password'));
            await password.sendKeys('Dadajan1212@');
            const loginButton = await driver.findElement(By.xpath("//button[contains(text(), 'Login')]"));
            await loginButton.click();

            // Navigate to doctors page
            await driver.get('http://localhost:3000/doctors');

            // Fill doctor form
            const name = await driver.wait(until.elementLocated(By.name('name')), 10000);
            await name.sendKeys('Dr. John Smith');

            const specialization = await driver.findElement(By.name('specialization'));
            await specialization.sendKeys('Cardiology');

            const experience = await driver.findElement(By.name('experience'));
            await experience.sendKeys('10');

            const contact = await driver.findElement(By.name('contact'));
            await contact.sendKeys('1234567890');

            const doctorEmail = await driver.findElement(By.name('email'));
            await doctorEmail.sendKeys('john.smith@hospital.com');

            // Submit form
            const submitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Add Doctor')]"));
            await submitButton.click();

            // Verify doctor was added
            await driver.wait(until.elementLocated(By.xpath("//h3[contains(text(), 'Dr. John Smith')]")), 10000);
            console.log('Doctor added successfully!');
        } catch (error) {
            console.error('Test failed:', error);
            await driver.takeScreenshot().then(
                data => require('fs').writeFileSync('add_doctor_failure.png', data, 'base64')
            );
            throw error;
        }
    });

    // Test adding a new patient
    test('should add a new patient successfully', async () => {
        try {
            // Login first
            await driver.get('http://localhost:3000/login');
            const email = await driver.wait(until.elementLocated(By.name('email')), 10000);
            await email.sendKeys('usman504747@gmail.com');
            const password = await driver.findElement(By.name('password'));
            await password.sendKeys('Dadajan1212@');
            const loginButton = await driver.findElement(By.xpath("//button[contains(text(), 'Login')]"));
            await loginButton.click();

            // Navigate to patients page
            await driver.get('http://localhost:3000/patients');

            // Fill patient form
            const name = await driver.wait(until.elementLocated(By.name('name')), 10000);
            await name.sendKeys('Jane Doe');

            const age = await driver.findElement(By.name('age'));
            await age.sendKeys('30');

            const contact = await driver.findElement(By.name('contact'));
            await contact.sendKeys('9876543210');

            // Submit form
            const submitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Add Patient')]"));
            await submitButton.click();

            // Verify patient was added
            await driver.wait(until.elementLocated(By.xpath("//h3[contains(text(), 'Jane Doe')]")), 10000);
            console.log('Patient added successfully!');
        } catch (error) {
            console.error('Test failed:', error);
            await driver.takeScreenshot().then(
                data => require('fs').writeFileSync('add_patient_failure.png', data, 'base64')
            );
            throw error;
        }
    });

    // Test scheduling an appointment
    test('should schedule a new appointment successfully', async () => {
        try {
            // Login first
            await driver.get('http://localhost:3000/login');
            const email = await driver.wait(until.elementLocated(By.name('email')), 10000);
            await email.sendKeys('usman504747@gmail.com');
            const password = await driver.findElement(By.name('password'));
            await password.sendKeys('Dadajan1212@');
            const loginButton = await driver.findElement(By.xpath("//button[contains(text(), 'Login')]"));
            await loginButton.click();

            // Navigate to appointments page
            await driver.get('http://localhost:3000/appointments');

            // Fill appointment form
            const patientName = await driver.wait(until.elementLocated(By.name('patientName')), 10000);
            await patientName.sendKeys('Jane Doe');

            const doctorName = await driver.findElement(By.name('doctorName'));
            await doctorName.sendKeys('Dr. John Smith');

            const date = await driver.findElement(By.name('date'));
            await date.sendKeys('2024-03-20');

            // Submit form
            const submitButton = await driver.findElement(By.xpath("//button[contains(text(), 'Add Appointment')]"));
            await submitButton.click();

            // Verify appointment was scheduled
            await driver.wait(until.elementLocated(By.xpath("//div[contains(text(), 'Jane Doe')]")), 10000);
            console.log('Appointment scheduled successfully!');
        } catch (error) {
            console.error('Test failed:', error);
            await driver.takeScreenshot().then(
                data => require('fs').writeFileSync('schedule_appointment_failure.png', data, 'base64')
            );
            throw error;
        }
    });
}); 