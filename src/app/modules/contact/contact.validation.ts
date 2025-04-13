import { z } from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email('Please provide a valid email address!')
      .min(1, 'Email is required!'),
    name: z.string().min(2, 'Name must be at least 2 characters long!'),
    message: z.string().min(10, 'Message must be at least 10 characters long!'),
  }),
});

export const ContactValidation = {
  createContactValidationSchema,
};
