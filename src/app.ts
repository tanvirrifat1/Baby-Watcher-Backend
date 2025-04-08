import cors from 'cors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './routes';
import { Morgan } from './shared/morgen';
import cron from 'node-cron';
import { LogService } from './app/modules/log/log.service';
import { SubscriptationService } from './app/modules/subscription/subscription.service';

const app = express();

// Middleware
app.use(Morgan.successHandler);
app.use(Morgan.errorHandler);
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads')); // File retrieval

// CRON Jobs
cron.schedule('* * * * *', async () => {
  await Promise.all([
    LogService.checkMissedLogs(),
    SubscriptationService.updateExpiredSubscriptions(),
  ]);
});

// Routes
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h1 style="text-align:center; color:#A55FEF; font-family:Verdana;">Hey, How can I assist you today?</h1>'
  );
});

// Global error handler & 404 handler
app.use(globalErrorHandler);
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [{ path: req.originalUrl, message: "API DOESN'T EXIST" }],
  });
});

export default app;
