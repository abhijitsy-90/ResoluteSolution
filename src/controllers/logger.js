
const pino = require('pino');
const path = require('path');
const logDirectory = path.join(__dirname, '../logs');

const fs = require('fs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}
const logger = pino({
    level: 'error'
}, pino.destination(path.join(logDirectory, 'error.log')));

module.exports = logger;

