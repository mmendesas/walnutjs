var $q = require('q');
var context = require('./context');
var config = require('./config');
var helperString = require('./helper/string');
var helperCommon = require('./helper/common');
var helperFile = require('./helper/file');
var helperElement = require('./helper/element');
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

            //console.error('\n' + err.name + ': ' + err.message + '\n');

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

                helperFile.writePNGToFile(imageData, filename);

                _this.delayCallback(function handleErrorCallback() {
                    callback(new Error(error));
                });
            });

            return _this;
        };

        /**
       * Wait for element appears in page
       * @param {object} elementFinder
       * @returns {Promise}
       */
        this.waitForElementToBePresent = function (elementFinder) {
            var _this = this;
            var deferred = $q.defer();
            var waitElementTimeout = config.waitElementTimeout;

            //wait for presence of element before interact with him until timeout(10 sec)
            browser
                .driver.wait(EC.presenceOf(elementFinder), waitElementTimeout)
                .catch(function (err) {
                    _this.handleError(err, function () { });
                });
            deferred.resolve();
            return deferred.promise;
        }

        /**
      * Check if an element or list of element is present and visible
      * @param {object} elementFinder
      * @returns {Promise}
      */
        this.isPresentAndDisplayed = function (elementFinder) {
            const isPresents = [];
            const isSingleElement = !elementFinder.count;

            if (isSingleElement) {
                return this._isPresentAndDisplayed(elementFinder);
            }

            elementFinder.each(el => {
                isPresents.push(this._isPresentAndDisplayed(el))
            });

            return $q.all(isPresents);
        };

        /**
       * Check if an element is present and visible
       * @param {object} elementFinder
       * @returns {Promise}
       */
        this._isPresentAndDisplayed = function (elementFinder) {
            var _this = this;
            var deferred = $q.defer();

            _this.waitForElementToBePresent(elementFinder).then(function elementPresent() {
                elementFinder.isPresent().then(function isPresentSuccess(isPresent) {
                    if (isPresent === true) {
                        elementFinder.isDisplayed().then(function isDisplayedSuccess(isVisible) {
                            if (isVisible === true) {
                                deferred.resolve();
                            } else {
                                deferred.reject("Element is present but not visible. Binding [container, key] : " + JSON.stringify(helperElement.lastUsedLocator));
                            }
                        }, function isDisplayedFailure() {
                            deferred.reject("Element is present but not visible. Binding [container, key] : " + JSON.stringify(helperElement.lastUsedLocator));
                        });
                    } else {
                        deferred.reject("Unable to find element in page. Binding [container, key] : " + JSON.stringify(helperElement.lastUsedLocator));
                    }
                });
            });

            return deferred.promise;
        };

        this.saveScreenshot = function (folder_path, name) {
            var _this = this;
            var filename = helperFile.getTreatedFilename(folder_path, name);

            browser.takeScreenshot().then(function (imageData) {
                helperFile.writePNGToFile(imageData, filename + '.png');
            });

            return _this;
        };

    };
};