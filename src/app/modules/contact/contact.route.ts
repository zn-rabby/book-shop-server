import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { ContactValidation } from './contact.validation';
import { contactController } from './contact.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const ContactRouters = Router();

ContactRouters.post(
  '/',
  validateRequest(ContactValidation.createContactValidationSchema),
  contactController.createContact,
);

ContactRouters.get('/', contactController.getAllContacts);

ContactRouters.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  contactController.deleteContact,
);

export default ContactRouters;
