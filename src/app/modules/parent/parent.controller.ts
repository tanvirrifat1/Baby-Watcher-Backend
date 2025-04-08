import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ParentService } from './parent.service';

const getAllParentUser = catchAsync(async (req, res, next) => {
  const result = await ParentService.getAllUsers(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Parent users retrieved successfully',
    data: result,
  });
});

export const ParentController = {
  getAllParentUser,
};
