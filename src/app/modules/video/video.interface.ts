import { Types } from 'mongoose';

export type IVideo = {
  videoReqId: Types.ObjectId;
  parentId: Types.ObjectId;
  babySitterId: Types.ObjectId;
  video: string;
  thumbnail: string;
  count: number;
  isSeen: boolean;
};
