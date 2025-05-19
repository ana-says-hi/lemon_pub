const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Login Tests', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('should login with valid credentials', async () => {
    await driver.get('http://localhost:4200/login');
    await driver.findElement(By.name('email_username')).sendKeys('admin@email.com');
    await driver.findElement(By.name('password')).sendKeys('pass');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:4200/profile'), 5000);
    const url = await driver.getCurrentUrl();
    expect(url).to.include('/profile');
  });

  it('should show error for invalid login', async () => {
    await driver.get('http://localhost:4200/login');
    await driver.findElement(By.name('email_username')).sendKeys('inexistent_user@email.com');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.css('button[type="submit"]')).click();

    const alert = await driver.wait(until.alertIsPresent(), 5000);
    const alertText = await alert.getText();
    expect(alertText).to.include('Credentials are not correct or missing. PLease try again.');
    await alert.accept();
  });
});
