import sequelize from "../db/db_config";
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from "sequelize";
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare resetPasswordToken: string;
    declare resetPasswordExpire: Date;
    declare role: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpire: {
        type: DataTypes.DATE,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM,
        defaultValue: 'ROLE_USER',
        values: ['ROLE_USER', 'ROLE_ADMIN'],
        allowNull: false
    }
}, {
    tableName: 'users',
    sequelize
});


export default User;