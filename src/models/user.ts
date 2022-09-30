import sequelize from "../db/db_config";
import Sequelize from "sequelize";

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    resetPasswordToken: {
        type: Sequelize.STRING
    },
    resetPasswordExpire: {
        type: Sequelize.DATE
    },
    role: {
        type: Sequelize.ENUM,
        defaultValue: 'ROLE_USER',
        values: ['ROLE_USER', 'ROLE_ADMIN'],
        allowNull: false
    }
});

export default User;