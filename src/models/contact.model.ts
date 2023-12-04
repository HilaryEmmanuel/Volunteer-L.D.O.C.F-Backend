import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ContactAttributes {
    id?: number,
    name: string,
    email: string,
    message: string,
    createdAt?: Date,
    updatedAt?: Date
}

class Contact extends Model<ContactAttributes> implements ContactAttributes {
    id!: number
    name!: string
    email!: string
    message!: string
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}


Contact.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'contact',
    createdAt: true,
    updatedAt: true
})

export default Contact