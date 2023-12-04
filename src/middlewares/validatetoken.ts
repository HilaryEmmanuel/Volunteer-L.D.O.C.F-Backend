import { Request, Response, NextFunction } from 'express'
import respond from './respond'
import UserService from '../services/user.service'

class ValidateToken {
    public static async checkBlaclistedTokens(req: Request, res: Response, next: NextFunction){
        try{
            const accessToken = req.headers.authorization
            if(!accessToken){
                return respond(res, 400, 'Access token is required')
            }
            const checkTokenExistence = await UserService.findInvalidToken(accessToken)
            if(checkTokenExistence){
                return respond(res, 200, 'Access Token is invalid')
            }
            next()
        }catch(err){
            return respond(res, 500, 'Error validating token')
        }
    }
}

export default ValidateToken