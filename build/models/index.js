"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_model_1 = __importDefault(require("./contact.model"));
const invalidtoken_model_1 = __importDefault(require("./invalidtoken.model"));
const payment_model_1 = __importDefault(require("./payment.model"));
const user_model_1 = __importDefault(require("./user.model"));
const syncModels = [user_model_1.default, payment_model_1.default, contact_model_1.default, invalidtoken_model_1.default];
exports.default = syncModels;
