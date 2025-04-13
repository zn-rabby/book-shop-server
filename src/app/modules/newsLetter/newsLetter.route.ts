import express from 'express';

import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { NewsLetterValidationSchema } from './newsLetter.validation';
import { newsLetterController } from './newsLetter.controller';

const NewsLetterRouters = express.Router();

NewsLetterRouters.post(
  '/',
  validateRequest(NewsLetterValidationSchema.createNewsLetterValidationSchema),
  newsLetterController.createNewsLetter,
);

NewsLetterRouters.get(
  '/',
  auth(USER_ROLE.admin),
  newsLetterController.getAllNewsLetters,
);

NewsLetterRouters.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  newsLetterController.deleteNewsLetter,
);

export const NewsLetterRoutes = NewsLetterRouters;
