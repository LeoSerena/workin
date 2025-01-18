require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CORS_ALLOWED],
    methods: ['GET', 'POST']
  })
);
app.use(process.env.USER_ROUTE, userRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
