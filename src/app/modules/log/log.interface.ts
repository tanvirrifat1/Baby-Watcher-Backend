import { Types } from 'mongoose';

export type ILog = {
  date: Date;
  time: string;
  activity: string;
  otherAct: string;
  user: Types.ObjectId;
  babySitter: Types.ObjectId;
  status: 'complete' | 'upcoming' | 'missed';
};
