import express, { Request, Response } from "express";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import sequelize from "./db/db_config";
import applicantRoute from './routes/applicant';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

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
app.use(helmet());

app.get('/health', (req: Request, res: Response) => {
    return res.json({ 'status': 'UP' });
});

app.use('/api/applicant', applicantRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

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