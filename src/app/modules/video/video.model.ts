import { model, Schema } from 'mongoose';
import { IVideo } from './video.interface';

const videoSchema = new Schema<IVideo>(
  {
    babySitterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    video: { type: String, required: true },
    count: { type: Number, default: 0 },
    videoReqId: {
      type: Schema.Types.ObjectId,
      ref: 'VideoReq',
      required: true,
    },
    isSeen: { type: Boolean, default: false },
    thumbnail: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Video = model<IVideo>('Video', videoSchema);
