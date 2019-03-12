const config = require('../../src/support/config');

const allParams = {
  walnutjsOpts: {
    projectName: 'walnutjs-test',
    enableDebugLog: true,
    waitElementTimeout: 5000,
    evidencesPath: '/evidences/',
    parametersPath: '/test/params/params.json',
    locatorsPath: '/test/locators'
  }
};

describe('Config File Tests', () => {
  it('should load all parameters correctly', () => {
    config.loadConfigs(allParams);
    const { projectName, enableDebug, waitElementTimeout, evidencesPath, parametersPath, locatorsPath } = config;

    expect(projectName).toEqual('walnutjs-test');
    expect(enableDebug).toBeTruthy();
    expect(waitElementTimeout).toEqual(5000);
    expect(evidencesPath).toEqual('/evidences/');
    expect(parametersPath).toEqual('/test/params/params.json');
    expect(locatorsPath).toEqual('/test/locators');
  });

  it('should load default values correctly', () => {
    config.loadConfigs(null);
    const { projectName, enableDebug, waitElementTimeout, evidencesPath, parametersPath, locatorsPath } = config;
    expect(projectName).toEqual('walnutjs-sample');
    expect(enableDebug).toBeFalsy();
    expect(waitElementTimeout).toEqual(10000);
    expect(evidencesPath).toEqual('/test/evidences');
    expect(parametersPath).toEqual('/test/params');
    expect(locatorsPath).toEqual('/test/locators');
  });
});
