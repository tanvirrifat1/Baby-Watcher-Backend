import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import { sendNotifications } from '../../../helpers/notificationHelper';
import unlinkFile from '../../../shared/unlinkFile';
import { Connection } from '../connection/connection.model';
import { IConnection } from '../connection/connection.interface';
import generateUniqueKey from './user.constant';
import { UniqueKey } from '../UniqueKey/UniqueKey.model';

const createParentFromDb = async (payload: IUser) => {
  payload.role = USER_ROLES.PARENT;
  // Generate unique key before creating user
  const uniqueKey = await generateUniqueKey();
  payload.uniqueKey = uniqueKey;

  const result = await User.create(payload);

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const value = {
    uniqueKey: uniqueKey,
    userId: result._id,
  };

  const uniqueKeyResult = await UniqueKey.create(value);

  if (!uniqueKeyResult) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Unique key doesn't exist!");
  }

  const otp = generateOTP();
  const emailValues = {
    name: result.name,
    otp,
    email: result.email,
  };

  const accountEmailTemplate = emailTemplate.createAccount(emailValues);
  emailHelper.sendEmail(accountEmailTemplate);

  // Update user with authentication details
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 15 * 60000),
  };
  const updatedUser = await User.findOneAndUpdate(
    { _id: result._id },
    { $set: { authentication } }
  );

  if (!updatedUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found for update');
  }

  if (result) {
    const data = {
      text: `Registered successfully, ${result?.name}`,
      type: 'ADMIN',
    };

    await sendNotifications(data);
  }

  return result;
};

const createBabySitterFromDb = async (payload: IUser) => {
  payload.role = USER_ROLES.BABY_SITTER;

  const result = await User.create(payload);

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  const otp = generateOTP();
  const emailValues = {
    name: result.name,
    otp,
    email: result.email,
  };

  const accountEmailTemplate = emailTemplate.createAccount(emailValues);
  emailHelper.sendEmail(accountEmailTemplate);

  // Update user with authentication details
  const authentication = {
    oneTimeCode: otp,
    expireAt: new Date(Date.now() + 15 * 60000),
  };
  const updatedUser = await User.findOneAndUpdate(
    { _id: result._id },
    { $set: { authentication } }
  );

  if (!updatedUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found for update');
  }

  if (result) {
    const data = {
      text: `Registered successfully, ${result?.name}`,
      type: 'ADMIN',
    };

    await sendNotifications(data);
  }

  return result;
};

const getUserProfileFromDB = async (
  usr: JwtPayload
): Promise<{
  user: Partial<IUser>;
  connection: IConnection | null;
}> => {
  const { id } = usr;
  // Fetch user and connection in parallel
  const [user, connection] = await Promise.all([
    User.findById(id).lean(),
    Connection.findOne({ $or: [{ parentId: id }, { babySitterId: id }] })
      .populate('parentId', 'name email image phone')
      .populate('babySitterId', 'name email image phone')
      .lean(),
  ]);

  if (!user) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  return { user, connection };
};

const updateProfileToDB = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const { id } = user;
  const isExistUser = await User.isExistUserById(id);

  if (!isExistUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
  }

  // Delete old images if new images are provided
  if (payload.image && isExistUser.image) {
    unlinkFile(isExistUser.image);
  }

  const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return updateDoc;
};

const deleteAllUsers = async (payload: IUser) => {
  const { email, phone } = payload;
  const deleteByEmail = await User.findOneAndDelete({ email });
  return deleteByEmail;
};

export const UserService = {
  createParentFromDb,
  createBabySitterFromDb,
  getUserProfileFromDB,
  updateProfileToDB,
  deleteAllUsers,
};
