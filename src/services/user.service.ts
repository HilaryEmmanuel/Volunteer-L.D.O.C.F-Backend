import User from "../models/user.model"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import dotenv from 'dotenv'
import InvalidToken from "../models/invalidtoken.model"
dotenv.config()

class UserService {

    public static async createUser(fullname: string, email: string, password: string) {
        try {
            const user = await User.create({ fullname: fullname, email: email, password: bcrypt.hashSync(password, 8) })
            return user
        } catch (err) {
            throw err
        }
    }

    public static async generateRefreshToken(userId: number) {
        try {
            const date = new Date()
            date.setSeconds(date.getSeconds() + 86400)
            await User.update({ refreshtoken: uuid(), expiryDate: new Date(date.getTime()) }, { where: { id: userId } })
            const updatedUser = await User.findByPk(userId)
            return updatedUser
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

    public static async findUser(id: number) {
        try {
            const user = await User.findByPk(id)
            return user
        } catch (err) {
            throw err
        }
    }

    public static async generateAccesToken(id: number) {
        try {
            const accessToken = jwt.sign({ id: id }, `${process.env.JWT_SECRET}`, { expiresIn: '24h', algorithm: 'HS256' })
            return accessToken
        } catch (err) {
            throw err
        }
    }

    public static async createInvalidToken(accessToken: string) {
        try {
            const invalidtoken = await InvalidToken.create({ jwt_token: accessToken })
            return invalidtoken
        } catch (err) {
            throw err
        }


    }

    public static async findInvalidToken(accessToken: string) {
        try {
            const user = await InvalidToken.findOne({ where: { jwt_token: accessToken } })
            return user
        } catch (err) {
            throw err
        }
    }

    public static async findRefreshToken(token: string) {
        try {
            const user = await User.findOne({ where: { refreshtoken: token } })
            return user
        } catch (err) {
            throw err
        }
    }

    public static verifyToken(refreshtoken: User) {
        if (refreshtoken && refreshtoken.expiryDate) {
            return refreshtoken.expiryDate.getTime() < new Date().getTime()
        }
        return true
    }

    public static async updateToken(token: string) {
        try {
            const refreshtoken = await User.update({ refreshtoken: null }, { where: { refreshtoken: token } })
            return refreshtoken
        } catch (err) {
            throw err
        }
    }



}

export default UserService