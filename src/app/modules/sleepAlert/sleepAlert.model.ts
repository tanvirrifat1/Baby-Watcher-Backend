import { model, Schema } from 'mongoose';
import { ISleepAlert } from './sleepAlert.interface';

const sleepAlertSchema = new Schema<ISleepAlert>(
  {
    babySitterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

export const SleepAlert = model<ISleepAlert>('SleepAlert', sleepAlertSchema);
