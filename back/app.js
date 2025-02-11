import dotenv from 'dotenv';
import express from 'express';
import cors from'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import winston from 'winston';

import { connectDB } from './config/db.js';
import { verifyToken, refreshToken } from './middlewares/tokenManagement.js';
import userRoutes from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js';
import sessionRoute from './routes/sessionRoutes.js';
import sleepRoute from './routes/sleepRoutes.js';

const logger = winston.createLogger({
  level: process.env.ENVIRONMENT === 'PROD'? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Logs to console
    new winston.transports.File({ filename: 'app.log' }) // Logs to file
  ]
})

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CORS_ALLOWED],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
    key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
    cert: fs.readFileSync(process.env.PUBLIC_CERTIFICATE_PATH)
  })
);
app.use( process.env.LOGIN_ROUTE, loginRoute );
app.use( process.env.USER_ROUTE, refreshToken, verifyToken, userRoutes );
app.use( process.env.SESSION_ROUTE, refreshToken, verifyToken, sessionRoute );
app.use( process.env.SLEEP_ROUTE, refreshToken, verifyToken, sleepRoute );

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { logger.info(`Server running on port ${PORT}`); });
