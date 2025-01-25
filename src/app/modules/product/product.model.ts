import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.interface';
// Define the Mongoose schema for TProduct
const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    publisher: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    language: { type: String, required: true },
    pages: { type: Number, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    discount: { type: Number, default: 0 },
    stockStatus: {
      type: String,
      enum: ['inStock', 'outOfStock'],
      required: true,
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);

// Create and export the model
const Product = mongoose.model<TProduct>('Product', ProductSchema);

export default Product;
