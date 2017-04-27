var helperCommon = require("../../support/helper/common");
var helperInfo = require('../../support/helper/info')
var trest = require('../../support/api/trest');

var jsonparser = require('../../support/parser/jsonparser');
var xmlparser = require('../../support/parser/xmlparser');

var resSteps = function () {

    /**
     *  Validates the response status code
     */
    this.Then(/^\(api\) user receives the status code equals to '(\d+)'$/, function (statusCode, callback) {
        var _this = this;
        var result = statusCode === trest.response.code.toString();
        if (!result) {
            _this.handleError(trest.response.code.toString(), callback);
        } else {
            helperInfo.logDebugFormat("User receives response status code [{0}]", [trest.response.code]);
            _this.delayCallback(callback);
        }
    });

    /**
     * Validates a value in specific node in JSON response.body     
     */
    this.Then(/^\(api\) the JSON \(jsonpath\) key '(.*)' has value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (keyPath, comparissonType, expectedValue, callback) {
        var _this = this;
        keyPath = helperCommon.getTreatedValue(keyPath);
        expectedValue = helperCommon.getTreatedValue(expectedValue);

        var valueFromFile = getValueFromJSON(keyPath);
        var compareRes = helperCommon.compare(valueFromFile, comparissonType, expectedValue);

        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });

    /**
     * Validates a value in specific node in XML response.body
     */
    this.Then(/^\(api\) the XML \(xpath\) key '(.*)' has value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (keyPath, comparissonType, expectedValue, callback) {
        var _this = this;
        keyPath = helperCommon.getTreatedValue(keyPath);
        expectedValue = helperCommon.getTreatedValue(expectedValue);

        //var valueFromFile = (type === 'XML (xpath)') ? getValueFromXML(keyPath) : getValueFromJSON(keyPath);
        var valueFromFile = getValueFromXML(keyPath);
        var compareRes = helperCommon.compare(valueFromFile, comparissonType, expectedValue);

        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });
}

function getValueFromJSON(jsonpath) {
    jsonparser.init(trest.response.body);
    return jsonparser.getValue(jsonpath)[0] || '<path not found>';
}

function getValueFromXML(xpath) {
    xmlparser.init(trest.response.body);
    return xmlparser.getTagValue(xpath);
}

module.exports = resSteps;