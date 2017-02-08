'use strict'

var helperString = require('./string');

module.exports = function Info() {

    return {
        logInfo: function (text) {
            console.log(helperString.formatString('[{0}] - [INFO] - {1}', [new Date().toLocaleString(), text]));
        },
        logError: function (text) {
            console.log(helperString.formatString('[{0}] - [ERROR] - {1}', [new Date().toLocaleString(), text]));
        },
    }

}();