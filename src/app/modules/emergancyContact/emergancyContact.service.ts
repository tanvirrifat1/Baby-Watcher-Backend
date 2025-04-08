import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IEmergancyContact } from './emergancyContact.interface';
import { EmergancyContact } from './emergancyContact.model';
import { Connection } from '../connection/connection.model';

const createEmergancyContactToDb = async (payload: IEmergancyContact) => {
  const result = await EmergancyContact.create(payload);
  return result;
};

const getMyContactNumber = async (userId: string) => {
  const result = await EmergancyContact.find({ userId });
  return result;
};

const deleteMyContactNumber = async (id: string) => {
  const isExist = await EmergancyContact.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Contact number not found!');
  }

  const result = await EmergancyContact.findByIdAndDelete(id);
  return result;
};

const getContactNumberBabySitter = async (userId: string) => {
  const myConnection = await Connection.findOne({ babySitterId: userId });

  if (!myConnection) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Connection not found!');
  }

  const result = await EmergancyContact.find({
    userId: myConnection?.parentId,
  });
  return result;
};

const updateContactNumber = async (
  id: string,
  payload: Partial<IEmergancyContact>
) => {
  const isExist = await EmergancyContact.findById(id);
  if (!isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Contact number not found!');
  }

  const isExistContactNumber = await EmergancyContact.findOne({
    contact: payload.contact,
  });

  if (isExistContactNumber) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Contact number already exists!'
    );
  }

  const result = await EmergancyContact.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const EmergancyContactService = {
  createEmergancyContactToDb,
  getMyContactNumber,
  deleteMyContactNumber,
  getContactNumberBabySitter,
  updateContactNumber,
};
