import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { VideoReqService } from './videoReq.service';

const createVideoReqToDb = catchAsync(async (req, res) => {
  const parentId = req.user.id as string;

  const value = {
    ...req.body,
    parentId,
  };

  const result = await VideoReqService.createVideoReqToDb(value);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Video request created successfully',
    data: result,
  });
});

const getMyVideoReq = catchAsync(async (req, res) => {
  const babySitterId = req.user.id;

  const result = await VideoReqService.getMyVideoReq(babySitterId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Video request retrived successfully',
    data: result,
  });
});

export const VideoReqController = {
  createVideoReqToDb,
  getMyVideoReq,
};
