import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IUniqueKey } from './UniqueKey.interface';
import { UniqueKey } from './UniqueKey.model';

const createUniqueKey = async (payload: IUniqueKey) => {
  const isExistKey = await UniqueKey.findOne({
    userId: payload.userId,
  });

  if (isExistKey) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'User already has a unique key!'
    );
  }

  const result = await UniqueKey.create(payload);

  return result;
};

const getUniqueKey = async (id: string) => {
  const result = await UniqueKey.findOne({ userId: id });
  return result;
};

const updateUniqueKey = async (id: string, payload: IUniqueKey) => {
  const isExistKey = await UniqueKey.findOne({
    uniqueKey: payload.uniqueKey,
  });

  if (isExistKey) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Already exists Key!');
  }

  const result = await UniqueKey.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UniqueKeyService = {
  createUniqueKey,
  getUniqueKey,
  updateUniqueKey,
};
