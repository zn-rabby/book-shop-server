import { z } from 'zod';

// const productValidationSchem = z.object({
//   title: z.string().nonempty('Title is required'),
//   category: z.string().nonempty('Category is required'),
//   author: z.string().nonempty('Author is required'),
//   description: z.string().nonempty('Description is required'),
//   price: z.number().min(0, 'Price must be a positive number'),
//   image: z.string().url('Image must be a valid URL'),
//   publisher: z.string().nonempty('Publisher is required'),
//   publishedDate: z.date(),
//   language: z.string().nonempty('Language is required'),
//   pages: z.number().min(1, 'Pages must be at least 1'),
//   rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
//   quantity: z.number().min(0, 'Quantity must be a positive number'),
//   isDeleted: z.boolean().default(false),
//   stockStatus: z.enum(['inStock', 'outOfStock']),
//   discount: z.number().min(0).max(100).optional(),
// });
const productValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    category: z.string().nonempty('Category is required'),
    author: z.string().nonempty('Author is required'),
    description: z.string().nonempty('Description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    image: z.string().url('Image must be a valid URL'),
    publisher: z.string().nonempty('Publisher is required'),
    publishedDate: z
      .string()
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: 'Invalid date format',
      })
      .optional(),
    language: z.string().nonempty('Language is required'),
    pages: z.number().min(1, 'Pages must be at least 1'),
    rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
    quantity: z.number().min(0, 'Quantity must be a positive number'),
    isDeleted: z.boolean().default(false),
    stockStatus: z.enum(['inStock', 'outOfStock']),
    discount: z.number().min(0).max(100).optional(),
  }),
});

export const ProductValidation = {
  productValidationSchema,
};
