import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
    id?: number,
    fullname: string,
    email: string,
    password: string,
    refreshtoken?: string | null
    expiryDate?: Date
    createdAt?: Date,
    updatedAt?: Date 
}

class User extends Model<UserAttributes> implements UserAttributes{
    id!:number
    fullname!: string
    email!: string
    password!: string
    refreshtoken!: string | null
    expiryDate!: Date
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}

User.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    refreshtoken: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true
    },

    expiryDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'user',
    createdAt: true,
    updatedAt: true
})


export default User