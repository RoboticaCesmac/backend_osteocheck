import express from 'express';
import cors from 'cors';
import 'reflect-metadata'
import router from './routes';
import { AppDataSource } from './database/dbConnection';
import { IEmailService } from './commons/email/emailService.interface';
import { EmailService } from './commons/email/email.service';

export const emailService: IEmailService = new EmailService();
const app = express();
AppDataSource.initialize();

app.use(express.json());
app.use(cors())
app.use('/api', router)

export default app;