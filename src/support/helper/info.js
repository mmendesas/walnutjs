'use strict'

var helperString = require('./string');
var config = require('../config');

var info = {

    elapsedName: null,

    logInfo: function (text) {
        console.log(helperString.formatString('[{0}] - [INFO] - {1}', [new Date().toLocaleString(), text]));
    },

    logDebug: function (text) {
        if (config.enableDebug) {
            console.log(helperString.formatString('[{0}] - [DEBUG] - {1}', [new Date().toLocaleString(), text]));
        }
    },

    logError: function (text) {
        console.log(helperString.formatString('[{0}] - [ERROR] - {1}', [new Date().toLocaleString(), text]));
    },

    logTimeElapsed: function (text) {
        if (config.enableDebug) {
            if (text === this.elapsedName) {
                console.timeEnd(text);
                this.elapsedName = '';
            } else {
                console.time(text);
                this.elapsedName = text;
            }
        }
    }
}

module.exports = info;