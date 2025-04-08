import { model, Schema } from 'mongoose';
import { IConnection } from './connection.interface';

const connectionSchema = new Schema<IConnection>(
  {
    babySitterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    uniqueKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Connection = model<IConnection>('Connection', connectionSchema);
