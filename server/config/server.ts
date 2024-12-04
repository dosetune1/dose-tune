import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from '../middleware/errorHandler.js';

dotenv.config();

export const createServer = (): Express => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Error handling middleware should be last
  app.use(errorHandler);
  
  return app;
};