/* eslint-disable */
const webdriver = require('selenium-webdriver');
const {
  Builder, By, Key, until,
} = require('selenium-webdriver');

const chromeCapabilities = webdriver.Capabilities.chrome();
// chromeCapabilities.set('chromeOptions', {
//   'args': ['--headless', '--disable-gpu']
// });

console.log(process.env.SELENIUM_REMOTE_URL);
driver = new Builder()
  .usingServer('http://localhost:4444/wd/hub')
  .withCapabilities(chromeCapabilities)
  .build();

driver.get('http://www.google.com/');
const ele = driver.findElement(By.name('q'));
ele.sendKeys('webdriver', Key.RETURN);
driver.wait(until.titleContains('webdriver'), 1000);
driver.quit();
