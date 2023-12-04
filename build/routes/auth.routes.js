"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = __importDefault(require("../controller/auth/auth.controller"));
const verifysignup_1 = __importDefault(require("../middlewares/verifysignup"));
router.post('/signup', verifysignup_1.default.verify, auth_controller_1.default.signup);
router.post('/auth/login', auth_controller_1.default.login);
router.post('/auth/logout', auth_controller_1.default.logout);
router.post('/refresh-token', auth_controller_1.default.refreshAndVerifyToken);
exports.default = router;
