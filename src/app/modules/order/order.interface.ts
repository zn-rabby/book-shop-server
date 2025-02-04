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

export type TPaymentResponse = {
  total_amount: number; // Total payment amount
  currency: string; // Payment currency (e.g., BDT, USD)
  tran_id: string; // Unique transaction ID
  success_url: string; // URL for successful payment
  fail_url: string; // URL for failed payment
  cancel_url: string; // URL for canceled payment
  shipping_method: string; // Shipping method (e.g., Courier)
  product_name: string; // Product name
  product_category: string; // Product category
  product_profile: string; // Product profile (e.g., general)
  cus_name: string; // Customer name
  cus_email: string; // Customer email
  cus_add1: string; // Customer address line 1
  cus_add2?: string; // Customer address line 2 (optional)
  cus_city: string; // Customer city
  cus_state?: string; // Customer state (optional)
  cus_postcode: string | number; // Customer postal code
  cus_country: string; // Customer country
  cus_phone: string; // Customer phone number
  cus_fax?: string; // Customer fax number (optional)
  ship_name: string; // Shipping recipient name
  ship_add1: string; // Shipping address line 1
  ship_add2?: string; // Shipping address line 2 (optional)
  ship_city: string; // Shipping city
  ship_state?: string; // Shipping state (optional)
  ship_postcode: string | number; // Shipping postal code
  ship_country: string; // Shipping country
};
