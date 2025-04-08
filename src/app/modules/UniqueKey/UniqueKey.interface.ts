import { Types } from 'mongoose';

export type IUniqueKey = {
  uniqueKey: string;
  userId: Types.ObjectId;
};
