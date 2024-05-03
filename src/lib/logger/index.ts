import { createLogger, format, transports } from 'winston'
import { LogEntry } from 'winston'

export const consoleLoggerPrintFormat = format.printf(
    ({ level, message, timestamp }) => {
        return `${timestamp} [${level}] | ${message}`
    }
)

const errorFilter = format((info: LogEntry): LogEntry | boolean => {
    return info.level === 'error' ? info : false
})

const warningFilter = format((info: LogEntry): LogEntry | boolean => {
    return info.level === 'warn' ? info : false
})

let logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD | hh:mm:ss.SSS A',
                }),
                format.align(),
                consoleLoggerPrintFormat,
            ),
        }),
        new transports.File({
            level: 'warn',
            filename: 'logs/warning-400-response.log',
            format: format.combine(
                warningFilter(),
                format.timestamp(),
                format.json(),
                format.prettyPrint()
            ),
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/error-500-response.log',
            format: format.combine(
                errorFilter(),
                format.timestamp(),
                format.json(),
                format.prettyPrint()
            ),
        }),
    ],
})

export default logger
