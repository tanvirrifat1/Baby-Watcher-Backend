import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ConnectionService } from './connection.service';

const createConnection = catchAsync(async (req, res) => {
  const babySitterId = req.user.id as string;

  const value: any = {
    ...req.body,
    babySitterId,
  };

  const result = await ConnectionService.createConnection(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Connection created successfully',
    data: result,
  });
});

const getMyConnections = catchAsync(async (req, res) => {
  const parentId = req.user.id as string;

  const result = await ConnectionService.getMyConnections(parentId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Connection retrived successfully',
    data: result,
  });
});

const deleteConnection = catchAsync(async (req, res) => {
  const result = await ConnectionService.deleteConnection(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Connection deleted successfully',
    data: result,
  });
});

const getBabySitterConnections = catchAsync(async (req, res) => {
  const babySitterId = req.user.id as string;

  const result = await ConnectionService.getBabySitterConnections(babySitterId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Connection retrived successfully',
    data: result,
  });
});

export const ConnectionController = {
  createConnection,
  getMyConnections,
  deleteConnection,
  getBabySitterConnections,
};
