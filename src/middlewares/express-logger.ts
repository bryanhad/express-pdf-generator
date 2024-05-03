import expressWinston from 'express-winston'
import { format, transports } from 'winston'
import logger from '../lib/logger'

const expressLogger = expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
})

const errorLoggerFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} [${level}] | EXPRESS-LOGGER | ${meta.message
        .split('\n')
        .slice(0, 3)
        .join('\n')}`
})
const errorLogger = expressWinston.errorLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD | hh:mm:ss.SSS A',
                }),
                format.align(),
                errorLoggerFormat
            ),
        }),
        new transports.File({
            filename: 'logs/internal-error.log',
            format: format.combine(
                format.timestamp({
                    format: 'YYYY-MM-DD | hh:mm:ss.SSS A',
                }),
                errorLoggerFormat
            ),
        }),
    ],
})

export { expressLogger, errorLogger }
