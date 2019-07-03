/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
const string = require('./string');
const logger = require('./logger');

let lastStyleValue = '';

const isEmptyObject = o => Object.keys(o).every(x => o[x] === '' || o[x] === null);

const applyFilterInList = (list, option) => {
  switch (option.toLowerCase()) {
    case 'first':
      return list.first();
    case 'last':
      return list.last();
    case 'enabled':
      return list.filter(elem => elem.isEnabled());
    case 'displayed':
      return list.filter(elem => elem.isDisplayed());
    default:
      return list;
  }
};

const Element = {

  /**
   * Stores last style (highlight)
   */
  lastStyleElement: null,

  /**
   * Stores last container|name
   */
  lastUsedLocator: null,

  /**
   * Returns the elementFinder object to interact with in protractor
  */
  getElementFinder(container, name) {
    // save current used container/name
    this.lastUsedLocator = [container, name];
    const locator = this.getLocator(container, name);

    if (isEmptyObject(locator)) {
      throw new Error('Invalid locator element, please use { key, type, value }');
    }

    // get Element By
    const { type, value } = locator;
    const elementBy = this.getElementBy(type, value);

    // wait element displayed
    return helpers.page.waitUntilElementIsPresent(elementBy);
  },

  /**
   * Returns a list of elementFinders based in current findOptions
   */
  getElementFinderAll(container, name) {
    // save current used container/name
    this.lastUsedLocator = [container, name];
    const locator = this.getLocator(container, name);

    if (isEmptyObject(locator)) {
      throw new Error('Invalid locator element, please use { key, type, value }');
    }

    // get list of elements based on type/value
    let myList = this.getElements(locator.type, locator.value);

    // apply filter options if included
    if (locator.options) {
      const options = locator.options.split('|');

      _.forEach(options, (option) => {
        myList = applyFilterInList(myList, option);
      });

      // return filtered list
      return myList;
    }

    // default: return all elements
    return myList;
  },


  /**
   * Return the element By based on locator
   */
  getElementBy(type, content) {
    switch (type.toLowerCase()) {
      case 'classname':
        return by.className(content);
      case 'css':
        return by.css(content);
      case 'id':
        return by.id(content);
      case 'linktext':
        return by.linkText(content);
      case 'js':
        return by.js(content);
      case 'name':
        return by.name(content);
      case 'partiallinktext':
        return by.partialLinkText(content);
      case 'tagname':
        return by.tagName(content);
      case 'xpath':
        return by.xpath(content);

      default:
        throw Error('Locator Type not found.');
    }
  },

  /**
   * Find the locator in json by container name and locator key
   */
  getLocator(container, keyName) {
    let name = keyName;
    const containerList = locators.containers;
    let result = {};
    let params;

    if (name.includes(':')) {
      params = this.getParams(name);
      name = name.substring(0, name.indexOf(':'));
    }

    // search a specific locator inside containers list
    for (let i = 0; i < containerList.length; i += 1) {
      const { name: cname, locators } = containerList[i];

      if (cname === container) {
        for (let j = 0; j < locators.length; j += 1) {
          const { key } = locators[j];

          // return locator info if exists
          if (key === name) {
            // eslint-disable-next-line prefer-const
            let { type, value, options } = locators[j];

            if (type.toLowerCase().startsWith('p:')) {
              value = string.formatString(value, params);
              type = type.substring(type.indexOf(':') + 1);
            }

            // mount founded locator
            result = {
              key, type, value, options,
            };
            logger.debug(`Current Locator --> using [${type}] value [${value}] options[${options}]`);

            break;
          }
        }
        break;
      }
    }

    return result;
  },

  /**
   * Mount the paramenters list from simple text
   */
  getParams(text) {
    let params;

    if (text.includes(':')) {
      params = text.substring(text.indexOf(':') + 1);
      params = params.match(/([^\[\]]+)/g).toString();
      params = params.split('|');
    }

    return params;
  },

  /**
   * Highlight Element
   */
  nutHighlightElement: (elementFinder) => {
    const pattern = 'border: 3px solid red;';

    elementFinder.getAttribute('style').then((attribute) => {
      const newStyle = attribute + pattern;

      if (global.lastStyleElement) {
        lastStyleElement.getAttribute('style').then((oldStyle) => {
          const usedStyle = oldStyle.replace(pattern, '');
          if (lastStyleValue === '') {
            driver.executeScript('arguments[0].removeAttribute("style");', lastStyleElement);
          } else {
            driver.executeScript(`arguments[0].setAttribute("style", "${usedStyle}");`, lastStyleElement);
          }
        });
      }
      lastStyleValue = attribute;
      global.lastStyleElement = elementFinder;
      driver.executeScript(`arguments[0].setAttribute("style", "${newStyle}");`, elementFinder);
    });
  },
};

module.exports = Element;
