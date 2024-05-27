import express from 'express';
import { isValidObjectId } from 'mongoose';
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
    try {
      const contacts = await getALLContacts();
      res.status(200).json({
        status: '200',
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: '500',
        message: 'Something went wrong!',
        data: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: '404',
          message: 'Contact not found!',
        });
      }
      if (!isValidObjectId(contactId)) {
        return res.status(400).json({
          status: '400',
          message: 'Invalid id!',
        });
      }

      res.status(200).json({
        status: '200',
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: '500',
        message: 'Something went wrong!',
        data: error.message,
      });
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
