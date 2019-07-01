const webdriver = require('selenium-webdriver');
const { logging } = require('selenium-webdriver');
const fs = require('fs-plus');
const {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  After,
  Before
} = require('cucumber');

const expect = require('chai').expect;
const assert = require('chai').assert;
const { vars, logger, string, common, params } = require('../support/helpers');

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
  let uimap = { containers: [] }
  const folder = config.walnut.paths.locators;

  try {
    fs.readdirSync(folder)
      .forEach(file => {
        try {
          const content = fs.readFileSync(`${folder}/${file}`);
          uimap.containers = uimap.containers.concat(JSON.parse(content).containers);
        } catch (err) {
          logger.error(`Error: Locators - ${folder}/${file}. You need to inform correct structure of locator file.`)
        }
      });
  } catch (err) {
    logger.error('Error: Locators - You need to inform a valid locators folder path')
    throw err
  }

  global['locators'] = uimap;
}

const loadParameters = () => {
  let parameters = {};
  const file = config.walnut.paths.parameters;
  try {
    const content = fs.readFileSync(file);
    parameters = JSON.parse(content);
  } catch (err) {
    logger.error(`Inform a valid parameters path. ${err.message}`)
    throw err
  }
  // set parameters to vars
  params.setAsVariables(parameters);

  // load parameters globally
  global['parameters'] = parameters;
}

// create the driver and applitools eyes before scenario if it's not instantiated
BeforeAll((done) => {
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
  if (browserTeardownStrategy !== 'always') {
    closeBrowser().then(() => done());
  }
  else {
    new Promise((resolve) => resolve(done()));
  }
})

Before((scenario) => {
  vars.addVariable("scenario_name", string.slugify(scenario.pickle.name));
  vars.addVariable("img_num", "1");

  var folder_default = common.getTreatedValue("${vars.project_name}|${vars.feature_name}|${vars.scenario_name}");
  vars.addVariable('folder_default', folder_default);
})

// execute after each scenario
After((scenario) => {

  if (scenario.result.status !== 'passed' && !config.walnut.noScreenshot) {

    return driver.takeScreenshot((screenShot) => {

      scenario.attach(new Buffer(screenShot, 'base64'), 'image/png');

      return tearDownBrowser();
    })
  }

  return tearDownBrowser();
})

module.exports = function () {
  // set a default world
  createWorld();
  this.World = createWorld;

  // global helpers
  global.helpers = require('../support/helpers')

  // // set the default timeout for all tests
  setDefaultTimeout(global.DEFAULT_TIMEOUT);
}()
