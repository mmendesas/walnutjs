// Page Helpers

module.exports = {

  loadPage: (url, waitInSeconds) => {
    // use either passed in timeout or global default
    var timeout = (waitInSeconds) ? (waitInSeconds * 1000) : DEFAULT_TIMEOUT;

    // load the url and wait for it to complete
    return driver.get(url).then(() => {
      // now wait for the body element to be present
      return driver.wait(until.elementLocated(by.css('body')), timeout);
    });
  },

  waitUntilElementIsPresent: (elementBy, timeout = DEFAULT_TIMEOUT) => {
    const msg = `Element ${elementBy} was not located in page`
    return driver.wait(until.elementLocated(elementBy), timeout, msg);
  },

  refresh: () => {
    return driver.navigate().refresh();
  },

  addCookie: (name, value) => {
    return driver.manage().addCookie({ name, value });
  },

  clearCookies: () => {
    return driver.manage().deleteAllCookies();
  },

  clearStorages: () => {
    return driver.executeScript('window.localStorage.clear(); window.sessionStorage.clear();')
  },

  clearCookiesAndStorages: () => {
    return helpers.clearCookies().then(helpers.clearStorages());
  },

  executeScriptArgs: (script, ...args) => {
    return driver.executeScript(script, ...args);
  },

  executeScript: (script) => {
    return driver.executeScript(script)
  }
};
