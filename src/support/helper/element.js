'use strict'

var _ = require('lodash');
var context = require('../context');
var helperString = require('./string');
var helperInfo = require('./info');
var lastStyleValue = '';

function isEmptyObject(o) {
    return Object.keys(o).every(function (x) {
        return o[x] === '' || o[x] === null;
    });
}

function applyFilterInList(list, option) {

    switch (option.toLowerCase()) {
        case 'first':
            return list.first();
        case 'last':
            return list.last();
        case 'enabled':
            return list.filter(function (elem) {
                return elem.isEnabled();
            });
        case 'displayed':
            return list.filter(function (elem) {
                return elem.isDisplayed();
            });
        default:
            return list;
    }
}

var Element = {

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

        //save current used container/name
        this.lastUsedLocator = [container, name];

        var locator = this.getLocator(container, name);
        if (isEmptyObject(locator)) {
            throw "Locator element incorrect, please use {key, type, value}";
        }

        // get list of elements based on type/value
        var myList = this.mountElement(locator.type, locator.value);

        // apply filter options if included
        if (locator.options) {
            var options = locator.options.split('|');
            _.forEach(options, function (option) {
                myList = applyFilterInList(myList, option);
            });

            //return filtered list
            return myList;
        }

        // default: return first element of list
        return myList.first();
    },

    /**
     * Returns a list of elementFinders based in current findOptions
     */
    getElementFinderAll: function (container, name) {
        //save current used container/name
        this.lastUsedLocator = [container, name];

        var locator = this.getLocator(container, name);
        if (isEmptyObject(locator)) {
            throw "Locator element incorrect, please use {key, type, value}";
        }

        // get list of elements based on type/value
        var myList = this.mountElement(locator.type, locator.value);

        // apply filter options if included
        if (locator.options) {
            var options = locator.options.split('|');
            _.forEach(options, function (option) {
                myList = applyFilterInList(myList, option);
            });

            //return filtered list
            return myList;
        }

        // default: return all elements
        return myList;
    },


    /**
     * Return the real element from protractor method
     */
    mountElement: function (type, content) {

        switch (type.toLowerCase()) {
            /** 
             * Locators by Extended webdriver.By
             */
            case 'classname':
                return element.all(by.className(content));
            case 'css':
                return element.all(by.css(content));
            case 'id':
                return element.all(by.id(content));
            case 'linktext':
                return element.all(by.linkText(content));
            case 'js':
                return element.all(by.js(content));
            case 'name':
                return element.all(by.name(content));
            case 'partiallinktext':
                return element.all(by.partialLinkText(content));
            case 'tagname':
                return element.all(by.tagName(content));
            case 'xpath':
                return element.all(by.xpath(content));

            /**
             * Locators by function in ProtractorBy
             */

            case 'binding':
                return element.all(by.binding(content));
            case 'exactbinding':
                return element.all(by.exactBinding(content));
            case 'model':
                return element.all(by.model(content));
            case 'buttontext':
                return element.all(by.buttonText(content));
            case 'partialbuttontext':
                return element.all(by.partialButtonText(content));
            case 'repeater':
                return element.all(by.repeater(content));
            case 'exactrepeater':
                return element.all(by.exactRepeater(content));
            case 'csscontainingtext':
                return element.all(by.cssContainingText(content));
            case 'options':
                return element.all(by.options(content));
            case 'deepcss':
                return element.all(by.deepCss(content));

            default:
                throw Error('Locator Type not found. Please see <http://www.protractortest.org/#/api?view=ProtractorBy>');
                break;
        }
    },

    /**
     * Find the locator in json by container name and locator key  
     */
    getLocator: function (container, name) {
        var container_list = context.locators.containers;
        var result = {};
        var params;

        // start time elapsed
        helperInfo.logTimeElapsed('getLocator');

        if (name.includes(':')) {
            params = this.getParams(name);
            name = name.substring(0, name.indexOf(":"));
        }

        for (var i = 0; i < container_list.length; i++) {
            var container_name = container_list[i].name;
            var loc_list = container_list[i].locators;

            if (container_name == container) {
                for (var j = 0; j < loc_list.length; j++) {
                    var key = loc_list[j].key;
                    if (key === name) {
                        var mType = loc_list[j].type;
                        var mValue = loc_list[j].value;
                        var mOptions = loc_list[j].options;

                        if (mType.toLowerCase().startsWith('p:')) {
                            mValue = helperString.formatString(mValue, params);
                            mType = mType.substring(mType.indexOf(":") + 1);
                        }

                        //mount founded locator
                        result.key = key;
                        result.type = mType;
                        result.value = mValue;
                        result.options = mOptions;

                        helperInfo.logDebug(helperString.formatString('Current Locator --> using [{0}] value [{1}] options[{2}]', [result.type, result.value, result.options]));

                        break;
                    }
                }
                break;
            }
        }
        // prints the elapsed end time        
        helperInfo.logTimeElapsed('getLocator');

        return result;
    },

    /**
     * Mount the paramenters list from simple text
     */
    getParams: function (text) {
        var params;
        if (text.includes(':')) {
            params = text.substring(text.indexOf(":") + 1);
            params = params.match(/([^\[\]]+)/g).toString();
            params = params.split('|');
        }
        return params;
    },

    /**
     * Highlight Element
     */
    nutHighlightElement: function (elementFinder) {
        var pattern = "border: 3px solid red;";

        elementFinder.getAttribute('style').then(function getAttr(attribute) {
            var newStyle = attribute + pattern;
            if (this.lastStyleElement) {
                this.lastStyleElement.getAttribute('style').then(function getOldStyle(oldStyle) {
                    oldStyle = oldStyle.replace(pattern, '');
                    if (lastStyleValue === '') {
                        console.log('entrou aqui');
                        browser.executeScript("arguments[0].removeAttribute('style');", this.lastStyleElement);
                    } else {
                        browser.executeScript("arguments[0].setAttribute('style', '{0}');".format(oldStyle), this.lastStyleElement);
                    }
                });
            }
            browser.executeScript("arguments[0].setAttribute('style', '{0}');".format(newStyle), elementFinder);
            lastStyleValue = attribute;
            lastStyleElement = elementFinder;
        });
    }

};

module.exports = Element;