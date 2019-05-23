const selenium = require('selenium-webdriver');
const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const expect = require('chai').expect;
const assert = require('chai').assert;

// load drivers
const ChromeDriver = require('./drivers/chromeDriver');

function createWorld() {
  const props = {
    driver: null,
    selenium: selenium,
    until: selenium.until,
    By: selenium.By,
    by: selenium.By,
    expect: expect,
    assert: assert,
  }

  // expose to step definitions methods
  Object.keys(props).forEach(key => {
    global[key] = props[key];
  });
}

function getDriverInstance() {
  const driver = new Builder()
    .forBrowser('chrome')
    .build();

  return driver;
}

// export the "World" required by cucumber to allow it to expose methods within step def's
module.exports = function () {
  createWorld();

  // set a default world
  this.World = createWorld;

  // set the default timeout for all tests
  this.setDefaultTimeout(global.DEFAULT_TIMEOUT);

  // create the driver and applitools eyes before scenario if it's not instantiated
  this.registerHandler('BeforeScenario', (scenario) => {

    if (!global.driver) {
      global.driver = getDriverInstance();
    }

  });

}
