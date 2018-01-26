var ptoConfig = require(process.cwd() + '/protractor.conf.js').config;

var config = {

    projectName: 'qaaut-test',

    waitElementTimeout: 10000,

    evidencesPath: '',

    parametersPath: '',

    enableDebug: false,

    cryptoAlgorithm: '',

    cryptoKeycode: '',

    /**
     * Load the config parameters from protractor.confg.js
     */
    loadConfigs: function () {
        if (ptoConfig.walnutjsOpts) {

            this.enableDebug = ptoConfig.walnutjsOpts.enableDebugLog;

            if (ptoConfig.walnutjsOpts.waitElementTimeout) {
                this.waitElementTimeout = ptoConfig.walnutjsOpts.waitElementTimeout;
            }
            if (ptoConfig.walnutjsOpts.evidencesPath) {
                this.evidencesPath = ptoConfig.walnutjsOpts.evidencesPath;
            }
            if (ptoConfig.walnutjsOpts.parametersPath) {
                this.parametersPath = ptoConfig.walnutjsOpts.parametersPath;
            }
            if (ptoConfig.walnutjsOpts.locatorsPath) {
                this.locatorsPath = ptoConfig.walnutjsOpts.locatorsPath;
            }
            if (ptoConfig.walnutjsOpts.projectName) {
                this.projectName = ptoConfig.walnutjsOpts.projectName;
            }
            if (ptoConfig.walnutjsOpts.projectName) {
                this.projectName = ptoConfig.walnutjsOpts.projectName;
            }
            if (ptoConfig.walnutjsOpts.crypto) {
                if (ptoConfig.walnutjsOpts.crypto.algorithm) {
                    this.cryptoAlgorithm = ptoConfig.walnutjsOpts.crypto.algorithm;
                }
                if (ptoConfig.walnutjsOpts.crypto.keycode) {
                    this.cryptoKeycode = ptoConfig.walnutjsOpts.crypto.keycode;
                }
            }
        }
    }
};

module.exports = config;