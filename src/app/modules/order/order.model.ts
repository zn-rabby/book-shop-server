import mongoose, { Schema } from 'mongoose';
import { TOrder, TShippingAddress } from './order.interface';

const ShippingAddressSchema = new Schema<TShippingAddress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, enum: ['home', 'office', 'hotel'], required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { _id: false },
);

const OrderSchema = new Schema<TOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number },
    paymentMethod: {
      type: String,
      enum: ['sslCommerz', 'cashOnDelivery'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'complete', 'failed', 'canceled'],
      default: 'pending',
    },
    shippingAddress: { type: ShippingAddressSchema },
    status: {
      type: String,
      enum: ['pending', 'shipping', 'delivered'],
      default: 'pending',
    },
    orderDate: { type: Date, default: Date.now },
    transactionId: { type: String },
  },
  { timestamps: true },
);

export const ShippingAddress = mongoose.model<TShippingAddress>(
  'ShippingAddress',
  ShippingAddressSchema,
);
export const Order = mongoose.model<TOrder>('Order', OrderSchema);
