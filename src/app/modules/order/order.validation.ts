import { z } from 'zod';

// Define Zod validation for Shipping Address
const ShippingAddressValidationSchema = z.object({
  userId: z.string().optional(), // Mongo ObjectId is a string type in JavaScript
  name: z.enum(['home', 'office', 'hotel']),
  phone: z.string().min(1),
  address: z.string().min(1),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  isDeleted: z.boolean().default(false).optional(),
});

// Define Zod validation for Order
const orderValidationSchema = z.object({
  userId: z.string().optional(), // Mongo ObjectId is a string type in JavaScript
  product: z.string().min(1), // Mongo ObjectId as string
  quantity: z.number().int().positive(),
  totalAmount: z.number().optional(),
  paymentMethod: z.enum(['sslCommerz', 'cashOnDelivery']),
  paymentStatus: z
    .enum(['pending', 'complete', 'failed', 'canceled'])
    .default('pending'),
  shippingAddress: ShippingAddressValidationSchema.optional(),
  status: z.enum(['pending', 'shipping', 'delivered']).default('pending'),
  orderDate: z.date().default(() => new Date()),
  transactionId: z.string().optional(),
});

export const OrderValidation = {
  orderValidationSchema,
};
