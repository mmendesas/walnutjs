const helperFile = require('../../support/helpers/file');
const trest = require('../../support/api/client');
const jsonparser = require('../../support/parser/jsonparser');
const { common, logger } = helpers;

var reqSteps = function () {
  /**
   * Set the default baseURI
   */
  Given(/^\(api\) user set the baseURI with '(.*)'$/, (baseURI) => {
    baseURI = common.getTreatedValue(baseURI);
    trest.setBaseURL(baseURI);
  });

  /**
   * Create the request for a specific path
   */
  Given(/^\(api\) user creates a (POST|GET|PUT|PATCH|DELETE|HEAD) request to '(.*)'$/, (method, path) => {
    trest.createRequest(method, path);
  });

  /**
   * Executes the request
   */
  When(/^\(api\) user sends the request$/, () => {
    return trest.sendRequest()
  });

  /**
   * Change request headers
   */
  When(/^\(api\) user sets the following headers to request:$/, (data) => {
    data.raw().forEach((item) => {
      const name = common.getTreatedValue(item[0]);
      const value = common.getTreatedValue(item[1]);
      trest.addHeader(name, value);
    });
  });

  /**
   * Add parameters to request
   */
  When(/^\(api\) user add the following parameters to request:$/, (data) => {
    data.raw().forEach((item) => {
      trest.addParam(item[0], item[1]);
    });
  });

  /**
   * Add body content from resource
   */
  When(/^\(api\) user add the request BODY from the resource '(.*)'$/, (filepath) => {
    filepath = common.getTreatedValue(filepath);
    filepath = helperFile.getTreatedPath(filepath);

    trest.requestContent = '';
    if (filepath === '') {
      logger.error(`File [${filepath}] not found. Please set the complete path of the file.`);
    } else {
      trest.requestContent = helperFile.readContentFromFile(filepath);
    }
    logger.info(`Content Pattern used as body:\n${trest.requestContent}\n`);
  });


  /**
   * Add body as string in current request
   */
  When(/^\(api\) user add the following value to BODY request:$/, (fileContent) => {
    fileContent = common.getTreatedValue(fileContent);
    trest.requestContent = fileContent;
    logger.info(`Content Pattern used as body:\n${trest.requestContent}\n`);
  });

  /**
   * User update current json body in request
   */
  Then(/^\(api\) user fills '(.*)' with '(.*)'$/, (keyPath, newValue) => {
    keyPath = common.getTreatedValue(keyPath);
    var value = common.getTreatedValue(newValue);

    // change field value in json
    jsonparser.init(JSON.parse(trest.requestContent));
    jsonparser.setValue(keyPath, value);

    // update the value in request content file
    trest.requestContent = JSON.stringify(jsonparser.jsonObj);
  });

  /**
   * User update current json body in request
   */
  Then(/^\(api\) user fills '(.*)' with '(.*)' using (STRING|INT|DOUBLE|BOOL) type$/, (keyPath, newValue, type) => {
    keyPath = common.getTreatedValue(keyPath);
    var value = common.getTreatedValue(newValue);
    var newValue;

    switch (type) {
      case 'INT':
        newValue = parseInt(value);
        break;
      case 'DOUBLE':
        newValue = parseFloat(value);
        break;
      case 'BOOL':
        newValue = (value.toLowerCase() == 'true');
        break;
      default:
        newValue = value;
        break;
    }

    // change field value in json
    jsonparser.init(JSON.parse(trest.requestContent));
    jsonparser.setValue(keyPath, newValue);

    // update the value in request content file
    trest.requestContent = JSON.stringify(jsonparser.jsonObj);
  });

  /**
   * User update current json body in request with null type
   */
  Then(/^\(api\) user fills '(.*)' using NULL type$/, (keyPath) => {
    keyPath = common.getTreatedValue(keyPath);
    var newValue = null;

    // change field value in json
    jsonparser.init(JSON.parse(trest.requestContent));
    jsonparser.setValue(keyPath, newValue);

    // update the value in request content file
    trest.requestContent = JSON.stringify(jsonparser.jsonObj);
  });

  /**
   * User update string with comma to array current json body in request
   */
  Then(/^\(api\) user fills '(.*)' with '(.*)' using an ARRAY of (STRING|INT|DOUBLE) type$/, (keyPath, newValue, type) => {
    keyPath = common.getTreatedValue(keyPath);
    var value = common.getTreatedValue(newValue);
    var newValue;

    switch (type) {
      case 'INT':
        newValue = value.split(',').map(Number);
        break;
      case 'DOUBLE':
        newValue = value.split(',').map((value) => { return parseFloat(value) });
        break;
      default:
        newValue = value.split(',');
        break;
    }

    // change field value in json
    jsonparser.init(JSON.parse(trest.requestContent));
    jsonparser.setValue(keyPath, newValue);

    // update the value in request content file
    trest.requestContent = JSON.stringify(jsonparser.jsonObj);

  });


  /**
   * User update current json body in request with multiple fields
   */
  When(/^\(api\) user fills the request body with the following fields:$/, (data) => {
    data.raw().forEach((item) => {
      const keyPath = common.getTreatedValue(item[0]);
      const value = common.getTreatedValue(item[1]);

      // change field value in json
      jsonparser.init(JSON.parse(trest.requestContent));
      jsonparser.setValue(keyPath, value);

      // update the value in request content file
      trest.requestContent = JSON.stringify(jsonparser.jsonObj);
    });
  });

  /**
  * User delete key from the current json body in request
  */
  Then(/^\(api\) user deletes key '(.*)'$/, (keyPath) => {
    keyPath = common.getTreatedValue(keyPath);

    // delete the key in json
    jsonparser.init(JSON.parse(trest.requestContent));
    jsonparser.deleteKey(keyPath);

    // update the value in request content file
    trest.requestContent = JSON.stringify(jsonparser.jsonObj);
  });
};

module.exports = reqSteps;
