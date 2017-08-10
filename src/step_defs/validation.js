
var helperElement = require('../support/helper/element');
var helperString = require('../support/helper/string');
var helperCommon = require('../support/helper/common');

var Validation = function () {

    /**
      * Validate if the element is enabled or disabled
      */
    this.Then(/^user sees the '(.+)-(.+)' (enabled|disabled)$/, function (container, key, isOrNot, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            elementFinder.isEnabled().then(function isDisplayedSuccess(isEnabled) {
                var compare = (isOrNot === 'enabled') ? true : false;
                var res = (isOrNot === 'enabled') ? 'DISABLED' : 'ENABLED';

                if (isEnabled === compare) {
                    _this.delayCallback(callback);
                }
                _this.handleError(helperString.formatString("Element present but {0}", [res]), callback);
            });
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
     * Validate if the element is not present or displayed on the screen
     */
    this.Then(/^user does not sees the '(.+)-(.+)' on the screen$/, function (container, key, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            _this.handleError('Element found on the current screen', callback);
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.delayCallback(callback);
        });
    });

    /**
    * Validate text in element
    */
    this.Then(/^the '(.+)-(.+)' has text (equals to|not equals to|which contains|which not contains) '(.*)'$/, function (container, key, comparison, text, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        text = helperCommon.getTreatedValue(text);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            elementFinder.getText().then(function getTextSuccess(elementText) {
                var result;
                var msg;
                switch (comparison) {
                    case 'which contains':
                        result = elementText.includes(text);
                        msg = helperString.formatString('Expected [{0}] not contains [{1}]', [elementText, text]);
                        break;

                    case 'which not contains':
                        result = !elementText.includes(text);
                        msg = helperString.formatString('Expected [{0}] contains [{1}]', [elementText, text]);
                        break;

                    case 'equals to':
                        result = elementText === text;
                        msg = helperString.formatString('Expected [{0}] not equals to [{1}]', [elementText, text]);
                        break;

                    case 'not equals to':
                        result = elementText !== text;
                        msg = helperString.formatString('Expected [{0}] is equals to [{1}]', [elementText, text]);
                        break;

                    default:
                        break;
                }
                if (!result) {
                    _this.handleError(msg, callback);
                } else {
                    _this.delayCallback(callback);
                }
            });
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
     * Validate value in element
     */
    this.Then(/^the '(.+)-(.+)' has value (equals to|not equals to|which contains|which not contains) '(.*)'$/, function (container, key, comparison, text, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        text = helperCommon.getTreatedValue(text);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            elementFinder.getAttribute('value').then(function getTextSuccess(elementText) {
                var result;
                var msg;
                switch (comparison) {
                    case 'which contains':
                        result = elementText.includes(text);
                        msg = helperString.formatString('Expected [{0}] not contains [{1}]', [elementText, text]);
                        break;

                    case 'which not contains':
                        result = !elementText.includes(text);
                        msg = helperString.formatString('Expected [{0}] contains [{1}]', [elementText, text]);
                        break;

                    case 'equals to':
                        result = elementText === text;
                        msg = helperString.formatString('Expected [{0}] not equals to [{1}]', [elementText, text]);
                        break;

                    case 'not equals to':
                        result = elementText !== text;
                        msg = helperString.formatString('Expected [{0}] is equals to [{1}]', [elementText, text]);
                        break;

                    default:
                        break;
                }
                if (!result) {
                    _this.handleError(msg, callback);
                } else {
                    _this.delayCallback(callback);
                }
            });
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
    * Validate text length in element
    */
    this.Then(/^the '(.+)-(.+)' has text length (equals to|not equals to|greater than|greater than or equals to|less than|less than or equals to) '([0-9]+)'$/, function (container, key, comparison, count, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            elementFinder.getText().then(function getTextSuccess(elementText) {
                var result;
                var msg;
                switch (comparison) {
                    case 'equals to':
                        result = elementText.length === count;
                        msg = helperString.formatString('Text length [{0}] is not equals to [{1}]', [elementText, count]);
                        break;

                    case 'not equals to':
                        result = !elementText.length !== count;
                        msg = helperString.formatString('Text length [{0}] is equals to [{1}]', [elementText, count]);
                        break;

                    case 'greater than':
                        result = elementText.length > count;
                        msg = helperString.formatString('Text length [{0}] is not greater than [{1}]', [elementText, count]);
                        break;

                    case 'greater than or equal to':
                        result = elementText.length >= count;
                        msg = helperString.formatString('Text length [{0}] is not greater than or equal to [{1}]', [elementText, count]);
                        break;

                    case 'less than':
                        result = elementText.length < count;
                        msg = helperString.formatString('Text length [{0}] is not less than [{1}]', [elementText, count]);
                        break;

                    case 'less than or equal to':
                        result = elementText.length <= count;
                        msg = helperString.formatString('Text length [{0}] is not less than or equal to [{1}]', [elementText, count]);
                        break;

                    default:
                        break;
                }
                if (!result) {
                    _this.handleError(msg, callback);
                } else {
                    _this.delayCallback(callback);
                }
            });
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
     * Validate value length in element
    */
    this.Then(/^the '(.+)-(.+)' has value length (equals to|not equals to|greater than|greater than or equals to|less than|less than or equals to) '([0-9]+)'$/, function (container, key, comparison, count, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            elementFinder.getAttribute('value').then(function getTextSuccess(elementText) {
                var result;
                var msg;
                switch (comparison) {
                    case 'equals to':
                        result = elementText.length === count;
                        msg = helperString.formatString('Value length [{0}] is not equals to [{1}]', [elementText, count]);
                        break;

                    case 'not equals to':
                        result = !elementText.length !== count;
                        msg = helperString.formatString('Value length [{0}] is equals to [{1}]', [elementText, count]);
                        break;

                    case 'greater than':
                        result = elementText.length > count;
                        msg = helperString.formatString('Value length [{0}] is not greater than [{1}]', [elementText, count]);
                        break;

                    case 'greater than or equals to':
                        result = elementText.length >= count;
                        msg = helperString.formatString('Value length [{0}] is not greater than or equal to [{1}]', [elementText, count]);
                        break;

                    case 'less than':
                        result = elementText.length < count;
                        msg = helperString.formatString('Value length [{0}] is not less than [{1}]', [elementText, count]);
                        break;

                    case 'less than or equals to':
                        result = elementText.length <= count;
                        msg = helperString.formatString('Value length [{0}] is not less than or equal to [{1}]', [elementText, count]);
                        break;

                    default:
                        break;
                }
                if (!result) {
                    _this.handleError(msg, callback);
                } else {
                    _this.delayCallback(callback);
                }
            });
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
     * Validate attribute in element
     */
    this.Then(/^the '(.+)-(.+)' has attribute '(.+)' (equals to|not equals to|which contains|which not contains) '(.*)'$/, function (container, key, attributeName, comparison, text, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        text = helperCommon.getTreatedValue(text);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            elementFinder.getAttribute(attributeName).then(function getTextSuccess(elementText) {
                var result;
                var msg;
                switch (comparison) {
                    case 'which contains':
                        result = elementText.includes(text);
                        msg = helperString.formatString('Expected [{0}] not contains [{1}]', [elementText, text]);
                        break;

                    case 'which not contains':
                        result = !elementText.includes(text);
                        msg = helperString.formatString('Expected [{0}] contains [{1}]', [elementText, text]);
                        break;

                    case 'equals to':
                        result = elementText === text;
                        msg = helperString.formatString('Expected [{0}] not equals to [{1}]', [elementText, text]);
                        break;

                    case 'not equals to':
                        result = elementText !== text;
                        msg = helperString.formatString('Expected [{0}] is equals to [{1}]', [elementText, text]);
                        break;

                    default:
                        break;
                }
                if (!result) {
                    _this.handleError(msg, callback);
                } else {
                    _this.delayCallback(callback);
                }
            });
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
   * Compare two string values, can be used with expressions ${x}
   */
    this.Then(/^the '([^-]+)' has value (equals to|not equals to|which contains|which not contains) '(.*)'$/, function (text1, comparison, text2, callback) {
        var _this = this;
        text1 = helperCommon.getTreatedValue(text1);
        text2 = helperCommon.getTreatedValue(text2);

        var result;
        var msg;
        switch (comparison) {
            case 'which contains':
                result = text1.includes(text2);
                msg = helperString.formatString('Expected [{0}] not contains [{1}]', [text1, text2]);
                break;

            case 'which not contains':
                result = !text1.includes(text2);
                msg = helperString.formatString('Expected [{0}] contains [{1}]', [text1, text2]);
                break;

            case 'equals to':
                result = text1 === text2;
                msg = helperString.formatString('Expected [{0}] not equals to [{1}]', [text1, text2]);
                break;

            case 'not equals to':
                result = text1 !== text2;
                msg = helperString.formatString('Expected [{0}] is equals to [{1}]', [text1, text2]);
                break;

            default:
                break;
        }
        if (!result) {
            _this.handleError(msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });
};

module.exports = Validation;