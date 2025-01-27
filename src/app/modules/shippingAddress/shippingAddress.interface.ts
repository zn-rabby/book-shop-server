import { Types } from 'mongoose';

export type TShippingAddress = {
  userId?: Types.ObjectId;
  name: 'home' | 'office' | 'hotel';
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  isDeleted?: boolean;
};
