import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { LogService } from './log.service';

const createLog = catchAsync(async (req, res) => {
  const user = req.user.id;

  const value = {
    ...req.body,
    user,
  };

  const result = await LogService.createLog(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log created successfully',
    data: result,
  });
});

const checkMissedLogs = catchAsync(async (req, res) => {
  const result = await LogService.checkMissedLogs();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log updated successfully',
    data: result,
  });
});

const getMyLogs = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await LogService.getMyLogs(userId, req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log retrived successfully',
    data: result,
  });
});

const editLogs = catchAsync(async (req, res) => {
  const user = req.user.id;

  const value = {
    ...req.body,
    user,
  };

  const result = await LogService.editLog(req.params.id, value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log updated successfully',
    data: result,
  });
});

const deleteLog = catchAsync(async (req, res) => {
  const result = await LogService.deleteLog(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Log deleted successfully',
    data: result,
  });
});

export const LogController = {
  createLog,
  checkMissedLogs,
  getMyLogs,
  editLogs,
  deleteLog,
};
