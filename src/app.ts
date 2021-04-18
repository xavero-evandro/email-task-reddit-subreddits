import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import cron from 'node-cron';
import cors from 'cors';
import routes from './routes';
import errorHandler from './errors/ErrorHandler';
import { sendEmail } from './services/email-sender.service';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

cron.schedule('0 8 * * *', async () => {
  const result = await sendEmail();
  console.log('Email Task Done');
  return result;
});

export default app;
