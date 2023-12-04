"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
const payment_controller_1 = __importDefault(require("../controller/payment/payment.controller"));
const validatetoken_1 = __importDefault(require("../middlewares/validatetoken"));
const router = express_1.default.Router();
router.post('/payments', validatetoken_1.default.checkBlaclistedTokens, authjwt_1.default.verifyJwt, payment_controller_1.default.makePayment);
router.get('/payments/list-payment');
exports.default = router;
