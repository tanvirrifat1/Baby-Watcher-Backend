import { Types } from 'mongoose';

export type IConnection = {
  parentId: Types.ObjectId;
  babySitterId: Types.ObjectId;
  uniqueKey: string;
};
