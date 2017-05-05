var soap = require("soap");
var $q = require('q');
var helperInfo = require('../helper/info');
var jsonparser = require('../parser/jsonparser');

var soapclient = {

    wsdlPath: null,

    jsonToSend: null,

    jsonResponse: null,

    client: null,

    startClient: function (wsdlPath) {
        var _this = this;
        var deferred = $q.defer();
        soap.createClient(wsdlPath, function (err, client) {
            _this.client = client;
            _this.wsdlPath = wsdlPath;
            deferred.resolve();
        });
        return deferred.promise;
    },

    getAllMethods: function () {
        var _this = this;
        var deferred = $q.defer();
        var methods = Reflect.ownKeys(_this.client).filter(function (p) {
            return typeof _this.client[p] === 'function';
        });
        deferred.resolve(methods);
        return deferred.promise;
    },

    getMethodByName: function (object, method) {
        for (var item in object) {
            if (typeof object[item] === 'function') {
                if (item === method) {
                    return object[item];
                }
            }
        }
    },

    executeMethod: function (methodName) {
        var _this = this;
        var deferred = $q.defer();
        var methodToExec = _this.getMethodByName(this.client, methodName);
        methodToExec(_this.jsonToSend, function (err, result) {
            _this.jsonResponse = result;
            helperInfo.logDebug('SOAP JSON Response:' + JSON.stringify(result));
            deferred.resolve();
        });
        return deferred.promise;
    },

    describeMethod: function (methodName, type) {
        var _this = this;
        var deferred = $q.defer();

        jsonparser.init(_this.client.describe());
        var methodToFind = '$..' + methodName;
        var myObj = jsonparser.getValue(methodToFind)[0];
        var result = type.toLowerCase() === 'input' ? myObj.input : myObj.output;
        deferred.resolve(result);
        
        return deferred.promise;
    }
}

module.exports = soapclient;