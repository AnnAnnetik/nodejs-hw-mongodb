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

const router = Router();

const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.use('/contacts/:contactId', validateMongoId('contactId'));

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post(
  '/contacts',
  ctrlWrapper(createContactController),
  validateBody(createContactSchema),
);
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.patch(
  '/contacts/:contactId',
  ctrlWrapper(updateContactController),
  validateBody(updateContactSchema),
);

export default router;
