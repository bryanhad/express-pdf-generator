import winston from "winston"
import expressWinston from "express-winston"
import { format, transports } from "winston"
import logger from "../lib/logger"
import "winston-daily-rotate-file"

const expressLogger = expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
})

const errorLoggerFormat = format.printf(({ level, meta, timestamp }) => {
    return `${timestamp} [${level}] | EXPRESS-LOGGER | ${meta.message}`
})
const errorLogger = expressWinston.errorLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: "YYYY-MM-DD | hh:mm:ss.SSS A",
                }),
                format.align(),
                errorLoggerFormat
            ),
        }),
        new winston.transports.DailyRotateFile({
            filename: `logs/internal-error/%DATE%.log`,
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD | hh:mm:ss.SSS A",
                }),
                errorLoggerFormat
            ),
        }),
    ],
})

export { expressLogger, errorLogger }
