import createHttpError from 'http-errors';

import { isValidObjectId } from 'mongoose';
import { getALLContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getALLContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createHttpError(400, 'Invalid id!'));
  }
  const contact = await getContactById(contactId);

  if (!contact) {
    return next(createHttpError(404, 'Not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
