const string = require('./string');
const logger = require('./logger');
var lastStyleValue = '';

const isEmptyObject = (o) => {
  return Object.keys(o).every((x) => {
    return o[x] === '' || o[x] === null;
  });
}

const applyFilterInList = (list, option) => {
  switch (option.toLowerCase()) {
    case 'first':
      return list.first();
    case 'last':
      return list.last();
    case 'enabled':
      return list.filter((elem) => {
        return elem.isEnabled();
      });
    case 'displayed':
      return list.filter((elem) => {
        return elem.isDisplayed();
      });
    default:
      return list;
  }
}

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
  getElementFinder: function (container, name) {
    // save current used container/name
    this.lastUsedLocator = [container, name];

    const locator = this.getLocator(container, name);

    if (isEmptyObject(locator)) {
      throw 'Locator element incorrect, please use {key, type, value}';
    }

    // get Element By
    const { type, value } = locator
    const elementBy = this.getElementBy(type, value)

    // wait element displayed
    return helpers.page.waitUntilElementIsPresent(elementBy)
  },

  /**
   * Returns a list of elementFinders based in current findOptions
   */
  getElementFinderAll: function (container, name) {
    // save current used container/name
    this.lastUsedLocator = [container, name];

    var locator = this.getLocator(container, name);

    if (isEmptyObject(locator)) {
      throw 'Locator element incorrect, please use {key, type, value}';
    }

    // get list of elements based on type/value
    var myList = this.getElements(locator.type, locator.value);

    // apply filter options if included
    if (locator.options) {
      var options = locator.options.split('|');

      _.forEach(options, function (option) {
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
  getElementBy: function (type, content) {
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
  getLocator: function (container, name) {
    var container_list = locators.containers;
    var result = {};
    var params;

    if (name.includes(':')) {
      params = this.getParams(name);
      name = name.substring(0, name.indexOf(':'));
    }

    // search a specific locator inside containers list
    for (var i = 0; i < container_list.length; i++) {
      const { name: cname, locators } = container_list[i];

      if (cname == container) {
        for (var j = 0; j < locators.length; j++) {
          const { key } = locators[j]

          // return locator info if exists
          if (key === name) {
            const { type, value, options } = locators[j];

            if (type.toLowerCase().startsWith('p:')) {
              value = string.formatString(value, params);
              type = type.substring(type.indexOf(':') + 1);
            }

            // mount founded locator
            result = {
              key, type, value, options
            }
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
  getParams: function (text) {
    var params;

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

      if (global['lastStyleElement']) {
        lastStyleElement.getAttribute('style').then((oldStyle) => {
          oldStyle = oldStyle.replace(pattern, '');
          if (lastStyleValue === '') {
            driver.executeScript('arguments[0].removeAttribute("style");', lastStyleElement);
          } else {
            driver.executeScript(`arguments[0].setAttribute("style", "${oldStyle}");`, lastStyleElement);
          }
        });
      }
      lastStyleValue = attribute;
      global['lastStyleElement'] = elementFinder;
      driver.executeScript(`arguments[0].setAttribute("style", "${newStyle}");`, elementFinder);
    });
  }
};

module.exports = Element;
