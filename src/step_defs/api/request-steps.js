var unirest = require('unirest');
var helperCommon = require('../../support/helper/common');
var helperFile = require('../../support/helper/file');
var helperInfo = require('../../support/helper/info');
var helperString = require('../../support/helper/string');
var trest = require('../../support/api/trest');
var jsonparser = require('../../support/parser/jsonparser');
var _ = require('lodash');

var reqSteps = function () {

    /**
     * Set the default baseURI
     */
    this.Given(/^\(api\) user set the baseURI with '(.*)'$/, function (baseURI, callback) {
        var _this = this;
        baseURI = helperCommon.getTreatedValue(baseURI);
        trest.baseURI = baseURI;
        _this.delayCallback(callback);
    });

    /**
     * Create the request for a specific path
     */
    this.Given(/^\(api\) user creates a (POST|GET|PUT|PATCH|DELETE|HEAD) request to '(.*)'$/, function (method, path, callback) {
        var _this = this;
        trest.createRequest(method, path);
        _this.delayCallback(callback);
    });

    /**
     * Executes the request
     */
    this.When(/^\(api\) user sends the request$/, function (callback) {
        var _this = this;
        trest.request.send(trest.requestContent);
        trest.sendRequest(function () {
            _this.delayCallback(callback);
        });
    });

    /**
     * Change request headers
     */
    this.When(/^\(api\) user sets the following headers to request:$/, function (data, callback) {
        _.forEach(data.raw(), function (item) {
            var name = helperCommon.getTreatedValue(item[0]);
            var value = helperCommon.getTreatedValue(item[1]);
            trest.request.header(name, value);
        });
        this.delayCallback(callback);
    });

    /**
     * Add parameters to request
     */
    this.When(/^\(api\) user add the following parameters to request:$/, function (data, callback) {
        var _this = this;
        _.forEach(data.raw(), function (item) {
            var content = helperString.formatString('{0}={1}', [item[0], item[1]]);
            trest.request.query(content);
        });
        _this.delayCallback(callback);
    });

    /**
     * Add body content from resource
     */
    this.When(/^\(api\) user add the request BODY from the resource '(.*)'$/, function (filepath, callback) {
        filepath = helperCommon.getTreatedValue(filepath);
        filepath = helperFile.getTreatedPath(filepath);

        trest.requestContent = '';
        if (filepath === "") {
            helperInfo.logError('File [' + filepath + '] not found. Please set the complete path of the file.');
        } else {
            trest.requestContent = helperFile.readContentFromFile(filepath);
        }

        helperInfo.logDebugFormat("Content Pattern used as body:\n{0}\n", [trest.requestContent]);
        this.delayCallback(callback);
    });


    /**
     * Add body as string in current request
     */
    this.When(/^\(api\) user add the following value to BODY request:$/, function (fileContent, callback) {
        trest.requestContent = fileContent;
        helperInfo.logDebugFormat("Content Pattern used as body:\n{0}\n", [trest.requestContent]);
        this.delayCallback(callback);
    });

    /**
     * User update current json body in request
     */
    this.Then(/^\(api\) user fills '(.*)' with '(.*)'$/, function (keyPath, newValue, callback) {

        keyPath = helperCommon.getTreatedValue(keyPath);
        var value = helperCommon.getTreatedValue(newValue);

        // change field value in json
        jsonparser.init(JSON.parse(trest.requestContent));
        jsonparser.setValue(keyPath, value);

        // update the value in request content file
        trest.requestContent = JSON.stringify(jsonparser.jsonObj);

        this.delayCallback(callback);
    });

    /**
     * User update current json body in request
     */
    this.Then(/^\(api\) user fills '(.*)' with '(.*)' using (STRING|INT|DOUBLE|BOOL) type$/, function (keyPath, newValue, type, callback) {

        keyPath = helperCommon.getTreatedValue(keyPath);
        var value = helperCommon.getTreatedValue(newValue);
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

        this.delayCallback(callback);
    });

    /**
     * User update string with comma to array current json body in request
     */
    this.Then(/^\(api\) user fills '(.*)' with '(.*)' using an ARRAY of (STRING|INT|DOUBLE) type$/, function (keyPath, newValue, type, callback) {

        keyPath = helperCommon.getTreatedValue(keyPath);
        var value = helperCommon.getTreatedValue(newValue);
        var newValue;

        switch (type) {
            case 'INT':
                newValue = value.split(',').map(Number);
                break;
            case 'DOUBLE':
                newValue = value.split(',').map(function(value){return parseFloat(value)});
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

        this.delayCallback(callback);
    });

    /**
     * User update current json body in request with multiple fields
     */
    this.When(/^\(api\) user fills the request body with the following fields:$/, function (data, callback) {
        _.forEach(data.raw(), function (item) {
            var keyPath = helperCommon.getTreatedValue(item[0]);
            var value = helperCommon.getTreatedValue(item[1]);

            // change field value in json
            jsonparser.init(JSON.parse(trest.requestContent));
            jsonparser.setValue(keyPath, value);

            // update the value in request content file
            trest.requestContent = JSON.stringify(jsonparser.jsonObj);
        });
        this.delayCallback(callback);
    });

    /**
    * User delete key from the current json body in request
    */
    this.Then(/^\(api\) user deletes key '(.*)'$/, function (keyPath, callback) {

        keyPath = helperCommon.getTreatedValue(keyPath);

        // delete the key in json
        jsonparser.init(JSON.parse(trest.requestContent));
        jsonparser.deleteKey(keyPath);

        // update the value in request content file
        trest.requestContent = JSON.stringify(jsonparser.jsonObj);

        this.delayCallback(callback);
    });

}

module.exports = reqSteps;