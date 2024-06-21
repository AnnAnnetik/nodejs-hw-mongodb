import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateMongoId } from '../middleware/validateMongoId.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.use('/:contactId', validateMongoId('contactId'));

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

export default contactsRouter;
