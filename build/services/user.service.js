"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const invalidtoken_model_1 = __importDefault(require("../models/invalidtoken.model"));
dotenv_1.default.config();
class UserService {
    static createUser(fullname, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.create({ fullname: fullname, email: email, password: bcrypt_1.default.hashSync(password, 8) });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static generateRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = new Date();
                date.setSeconds(date.getSeconds() + 86400);
                yield user_model_1.default.update({ refreshtoken: (0, uuid_1.v4)(), expiryDate: new Date(date.getTime()) }, { where: { id: userId } });
                const updatedUser = yield user_model_1.default.findByPk(userId);
                return updatedUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ where: { email: email } });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findByPk(id);
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static generateAccesToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = jsonwebtoken_1.default.sign({ id: id }, `${process.env.JWT_SECRET}`, { expiresIn: '24h', algorithm: 'HS256' });
                return accessToken;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static createInvalidToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invalidtoken = yield invalidtoken_model_1.default.create({ jwt_token: accessToken });
                return invalidtoken;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findInvalidToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield invalidtoken_model_1.default.findOne({ where: { jwt_token: accessToken } });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static findRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ where: { refreshtoken: token } });
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static verifyToken(refreshtoken) {
        if (refreshtoken && refreshtoken.expiryDate) {
            return refreshtoken.expiryDate.getTime() < new Date().getTime();
        }
        return true;
    }
    static updateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshtoken = yield user_model_1.default.update({ refreshtoken: null }, { where: { refreshtoken: token } });
                return refreshtoken;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = UserService;
