import AppError from '../../errors/AppError';
import { INewsLetter } from './newsLetter.interface';
import { NewsLetter } from './newsLetter.model';

const createNewsLetter = async (payload: INewsLetter) => {
  const createdNewsLetter = await NewsLetter.create(payload);
  return createdNewsLetter;
};

const getAllNewsLetters = async () => {
  const newsLetters = await NewsLetter.find();
  if (newsLetters.length === 0) {
    throw new AppError(404, 'No newsLetter record were found in the database');
  }
  return newsLetters;
};

const deleteNewsLetters = async (id: string) => {
  // check blog is exists
  const newsLetter = await NewsLetter.findById(id);

  if (!newsLetter) {
    throw new AppError(404, 'newsLetter not found!');
  }

  const result = await NewsLetter.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const newsLetterService = {
  createNewsLetter,
  getAllNewsLetters,
  deleteNewsLetters,
};
