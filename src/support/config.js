const config = {
  projectName: 'walnutjs-sample',

  waitElementTimeout: 10000,

  enableDebug: false,

  evidencesPath: '/test/evidences',

  parametersPath: '/test/params',

  locatorsPath: '/test/locators',

  cryptoAlgorithm: '',

  cryptoKeycode: '',

  /**
   * Load the config parameters from protractor.confg.js
   */
  loadConfigs: function(config) {
    const ptoConfig = config !== null ? config : require(process.cwd() + '/protractor.conf.js').config;

    if (ptoConfig.walnutjsOpts) {
      this.projectName = ptoConfig.walnutjsOpts.projectName || 'walnutjs-sample';
      this.enableDebug = ptoConfig.walnutjsOpts.enableDebugLog || false;
      this.waitElementTimeout = ptoConfig.walnutjsOpts.waitElementTimeout || 10000;
      this.evidencesPath = ptoConfig.walnutjsOpts.evidencesPath || '/test/evidences';
      this.parametersPath = ptoConfig.walnutjsOpts.parametersPath || '/test/params';
      this.locatorsPath = ptoConfig.walnutjsOpts.locatorsPath || '/test/locators';

      if (ptoConfig.walnutjsOpts.crypto) {
        const { algorithm, keycode } = ptoConfig.walnutjsOpts.crypto;
        this.cryptoAlgorithm = algorithm;
        this.cryptoKeycode = keycode;
      }
    }
  }
};

module.exports = config;
