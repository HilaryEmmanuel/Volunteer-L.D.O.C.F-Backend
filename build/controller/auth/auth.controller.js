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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = __importDefault(require("../../services/user.service"));
const respond_1 = __importDefault(require("../../middlewares/respond"));
class AuthController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullname, email, password } = req.body;
                const user = yield user_service_1.default.createUser(fullname, email, password);
                if (!user) {
                    return (0, respond_1.default)(res, 400, 'User signup not successfull');
                }
                return (0, respond_1.default)(res, 201, 'User signup successfull', { user });
            }
            catch (err) {
                console.log(err);
                return (0, respond_1.default)(res, 500, 'Internal server error');
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const findEmail = yield user_service_1.default.findEmail(email);
                if (!findEmail) {
                    return (0, respond_1.default)(res, 400, 'Incorrect email');
                }
                const comparePassword = bcrypt_1.default.compareSync(password, findEmail.password.toString());
                if (!comparePassword) {
                    return (0, respond_1.default)(res, 400, 'Incorrect password');
                }
                const updatedUser = yield user_service_1.default.generateRefreshToken(findEmail.id);
                const accessToken = yield user_service_1.default.generateAccesToken(findEmail.id);
                return (0, respond_1.default)(res, 200, 'Login successfull', { user: updatedUser, accessToken: accessToken, tokenType: 'Bearer' });
            }
            catch (err) {
                return (0, respond_1.default)(res, 500, 'Internal server error');
            }
        });
    }
    static refreshAndVerifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshtoken } = req.body;
                const findToken = yield user_service_1.default.findRefreshToken(refreshtoken);
                if (!findToken) {
                    return (0, respond_1.default)(res, 400, 'Refresh token does not exist');
                }
                if (user_service_1.default.verifyToken(refreshtoken)) {
                    yield user_service_1.default.updateToken(refreshtoken);
                    return (0, respond_1.default)(res, 400, 'Refresh token has expired please make a new sign in request');
                }
                const accessToken = yield user_service_1.default.generateAccesToken(findToken.id);
                return (0, respond_1.default)(res, 200, 'New access token succesfully generated', { user: { accessToken: accessToken, refreshtoken: findToken.refreshtoken, tokenType: 'Bearer' } });
            }
            catch (err) {
                return (0, respond_1.default)(res, 500, 'Internal server error');
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization;
                const { refreshtoken } = req.body;
                const user = yield user_service_1.default.updateToken(refreshtoken);
                const invalidate = yield user_service_1.default.createInvalidToken(accessToken);
                if (!user && !invalidate) {
                    return (0, respond_1.default)(res, 400, 'Logout unsuccesfull');
                }
                return (0, respond_1.default)(res, 200, 'Logout successfull');
            }
            catch (err) {
                return (0, respond_1.default)(res, 500, 'Internal server error');
            }
        });
    }
}
exports.default = AuthController;
