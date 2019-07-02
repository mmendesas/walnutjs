const winston = require('winston')
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [ ${label} ] ${level}: ${message}`;
});

module.exports = winston.createLogger({
  format: combine(
    label({ label: 'walnut' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'walnut.log' })
  ]
});
