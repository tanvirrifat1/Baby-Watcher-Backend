import { model, Schema } from 'mongoose';
import { IEmergancyAlert } from './emergancyAlert.interface';

const emergancyAlertSchema = new Schema<IEmergancyAlert>(
  {
    babySitterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const EmergancyAlert = model<IEmergancyAlert>(
  'EmergancyAlert',
  emergancyAlertSchema
);
