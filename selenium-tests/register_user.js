const {By, until, Builder} = require('selenium-webdriver');
const {expect} = require('chai');

describe('Registration Tests', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should register a new user successfully', async () => {
    await driver.get('http://localhost:4200/register');

    await driver.findElement(By.id('firstName')).sendKeys('Test');
    await driver.findElement(By.id('lastName')).sendKeys('User');
    await driver.findElement(By.id('phone_nr')).sendKeys('1234567890');
    await driver.findElement(By.id('email')).sendKeys('testuser@email.com');

    const nextButton = await driver.findElement(By.xpath("//button[.//span[text()='Next']]"));
    await nextButton.click();

    await driver.wait(until.elementLocated(By.id('username')), 3000);
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('TestPassword123!');
    await driver.findElement(By.id('confirmPassword')).sendKeys('TestPassword123!');

    const submitButton = await driver.findElement(By.xpath("//button[.//span[text()='Submit']]"));
    await submitButton.click();

    const alert = await driver.wait(until.alertIsPresent(), 5000);
    const alertText = await alert.getText();
    expect(alertText).to.include('User registered successfully');
  });

  it('should fail registration', async () => {
    await driver.get('http://localhost:4200/register');

    await driver.findElement(By.id('firstName')).sendKeys('Test');
    await driver.findElement(By.id('lastName')).sendKeys('User');
    await driver.findElement(By.id('phone_nr')).sendKeys('1234567890');
    await driver.findElement(By.id('email')).sendKeys('testuser@email.com');

    const nextButton = await driver.findElement(By.xpath("//button[.//span[text()='Next']]"));
    await nextButton.click();

    await driver.wait(until.elementLocated(By.id('username')), 3000);
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('TestPassword123!');
    // await driver.findElement(By.id('confirmPassword')).sendKeys('TestPassword123!');

    const submitButton = await driver.findElement(By.xpath("//button[.//span[text()='Submit']]"));
    await submitButton.click();

    const alert = await driver.wait(until.alertIsPresent(), 5000);
    const alertText = await alert.getText();
    expect(alertText).to.include('Please fill in all required fields.');
  });
});
