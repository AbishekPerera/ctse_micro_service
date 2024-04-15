import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'logs.log',
        }),
        new winston.transports.File({
            filename: 'error_logs.log',
            level: 'error',
        }),
        new winston.transports.Console(),
    ],
});

export default logger;
