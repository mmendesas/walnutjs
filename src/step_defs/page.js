const { Given, When } = require('cucumber');

const { common, element, page } = helpers;

/**
 * Navigate to a page
 */
Given(/^user navigates to '(.*)'$/, (url) => {
  const gotourl = common.getTreatedValue(url);
  return page.loadPage(gotourl);
});

/**
 * Navigate to page with simple authentication
 */
Given(/^user open url '(.*)' with user '(.*)' and pass '(.*)'$/, (url, user, pass) => {
  const gotourl = common.getTreatedValue(url);
  const myuser = common.getTreatedValue(myuser);
  const mypass = common.getTreatedValue(mypass);

  // http://username:password@server
  const server = gotourl.substring(gotourl.indexOf('//') + 2);
  const urlAuth = `http://${myuser}:${mypass}@${server}`;

  return driver.get(urlAuth);
});

/**
 * Refreshes the page
 */
Given(/^user refreshes the page$/, () => page.refresh());

/**
 * Highlight element on the screen
 */
When(/^user highlights the '(.+)-(.+)' on the screen$/, (container, key, callback) => {
  const elementFinder = element.getElementFinder(container, key);
  return element.nutHighlightElement(elementFinder);
});

/**
* scroll to element
*/
When(/^user scrolls to '(.+)-(.+)'$/, (container, key, callback) => {
  const elementFinder = element.getElementFinder(container, key);

  elementFinder.getLocation().then((elementLocation) => {
    driver.executeScript('window.scrollTo(0, 0);');
    driver.executeScript(`window.scrollTo(${elementLocation.x},${elementLocation.y}`);
  });
});

/**
* scrolls to direction x times
*/
When(/^user scrolls (right|left|up|down) '([0-9]+)' times$/, (direction, times) => {
  for (let i = 0; i < times; i++) {
    switch (direction) {
      case 'up':
        driver.executeScript('window.scrollBy(0, -50);');
        break;
      case 'down':
        driver.executeScript('window.scrollBy(0, 50);');
        break;
      case 'left':
        driver.executeScript('window.scrollBy(-100, 0);');
        break;
      case 'right':
        driver.executeScript('window.scrollBy(100, 0);');
        break;
      default:
        break;
    }
  }
});

/**
 * Clears the current cookies
 */
When(/^user clears the cookies$/, () => page.clearCookies());

/**
 * Add a specific cookie to current session
 */
When(/^user add a cookie '(.*)' with value '(.*)'$/, (name, value) => page.addCookie(name, value));

/**
 * Executes a simple JS script
 */
Given(/^user executes the JS '(.*)'$/, code => page.executeScript(code));
