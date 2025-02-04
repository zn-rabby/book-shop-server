import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Product = mongoose.model<TProduct>('Product', ProductSchema);

export default Product;
