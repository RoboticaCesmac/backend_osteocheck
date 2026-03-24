import express from 'express';
import cors from 'cors';
import 'reflect-metadata'
import router from './routes';
import { AppDataSource } from './database/dbConnection';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
AppDataSource.initialize();

app.use(express.json());
app.use(cors())
app.use('/api', router)

export default app;