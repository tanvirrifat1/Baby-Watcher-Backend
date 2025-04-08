import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { VideoReq } from '../videoReq/videoReq.model';
import { IVideo } from './video.interface';
import { Video } from './video.model';
import { Connection } from '../connection/connection.model';
import { Subscriptation } from '../subscription/subscription.model';
import { User } from '../user/user.model';
import { sendNotifications } from '../../../helpers/notificationHelper';

const sendVideo = async (data: IVideo) => {
  const isConnection = await Connection.findOne({
    babySitterId: data.babySitterId,
  });

  const isVideoReq = await VideoReq.findOneAndUpdate(
    { babySitterId: data.babySitterId, parentId: isConnection?.parentId },
    // { $set: { count: 0 } },
    { new: true, sort: { createdAt: -1 } }
  );

  if (!isVideoReq) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Video request not found!');
  }

  const isSubsUser = await User.findById(isConnection?.parentId);

  if (!isSubsUser || isSubsUser.subscription === false) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Your Parent user is not subscribed to any plan'
    );
  }

  const isPurses = await Subscriptation.findOne({
    userId: isConnection?.parentId,
  });

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

    const requestCount = await Video.countDocuments({
      babySitterId: data.babySitterId,
      createdAt: { $gte: twentyFourHoursAgo },
    });

    if (requestCount >= 3) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'You can only send 3 video requests per day. Try again after 24 hours.'
      );
    }
  }

  const result = await Video.create({
    ...data,
    videoReqId: isVideoReq._id,
    parentId: isVideoReq.parentId,
    count: 1,
  });

  await VideoReq.deleteMany({
    babySitterId: data.babySitterId,
  });

  const datas = {
    text: `You have a new video`,
    receiver: isConnection?.parentId,
  };

  await sendNotifications(datas);

  return result;
};

const getMyVideos = async (
  query: Record<string, unknown>,
  parentId: string
) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  anyConditions.push({ parentId });

  // Filter by additional filterData fields
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value })
    );
    anyConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  // Pagination setup
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 5;
  const skip = (pages - 1) * size;

  // Fetch campaigns
  const result = await Video.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  await Video.updateMany(whereConditions, { $set: { count: 0 } });

  const count = await Video.countDocuments(whereConditions);

  return {
    result,
    meta: {
      page: pages,
      total: count,
    },
  };
};

const getMyVideosForBabySitter = async (
  query: Record<string, unknown>,
  babySitterId: string
) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  anyConditions.push({ babySitterId });

  // Filter by additional filterData fields
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.entries(filterData).map(
      ([field, value]) => ({ [field]: value })
    );
    anyConditions.push({ $and: filterConditions });
  }

  const whereConditions =
    anyConditions.length > 0 ? { $and: anyConditions } : {};

  // Pagination setup
  const pages = parseInt(page as string) || 1;
  const size = parseInt(limit as string) || 5;
  const skip = (pages - 1) * size;

  // Fetch campaigns
  const result = await Video.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const count = await Video.countDocuments(whereConditions);

  return {
    result,
    meta: {
      page: pages,
      total: count,
    },
  };
};

const updateVideoSeenStatus = async (id: string) => {
  const isVideo = await Video.findById(id);

  if (!isVideo) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Video not found');
  }

  const result = await Video.findByIdAndUpdate(id, {
    $set: { isSeen: true },
    new: true,
  });
  return result;
};

export const VideoService = {
  sendVideo,
  getMyVideos,
  getMyVideosForBabySitter,
  updateVideoSeenStatus,
};
