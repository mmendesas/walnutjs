var helperVars = require('../support/helper/variables');
var helperInfo = require('../support/helper/info');
var helperString = require('../support/helper/string');
var helperElement = require('../support/helper/element');

var CommonSteps = function () {

    this.Given(/^user navigates to '(.*)'$/, function (url) {
        var gotourl = helperString.getTreatedValue(url);
        return browser.get(gotourl);
    });

    this.Then(/^user waits for ([0-9]+) seconds$/, function (time, callback) {
        console.log('MTESTE-> ' + time);
        var _this = this;
        setTimeout(function () {
            _this.delayCallback(callback);
        }, time * 1000);
    });

    this.Given(/^user refreshes the page$/, function (callback) {
        var _this = this;
        this.refresh().then(function () {
            _this.delayCallback(callback);
        });
    });

    this.Given(/^user stores the value '(.*)' in variable '(.*)'$/, function (value, name) {
        var varName = helperString.getTreatedValue(name);
        var varvalue = helperString.getTreatedValue(value);
        helperVars.addVariable(varName, varvalue);
    });

    this.Given(/^user prints the message '(.*)' to console$/, function (text) {
        text = helperString.getTreatedValue(text);
        helperInfo.logInfo(text);
    });

    this.Given(/^user prints all variables to console$/, function () {
        helperInfo.logInfo('-------------------------------------------');
        console.log(helperVars.getAllVariables());
        helperInfo.logInfo('-------------------------------------------');
    });

    this.Given(/^user stores the value from element '(.+)-(.+)' in variable '(.*)'$/, function (container, key, varName) {
        // var _this = this;

        var elementFinder = helperElement.getElementFinder(container, key);

        element(by.model('login.usuario')).sendKeys('asdf');
        var text = element(by.model('login.usuario'));
        var mteste = browser.findElement(by.xpath('//button'));

        console.log("MTESTE >" + mteste.getText());

        // var button = element(by.ngClick('realizarLogin()'));
        mteste.getText().then(function (text) {
            console.log('texto do botão ', text);
            helperVars.addVariable(varName, text);
            helperVars.addVariable('ggg', '65478');
        });

        console.log('CHEGUEI AQUI555 _' + helperVars.getVariable('ggg'));
        console.log('CHEGUEI AQUI _' + helperVars.getVariable(varName));
    });


    this.Given(/^user waits for page to load$/, function () {
        browser.waitForAngular();
    });
};

module.exports = CommonSteps;