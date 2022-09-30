import { Sequelize } from "sequelize";

const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_host = process.env.DB_HOST

const sequelize = new Sequelize(db_name!, db_user!, db_password, {
    dialect: 'postgres',
    host: db_host
});

export default sequelize;