var helperCommon = require("../../support/helper/common");
var helperInfo = require('../../support/helper/info')
var helperVars = require('../../support/helper/variables');
var trest = require('../../support/api/trest');

var jsonparser = require('../../support/parser/jsonparser');
var xmlparser = require('../../support/parser/xmlparser');

var resSteps = function () {

    /**
     *  Validates the response status code
     */
    this.Then(/^\(api\) the response (status|statusText) should be '(\d+)'$/, function (type, statusCode, callback) {
        var _this = this;
        var recStatus = type === 'status' ? trest.response.code.toString() : trest.response.statusMessage;

        var result = statusCode === recStatus;
        if (!result) {
            _this.handleError(trest.response.code.toString(), callback);
        } else {
            helperInfo.logDebugFormat("User receives response status code [{0}]", [trest.response.code]);
            _this.delayCallback(callback);
        }
    });

    /**
     * Compare the full value of body response     
     */
    this.Then(/^\(api\) the (JSON|XML) response should be:$/, function (type, content, callback) {
        var _this = this;
        trest.responseContent = trest.responseContent.replace(/(\r\n|\n|\r|\s)/gm, "");
        content = content.replace(/(\r\n|\n|\r|\s)/gm, "");

        //compare
        var compareRes = helperCommon.compare(trest.responseContent, 'equalsto', content);
        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });

    /**
     * Validates a value in specific node in JSON response.body     
     */
    this.Then(/^\(api\) the JSON response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (keyPath, comparissonType, expectedValue, callback) {
        var _this = this;
        keyPath = helperCommon.getTreatedValue(keyPath);
        expectedValue = helperCommon.getTreatedValue(expectedValue);

        //get value from JSON using JSONPATH
        jsonparser.init(trest.response.body);
        var jsonValue = jsonparser.getValue(keyPath)[0];

        //compare
        var compareRes = helperCommon.compare(jsonValue, comparissonType, expectedValue);
        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });

    /**
     * Validates a value in specific node in XML response.body
     */
    this.Then(/^\(api\) the XML response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (keyPath, comparissonType, expectedValue, callback) {
        var _this = this;
        keyPath = helperCommon.getTreatedValue(keyPath);
        expectedValue = helperCommon.getTreatedValue(expectedValue);

        //get value from XML using XPATH
        xmlparser.init(trest.response.body);
        var xmlValue = xmlparser.getTagValue(keyPath) || '<path not found>';

        //compare
        var compareRes = helperCommon.compare(xmlValue, comparissonType, expectedValue);
        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });

    // Validates a value in specific node in response header
    this.Then(/^\(api\) the header response key '(.*)' should have value (equals to|not equals to|which contains|which not contains|which starts with|which ends with) '(.*)'$/, function (header, comparissonType, expectedValue, callback) {
        var _this = this;

        //Treat the parameters informations
        header = helperCommon.getTreatedValue(header);
        expectedValue = helperCommon.getTreatedValue(expectedValue);
        
        //Get the header value response from parameter informed
        var content = trest.response.headers[header];

        //compare
        var compareRes = helperCommon.compare(content, comparissonType, expectedValue);
        if (!compareRes.result) {
            _this.handleError(compareRes.msg, callback);
        } else {
            _this.delayCallback(callback);
        }
    });
    
    /**
    * Stores the value of the response field found by json path
    */
    this.Then(/^\(api\) user stores the value '(.*)' from response in variable '(.*)'$/, function (keyPath, name, callback) {

        keyPath = helperCommon.getTreatedValue(keyPath);
        var varName = helperCommon.getTreatedValue(name);

        //get value from JSON using JSONPATH
        jsonparser.init(trest.response.body);
        var varValue = jsonparser.getValue(keyPath)[0];

        // Add the value to variables
        helperVars.addVariable(varName, varValue);
        this.delayCallback(callback);
    });
}

module.exports = resSteps;