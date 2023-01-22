import express, { Request, Response } from "express";
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import applicantRoute from './routes/applicant';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const app = express();

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

app.use('/career-center/api/applicant', applicantRoute);
app.use('/career-center/api/auth', authRoute);
app.use('/career-center/api/user', userRoute);

export default app;