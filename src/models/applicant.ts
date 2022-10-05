import sequelize from "../db/db_config";
import Sequelize, { DataTypes } from "sequelize";
import Address  from "./address";

const Applicant = sequelize.define('applicants', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    degree: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categories: {
        type: Sequelize.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    languages: {
        type: Sequelize.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});

Address.belongsTo(Applicant, {
    constraints: true,
    onDelete: 'CASCADE'
});
Applicant.hasMany(Address, {
    foreignKey: 'applicantId'
});

export default Applicant;