import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Title is required'),
    title: z.string().nonempty('Title is required'),
    category: z.string().nonempty('Category is required'),
    author: z.string().nonempty('Author is required'),
    description: z.string().nonempty('Description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    image: z.string().url('Image must be a valid URL'),

    rating: z.number().int().min(1).max(5, 'Rating must be between 0 and 5'),
    quantity: z.number().int().min(0, 'Quantity must be a positive number'),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty('Title is required').optional(),
    title: z.string().nonempty('Title is required').optional(),
    category: z.string().nonempty('Category is required').optional(),
    author: z.string().nonempty('Author is required').optional(),
    description: z.string().nonempty('Description is required').optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    image: z.string().url('Image must be a valid URL').optional(),

    rating: z
      .number()
      .int()
      .min(1)
      .max(5, 'Rating must be between 0 and 5')
      .optional(),
    quantity: z
      .number()
      .int()
      .min(0, 'Quantity must be a positive number')
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
