
const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) =>
            `[${timestamp}] ${level.toUpperCase()}: ${message}`
        )
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.Console()
    ]
});

try {
    throw new Error("Test Error with Winston");
} catch (error) {
    logger.error(`Error in deletepool: ${error.message}`);
    console.error("Error logged with Winston.");
}
