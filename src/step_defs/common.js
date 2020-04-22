/* eslint-disable no-undef */
const { Given, Then } = require('cucumber');

const {
  common, string, element, vars, logger,
} = helpers;
const path = require('path');

const { compile } = require('../support/helpers/math');

/**
 * Sleeps the execution for a specific time in seconds
 */
Then(/^user waits for ([0-9]+) seconds$/, time => driver.sleep(time * 1000));

/**
 * Stores a value in a variable to use between scenarios
 */
Given(/^user stores the value '(.*)' in variable '(.*)'$/, (value, name) => {
  const varName = common.getTreatedValue(name);
  const varvalue = common.getTreatedValue(value);
  vars.addVariable(varName, varvalue);
});

/**
 * Stores a list of variables
 */
Given(/^user stores the following list of variables:$/, (data) => {
  data.raw().forEach((item) => {
    const varName = common.getTreatedValue(item[0]);
    const varvalue = common.getTreatedValue(item[1]);
    vars.addVariable(varName, varvalue);
  });
});

/**
 * Prints a message to console, with or without walnut vars/expressions
 */
Given(/^user prints the message '(.*)' to console$/, msg => logger.info(common.getTreatedValue(msg)));

/**
 * Prints all variables stored at to console
 */
Given(/^user prints all variables to console$/, () => {
  logger.info(`all variables: ${JSON.stringify(vars.getAllVariables(), null, 2)}`);
});

/**
 * Stores the value from element inside a variable
 */
Given(/^user stores the (TEXT|VALUE) from element '(.+)-(.+)' in variable '(.*)'$/, async (type, container, key, varName) => {
  const elementFinder = element.getElementFinder(container, key);
  let text = '';
  if (type.toLowerCase() === 'text') {
    text = await elementFinder.getText();
  } else {
    text = await elementFinder.getAttribute('value');
  }
  vars.addVariable(varName, text);
});

/**
 * Stores the elements count in variable
 */
Given(/^user stores the elements count from '(.+)-(.+)' in variable '(.+)'$/, (container, key, varName) => element.getElementFinderAll(container, key)
  .count()
  .then((count) => {
    vars.addVariable(varName, count);
  }));

/**
 * Stores a screenshot in the path, using pattern 'path|imageName'
 */
Then(/^user saves a screenshot '(.*)'$/, (screenshotPath) => {
  const listOfPaths = common.getTreatedValue(screenshotPath);

  if (listOfPaths.includes('|')) {
    const folderPath = listOfPaths.split('|');
    let name = folderPath[folderPath.length - 1];

    folderPath.pop();
    let imgNum = parseInt(vars.getVariable('img_num'), 10);

    // add format to 3 digits
    const valWithDig = string.formatWitDigits(imgNum, 3);
    name = `${valWithDig}_${name}`;

    folderPath.unshift(config.walnut.paths.evidences);
    const folder = path.join(...folderPath);
    common.saveScreenshot(folder, name);
    vars.addVariable('img_num', imgNum += 1);
  }
});

Given(/^user execute math\((.*)\)/, (exp) => {
  const result = compile(exp);
  logger.info(result);
  return result;
});
