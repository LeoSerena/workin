import dotenv from 'dotenv';
import express from 'express';
import cors from'cors';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db.js';
import { verifyToken, refreshToken } from './middlewares/tokenManagement.js';
import userRoutes from './routes/userRoutes.js';
import loginRoute from './routes/loginRoute.js';
import sessionRoute from './routes/sessionRoutes.js';
import sleepRoute from './routes/sleepRoutes.js';
import measureRoute from './routes/measureRoute.js';

dotenv.config()
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.CORS_ALLOWED],
    methods: ['GET', 'POST', 'PUT']
  })
);
app.use( process.env.LOGIN_ROUTE, loginRoute );
app.use( process.env.USER_ROUTE, refreshToken, verifyToken, userRoutes );
app.use( process.env.SESSION_ROUTE, refreshToken, verifyToken, sessionRoute );
app.use( process.env.SLEEP_ROUTE, refreshToken, verifyToken, sleepRoute );

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
