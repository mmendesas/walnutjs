var soap = require("soap");
var $q = require('q');
var helperInfo = require('../helper/info');
var jsonparser = require('../parser/jsonparser');

var soapclient = {

    wsdlPath: null,

    jsonToSend: null,

    jsonResponse: null,

    getAllMethods: function () {
        var deferred = $q.defer();
        soap.createClient(this.wsdlPath, function (err, client) {
            var methods = Reflect.ownKeys(client).filter(function (p) {
                return typeof client[p] === 'function';
            });
            deferred.resolve(methods);
        });
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

        soap.createClient(_this.wsdlPath, function (err, client) {
            var methodToExec = _this.getMethodByName(client, methodName);
            methodToExec(_this.jsonToSend, function (err, result) {
                _this.jsonResponse = result;
                helperInfo.logDebug('SOAP JSON Response:' + JSON.stringify(result));
                deferred.resolve();
            });
        });
        return deferred.promise;
    },

    describeMethod: function (methodName, type) {
        var _this = this;
        var deferred = $q.defer();

        soap.createClient(_this.wsdlPath, function (err, client) {
            jsonparser.init(client.describe());
            var methodToFind = '$..' + methodName;
            var myObj = jsonparser.getValue(methodToFind)[0];
            var result = type.toLowerCase() === 'input' ? myObj.input : myObj.output;            
            deferred.resolve(result);
        });
        return deferred.promise;
    }
}

module.exports = soapclient;

// soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
//     function (err, client) {
//         console.log('cliente soap criado');

//         var myMethod = this.getMethodByName(client, 'CalcPrazo');
//         myMethod({
//             'nCdServico': '40010',
//             'sCepOrigem': '04101300',
//             'sCepDestino': '6500600'
//         }, function (err, result) {
//             console.log(JSON.stringify(result));
//         });

//         // client.CalcPrazo(
//         //     {
//         //         'nCdServico': '40010',
//         //         'sCepOrigem': '04101300',
//         //         'sCepDestino': '6500600'
//         //     }, function (err, result) {
//         //         console.log(JSON.stringify(result));
//         //     })
//     }
// );