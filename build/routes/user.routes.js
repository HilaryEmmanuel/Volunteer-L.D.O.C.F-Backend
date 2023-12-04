"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const contact_controller_1 = __importDefault(require("../controller/user/contact.controller"));
router.post('/contact-us', contact_controller_1.default.contactUs);
exports.default = router;
