import { User } from './user.model';

export interface MulterFile extends Express.Multer.File {
  location?: string;
}

const generateUniqueKey = async (): Promise<string> => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueKey = '';

  for (let i = 0; i < 10; i++) {
    uniqueKey += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  const existingUser = await User.findOne({ uniqueKey });
  if (existingUser) {
    return generateUniqueKey();
  }

  return uniqueKey;
};

export default generateUniqueKey;
