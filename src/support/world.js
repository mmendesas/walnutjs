const webdriver = require('selenium-webdriver');
const { logging } = require('selenium-webdriver');

const expect = require('chai').expect;
const assert = require('chai').assert;

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

function getDriverInstance() {
  const driver = new webdriver.Builder()
    .usingServer(config.selenium.remoteURL)
    .withCapabilities(config.selenium.caps)
    .build();

  return driver;
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

    logging.installConsoleHandler();
    logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);

    if (!global.driver) {
      global.driver = getDriverInstance();
    }
  });

}
