var helperElement = require('../support/helper/element');
var helperUtils = require('../support/helper/utils');
var helperString = require('../support/helper/string');

var pageSteps = function () {

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
     * Highlight element on the screen
     */
    this.Then(/^user highlights the '(.+)-(.+)' on the screen$/, function (container, key, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            helperUtils.nutHighlightElement(elementFinder);
            _this.delayCallback(callback);
        }, function isPresentAndDisplayedError(errorMessage) {
            _this.handleError(errorMessage, callback);
        });
    });

    /**
    * scroll to element
    */
    this.When(/^user scrolls to '(.+)-(.+)'$/, function (container, key, callback) {
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
    this.When(/^user scrolls (right|left|up|down) '([0-9]+)' times'$/, function (direction, times, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

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

};

module.exports = pageSteps;