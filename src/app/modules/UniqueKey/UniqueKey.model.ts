import { model, Schema } from 'mongoose';
import { IUniqueKey } from './UniqueKey.interface';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const uniqueKeySchema = new Schema<IUniqueKey>(
  {
    uniqueKey: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

uniqueKeySchema.pre('save', async function (next) {
  if (this.uniqueKey) {
    const existingUser = await UniqueKey.findOne({ uniqueKey: this.uniqueKey });
    if (existingUser) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Unique key already exists!');
    }
  }

  next();
});

export const UniqueKey = model<IUniqueKey>('UniqueKey', uniqueKeySchema);
