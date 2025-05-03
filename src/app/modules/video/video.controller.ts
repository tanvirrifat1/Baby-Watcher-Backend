import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { VideoService } from './video.service';
import { S3File } from './video.constant';

const sendVideo = catchAsync(async (req, res) => {
  const babySitterId = req.user.id;

  const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

  const imageFile = files?.['image']?.[0];
  const mediaFile = files?.['media']?.[0];

  const value = {
    ...req.body,
    babySitterId,
    video: mediaFile?.location,
    thumbnail: imageFile?.location,
  };

  const result = await VideoService.sendVideo(value);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Video and image sent successfully',
    data: result,
  });
});

const getMyVideo = catchAsync(async (req, res) => {
  const parentId = req.user.id;

  const result = await VideoService.getMyVideos(req.query, parentId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Video retrived successfully',
    data: result,
  });
});

const getMyVideosForBabySitter = catchAsync(async (req, res) => {
  const babySitterId = req.user.id;

  const result = await VideoService.getMyVideosForBabySitter(
    req.query,
    babySitterId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Video retrived successfully',
    data: result,
  });
});

const updateVideoSeenStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await VideoService.updateVideoSeenStatus(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Video seen status updated successfully',
    data: result,
  });
});

export const VideoController = {
  sendVideo,
  getMyVideo,
  getMyVideosForBabySitter,
  updateVideoSeenStatus,
};
