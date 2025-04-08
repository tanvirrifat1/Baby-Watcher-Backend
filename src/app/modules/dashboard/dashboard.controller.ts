import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { DashboardService } from './dashboard.service';

const totalStatistics = catchAsync(async (req, res) => {
  const result = await DashboardService.totalStatistics();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Dashboard statistics retrived successfully',
    data: result,
  });
});

const getRecentTransactions = catchAsync(async (req, res) => {
  const result = await DashboardService.getRecentTransactions(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Recent transactions retrived successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await DashboardService.getAllUsers(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All users retrived successfully',
    data: result,
  });
});

export const DashboardController = {
  totalStatistics,
  getRecentTransactions,
  getAllUsers,
};
