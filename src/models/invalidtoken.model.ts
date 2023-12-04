import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

interface InvalidtokenAttributes {
    id?: number,
    jwt_token:string,
    createdAt?: Date,
    updatedAt?: Date
}

class InvalidToken extends Model<InvalidtokenAttributes> implements InvalidtokenAttributes {
    id!: number
    jwt_token!: string
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}


InvalidToken.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    jwt_token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'invalidtoken',
    createdAt: true,
    updatedAt: true
})

export default InvalidToken