const express = require("express");
const helmet = require("helmet");
const apiResponse = require("./utils/apiResponse")
// const cors = require("cors");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const asyncHandler = require("../src/utils/asyncHandler");
// const mongoSanitization = require("express-mongo-sanitize");
const app = express();

app.use(express.json());
// app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(cookieParser());
// app.use(mongoSanitization());

// ====================== 
const authRoutes = require("./modules/Routes/authRoutes") 
const authController = require("./modules/Controllers.js/authController")

// ==============================
app.get('/api/v1/health', (req, res) =>
    res.status(200).json(apiResponse(200, {
        service: 'ecom-backend', env: process.env.NODE_ENV,
        uptimeSeconds: Math.round(process.uptime()), timestamp: new Date().toISOString(),
    }, 'API	is	running')));

app.get('/api/v1/boom', asyncHandler(async () => {
    throw apiError(418, 'This	error	was	thrown	on	purpose	to	test	errorHandler');
})); 
// ===================================

app.use("/auth" , authRoutes); 
// app.use("/product" , productRoutes);

module.exports = app;



// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import rootRouter from './routes/index.js';
// import { errorHandler } from './middlewares/error.middleware.js';

// const app = express();

// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
// app.use(express.json({ limit: '16kb' }));
// app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// app.use(cookieParser());

// // API Gateway Router
// app.use('/api/v1', rootRouter);

// // Global Error Catch
// app.use(errorHandler);

// module.exports= app;