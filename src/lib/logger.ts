import winston from "winston"
import { createLogger, format, transports, LogEntry } from "winston"
import "winston-daily-rotate-file"

export const consoleLoggerPrintFormat = format.printf(
    ({ level, message, timestamp }) => {
        return `${timestamp} [${level}] | ${message}`
    }
)

export const createFileRotateTransport = (
    level: string,
    filePath: string,
    filterFunc: winston.Logform.Format
) =>
    new winston.transports.DailyRotateFile({
        level,
        filename: `logs/${filePath}-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        maxFiles: "14d",
        format: format.combine(
            filterFunc,
            format.timestamp(),
            format.json(),
            format.prettyPrint()
        ),
    })

const errorFilter = format((info: LogEntry): LogEntry | boolean => {
    return info.level === "error" ? info : false
})

const warningFilter = format((info: LogEntry): LogEntry | boolean => {
    return info.level === "warn" ? info : false
})

let logger = createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "silly",
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: "YYYY-MM-DD | hh:mm:ss.SSS A",
                }),
                format.align(),
                consoleLoggerPrintFormat
            ),
        }),
        createFileRotateTransport(
            "warn",
            "warnings/400-response",
            warningFilter()
        ),
        createFileRotateTransport(
            "error",
            "errors/500-response",
            errorFilter()
        ),
    ],
})

export default logger
