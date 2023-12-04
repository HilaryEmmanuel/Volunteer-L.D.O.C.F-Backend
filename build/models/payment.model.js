"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const user_model_1 = __importDefault(require("./user.model"));
class Payment extends sequelize_1.Model {
}
Payment.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    }
}, {
    sequelize: database_1.default,
    modelName: 'payment',
    createdAt: true,
    updatedAt: true
});
user_model_1.default.hasMany(Payment, { onDelete: 'CASCADE' });
Payment.belongsTo(user_model_1.default, { onDelete: 'CASCADE' });
exports.default = Payment;
