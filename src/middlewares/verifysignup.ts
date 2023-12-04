import { Request, Response, NextFunction } from 'express'
import respond from './respond'
import UserService from '../services/user.service'

class VerifySignUp {
    public static async verify(req: Request, res: Response, next: NextFunction){
        try{
            const { email } = req.body
            const findEmail = await UserService.findEmail(email)
            if(findEmail){
                return respond(res, 400, 'Email already in use')
            }
            next()
        }catch(err){
            throw err
        }
    }
}

export default VerifySignUp