import { Types } from 'mongoose';

export type IEmergancyContact = {
  name: string;
  contact: string;
  userId: Types.ObjectId;
};
