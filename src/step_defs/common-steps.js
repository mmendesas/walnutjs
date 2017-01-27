
var vars = require('../support/helper/variables')

var CommonSteps = function () {



    this.Then(/^user waits for ([0-9]+) seconds$/, function (time, callback) {
        var _this = this;
        setTimeout(function () {
            _this.delayCallback(callback)
        }, time * 1000);
    });

    /**
    * Refresh the current Url
    */
    this.Given(/^user refreshes the page$/, function (callback) {
        var _this = this;
        this.refresh().then(function () {
            _this.delayCallback(callback);
        });
    });

    this.Given(/^user stores the value '(.*)' in variable '(.*)'$/, function (value, name) {
        var varName = name;
        var varvalue = value;
        vars.addVariable(varName, varvalue);
    });

    this.Given(/^user prints the message "(.*?)" to console$/, function (text) {
        console.log(text);
    });

    this.Given(/^user prints all variables to console$/, function () {
        console.log('[INFO] -------------------------------------------');
        console.log(vars.getAllVariables());
        console.log('[INFO] -------------------------------------------');
    });

};

module.exports = CommonSteps;