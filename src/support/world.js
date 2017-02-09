var $q = require('q');
var fs = require('fs');
var context = require('./context');
var helperString = require('./helper/string');
var EC = protractor.ExpectedConditions;
var config = require(process.cwd() + '/protractor.conf.js').config;

module.exports = function () {

    //default values from config file
    var waitElementTimeout = config.walnutjsOpts.waitElementTimeout ? config.walnutjsOpts.waitElementTimeout : 10000;
    var evidencesPath = config.walnutjsOpts.evidencesPath ? config.walnutjsOpts.evidencesPath : '/test/logs/';

    this.World = function World() {

        /**
       * Refresh the current url
       * @returns {null}
       */
        this.refresh = function () {
            return browser.driver.navigate().refresh();
        };

        /**
        * Runs callback with a delay on dev environment
        * @param callback
        * @returns {exports}
        */
        this.delayCallback = function (callback) {
            var _this = this;
            setTimeout(callback, 1000);
            return _this;
        };

        /**
         * Error handler (take screenshot and call callback.fail())
         * @param error
         * @param callback
         * @returns {exports}
         */
        this.handleError = function (error, callback) {
            var _this = this;

            browser.takeScreenshot().then(function (imageData) {
                var formatFeature = helperString.slugify(context.getCurrentFeature().getName());
                var formatScenario = helperString.slugify(context.getCurrentScenario().getName());

                var token = formatFeature + '_' + formatScenario;
                //var path = process.cwd() + '/test/logs/';
                var path = process.cwd() + evidencesPath;

                var pngStream = fs.createWriteStream(path + token + '_screenshot.png');

                pngStream.write(new Buffer(imageData, 'base64'));
                pngStream.end();

                _this.delayCallback(function handleErrorCallback() {
                    callback(new Error(error));
                });
            });

            return _this;
        };

        /**
       * Check if an element is present and visible
       * @param {object} elementFinder
       * @returns {Promise}
       */
        this.isPresentAndDisplayed = function (elementFinder) {
            var deferred = $q.defer();

            //wait for presence of element before interact with him until 10 seconds
            browser.driver.wait(EC.presenceOf(elementFinder), waitElementTimeout, "Expectation error: Timed out waiting for element. Binding: ");

            elementFinder.isPresent().then(function isPresentSuccess(isPresent) {
                if (isPresent === true) {
                    elementFinder.isDisplayed().then(function isDisplayedSuccess(isVisible) {
                        if (isVisible === true) {
                            deferred.resolve();
                        } else {
                            deferred.reject("Element is present but not visible. Binding: " + JSON.stringify(elementFinder.locator()));
                        }
                    }, function isDisplayedFailure() {
                        deferred.reject("Element is present but not visible. Binding: " + JSON.stringify(elementFinder.locator()));
                    });
                } else {
                    deferred.reject("Unable to retrieve element. Binding: " + JSON.stringify(elementFinder.locator()));
                }
            });

            return deferred.promise;
        };

    };
};