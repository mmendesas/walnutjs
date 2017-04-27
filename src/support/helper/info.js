'use strict'

var helperString = require('./string');
var config = require('../config');

var info = {

    elapsedName: null,

    /**
     * Log simple information
     */
    logInfo: function (text) {
        console.log(helperString.formatString('[{0}] - [INFO] - {1}', [new Date().toLocaleString(), text]));
    },

    logInfoFormat: function (text, args) {
        var msg = helperString.formatString(text, args);
        this.logInfo(msg);
    },

    /**
     * Log simple information with DEBUG flag
     */
    logDebug: function (text) {
        if (config.enableDebug) {
            console.log(helperString.formatString('[{0}] - [DEBUG] - {1}', [new Date().toLocaleString(), text]));
        }
    },

    logDebugFormat: function (text, args) {
        var msg = helperString.formatString(text, args);
        this.logDebug(msg);
    },

    /**
     * Log simple information with ERROR flag
     */
    logError: function (text) {
        console.log(helperString.formatString('[{0}] - [ERROR] - {1}', [new Date().toLocaleString(), text]));
    },

    /**
     * Log time elapsed if enableDebug propertie is enabled
     */
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