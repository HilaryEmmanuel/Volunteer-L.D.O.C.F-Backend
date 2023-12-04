"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const respond_1 = __importDefault(require("./middlewares/respond"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const options = {
    origin: '*',
    methods: ['POST', 'PATCH', 'PUT', 'GET', 'DELETE'],
    allowheader: ['Content-Type', 'Authorization']
};
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, //15 minutes
    limit: 100, //100 request per window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Too many request, please try again later.'
});
app.use(limiter);
app.use((0, cors_1.default)(options));
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    (0, respond_1.default)(res, 200, 'Express API is running...');
});
app.use('/api', auth_routes_1.default, payment_routes_1.default, user_routes_1.default);
app.get('*', (req, res) => {
    (0, respond_1.default)(res, 400, 'Endpoint does not exist');
});
exports.default = app;
