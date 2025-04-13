import { z } from 'zod';

const createNewsLetterValidationSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
  }),
});

export const NewsLetterValidationSchema = {
  createNewsLetterValidationSchema,
};
