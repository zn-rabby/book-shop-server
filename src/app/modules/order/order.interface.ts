import { Types } from 'mongoose';

export type TShippingAddress = {
  name: 'home' | 'office' | 'hotel';
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  isDeleted?: boolean;
};

export type TOrder = {
  userId?: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  totalAmount?: number;
  paymentMethod: 'sslCommerz' | 'cashOnDelivery';
  paymentStatus?: 'pending' | 'complete' | 'failed' | 'canceled';
  shippingAddress?: TShippingAddress;
  status: 'pending' | 'shipping' | 'delivered';
  orderDate?: Date;
  transactionId?: string;
};
