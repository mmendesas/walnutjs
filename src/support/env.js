/**
 * configure the timeout of cucumber (default is 5 seconds)
 */

var configure = function () {
    this.setDefaultTimeout(60 * 1000);
}

module.exports = configure;