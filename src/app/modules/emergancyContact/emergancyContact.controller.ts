import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EmergancyContactService } from './emergancyContact.service';

const createEmergancyContactToDb = catchAsync(async (req, res) => {
  const userId = req.user.id as string;

  const value = {
    ...req.body,
    userId,
  };

  const result = await EmergancyContactService.createEmergancyContactToDb(
    value
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy contact created successfully',
    data: result,
  });
});

const getMyContactNumber = catchAsync(async (req, res) => {
  const userId = req.user.id as string;
  const result = await EmergancyContactService.getMyContactNumber(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy contact retrived successfully',
    data: result,
  });
});

const deleteMyContactNumber = catchAsync(async (req, res) => {
  const result = await EmergancyContactService.deleteMyContactNumber(
    req.params.id
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy contact deleted successfully',
    data: result,
  });
});

const getBabySitterContactNumber = catchAsync(async (req, res) => {
  const userId = req.user.id as string;

  const result = await EmergancyContactService.getContactNumberBabySitter(
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy contact with babysitter successfully',
    data: result,
  });
});

const updateContactNumber = catchAsync(async (req, res) => {
  const result = await EmergancyContactService.updateContactNumber(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy contact updated successfully',
    data: result,
  });
});

export const EmergancyContactController = {
  createEmergancyContactToDb,
  getMyContactNumber,
  deleteMyContactNumber,
  getBabySitterContactNumber,
  updateContactNumber,
};
