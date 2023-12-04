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
const respond_1 = __importDefault(require("./respond"));
const user_service_1 = __importDefault(require("../services/user.service"));
class ValidateToken {
    static checkBlaclistedTokens(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization;
                if (!accessToken) {
                    return (0, respond_1.default)(res, 400, 'Access token is required');
                }
                const checkTokenExistence = yield user_service_1.default.findInvalidToken(accessToken);
                if (checkTokenExistence) {
                    return (0, respond_1.default)(res, 200, 'Access Token is invalid');
                }
                next();
            }
            catch (err) {
                return (0, respond_1.default)(res, 500, 'Error validating token');
            }
        });
    }
}
exports.default = ValidateToken;
