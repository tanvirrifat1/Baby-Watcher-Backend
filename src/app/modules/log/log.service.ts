import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { ILog } from './log.interface';
import { Log } from './log.model';
import { Connection } from '../connection/connection.model';
import { sendNotifications } from '../../../helpers/notificationHelper';

const createLog = async (payload: ILog) => {
  const isConnected = await Connection.findOne({
    parentId: payload.user,
  });

  if (!isConnected) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not connected with this user!'
    );
  }

  const value = {
    ...payload,
    babySitter: isConnected?.babySitterId,
  };

  const isExistLog = await Log.findOne({
    user: payload.user,
    date: payload.date,
    time: payload.time,
  });

  if (isExistLog) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You already have a log for this day and time'
    );
  }

  const data = {
    text: `You have a new log for ${payload.date} at ${payload.time}`,
    receiver: isConnected?.babySitterId,
  };

  await sendNotifications(data);

  const result = await Log.create(value);

  return result;
};

const checkMissedLogs = async () => {
  const now = new Date();
  const time = now.getTime();

  await Log.updateMany(
    {
      date: { $lt: now, $gte: new Date(time - 24 * 60 * 60 * 1000) },
      status: 'upcoming',
    },
    { $set: { status: 'missed' } }
  );

  return { message: 'Missed logs updated' };
};

const getMyLogs = async (userId: string, query: Record<string, unknown>) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  anyConditions.push({ user: userId });

  if (searchTerm) {
    anyConditions.push({
      $or: [
        { date: { $regex: searchTerm, $options: 'i' } },
        { time: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }

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
  const size = parseInt(limit as string) || 10;
  const skip = (pages - 1) * size;

  // Fetch campaigns
  const result = await Log.find(whereConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .lean();

  const count = await Log.countDocuments(whereConditions);

  return {
    result,
    meta: {
      page: pages,
      total: count,
    },
  };
};

const editLog = async (id: string, payload: ILog) => {
  const isConnected = await Connection.findOne({
    parentId: payload.user,
  });

  if (!isConnected) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not connected with this user!'
    );
  }

  const value = {
    ...payload,
    babySitter: isConnected.babySitterId,
  };

  const isExistLog = await Log.findOne({
    user: payload.user,
    date: payload.date,
    time: payload.time,
  });

  if (isExistLog) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You already have a log for this day and time'
    );
  }

  if (isConnected.babySitterId) {
    const data = {
      text: `You have a new log for ${payload.date} at ${payload.time}`,
      receiver: isConnected.babySitterId,
    };
    await sendNotifications(data);
  }

  const result = await Log.findByIdAndUpdate(id, value, { new: true });
  return result;
};

const deleteLog = async (id: string) => {
  const isExist = await Log.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Log not found!');
  }

  const result = await Log.findByIdAndDelete(id);
  return result;
};

export const LogService = {
  createLog,
  checkMissedLogs,
  getMyLogs,
  editLog,
  deleteLog,
};
