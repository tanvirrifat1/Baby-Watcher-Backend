import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Connection } from '../connection/connection.model';
import { ISleepAlert } from './sleepAlert.interface';
import { SleepAlert } from './sleepAlert.model';
import { sendNotifications } from '../../../helpers/notificationHelper';

const sendToAlert = async (payload: ISleepAlert) => {
  const isConnection = await Connection.findOne({
    babySitterId: payload.babySitterId,
  });

  if (!isConnection) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not connected with to anyone'
    );
  }

  const value = {
    text: `Your baby has been ${payload.type.toLowerCase()} for ${
      payload.time
    } hours.`,
    receiver: isConnection.parentId,
  };

  await sendNotifications(value);

  return value;
};

const saveAlertToDB = async (payload: ISleepAlert) => {
  const isConnection = await Connection.findOne({
    babySitterId: payload.babySitterId,
  });

  if (!isConnection) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not connected with anyone'
    );
  }

  const existingAlert = await SleepAlert.findOne({
    babySitterId: isConnection.babySitterId,
    parentId: isConnection.parentId,
  });

  if (existingAlert) {
    // Update the existing record
    existingAlert.time = payload.time;
    existingAlert.duration = payload.duration;
    existingAlert.type = payload.type;
    await existingAlert.save();

    // const data = {
    //   text: `Your baby has been sleeping for ${payload.duration} hours.`,
    //   receiver: isConnection.parentId,
    // };

    // await sendNotifications(data);

    return existingAlert;
  } else {
    // Create a new sleep alert record
    const value = {
      ...payload,
      babySitterId: isConnection.babySitterId,
      parentId: isConnection.parentId,
    };

    // const data = {
    //   text: `Your baby has been sleeping for ${payload.duration} hours.`,
    //   receiver: isConnection.parentId,
    // };

    // await sendNotifications(data);

    const result = await SleepAlert.create(value);
    return result;
  }
};

const getAlert = async (value: any) => {
  const result = await SleepAlert.findOne({
    $or: [{ babySitterId: value.babySitterId }, { parentId: value.parentId }],
  });

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Sleep alert not found');
  }

  return result;
};

export const SleepAlertService = {
  saveAlertToDB,
  sendToAlert,
  getAlert,
};
