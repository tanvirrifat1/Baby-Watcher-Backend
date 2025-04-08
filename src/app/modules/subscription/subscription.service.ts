import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { Subscriptation } from './subscription.model';
import { ISubscription } from './subscription.interface';
import { sendNotifications } from '../../../helpers/notificationHelper';

const createSubscription = async (userId: string, data: ISubscription) => {
  const isUser = await User.findById(userId);

  if (!isUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found!');
  }

  const result = await Subscriptation.findOneAndUpdate(
    { userId },
    { $set: data },
    { new: true, upsert: true }
  );

  const isSubcribed = await User.findByIdAndUpdate(
    userId,
    { $set: { subscription: true } },
    { new: true }
  );

  const value = {
    text: `You have successfully subscribed to ${data.packageName}`,
    receiver: userId,
  };

  await sendNotifications(value);

  if (!isSubcribed) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You cannot add a subscription because you are not subscribed!'
    );
  }

  return result;
};

const updateExpiredSubscriptions = async () => {
  const currentDate = new Date();

  try {
    // Find all expired subscriptions
    const expiredSubscriptions = await Subscriptation.find({
      expiryDate: { $lt: currentDate },
    });

    if (!expiredSubscriptions.length) {
      return;
    }

    // Extract user IDs from expired subscriptions
    const expiredUserIds = expiredSubscriptions.map(sub => sub.userId);

    // Update all users' subscription status to false
    await User.updateMany(
      { _id: { $in: expiredUserIds } },
      { $set: { subscription: false } }
    );
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating subscriptions');
  }
};

const getSubscription = async (userId: string) => {
  const isUser = await User.findById(userId);
  if (!isUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found!');
  }

  const isSubscription = await Subscriptation.findOne({ userId }).populate(
    'userId'
  );
  if (!isSubscription) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Subscription not found!');
  }

  return { isSubscription };
};

export const SubscriptationService = {
  createSubscription,
  updateExpiredSubscriptions,
  getSubscription,
};
