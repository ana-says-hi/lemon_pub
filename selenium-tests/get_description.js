const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Ask-AI Tests', function () {
  this.timeout(20000);
  let driver;

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('a book exists', async () => {
    await driver.get('http://localhost:4200/ask-ai');
    await driver.executeScript("window.localStorage.setItem('user_email', 'admin@email.com');");
    await driver.navigate().refresh();

    const select = await driver.wait(until.elementLocated(By.id('book_select')), 5000);
    await driver.wait(async () => {
      const opts = await select.findElements(By.tagName('option'));
      return opts.length > 0;
    }, 5000);

    // wait 2 seconds so the selected bood description is loaded
    await driver.sleep(2000);

    await driver.executeScript(`
    const select = document.getElementById('book_select');
    select.selectedIndex = 0;
    select.dispatchEvent(new Event('change'));
  `);

    // Wait for Angular to update the textarea
    const descArea = await driver.findElement(By.id('book-desc-area'));
    await driver.wait(async () => {
      const val = await descArea.getAttribute('value');
      return val && val.trim().length > 0;
    }, 5000);

    const descText = await descArea.getAttribute('value');
    console.log('Book description:', descText);

    expect(descText.length).to.be.greaterThan(0);
  });

  it('a book does not exist', async () => {
    await driver.get('http://localhost:4200/ask-ai');
    await driver.executeScript("window.localStorage.setItem('user_email', 'bbb@email.com');");
    await driver.navigate().refresh();

    const select = await driver.wait(until.elementLocated(By.id('book_select')), 5000);
    const options = await select.findElements(By.tagName('option'));
    //console.log('Options count:', options.length);
    //await options[0].click();
    expect(options.length).to.equal(0);
  });
});
