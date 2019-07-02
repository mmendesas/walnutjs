/* eslint-disable no-undef */
const { Given, When } = require('cucumber');

const { common, element, page } = helpers;

/**
 * Fills the element in page
 */
When(/^user fills '(.+)-(.+)' with '(.*)'$/, (container, key, value) => {
  const text = common.getTreatedValue(value);
  const elementFinder = element.getElementFinder(container, key);
  return elementFinder.sendKeys(text);
});

/**
 * Fills the element in page by replacing the existing text in that element
 */
When(/^user fills '(.+)-(.+)' by replacing text with '(.*)'$/, (container, key, value) => {
  const text = common.getTreatedValue(value);
  const elementFinder = element.getElementFinder(container, key);
  elementFinder.clear();
  return elementFinder.sendKeys(text);
});

/**
* Fills the element in page by javascript value
*/
Given(/^user fills '(.*)-(.*)' by JS with '(.*)'$/, (container, key, value) => {
  const text = common.getTreatedValue(value);
  const elementFinder = element.getElementFinder(container, key);
  return driver.executeScript(`arguments[0].value=${text}`, elementFinder);
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
When(/^user selects in combo '(.+)-(.+)' the option '(.+)'$/, (container, key, optionChoosed) => {
  const value = common.getTreatedValue(optionChoosed);
  const elementFinder = element.getElementFinder(container, key);

  // click on element to open the box
  elementFinder.click();

  driver.findElements(by.css('option')).then((options) => {
    const num = options.length;
    let clickOk = false;

    options.forEach((option, index) => {
      option.getText().then((text) => {
        if (text === value) {
          clickOk = true;
          option.click();
        }
        if (num === index + 1 && !clickOk) {
          throw new Error(`Option ${text} not found in select!`);
        }
      });
    });
  });
});

/**
 * Check or Uncheck element in page
 */
When(/^user (checks|unchecks) the '(.+)-(.+)'$/, (checkOrUncheck, container, key) => {
  const elementFinder = element.getElementFinder(container, key);
  const checkOrNot = (checkOrUncheck === 'checks');

  elementFinder.isSelected().then((isSelected) => {
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
When(/^user (accept|dismiss) the popup$/, (action) => {
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
  }, 200);
});
