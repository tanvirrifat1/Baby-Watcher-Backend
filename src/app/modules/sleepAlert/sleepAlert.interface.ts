import { Types } from 'mongoose';

export type ISleepAlert = {
  babySitterId: Types.ObjectId;
  parentId: Types.ObjectId;
  time: string;
  duration: string;
  type: string;
};
