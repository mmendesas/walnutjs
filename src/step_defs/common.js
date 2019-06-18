const { Given, Then } = require('cucumber');
const { common, string, element, vars, logger } = helpers;

/**
 * Sleeps the execution for a specific time in seconds
 */
Then(/^user waits for ([0-9]+) seconds$/, (time) => {
  return driver.sleep(time * 1000);
});

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
Given(/^user prints the message '(.*)' to console$/, (text) => {
  text = common.getTreatedValue(text);
  logger.info(text);
});

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
Given(/^user stores the elements count from '(.+)-(.+)' in variable '(.+)'$/, (container, key, varName) => {
  return element.getElementFinderAll(container, key)
    .count()
    .then((count) => {
      vars.addVariable(varName, count);
    });
});

/**
 * Stores a screenshot in the path, using pattern 'path|imageName'
 */
Then(/^user saves a screenshot '(.*)'$/, (path_list) => {
  path_list = common.getTreatedValue(path_list);

  if (path_list.includes('|')) {
    const split = path_list.split('|');
    const name = split[split.length - 1];

    split.pop();
    const img_num = parseInt(vars.getVariable('img_num'));

    // add format to 3 digits
    const valWithDig = string.formatWitDigits(img_num, 3);
    name = `${valWithDig}_${name}`

    common.saveScreenshot(split, name)
    vars.addVariable('img_num', ++img_num);
  }
});
