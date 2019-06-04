const webdriver = require('selenium-webdriver');
const { logging } = require('selenium-webdriver');
const fs = require('fs-plus');

const expect = require('chai').expect;
const assert = require('chai').assert;

/**
 * Expose a list of vars globally to be used in each step definition
 * @returns {void}
 */
function createWorld() {

  const props = {
    driver: null,
    selenium: webdriver,
    until: webdriver.until,
    By: webdriver.By,
    by: webdriver.By,
    expect: expect,
    assert: assert,
  }

  // expose to step definitions methods
  Object.keys(props).forEach(key => {
    global[key] = props[key];
  });
}

/**
 * Creates a webdriver instance based on config (remote connection)
 * @returns {webdriver} selenium webdriver
 */
function getDriverInstance() {
  const driver = new webdriver.Builder()
    .usingServer(config.selenium.remoteURL)
    .withCapabilities(config.selenium.caps)
    .build();

  return driver;
}

function closeBrowser() {
  return driver.close().then(() => {
    if (config.selenium.browser !== 'firefox') {
      driver.quit();
    }
  })
}

function tearDownBrowser() {
  switch (config.selenium.tearDownStrategy) {
    case 'none':
      return Promise.resolve();
    case 'clear':
      return helpers.page.clearCookiesAndStorages();
    default:
      return closeBrowser(driver);
  }
}

/**
 * Load locators with all User Interface Map
 */
function loadUIMap() {
  let uimap = { containers: [] }
  const folder = config.locatorsPath;

  try {
    fs.readdirSync(folder)
      .forEach(file => {
        try {
          const content = fs.readFileSync(`${folder}/${file}`);
          uimap.containers = uimap.containers.concat(JSON.parse(content).containers);
        } catch (err) {
          console.error(`Error: Locators - ${folder}/${file}. You need to inform correct structure of locator file.`)
        }
      });
  } catch (err) {
    console.error('Error: Locators - You need to inform a valid locators folder path')
    throw err
  }

  global['locators'] = uimap

}

// export the "World" required by cucumber to allow it to expose methods within step def's
module.exports = function () {

  // set a default world
  createWorld();
  this.World = createWorld;

  // global helpers
  global.helpers = require('../support/helpers')

  // // set the default timeout for all tests
  this.setDefaultTimeout(global.DEFAULT_TIMEOUT);

  // create the driver and applitools eyes before scenario if it's not instantiated
  this.registerHandler('BeforeScenario', (scenario) => {

    // set loging level
    logging.installConsoleHandler();
    logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);

    // load UIMap
    loadUIMap();

    if (!global.driver) {
      global.driver = getDriverInstance();
    }
  });

  this.registerHandler('AfterFeatures', (done) => {
    if (browserTeardownStrategy !== 'always') {
      closeBrowser().then(() => done());
    }
    else {
      new Promise((resolve) => resolve(done()));
    }
  })

  // execute after each scenario
  this.After((scenario) => {

    if (scenario.isFailed() && !config.noScreenshot) {

      return driver.takeScreenshot((screenShot) => {

        scenario.attach(new Buffer(screenShot, 'base64'), 'image/png');

        return tearDownBrowser();
      })
    }

    return tearDownBrowser();
  })
}
