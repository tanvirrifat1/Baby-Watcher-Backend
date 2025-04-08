import { model, Schema } from 'mongoose';
import { IEmergancyContact } from './emergancyContact.interface';

const emergencyContactSchema = new Schema<IEmergancyContact>(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

emergencyContactSchema.pre('save', async function (next) {
  const isExistNumber = await EmergancyContact.findOne({
    contact: this.contact,
  });
  if (isExistNumber) {
    const error = new Error('Contact number already exists!');
    return next(error);
  }

  const count = await EmergancyContact.countDocuments({ userId: this.userId });
  if (count >= 3) {
    const error = new Error('A user can only have up to 3 emergency contacts.');
    return next(error);
  }
  next();
});

export const EmergancyContact = model(
  'EmergancyContact',
  emergencyContactSchema
);
