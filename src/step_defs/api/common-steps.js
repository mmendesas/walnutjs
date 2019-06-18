var trest = require('../../support/api/client');

const { logger } = helpers;

var commonapi = function () {
  /**
   * User prints the current body content (Req|Res)
   */
  this.Given(/^\(api\) user prints the current (REQUEST|RESPONSE) body content$/, function (type, callback) {
    const content = type === 'REQUEST' ? trest.requestContent : trest.response.raw_body;
    logger.info(`[${type}] content:\n${content}\n`);
  });

  /**
   * Define a value for request headers [Accept, Content-Type]
   */
  this.Given(/^\(api\) user will send and accept (XML|JSON|HTML)$/, function (type) {
    var accept = 'application/json';
    var contentType = 'application/json';

    switch (type) {
      case 'XML':
        accept = 'application/xml';
        contentType = 'application/xml';
        break;

      case 'HTML':
        accept = 'text/html';
        contentType = 'application/x-www-form-urlencoded';
        break;

      default:
        break;
    }
    trest.addHeader('Accept', accept);
    trest.addHeader('Content-Type', contentType);
  });
};

module.exports = commonapi;
