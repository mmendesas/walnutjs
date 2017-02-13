var ptoConfig = require(process.cwd() + '/protractor.conf.js').config;

var config = {
    waitElementTimeout: 10000,

    evidencesPath: '/test/logs/',

    enableDebug: false,

    loadConfigs: function () {
        if (ptoConfig.walnutjsOpts) {

            this.enableDebug = ptoConfig.walnutjsOpts.enableDebugLog;

            if (ptoConfig.walnutjsOpts.waitElementTimeout) {
                this.waitElementTimeout = ptoConfig.walnutjsOpts.waitElementTimeout;
            }
            if (ptoConfig.walnutjsOpts.evidencesPath) {
                this.evidencesPath = ptoConfig.walnutjsOpts.evidencesPath;
            }
        }
    }
};

module.exports = config;