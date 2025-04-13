import { model, Schema } from 'mongoose';
import { IContact } from './contact.interface';

const contactSchema = new Schema<IContact>(
  {
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      trim: true,
      lowercase: true, // Converts email to lowercase before saving
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide your message'],
      minLength: [1, 'Message must be at least 10 characters long'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  },
);

const Contact = model<IContact>('Contact', contactSchema);

export default Contact;
