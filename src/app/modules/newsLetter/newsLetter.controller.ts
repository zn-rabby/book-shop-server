import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { newsLetterService } from './newsLetter.service';

const createNewsLetter = catchAsync(async (req, res) => {
  const newsLetterPayload = req.body;
  const createdNewsLetter =
    await newsLetterService.createNewsLetter(newsLetterPayload);
  sendResponse(res, {
    success: true,
    message: 'NewsLetter is created successfully',
    statusCode: 201,
    data: createdNewsLetter,
  });
});

const getAllNewsLetters = catchAsync(async (req, res) => {
  const newsLetters = await newsLetterService.getAllNewsLetters();
  sendResponse(res, {
    success: true,
    message: 'NewsLetters are retrieved successfully',
    statusCode: 200,
    data: newsLetters,
  });
});

const deleteNewsLetter = catchAsync(async (req, res) => {
  const id = req.params.id;
  await newsLetterService.deleteNewsLetters(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'NewsLetter deleted successfully',
    data: {},
  });
});

export const newsLetterController = {
  createNewsLetter,
  getAllNewsLetters,
  deleteNewsLetter,
};
