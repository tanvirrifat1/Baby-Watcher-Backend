import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IConnection } from './connection.interface';
import { Connection } from './connection.model';
import { UniqueKey } from '../UniqueKey/UniqueKey.model';

const createConnection = async (data: IConnection) => {
  const isUniqueKey = await UniqueKey.findOne({ uniqueKey: data.uniqueKey });

  if (!isUniqueKey) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Unique key not found!');
  }

  const existingConnection = await Connection.findOne({
    babySitterId: data.babySitterId,
  });

  if (existingConnection) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are already connected! Delete the existing connection first.'
    );
  }

  const value = {
    parentId: isUniqueKey.userId,
    babySitterId: data.babySitterId,
    uniqueKey: data.uniqueKey,
  };

  const isExistKey = await Connection.findOne({
    uniqueKey: data.uniqueKey,
  });

  if (isExistKey) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User already connected!');
  }

  const result = await Connection.create(value);

  return result;
};

const getMyConnections = async (id: string) => {
  const isExist = await User.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found!');
  }

  const result = await Connection.findOne({
    $or: [{ parentId: id }, { babySitterId: id }],
  })
    .populate({
      path: 'babySitterId',
      select: 'name image',
    })
    .populate({
      path: 'parentId',
      select: 'name image',
    });
  return result;
};

const deleteConnection = async (id: string) => {
  const result = await Connection.findByIdAndDelete(id);
  return result;
};

const getBabySitterConnections = async (id: string) => {
  const result = await Connection.find({ babySitterId: id }).populate({
    path: 'parentId',
    select: 'name image',
  });
  return result;
};

export const ConnectionService = {
  createConnection,
  getMyConnections,
  deleteConnection,
  getBabySitterConnections,
};
