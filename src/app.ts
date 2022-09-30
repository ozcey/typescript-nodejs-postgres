import express, { Request, Response } from "express";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import sequelize from "./db/db_config";
import Applicant from "./models/applicant";
import Address from "./models/address";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(cors());

app.get('/health', (req: Request, res: Response) => {
    return res.json({ 'status': 'UP' });
});

Address.belongsTo(Applicant, {
    constraints: true,
    onDelete: 'CASCADE'
});
Applicant.hasMany(Address);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

