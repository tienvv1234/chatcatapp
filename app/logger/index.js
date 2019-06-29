'use strict';
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, json } = format;
const level = process.env.LOG_LEVEL || 'debug';

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: level,
  format: combine(label({ label: 'Log' }), timestamp(), myFormat),
  transports: [
    new transports.File({
      filename: './chatCatDebug.log',
      handleExceptions: true
    })
  ],
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
