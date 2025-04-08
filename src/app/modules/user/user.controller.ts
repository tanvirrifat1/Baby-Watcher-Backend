import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import { getFilePathMultiple } from '../../../shared/getFilePath';
import { MulterFile } from './user.constant';

const createParentUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const value = {
      ...req.body,
    };

    await UserService.createParentFromDb(value);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:
        'Please check your email to verify your account. We have sent you an OTP to complete the registration process.',
    });
  }
);
const createBabySitterUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const value = {
      ...req.body,
    };

    await UserService.createBabySitterFromDb(value);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message:
        'Please check your email to verify your account. We have sent you an OTP to complete the registration process.',
    });
  }
);

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getUserProfileFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Profile data retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, body } = req;
    const files = req.files as
      | { [fieldname: string]: MulterFile[] }
      | undefined;

    if (!user) {
      return next(new Error('User not authenticated'));
    }

    const imageFiles = files?.['image'];

    const imageLocation =
      imageFiles && imageFiles.length > 0 ? imageFiles[0].location : undefined;

    const updateData = {
      ...body,
      image: imageLocation,
    };

    const updatedProfile = await UserService.updateProfileToDB(
      user,
      updateData
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Profile updated successfully',
      data: updatedProfile,
    });
  }
);

const deleteAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteAllUsers(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All users deleted successfully',
    data: result,
  });
});
export const UserController = {
  createParentUser,
  createBabySitterUser,
  getUserProfile,
  updateProfile,
  deleteAllUsers,
};
