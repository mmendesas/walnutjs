var helperElement = require('../support/helpers/element');

const { Given, When } = require("cucumber");

/**
 * Navigate to a page
 */
Given(/^user navigates to '(.*)'$/, (url) => {
  const gotourl = helpers.common.getTreatedValue(url);
  return helpers.page.loadPage(gotourl)
});

/**
 * Navigate to page with simple authentication
 */
Given(/^user open url '(.*)' with user '(.*)' and pass '(.*)'$/, (url, user, pass) => {
  var gotourl = helpers.common.getTreatedValue(url);
  var myuser = helpers.common.getTreatedValue(myuser);
  var mypass = helpers.common.getTreatedValue(mypass);

  // http://username:password@server
  var server = gotourl.substring(gotourl.indexOf("//") + 2);
  var urlAuth = `http://${myuser}:${mypass}@${server}`;

  return driver.get(urlAuth);
});

/**
 * Refreshes the page
 */
Given(/^user refreshes the page$/, (callback) => {
  var _this = this;
  this.refresh().then(function () {
    _this.delayCallback(callback);
  });
});

/**
 * Highlight element on the screen
 */
When(/^user highlights the '(.+)-(.+)' on the screen$/, (container, key, callback) => {
  var _this = this;
  var elementFinder = helperElement.getElementFinder(container, key);

  _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
    helperElement.nutHighlightElement(elementFinder);
    _this.delayCallback(callback);
  }, function isPresentAndDisplayedError(errorMessage) {
    _this.handleError(errorMessage, callback);
  });
});

/**
* scroll to element
*/
When(/^user scrolls to '(.+)-(.+)'$/, (container, key, callback) => {
  var _this = this;
  var elementFinder = helperElement.getElementFinder(container, key);

  elementFinder.getLocation().then(function locate(elementLocation) {
    browser.executeScript('window.scrollTo(0, 0);');
    browser.executeScript('window.scrollTo(' + elementLocation.x + ',' + elementLocation.y + ');');
    _this.delayCallback(callback);
  });
});

/**
* scrolls to direction x times
*/
When(/^user scrolls (right|left|up|down) '([0-9]+)' times$/, (direction, times, callback) => {
  var _this = this;

  for (var i = 0; i < times; i++) {
    switch (direction) {
      case 'up':
        browser.executeScript("window.scrollBy(0, -50);");
        break;
      case 'down':
        browser.executeScript("window.scrollBy(0, 50);");
        break;
      case 'left':
        browser.executeScript("window.scrollBy(-100, 0);");
        break;
      case 'right':
        browser.executeScript("window.scrollBy(100, 0);");
        break;
      default:
        break;
    }
  }
  _this.delayCallback(callback);
});
