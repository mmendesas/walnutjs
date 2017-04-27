var unirest = require('unirest');
var helperCommon = require('../../support/helper/common');
var helperInfo = require('../../support/helper/info');
var trest = require('../../support/api/trest');

var reqSteps = function () {

    /**
     * Set the default baseURI
     */
    this.Given(/^\(api\) user set the baseURI with '(.*)'$/, function (baseURI, callback) {
        var _this = this;

        baseURI = helperCommon.getTreatedValue(baseURI);
        trest.baseURI = baseURI;

        helperInfo.logDebug("User uses the baseURI: " + baseURI);
        _this.delayCallback(callback);
    });

    /**
     * Create the request for a specific path
     */
    this.Given(/^\(api\) user builds the (POST|GET|PUT|PATCH|DELETE|HEAD) request with the path '(.*)'$/, function (method, path, callback) {
        var _this = this;
        path = helperCommon.getTreatedValue(path);
        switch (method) {
            case "POST":
                trest.request = unirest.post(trest.baseURI + path);
                break;

            case "GET":
                trest.request = unirest.get(trest.baseURI + path);
                break;

            case "PUT":
                trest.request = unirest.put(trest.baseURI + path);
                break;

            case "DELETE":
                trest.request = unirest.delete(trest.baseURI + path);
                break;

            case "PATCH":
                trest.request = unirest.patch(trest.baseURI + path);
                break;
        }
        _this.delayCallback(callback);
    });

    /**
     * Executes the request
     */
    this.When(/^\(api\) user executes the request$/, function (callback) {
        var _this = this;
        trest.request.end(function (response) {
            trest.response = response;
            trest.responseContent = response.raw_body;
            _this.delayCallback(callback);
        });
    });

    /**
     * Change request headers
     */
    this.When(/^\(api\) user set header '(.*)' with value '(.*)'$/, function (name, value, callback) {
        name = helperCommon.getTreatedValue(name);
        value = helperCommon.getTreatedValue(value);
        trest.request.header(name, value);
        callback();
    });

}

module.exports = reqSteps;