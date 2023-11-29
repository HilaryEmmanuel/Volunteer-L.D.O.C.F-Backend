import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '../../services/user.service'
import respond from '../../middlewares/respond'
class Auth {
    public static async signUp(req: Request, res: Response) {
        try {
            const { fullname, email, password } = req.body
            const newUser = await UserService.createUser(fullname, email, password)
            if (!newUser) {
                return respond(res, 400, 'User signUp not successfull')
            }
            return respond(res, 201, 'User signUp successfull', {})
        } catch (err) {

        }
    }

    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const findEmail = await UserService.findEmail(email)
            if (!findEmail) {
                return respond(res, 400, 'Incorrect email')
            }
            const comparePassword = bcrypt.compareSync(password, findEmail.password.toString())
            if (!comparePassword) {
                return respond(res, 400, 'Incorrect password')
            }
            return respond(res, 200, 'Login successfull', {
                accessToken: '', refreshToken: findEmail.refreshtoken, tokenType: 'Bearer',
                expiresIn: '2h', "user": { id: findEmail.id, email: findEmail.email }
            })

        } catch (err) {
            throw err
        }
    }
}

export default Auth