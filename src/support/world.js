const webdriver = require('selenium-webdriver');
const { logging } = require('selenium-webdriver');
const fs = require('fs-plus');
const {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  After,
  Before,
} = require('cucumber');

const { expect } = require('chai');
const { assert } = require('chai');
const {
  vars, logger, string, common, params,
} = require('../support/helpers');

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
    expect,
    assert,
  };

  // expose to step definitions methods
  Object.keys(props).forEach((key) => {
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

/**
 * Close the current instance of browser
 */
function closeBrowser() {
  return driver.close().then(() => {
    if (config.selenium.browser !== 'firefox') {
      driver.quit();
    }
  });
}

/**
 * Teardown browser based on property browserTeardownStrategy
 */
function tearDownBrowser() {
  switch (config.selenium.browserTeardownStrategy) {
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
  const uimap = { containers: [] };
  const folder = config.walnut.paths.locators;

  try {
    fs.readdirSync(folder)
      .forEach((file) => {
        try {
          const content = fs.readFileSync(`${folder}/${file}`);
          uimap.containers = uimap.containers.concat(JSON.parse(content).containers);
        } catch (err) {
          logger.error(`Locators - Invalid JSON structure of the locator file -> [ ${folder}/${file} ]`);
        }
      });
  } catch (err) {
    logger.error(`Locators - Invalid locators folder path -> [ ${folder} ]`);
    throw err;
  }

  global.locators = uimap;
}

/**
 * Load parameters file
 */
const loadParameters = () => {
  let parameters = {};
  const file = config.walnut.paths.parameters;
  try {
    const content = fs.readFileSync(file);
    parameters = JSON.parse(content);
  } catch (err) {
    logger.error(`Inform a valid parameters path. ${err.message}`);
    throw err;
  }
  // set parameters to vars
  params.setAsVariables(parameters);

  // load parameters globally
  global.parameters = parameters;
};

// load resources and create driver
BeforeAll((done) => {
  logger.info('Execution started...');
  // set loging level
  logging.installConsoleHandler();
  logging.getLogger('webdriver.http').setLevel(logging.Level.INFO);

  // load UIMap and parameters
  loadUIMap();
  loadParameters();

  if (!global.driver) {
    global.driver = getDriverInstance();
    done();
  }
});

AfterAll((done) => {
  tearDownBrowser();
  if (browserTeardownStrategy !== 'always') {
    closeBrowser().then(() => done());
  } else {
    new Promise(resolve => resolve(done()));
  }
  logger.info('Execution finished!\n');
});

/**
 * Make some action before each scenario
 */
Before((scenario) => {
  vars.addVariable('project_name', string.slugify(config.walnut.name));
  vars.addVariable('scenario_name', string.slugify(scenario.pickle.name));
  vars.addVariable('img_num', '1');

  const folder_default = common.getTreatedValue('${vars.project_name}|${vars.scenario_name}');
  vars.addVariable('folder_default', folder_default);
});

// execute after each scenario
After((scenario) => {
  if (scenario.result.status !== 'passed' && !config.walnut.noScreenshot) {
    return driver.takeScreenshot((screenShot) => {
      scenario.attach(new Buffer(screenShot, 'base64'), 'image/png');
      return tearDownBrowser();
    });
  }

  // teardown after each scenario
  // return tearDownBrowser();
});

module.exports = (function () {
  // set a default world
  createWorld();
  this.World = createWorld;

  // global helpers
  global.helpers = require('../support/helpers');

  // // set the default timeout for all tests
  setDefaultTimeout(global.DEFAULT_TIMEOUT);
}());
