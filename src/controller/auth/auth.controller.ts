import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserService from '../../services/user.service'
import respond from '../../middlewares/respond'
class AuthController {
    public static async signup(req: Request, res: Response) {
        try {
            const { fullname, email, password } = req.body
            const user = await UserService.createUser(fullname, email, password)
            if (!user) {
                return respond(res, 400, 'User signup not successfull')
            }
            return respond(res, 201, 'User signup successfull', { user })
        } catch (err) {
            console.log(err)
            return respond(res, 500, 'Internal server error')

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
            const updatedUser = await UserService.generateRefreshToken(findEmail.id)
            const accessToken = await UserService.generateAccesToken(findEmail.id)
            return respond(res, 200, 'Login successfull', { user: updatedUser, accessToken: accessToken, tokenType: 'Bearer' })
        } catch (err) {
            return respond(res, 500, 'Internal server error')
        }
    }

    public static async refreshAndVerifyToken(req: Request, res: Response) {
        try {
            const { refreshtoken } = req.body
            const findToken = await UserService.findRefreshToken(refreshtoken)
            if (!findToken) {
                return respond(res, 400, 'Refresh token does not exist')
            }
            if (UserService.verifyToken(refreshtoken)) {
                await UserService.updateToken(refreshtoken)
                return respond(res, 400, 'Refresh token has expired please make a new sign in request')
            }
            const accessToken = await UserService.generateAccesToken(findToken.id)
            return respond(res, 200, 'New access token succesfully generated', { user: { accessToken: accessToken, refreshtoken: findToken.refreshtoken, tokenType: 'Bearer' } })

        } catch (err) {
            return respond(res, 500, 'Internal server error')
        }
    }

    public static async logout(req: Request, res: Response) {
        try {
            const accessToken = req.headers.authorization
            const { refreshtoken } = req.body
            const user = await UserService.updateToken(refreshtoken)
            const invalidate = await UserService.createInvalidToken(accessToken!)
            if (!user && !invalidate) {
                return respond(res, 400, 'Logout unsuccesfull')
            }
            return respond(res, 200, 'Logout successfull')
        } catch (err) {
            return respond(res, 500, 'Internal server error')
        }
    }
}

export default AuthController