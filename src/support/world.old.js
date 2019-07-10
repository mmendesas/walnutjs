/* eslint-disable */
const $q = require('q');
const context = require('./context');
const config = require('./config');
const helperString = require('./helpers/string');
const helperCommon = require('./helpers/common');
const helperFile = require('./helpers/file');
const helperElement = require('./helpers/element');
// var EC = protractor.ExpectedConditions;

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
      const _this = this;
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
      const _this = this;
      const { evidencesPath } = config;

      // console.error('\n' + err.name + ': ' + err.message + '\n');

      browser.takeScreenshot().then((imageData) => {
        const formatFeature = helperString.slugify(context.getCurrentFeature().getName());
        const formatScenario = helperString.slugify(context.getCurrentScenario().getName());
        const formatStep = helperString.slugify(context.getCurrentStep().getName());

        const folder_path = [];
        folder_path.push(config.projectName);
        folder_path.push(formatFeature);
        folder_path.push(formatScenario);
        folder_path.push('errors');

        const filename = helperFile.getTreatedFilename(folder_path, `${formatStep}_error`);

        helperFile.writePNGToFile(imageData, filename);

        _this.delayCallback(() => {
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
      const _this = this;
      const deferred = $q.defer();
      const { waitElementTimeout } = config;

      // wait for presence of element before interact with him until timeout(10 sec)
      browser
        .driver.wait(EC.presenceOf(elementFinder), waitElementTimeout)
        .catch((err) => {
          _this.handleError(err, () => { });
        });
      deferred.resolve();
      return deferred.promise;
    };

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

      elementFinder.each((el) => {
        isPresents.push(this._isPresentAndDisplayed(el));
      });

      return $q.all(isPresents);
    };

    /**
       * Check if an element is present and visible
       * @param {object} elementFinder
       * @returns {Promise}
       */
    this._isPresentAndDisplayed = function (elementFinder) {
      const _this = this;
      const deferred = $q.defer();
      elementFinder.isPresent().then((isPresent) => {

        _this.waitForElementToBePresent(elementFinder).then(() => {
          if (isPresent === true) {
            elementFinder.isDisplayed().then((isVisible) => {
              if (isVisible === true) {
                deferred.resolve();
              } else {
                deferred.reject(`Element is present but not visible. Binding [container, key] : ${JSON.stringify(helperElement.lastUsedLocator)}`);
              }
            }, () => {
              deferred.reject(`Element is present but not visible. Binding [container, key] : ${JSON.stringify(helperElement.lastUsedLocator)}`);
            });
          } else {
            deferred.reject(`Unable to find element in page. Binding [container, key] : ${JSON.stringify(helperElement.lastUsedLocator)}`);
          }
        });
      });

      return deferred.promise;
    };

    this.saveScreenshot = function (folder_path, name) {
      const _this = this;
      const filename = helperFile.getTreatedFilename(folder_path, name);

      browser.takeScreenshot().then((imageData) => {
        helperFile.writePNGToFile(imageData, `${filename}.png`);
      });

      return _this;
    };
  };
};
