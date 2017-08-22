var helperVars = require('../support/helper/variables');
var helperInfo = require('../support/helper/info');
var helperElement = require('../support/helper/element');
var helperCommon = require('../support/helper/common');
var helperString = require('../support/helper/string');
var _ = require('lodash');

var CommonSteps = function () {

    /**
     * Sleeps the execution for a specific time in seconds
     */
    this.Then(/^user waits for ([0-9]+) seconds$/, function (time, callback) {
        browser.sleep(time * 1000).then(callback);
    });

    /**
     * Stores a value in a variable to use between scenarios
     */
    this.Given(/^user stores the value '(.*)' in variable '(.*)'$/, function (value, name) {
        var varName = helperCommon.getTreatedValue(name);
        var varvalue = helperCommon.getTreatedValue(value);
        helperVars.addVariable(varName, varvalue);
    });

    /**
     * Stores a list of variables
     */
    this.Given(/^user stores the following list of variables:$/, function (data) {
        _.forEach(data.raw(), function (item) {
            var varName = helperCommon.getTreatedValue(item[0]);
            var varvalue = helperCommon.getTreatedValue(item[1]);
            helperVars.addVariable(varName, varvalue);
        });
    });

    /**
     * Prints a message to console, with or without walnut vars/expressions
     */
    this.Given(/^user prints the message '(.*)' to console$/, function (text) {
        text = helperCommon.getTreatedValue(text);
        helperInfo.logInfo(text);
    });

    /**
     * Prints all variables stored at to console
     */
    this.Given(/^user prints all variables to console$/, function () {
        helperInfo.logInfo('-------------------------------------------');
        console.log(helperVars.getAllVariables());
        helperInfo.logInfo('-------------------------------------------');
    });

    /**
     * Stores the value from element inside a variable
     */
    this.Given(/^user stores the (TEXT|VALUE) from element '(.+)-(.+)' in variable '(.*)'$/, function (type, container, key, varName) {

        var deferred = protractor.promise.defer();
        var elementFinder = helperElement.getElementFinder(container, key);

        if (type.toLowerCase() === 'text') {
            elementFinder.getText().then(function getTextSuccess(text) {
                helperVars.addVariable(varName, text);
                deferred.fulfill();
            });
        } else {
            elementFinder.getAttribute('text').then(function getValueSuccess(value) {
                helperVars.addVariable(varName, value);
                deferred.fulfill();
            });
        }
        return deferred.promise;
    });

    /**
     * Stores the elements count in variable
     */
    this.Given(/^user stores the elements count from '(.+)-(.+)' in variable '(.+)'$/, function (container, key, varName) {        
        var deferred = protractor.promise.defer();
        helperElement.getElementFinderAll(container, key).count().then(function (count) {            
            helperVars.addVariable(varName, count);
            deferred.fulfill();
        });
        return deferred.promise;
    });

    /**
     * Stores a screenshot in the path, using pattern 'path|imageName'
     */
    this.Then(/^user saves a screenshot '(.*)'$/, function (path_list) {

        path_list = helperCommon.getTreatedValue(path_list);

        if (path_list.includes('|')) {
            var split = path_list.split('|');
            var name = split[split.length - 1];
            split.pop();

            var img_num = parseInt(helperVars.getVariable('img_num'));

            // add format to 3 digits
            var valWithDig = helperString.formatWitDigits(img_num, 3);
            name = helperString.formatString('{0}_{1}', [valWithDig, name]);

            this.saveScreenshot(split, name);

            helperVars.addVariable('img_num', ++img_num);
        }
    });

    /**
     * Clears the current cookies
     */
    this.When(/^user clears the cookies$/, function () {
        browser.manage().deleteAllCookies();
    });

    /**
     * Add a specific cookie to current session
     */
    this.When(/^user add a cookie '(.*)' with value '(.*)'$/, function (cname, cvalue) {
        browser.manage().addCookie({ name: cname, value: cvalue });
    });

    /**
     * Executes a simple JS script
     */
    this.Given(/^user executes the JS '(.*)'$/, function (code, callback) {
        var _this = this;
        browser.executeScript(code).then(function () {
            _this.delayCallback(callback);
        });
    });
    
};

module.exports = CommonSteps;