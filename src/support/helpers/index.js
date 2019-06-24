const page = require('./page');
const common = require('./common');
const element = require('./element');
const string = require('./string');
const vars = require('./variables');
const params = require('./params');
const logger = require('./logger');
const file = require('./file')
const flatten = require('./flattenObject');

module.exports = {
  page,
  common,
  element,
  string,
  vars,
  params,
  logger,
  file,
  flatten
}
