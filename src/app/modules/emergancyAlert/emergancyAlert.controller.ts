import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EmergancyAlertService } from './emergancyAlert.service';

const createEmergancyAlertToDb = catchAsync(async (req, res) => {
  const babySitterId = req.user.id as string;

  const value = {
    ...req.body,
    babySitterId,
  };

  const result = await EmergancyAlertService.createEmergancyAlertToDb(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy alert send successfully',
    data: result,
  });
});

const getEmergencyAlerts = catchAsync(async (req, res) => {
  const result = await EmergancyAlertService.getEmergencyAlerts(
    req.user.id as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy alert retrived successfully',
    data: result,
  });
});

const deleteAlerts = catchAsync(async (req, res) => {
  const result = await EmergancyAlertService.deleteAltest(
    req.params.id as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Emergancy alert deleted successfully',
    data: result,
  });
});

export const EmergancyAlertController = {
  createEmergancyAlertToDb,
  getEmergencyAlerts,
  deleteAlerts,
};
