var helperVars = require('../support/helper/variables');
var helperInfo = require('../support/helper/info');
var helperString = require('../support/helper/string');
var helperElement = require('../support/helper/element');

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
        var varName = helperString.getTreatedValue(name);
        var varvalue = helperString.getTreatedValue(value);
        helperVars.addVariable(varName, varvalue);
    });

    /**
     * Prints a message to console, with or without walnut vars/expressions
     */
    this.Given(/^user prints the message '(.*)' to console$/, function (text) {
        text = helperString.getTreatedValue(text);
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
    this.Given(/^user stores the (text|value) from element '(.+)-(.+)' in variable '(.*)'$/, function (type, container, key, varName) {

        /**
         * TODO: implementar meio de pegar valor fora da função callback
         */

        var elementFinder = helperElement.getElementFinder(container, key);

        if (type.toLowerCase() === 'text') {
            elementFinder.getText().then(function getTextSuccess(text) {
                console.log('TEXT:', text);
                helperVars.addVariable(varName, text);
            });
        } else {
            elementFinder.getAttribute('value').then(function getValueSuccess(value) {
                console.log('VALUE:', value);
                helperVars.addVariable(varName, value);
            });
        }

    });

};

module.exports = CommonSteps;