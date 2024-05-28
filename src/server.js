import express from 'express';

import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));

const errorHandler = (err, req, res) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
};

export const setupServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());

  app.use(express.json());
  app.use(router);
  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
