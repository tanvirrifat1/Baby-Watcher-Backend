import { model, Schema } from 'mongoose';
import { ILog } from './log.interface';

const logSchema = new Schema<ILog>(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true },
    activity: { type: String },
    otherAct: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    babySitter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true, default: 'upcoming' },
  },
  {
    timestamps: true,
  }
);

export const Log = model<ILog>('Log', logSchema);
