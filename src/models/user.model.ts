import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize";

interface UserAttributes {
    id?: number,
    fullname: string,
    email: string,
    password: string,
    refreshtoken: string,
    expiryDate: Date,
    createdAt?: Date,
    updatedAt?: Date 
}

class User extends Model<UserAttributes> implements UserAttributes{
    id!:number
    fullname!: string
    email!: string
    password!: string
    refreshtoken!: string
    expiryDate!: Date
    createdAt!: Date
    updatedAt!: Date
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
        allowNull: false
    },

    password: {
        type: DataTypes.BLOB,
        allowNull: false
    },

    refreshtoken: {
        type: DataTypes.STRING,
        allowNull: false
    },

    expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'user',
    createdAt: true,
    updatedAt: true
})

export default User