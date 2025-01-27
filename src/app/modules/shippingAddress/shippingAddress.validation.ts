import { z } from 'zod';

// Zod validation schema for ShippingAddress
const shippingAddressSchema = z.object({
  body: z.object({
    userId: z.string().optional(), // Optional userId (string, assuming MongoDB ObjectId as string)
    name: z
      .enum(['home', 'office', 'hotel'])
      .refine((value) => ['home', 'office', 'hotel'].includes(value), {
        message: 'Invalid address type', // Custom error message
      }),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number must not exceed 15 characters'),
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
    city: z.string().min(2, 'City name must be at least 2 characters long'),
    country: z
      .string()
      .min(2, 'Country name must be at least 2 characters long'),
    isDeleted: z.boolean().default(false), // Optional field, defaults to false
  }),
});

// Export Zod schema for use in validation
export const ShippingAddressValidation = {
  shippingAddressSchema,
};
