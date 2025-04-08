import { Types } from 'mongoose';

export type IEmergancyAlert = {
  message: string;
  parentId: Types.ObjectId;
  babySitterId: Types.ObjectId;
  count: number;
};
