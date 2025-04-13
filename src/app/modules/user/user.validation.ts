import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),

    profilePicture: z.string().trim().optional(),
    city: z.string().trim().optional(),
    address: z.string().trim().optional(),
    postalCode: z.string().trim().optional(),
    country: z.string().trim().optional(),
    gender: z.enum(['male', 'female']).optional(),
    bio: z.string().trim().optional(),
    facebook: z.string().trim().optional(),
    website: z.string().trim().url('Invalid website URL').optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const UserValidation = {
  registerUserValidationSchema,
  loginValidationSchema,
};
