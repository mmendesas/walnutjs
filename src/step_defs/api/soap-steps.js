var helperCommon = require('../../support/helper/common');
var helperFile = require('../../support/helper/file');
var helperInfo = require('../../support/helper/info');
var soapclient = require('../../support/api/soapclient');
var $q = require('q');
var jsonparser = require('../../support/parser/jsonparser');
var _ = require('lodash');

var soapapi = function () {

    /**
     * User defines the wsdlPath
     */
    this.Given(/^\(soap\) user set the WSDL Path with value '(.*)'$/, function (wsdlPath, callback) {
        var _this = this;
        wsdlPath = helperCommon.getTreatedValue(wsdlPath);
        soapclient.startClient(wsdlPath).then(function () {
            helperInfo.logDebug("User uses the WSDL PATH: " + soapclient.wsdlPath);
            _this.delayCallback(callback);
        });
    });

    /**
     * User prints the current body content (Req|Res)
     */
    this.Given(/^\(soap\) user prints the current (REQUEST|RESPONSE) body content$/, function (type, callback) {
        var content = type === 'REQUEST' ? soapclient.jsonToSend : soapclient.jsonResponse;
        helperInfo.logInfoFormat('SOAP [{0}] content:\n{1}\n', [type, JSON.stringify(content)]);
        this.delayCallback(callback);
    });

    /**
     * Loads the json body to send from a simple file
     */
    this.When(/^\(soap\) user add the JSON body from the resource '(.*)'$/, function (filepath, callback) {
        filepath = helperCommon.getTreatedValue(filepath);
        filepath = helperFile.getTreatedPath(filepath);

        soapclient.jsonToSend = '';
        if (filepath === "") {
            helperInfo.logError('File [' + filepath + '] not found. Please set the complete path of the file.');
        } else {
            var fileContent = helperFile.readContentFromFile(filepath);
            soapclient.jsonToSend = JSON.parse(fileContent);
            helperInfo.logDebugFormat("SOAP Content:\n{0}", [JSON.stringify(soapclient.jsonToSend)]);
        }
        this.delayCallback(callback);
    });

    /**
     * Executes a operation with SOAP request
     */
    this.When(/^\(soap\) user executes the SOAP Request with operation '(.*)'$/, function (operation) {
        var deferred = $q.defer();
        soapclient.executeMethod(operation).then(function () {
            helperInfo.logDebugFormat('SOAP Operation: [{0}]', [operation]);
            deferred.resolve();
        });
        return deferred.promise;
    });

    /**
    * Validates a value in specific node in JSON response.body     
    */
    this.Then(/^\(soap\) the JSON \(jsonpath\) key '(.*)' has value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (keyPath, comparissonType, expectedValue, callback) {
        var _this = this;
        keyPath = helperCommon.getTreatedValue(keyPath);
        expectedValue = helperCommon.getTreatedValue(expectedValue);

        jsonparser.init(soapclient.jsonResponse);
        var valueFromFile = jsonparser.getValue(keyPath)[0] || '<path not found>';
        var compareRes = helperCommon.compare(valueFromFile, comparissonType, expectedValue);

        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });

    /**
    * Stores the value from Request/Response
    */
    this.Then(/^\(soap\) user stores the value '(.*)' from (REQUEST|RESPONSE) in variable '(.*)'$/, function (keyPath, type, varName, callback) {
        var varName = helperCommon.getTreatedValue(name);
        keyPath = helperCommon.getTreatedValue(keyPath);

        var jsonObj = type === 'REQUEST' ? soapclient.jsonToSend : soapclient.jsonResponse;
        jsonparser.init(jsonObj);
        var varValue = jsonparser.getValue(keyPath)[0] || '<path not found>';
        helperVars.addVariable(varName, varvalue);

        this.delayCallback(callback);
    });

    /**
     * Update the content of jsonToSend
     */
    this.When(/^\(soap\) user fills the \(jsonpath\) key '(.*)' with value '(.*)'$/, function (jsonPath, newValue, callback) {
        jsonPath = helperCommon.getTreatedValue(jsonPath);
        newValue = helperCommon.getTreatedValue(newValue);

        jsonparser.init(soapclient.jsonToSend);
        jsonparser.setValue(jsonPath, newValue);
        this.delayCallback(callback);
    });

    /**
    * Prints the list of methods inside this endpoint
    */
    this.When(/^\(soap\) user prints the list of methods in current endpoint$/, function (callback) {
        var _this = this;
        soapclient.getAllMethods().then(function (values) {
            helperInfo.logInfoFormat('SOAP Methods in current endpoint:\n{1}\n', [JSON.stringify(values)]);
            _this.delayCallback(callback);
        });
    });

    /**
   * Export a template (input/output) from the method
   */
    this.When(/^\(soap\) user exports the (INPUT|OUTPUT) template of method '(.*)' to file '(.*)'$/, function (type, method, filepath, callback) {
        var _this = this;
        filepath = helperFile.getTreatedPath(filepath);

        soapclient.describeMethod(method, type).then(function (result) {
            var content = JSON.stringify(result, null, '\t');
            helperInfo.logDebugFormat('SOAP {1} template in current endpoint:\n{2}\n', [type, content]);
            helperFile.writeContentToFile(content, filepath);
            _this.delayCallback(callback);
        });
    });

    /**
    * Exports all templates from current endpoint
    */
    this.When(/^\(soap\) user export all templates from current endpoint to folder '(.*)'$/, function (folderpath, callback) {
        var _this = this;
        folderpath = helperFile.getTreatedPath(folderpath);
        helperFile.ensureDirectoryExistence(folderpath + '/m.js'); //fake file for right operation

        soapclient.getAllMethods().then(function (values) {
            _.forEach(values, function (method) {
                soapclient.describeMethod(method, 'input').then(function (result) {
                    var content = JSON.stringify(result, null, '\t');
                    var filepath = folderpath + '/input_' + method + '.json';
                    helperFile.writeContentToFile(content, filepath);
                });
                soapclient.describeMethod(method, 'output').then(function (result) {
                    var content = JSON.stringify(result, null, '\t');
                    var filepath = folderpath + '/output_' + method + '.json';
                    helperFile.writeContentToFile(content, filepath);
                });
            });
            _this.delayCallback(callback);
        });
    });

}

module.exports = soapapi;