import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SleepAlertService } from './sleepAlert.service';
import { USER_ROLES } from '../../../enums/user';

const sendToAlert = catchAsync(async (req, res) => {
  const babySitterId = req.user.id;
  const value = {
    ...req.body,
    babySitterId,
  };

  const result = await SleepAlertService.sendToAlert(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Sleep alert created successfully',
    data: result,
  });
});

const saveAlertToDB = catchAsync(async (req, res) => {
  const babySitterId = req.user.id;
  const value = {
    ...req.body,
    babySitterId,
  };
  const result = await SleepAlertService.saveAlertToDB(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Sleep alert created successfully',
    data: result,
  });
});

const getAlert = catchAsync(async (req, res) => {
  let babySitterId: string | undefined;
  let parentId: string | undefined;

  if (req.user.role === USER_ROLES.BABY_SITTER) {
    babySitterId = req.user.id;
  } else if (req.user.role === USER_ROLES.PARENT) {
    parentId = req.user.id;
  }

  const value = {
    babySitterId,
    parentId,
  };

  const result = await SleepAlertService.getAlert(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Sleep alert retrieved successfully',
    data: result,
  });
});

export const SleepAlertController = {
  saveAlertToDB,
  sendToAlert,
  getAlert,
};
