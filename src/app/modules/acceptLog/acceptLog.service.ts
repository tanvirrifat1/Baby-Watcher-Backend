import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Log } from '../log/log.model';
import { sendNotifications } from '../../../helpers/notificationHelper';

const logForBabySitter = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const { page, limit, searchTerm, ...filterData } = query;
  const anyConditions: any[] = [];

  anyConditions.push({ babySitter: userId });

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

const acceptLog = async (logId: string) => {
  const isExistLog = await Log.findOne({ _id: logId });
  if (!isExistLog) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Log not found!');
  }

  const result = await Log.findOneAndUpdate(
    { _id: logId },
    { $set: { status: 'complete' } }
  );

  const data = {
    text: `Your log has been completed successfully`,
    receiver: isExistLog.user,
  };

  await sendNotifications(data);

  return result;
};

export const AcceptLogService = {
  logForBabySitter,
  acceptLog,
};
