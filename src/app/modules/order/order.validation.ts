import { z } from 'zod';

const ShippingAddressValidationSchema = z.object({
  userId: z.string().optional(),
  name: z.enum(['home', 'office', 'hotel']),
  phone: z.string().min(1),
  address: z.string().min(1),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  isDeleted: z.boolean().default(false).optional(),
});

const createOrderValidationSchema = z.object({
  userId: z.string().optional(),
  product: z.string().nonempty('Product is required').optional(),
  quantity: z
    .number()
    .min(1, 'Quantity must be at least 1')
    .nonnegative('Quantity cannot be negative')
    .optional(),
  totalAmount: z.number().optional(),
  paymentMethod: z
    .enum(['sslCommerz', 'cashOnDelivery'])
    .refine((value) => value, {
      message: 'Payment method is required',
    })
    .optional(),
  paymentStatus: z
    .enum(['pending', 'complete', 'failed', 'canceled'])
    .default('pending'),
  shippingAddress: ShippingAddressValidationSchema.optional(),
  status: z.enum(['pending', 'shipping', 'delivered']).default('pending'),
  orderDate: z.date().default(() => new Date()),
  transactionId: z.string().optional(),
});

const updateOrderValidationSchema = z.object({
  userId: z.string().optional(),
  product: z.string().optional(),
  quantity: z
    .number()
    .min(1, 'Quantity must be at least 1')
    .nonnegative('Quantity cannot be negative')
    .optional(),
  totalAmount: z.number().optional(),
  paymentMethod: z
    .enum(['sslCommerz', 'cashOnDelivery'])
    .refine((value) => value, {
      message: 'Payment method is required',
    })
    .optional(),
  paymentStatus: z
    .enum(['pending', 'complete', 'failed', 'canceled'])
    .default('pending')
    .optional(),
  shippingAddress: ShippingAddressValidationSchema.optional(),
  status: z
    .enum(['pending', 'shipping', 'delivered'])
    .default('pending')
    .optional(),
  orderDate: z
    .date()
    .default(() => new Date())
    .optional(),
  transactionId: z.string().optional(),
});

export const OrderValidation = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
