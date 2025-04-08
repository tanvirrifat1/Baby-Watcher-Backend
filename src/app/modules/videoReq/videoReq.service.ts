import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Connection } from '../connection/connection.model';
import { IVideoReq } from './videoReq.interface';
import { VideoReq } from './videoReq.model';
import { sendNotifications } from '../../../helpers/notificationHelper';
import { User } from '../user/user.model';
import { Subscriptation } from '../subscription/subscription.model';

const createVideoReqToDb = async (payload: IVideoReq) => {
  const isConnection = await Connection.findOne({
    parentId: payload.parentId,
  });

  if (!isConnection) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not connected with any babysitter'
    );
  }

  const isSubs = await User.findById(payload.parentId);

  if (!isSubs || isSubs.subscription === false) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not subscribed to any plan'
    );
  }

  const isPurses = await Subscriptation.findOne({ userId: payload.parentId });

  if (!isPurses) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Subscription not found');
  }

  const currentDate = new Date();
  if (new Date(isPurses.expiryDate) < currentDate) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your subscription has expired'
    );
  }

  const planName = isPurses.packageName.toLowerCase();

  // ⏳ Restrict Standard Plan to 3 Requests Per Day
  if (planName === 'standard plan') {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const requestCount = await VideoReq.countDocuments({
      parentId: payload.parentId,
      createdAt: { $gte: twentyFourHoursAgo },
    });

    if (requestCount >= 3) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'You can only send 3 video requests per day. Try again after 24 hours.'
      );
    }
  }

  const isExistReq = await VideoReq.findOne({
    babySitterId: isConnection.babySitterId,
    parentId: isConnection.parentId,
    count: 1,
  });

  // if (isExistReq) {
  //   throw new ApiError(
  //     StatusCodes.BAD_REQUEST,
  //     'You have already sent a video request to this babysitter'
  //   );
  // }

  const value = {
    babySitterId: isConnection.babySitterId,
    parentId: isConnection.parentId,
    count: 1,
  };

  const result = await VideoReq.create(value);

  const data = {
    text: `You have a new video request`,
    receiver: isConnection.babySitterId,
  };

  await sendNotifications(data);

  return result;
};

const getMyVideoReq = async (babySitterId: string) => {
  const result = await VideoReq.find({ babySitterId: babySitterId }).populate({
    path: 'parentId',
    select: 'name image',
  });

  await VideoReq.updateMany(
    { babySitterId: babySitterId },
    { $set: { count: 0 } }
  );
  return result;
};

export const VideoReqService = {
  createVideoReqToDb,
  getMyVideoReq,
};
