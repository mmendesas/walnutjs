/* eslint-disable no-undef */
// Page Helpers

module.exports = {

  loadPage: (url, waitInSeconds) => {
    // use either passed in timeout or global default
    const timeout = (waitInSeconds) ? (waitInSeconds * 1000) : DEFAULT_TIMEOUT;

    // load the url and wait for it to complete
    // and wait for the body element to be present
    return browser.url(url)
      .then(() => driver.wait(until.elementLocated(by.css('body')), timeout));
  },

  waitUntilElementIsPresent: (elementBy, timeout = DEFAULT_TIMEOUT) => {
    const element = driver.wait(until.elementLocated(elementBy), timeout, `Element ${elementBy} was not located in page`);
    return driver.wait(until.elementIsVisible(element), timeout, `Element ${elementBy} was not visible in page`);
  },

  refresh: () => driver.navigate().refresh(),

  addCookie: (name, value) => driver.manage().addCookie({ name, value }),

  clearCookies: () => driver.manage().deleteAllCookies(),

  clearStorages: () => driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();'),

  clearCookiesAndStorages: () => helpers.clearCookies().then(helpers.clearStorages()),

  executeScriptArgs: (script, ...args) => driver.executeScript(script, ...args),

  executeScript: script => driver.executeScript(script),
};
