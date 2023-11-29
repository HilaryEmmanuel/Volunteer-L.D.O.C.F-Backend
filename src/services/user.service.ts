import User from "../models/user.model"
import bcrypt from 'bcrypt'
import { v4 as uuid} from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

class UserService {

    public static async createUser(fullname: string, email: string, password: string) {
        try {
            const date = new Date()
            date.setSeconds(date.getSeconds() + 86400)
            const user = await User.create({ fullname: fullname, email: email, password: bcrypt.hashSync(password, 8), refreshtoken: uuid(), expiryDate: new Date(date.getTime())})
            return user
        } catch (err) {
            throw err
        }
    }

    public static async findEmail(email: string) {
        try {
            const user = await User.findOne({ where: { email: email } })
            return user
        } catch (err) {
            throw err
        }
    }

    public static async findToken(refreshtoken: string) {
        try {
            const user = await User.findOne({ where: { refreshtoken: refreshtoken }})
            return user
        } catch (err) {
            throw err
        }
    }


}

export default UserService