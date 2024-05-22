import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getALLContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

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
  app.get('/contacts', async (req, res) => {
    const contacts = await getALLContacts();
    res.status(200).json(contacts);
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  });
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
    next();
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
