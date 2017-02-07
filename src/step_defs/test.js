var context = require('../support/context');
var element = require('../support/helper/element');

var Test = function () {
    this.Given(/^user make the simple test$/, function () {
        
        // context.setLocators('mc123654');
        // console.log("teste 001 " + context.locators);
        // console.log("JSON444421 " + context.getLocators());
        // element.loadUIMap();
        var list = element.findLocator('Container001','c1-loc1');
        console.log('Minha Lista', Object.keys(list).length);
        // context.loadPageInstance('Login');
    });
}

module.exports = Test;