import { model, Schema } from 'mongoose';
import { INewsLetter } from './newsLetter.interface';

const newsLetterSchema = new Schema<INewsLetter>(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const NewsLetter = model<INewsLetter>('NewsLetter', newsLetterSchema);
