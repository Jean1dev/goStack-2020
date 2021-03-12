//@ts-nocheck
import { Request, Response, NextFunction } from "express";
import config from '@config/auth'
import { verify } from "jsonwebtoken";
import AppError from "../../../errors/AppError";

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

export
    default
    function
    ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {

        const auth = request.headers.authorization

        if (!auth) {
            throw new AppError('Nao autorizado', 403)
        }

        const [,token] = auth?.split(' ')
        try {
            const decoded = verify(token, config.SECRET_KEY)
            const { sub } = decoded as TokenPayload

            request.user = {
                id: sub
            }

            return next()
        } catch (error) {
            throw new AppError('JWT invalido')
        }
}