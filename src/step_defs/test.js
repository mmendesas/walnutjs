var context = require('../support/context');
var element = require('../support/helper/element');
var helperInfo = require('../support/helper/info');
var config = require('../support/config');

var Test = function () {
    this.Given(/^user make the simple test$/, function () {

        // context.setLocators('mc123654');
        // console.log("teste 001 " + context.locators);
        // console.log("JSON444421 " + context.getLocators());
        // element.loadUIMap();        
        // console.log('Meus params -->', JSON.stringify(browser.params.mteste));


        helperInfo.logTimeElapsed("marcio");
        // console.log('CONFIG DIRETO -->', config.walnutjsOpts.enable_debugLog);

        if (config.enableDebug) {
            helperInfo.logInfo("MARCIO M<ENDES");
        }
        helperInfo.logTimeElapsed("marcio");

        helperInfo.logTimeElapsed("MC");
        if (config.enableDebug) {
            helperInfo.logInfo("98798789MARCIO M<ENDES");
        }
        helperInfo.logTimeElapsed("MC");
    });
}

module.exports = Test;