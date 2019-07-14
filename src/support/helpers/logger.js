/* eslint-disable no-undef */
/* eslint-disable no-shadow */
const winston = require('winston');

const {
  combine, timestamp, label, printf,
} = winston.format;

const myFormat = printf(({
  level, message, label, timestamp,
}) => `${timestamp} [ ${label} ] ${level}: ${message}`);

module.exports = winston.createLogger({
  level: global.config ? config.walnut.logLevel : 'info',
  format: combine(
    label({ label: 'walnut' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'walnut.log' }),
  ],
});
