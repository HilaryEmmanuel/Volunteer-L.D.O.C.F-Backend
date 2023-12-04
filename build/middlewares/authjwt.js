"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const respond_1 = __importDefault(require("./respond"));
class AuthJwt {
    static catchError(err, res) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return (0, respond_1.default)(res, 401, 'Unauthorized access token expired');
        }
        return (0, respond_1.default)(res, 401, 'Unauthorized');
    }
    static verifyJwt(req, res, next) {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return (0, respond_1.default)(res, 401, 'Access token is required');
        }
        jsonwebtoken_1.default.verify(accessToken, `${process.env.JWT_SECRET}`, (err, decode) => {
            if (err) {
                this.catchError(err, res);
            }
            if (decode && typeof decode === 'object' && 'id' in decode && typeof decode.id === 'number') {
                req.id = decode.id;
            }
            next();
        });
    }
}
exports.default = AuthJwt;
