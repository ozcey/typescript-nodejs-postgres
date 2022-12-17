import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    logging: false
});

export default sequelize;