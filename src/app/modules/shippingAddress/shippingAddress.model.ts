import mongoose, { Schema, Model } from 'mongoose';
import { TShippingAddress } from './shippingAddress.interface';

const ShippingAddressSchema: Schema = new Schema(
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
  { timestamps: true },
);

const ShippingAddress: Model<TShippingAddress> =
  mongoose.model<TShippingAddress>('ShippingAddress', ShippingAddressSchema);

export default ShippingAddress;
