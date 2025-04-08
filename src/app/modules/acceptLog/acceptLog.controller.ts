import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcceptLogService } from './acceptLog.service';

const logForBabySitter = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await AcceptLogService.logForBabySitter(userId, req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log retrieved successfully',
    data: result,
  });
});

const acceptLog = catchAsync(async (req, res) => {
  const result = await AcceptLogService.acceptLog(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log retrieved successfully',
    data: result,
  });
});

export const AcceptLogController = {
  logForBabySitter,
  acceptLog,
};
