var helperCommon = require('../helper/common');
var helperInfo = require('../helper/info');
var unirest = require('unirest');

var trest = {

    request: null,

    requestContent: '',

    response: null,

    responseContent: '',

    sendRequest: function (callback) {
        var _this = this;
        _this.request.end(function (response) {
            _this.response = response;
            _this.responseContent = response.raw_body;
            callback();
        });
    },

    createRequest: function (method, path) {
        path = helperCommon.getTreatedValue(path);

        switch (method) {
            case "POST":
                this.request = unirest.post(path);
                break;

            case "GET":
                this.request = unirest.get(path);
                break;

            case "PUT":
                this.request = unirest.put(path);
                break;

            case "DELETE":
                this.request = unirest.delete(path);
                break;

            case "PATCH":
                this.request = unirest.patch(path);
                break;
        }

        helperInfo.logDebug("User creates the [{0}] request to [{1}] " + [method, path]);
    }

}

module.exports = trest;