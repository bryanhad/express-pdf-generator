import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof z.ZodError) {
        res.status(400).json({
            message: "Bad Request",
            errors: err.errors
        })
    } 
    res.status(500).json({
        message: 'Internal server error',
    })
}
