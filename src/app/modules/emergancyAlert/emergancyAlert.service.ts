import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Connection } from '../connection/connection.model';
import { IEmergancyAlert } from './emergancyAlert.interface';
import { EmergancyAlert } from './emergancyAlert.model';
import { sendNotifications } from '../../../helpers/notificationHelper';

// const createEmergancyAlertToDb = async (payload: IEmergancyAlert) => {
//   const isConnect = await Connection.findOne({
//     babySitterId: payload.babySitterId,
//   });

//   if (!isConnect) {
//     throw new ApiError(
//       StatusCodes.BAD_REQUEST,
//       'You are not connected with this user!'
//     );
//   }

//   const existingAlert = await EmergancyAlert.findOne({
//     babySitterId: isConnect.babySitterId,
//     parentId: isConnect.parentId,
//   });

//   if (existingAlert) {
//     existingAlert.count += 1;
//     existingAlert.message = payload.message;
//     await existingAlert.save();
//     const data = {
//       text: `${payload.message}`,
//       receiver: isConnect.parentId,
//     };
//     await sendNotifications(data);
//     return existingAlert;
//   } else {
//     const newAlert = await EmergancyAlert.create({
//       babySitterId: isConnect.babySitterId,
//       parentId: isConnect.parentId,
//       message: payload.message,
//       count: 1,
//     });
//     const data = {
//       text: `${payload.message}`,
//       receiver: isConnect.parentId,
//     };
//     await sendNotifications(data);
//     return newAlert;
//   }
// };

const createEmergancyAlertToDb = async (payload: IEmergancyAlert) => {
  const isConnect = await Connection.findOne({
    babySitterId: payload.babySitterId,
  });

  if (!isConnect) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'You are not connected with this user!'
    );
  }

  const result = await EmergancyAlert.create({
    babySitterId: isConnect.babySitterId,
    parentId: isConnect.parentId,
    message: payload.message,
    count: 1,
  });

  const data = {
    text: `${payload.message}`,
    receiver: isConnect.parentId,
  };
  await sendNotifications(data);

  return result;
};

const getEmergencyAlerts = async (parentId: string) => {
  const [result] = await Promise.all([
    EmergancyAlert.find({ parentId }).lean(),
    EmergancyAlert.updateMany({ parentId }, { $set: { count: 0 } }),
  ]);

  return result;
};

const deleteAltest = async (id: string) => {
  const deleteAlert = await EmergancyAlert.findById(id);

  if (!deleteAlert) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Alert not found!');
  }

  const result = await EmergancyAlert.findByIdAndDelete(id);

  return result;
};

export const EmergancyAlertService = {
  createEmergancyAlertToDb,
  getEmergencyAlerts,
  deleteAltest,
};
