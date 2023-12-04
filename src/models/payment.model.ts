import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";

interface PaymentAttributes {
    id?: number,
    amount: number,
    created?: Date,
    updatedAt?: Date
}

class Payment extends Model<PaymentAttributes> implements PaymentAttributes {
    id!: number
    amount!: number
    created?: Date | undefined
    updatedAt?: Date | undefined
    
}

Payment.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    }
}, {
    sequelize,
    modelName: 'payment',
    createdAt: true,
    updatedAt: true
})

User.hasMany(Payment, { onDelete: 'CASCADE'})
Payment.belongsTo(User, { onDelete: 'CASCADE'})

export default Payment