import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import 'esm';

import { connectDB } from './config/db.js';
import globalErrorHandler from './controllers/errors.controller.js';
import routerApi from './routes/index.js';
import AppError from './helpers/appError.js';

dotenv.config();

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use(helmet({
    contentSecurityPolicy: false,
}));

// Routes
app.use('/api/v1', routerApi);

// Error handling middleware
app.all('*', (req, res, next) => {
    return next(
        new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
    )
});

// Handler global error
app.use('*', globalErrorHandler);

// Connect to MongoDB
connectDB();

// Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

export default app;