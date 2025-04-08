import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UniqueKeyService } from './UniqueKey.service';

const createUniqueKey = catchAsync(async (req, res) => {
  const userId = req.user.id as string;

  const value = {
    ...req.body,
    userId,
  };

  const result = await UniqueKeyService.createUniqueKey(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Unique key created successfully',
    data: result,
  });
});

const getUniqueKey = catchAsync(async (req, res) => {
  const userId = req.user.id as string;

  const result = await UniqueKeyService.getUniqueKey(userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Unique key fetched successfully',
    data: result,
  });
});

const updateUniqueKey = catchAsync(async (req, res) => {
  const result = await UniqueKeyService.updateUniqueKey(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Unique key updated successfully',
    data: result,
  });
});

export const UniqueKeyController = {
  createUniqueKey,
  getUniqueKey,
  updateUniqueKey,
};
