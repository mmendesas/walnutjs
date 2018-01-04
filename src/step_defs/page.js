var helperElement = require('../support/helper/element');
var helperString = require('../support/helper/string');
var helperCommon = require('../support/helper/common');

var pageSteps = function () {

    /**
     * Navigate to a page
     */
    this.Given(/^user navigates to '(.*)'$/, function (url) {
        var gotourl = helperCommon.getTreatedValue(url);
        return browser.get(gotourl);
    });

    /**
     * Navigate to page with simple authentication
     */
    this.Given(/^user open url '(.*)' with user '(.*)' and pass '(.*)'$/, function (url, user, pass) {
        var gotourl = helperCommon.getTreatedValue(url);
        var myuser = helperCommon.getTreatedValue(myuser);
        var mypass = helperCommon.getTreatedValue(mypass);

        // http://username:password@server
        var server = gotourl.substring(gotourl.indexOf("//") + 2);
        var urlAuth = `http://${myuser}:${mypass}@${server}`;

        return browser.get(urlAuth);
    });

    /**
     * Refreshes the page
     */
    this.Given(/^user refreshes the page$/, function (callback) {
        var _this = this;
        this.refresh().then(function () {
            _this.delayCallback(callback);
        });
    });

    /**
     * Highlight element on the screen
     */
    this.When(/^user highlights the '(.+)-(.+)' on the screen$/, function (container, key, callback) {
        var _this = this;
        var elementFinder = helperElement.getElementFinder(container, key);

        _this.isPresentAndDisplayed(elementFinder).then(function isPresentAndDisplayedSuccess() {
            helperElement.nutHighlightElement(elementFinder);
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
    this.When(/^user scrolls (right|left|up|down) '([0-9]+)' times$/, function (direction, times, callback) {
        var _this = this;

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