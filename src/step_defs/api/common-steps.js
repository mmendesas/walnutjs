var helperCommon = require('../../support/helper/common');
var helperFile = require('../../support/helper/file');
var helperInfo = require('../../support/helper/info');
var trest = require('../../support/api/trest');

var commonapi = function () {

    /**
     * User prints the current body content (Req|Res)
     */
    this.Given(/^\(api\) user prints the current (REQUEST|RESPONSE) body content$/, function (type, callback) {
        var _this = this;

        var content = type === 'REQUEST' ? trest.requestContent : trest.response.raw_body;
        helperInfo.logInfoFormat('[{0}] content:\n{1}\n', [type, content]);
        _this.delayCallback(callback);
    });


    /**
     * Add body content from resource
     */
    this.When(/^\(api\) user add the (JSON|XML|HTML) BODY from the resource '(.*)'$/, function (type, filepath) {
        filepath = helperCommon.getTreatedValue(filepath);
        filepath = helperFile.getTreatedPath(filepath);

        trest.requestContent = '';

        if (filepath === "") {
            helperInfo.logError('File [' + filepath + '] not found. Please set the complete path of the file.');
        } else {
            trest.requestContent = helperFile.readContentFromFile(filepath);
        }

        //set the Content-Type 
        trest.request.type(type.toLowerCase());

        helperInfo.logDebugFormat("[{0}] Content Pattern used as body:\n{1}\n", [type, trest.requestContent]);
        trest.request.send(trest.requestContent);
    });

    this.When(/^\(api\) user add the (JSON|XLM|HTML) BODY with following value:$/, function (type, fileContent) {
        trest.requestContent = fileContent;
        //set the Content-Type 
        trest.request.type(type.toLowerCase());
        helperInfo.logDebugFormat("Content Pattern used as body:\n{0}\n", [trest.requestContent]);
        trest.request.send(trest.requestContent);
    });


}

module.exports = commonapi;