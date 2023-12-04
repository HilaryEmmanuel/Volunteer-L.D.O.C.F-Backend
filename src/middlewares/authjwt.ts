import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { Request, Response, NextFunction } from 'express'
import respond from './respond'

declare module 'express' {
    interface Request {
        id?: number
    }
}
class AuthJwt {
    public static catchError(err: Error, res: Response) {
        if (err instanceof jwt.TokenExpiredError) {
            return respond(res, 401, 'Unauthorized access token expired')
        }
        return respond(res, 401, 'Unauthorized')
    }

    public static verifyJwt(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            return respond(res, 401, 'Access token is required')
        }
        jwt.verify(accessToken, `${process.env.JWT_SECRET}`, (err, decode) => {
            if (err) {
                this.catchError(err, res)
            }
            if (decode && typeof decode === 'object' && 'id' in decode && typeof decode.id === 'number') {
                req.id = decode.id
            }
            next()

        })
    }
}

export default AuthJwt
