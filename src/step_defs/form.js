const { Given, When } = require("cucumber");
const { common, element, page } = helpers;

/**
 * Fills the element in page
 */
When(/^user fills '(.+)-(.+)' with '(.*)'$/, (container, key, text) => {
  text = common.getTreatedValue(text);
  const elementFinder = element.getElementFinder(container, key);
  return elementFinder.sendKeys(text);
});

/**
 * Fills the element in page by replacing the existing text in that element
 */
When(/^user fills '(.+)-(.+)' by replacing text with '(.*)'$/, (container, key, text) => {
  text = common.getTreatedValue(text);
  const elementFinder = element.getElementFinder(container, key);
  elementFinder.clear();
  return elementFinder.sendKeys(text);
});

/**
* Fills the element in page by javascript value
*/
Given(/^user fills '(.*)-(.*)' by JS with '(.*)'$/, (container, key, text) => {
  text = common.getTreatedValue(text);
  const elementFinder = element.getElementFinder(container, key);
  page.executeScriptArgs('arguments[0].value=arguments[1]', elementFinder, text);
});

/**
 * Clicks on element in page
 */
When(/^user clicks on '(.+)-(.+)'$/, (container, key) => {
  const elementFinder = element.getElementFinder(container, key);
  elementFinder.click();
});

/**
 * Clicks on element in page using pure JS
 */
When(/^user clicks by JS on '(.+)-(.+)'$/, (container, key) => {
  const elementFinder = element.getElementFinder(container, key);
  page.executeScript('arguments[0].click();', elementFinder);
});

/**
 * Selects a option in the combo-box element in page
 */
When(/^user selects in combo '(.+)-(.+)' the option '(.+)'$/, function (container, key, value) {
  value = common.getTreatedValue(value);
  const elementFinder = element.getElementFinder(container, key);

  // click on element to open the box
  elementFinder.click();

  driver.findElements(by.css('option')).then(options => {
    let num = options.length;
    let clickOk = false;

    options.forEach((option, index) => {
      option.getText().then(text => {
        if (text === value) {
          clickOk = true
          option.click();
        }
        if (num === index + 1 && !clickOk) {
          throw new Error(`Option ${text} not found in select!`)
        }
      });
    })
  });
});

/**
 * Check or Uncheck element in page
 */
When(/^user (checks|unchecks) the '(.+)-(.+)'$/, function (checkOrUncheck, container, key) {
  const elementFinder = element.getElementFinder(container, key);
  const checkOrNot = (checkOrUncheck === 'checks');

  elementFinder.isSelected().then(isSelected => {
    if (checkOrNot) {
      if (!isSelected) {
        elementFinder.click();
      }
    } else if (isSelected) {
      elementFinder.click();
    }
  });
});

/**
 * Accept or dismiss popup
 */
When(/^user (accept|dismiss) the popup$/, function (action) {
  // thread sleep before switch
  setTimeout(() => {
    if (action !== 'accept' && action !== 'dismiss') {
      driver.switchTo().alert().dismiss();
      throw new Error(`Action ${action} unknown`);
    }
    if (action === 'accept') {
      driver.switchTo().alert().accept();
    }
    if (action === 'dismiss') {
      driver.switchTo().alert().dismiss();
    }
    // _this.delayCallback(callback);
  }, 200);

  // _this.handleError(errorMessage, callback);
});
