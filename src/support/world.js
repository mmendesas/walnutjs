var $q = require('q');
var context = require('./context');
var config = require('./config');
var helperString = require('./helper/string');
var helperCommon = require('./helper/common');
var helperFile = require('./helper/file');
var EC = protractor.ExpectedConditions;

module.exports = function () {

    this.World = function World() {

        /**
       * Refresh the current url
       * @returns {null}
       */
        this.refresh = function () {
            return browser.driver.navigate().refresh();
        };

        /**
        * Runs callback with a delay
        * @param callback
        * @returns {exports}
        */
        this.delayCallback = function (callback) {
            var _this = this;
            setTimeout(callback, 100);
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
            var evidencesPath = config.evidencesPath;

            browser.takeScreenshot().then(function (imageData) {
                var formatFeature = helperString.slugify(context.getCurrentFeature().getName());
                var formatScenario = helperString.slugify(context.getCurrentScenario().getName());
                var formatStep = helperString.slugify(context.getCurrentStep().getName());

                var folder_path = [];
                folder_path.push(config.projectName);
                folder_path.push(formatFeature);
                folder_path.push(formatScenario);
                folder_path.push('errors');

                var filename = helperFile.getTreatedFilename(folder_path, formatStep + '_error');

                helperFile.writeToFile(imageData, filename);

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
            var waitElementTimeout = config.waitElementTimeout;

            //wait for presence of element before interact with him until 10 seconds
            browser.driver.wait(EC.presenceOf(elementFinder), waitElementTimeout);

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

        this.saveScreenshot = function (folder_path, name) {
            var _this = this;
            var filename = helperFile.getTreatedFilename(folder_path, name);

            browser.takeScreenshot().then(function (imageData) {
                helperFile.writeToFile(imageData, filename + '.png');
            });

            return _this;
        };

    };
};