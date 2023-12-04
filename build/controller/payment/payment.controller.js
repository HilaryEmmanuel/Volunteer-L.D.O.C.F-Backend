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
const respond_1 = __importDefault(require("../../middlewares/respond"));
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
const node_forge_1 = __importDefault(require("node-forge"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PaymentController {
    static makePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, amount, email, card_number, cvv, pin, expiry_month, expiry_year } = req.body;
                //This fuction encrypts the payload 
                function encrypt(encryptionKey, payload) {
                    const data = JSON.stringify(payload);
                    const cipher = node_forge_1.default.cipher.createCipher('3DES-ECB', node_forge_1.default.util.createBuffer(encryptionKey));
                    cipher.start({ iv: '' });
                    cipher.update(node_forge_1.default.util.createBuffer(data, 'utf8'));
                    cipher.finish();
                    const encrypted = cipher.output;
                    return node_forge_1.default.util.encode64(encrypted.getBytes());
                }
                const payload = {
                    "card_number": card_number,
                    "cvv": cvv,
                    "expiry_month": expiry_month,
                    "expiry_year": expiry_year,
                    "currency": "NGN",
                    "amount": amount,
                    "email": email,
                    "fullname": name,
                    "tx_ref": (0, uuid_1.v4)(),
                    "redirect_url": "https://example_company.com/success",
                    "enckey": process.env.FLW_ENCRYPTION_KEY,
                    "authorization": {
                        "mode": "pin",
                        "pin": pin
                    }
                };
                const encryptData = encrypt(process.env.FLW_ENCRYPTION_KEY, payload);
                const response = yield (0, axios_1.default)('https://api.flutterwave.com/v3/charges?type=card', {
                    headers: {
                        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`
                    },
                    method: 'post',
                    data: {
                        "client": encryptData
                    }
                });
                if (!response) {
                    return (0, respond_1.default)(res, 400, 'Flutterwave redirect not successfull');
                }
                return (0, respond_1.default)(res, 200, 'Flutterwave redirect successfull', response.data);
            }
            catch (err) {
                console.error(err);
                return (0, respond_1.default)(res, 500, 'Error processing payments');
            }
        });
    }
}
exports.default = PaymentController;
