import { Types } from 'mongoose';

export type IVideoReq = {
  babySitterId: Types.ObjectId;
  parentId: Types.ObjectId;
  status: 'pending' | 'complete';
  count: number;
};
