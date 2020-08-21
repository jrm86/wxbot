const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label } = format;

const console_format = format.printf(({level, message, label, timestamp})=>{
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    transports: [
        new transports.Console({
            format: combine(
                label({ label: "WXBOT" }),
                timestamp(),
                console_format
            )
        }),
        new transports.File({ 
            filename: '/home/pi/Dev/wxbot/wxbot.log',
            format: combine(
                label({ label: "WXBOT"}),
                timestamp(),
                format.json()
            )
        })
      ]
});

module.exports = {
    logger: logger
}