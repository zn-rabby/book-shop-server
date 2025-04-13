import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { contactService } from './contact.service';

const createContact = catchAsync(async (req, res) => {
  // const userEmail = req?.user?.email;

  const result = await contactService.createContact(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Contact created successfully',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await contactService.getAllContacts(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const id = req.params.id;
  await contactService.deleteContact(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact deleted successfully',
    data: {},
  });
});

export const contactController = {
  createContact,
  getAllContacts,
  deleteContact,
};
