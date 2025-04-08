import { model, Schema } from 'mongoose';
import { IVideoReq } from './videoReq.interface';

const videoReqSchema = new Schema<IVideoReq>(
  {
    babySitterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'complete'], default: 'pending' },
    count: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const VideoReq = model<IVideoReq>('VideoReq', videoReqSchema);
