import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BabySitterService } from './babySitter.service';

const getAllBabySitterUser = catchAsync(async (req, res) => {
  const result = await BabySitterService.getAllBabySitter(req.query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Baby Sitter retrieved successfully',
    data: result,
  });
});

export const BabySitterController = {
  getAllBabySitterUser,
};
