import sequelize from "../db/db_config";
import Sequelize from "sequelize";

const Address = sequelize.define('addresses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip_code: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Address;