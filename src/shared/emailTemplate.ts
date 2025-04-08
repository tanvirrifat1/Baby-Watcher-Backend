import { ICreateAccount, IResetPassword } from '../types/emailTamplate';

const createAccount = (values: ICreateAccount) => {
  const data = {
    to: values.email,
    subject: 'Verify your account',
    html: `<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
        <tr>
            <td>
                <table align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 5px; margin: 30px auto;">
                    <tr>
                        <td align="center" style="padding: 40px;">
                            <img src="https://res.cloudinary.com/dvi9q02vy/image/upload/v1740586900/dxm0ezoemvryfcfl4eqt.png" alt="Baby Watcher Logo" width="200" height="200" style="display: block;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px; font-size: 16px; line-height: 1.6;">
                            <h2 style="color: #2e7d32; margin-bottom: 20px;">Hi ${values.name},</h2>
                            <p>Thank you for registering with Baby Watcher! To verify your account, please use the following one-time code:</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <strong style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; border-radius: 5px; font-size: 20px;">${values.otp}</strong>
                            </div>
                            <p>This code is valid for 3 minutes. Please enter it on the verification page to activate your account.</p>
                            <p>If you did not request this code, please ignore this email.</p>
                        </td>
                    </tr>
                    <tr>
                 <td style="padding: 25px 40px; border-top: 1px solid #ddd; font-size: 13px; color: #777; text-align: center;">
                     &copy; {new Date().getFullYear()} Baby Watcher. All rights reserved.
                 </td>
               </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`,
  };
  return data;
};

const resetPassword = (values: IResetPassword) => {
  const data = {
    to: values.email,
    subject: 'Reset your password',
    html: `<body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
        <tr>
            <td>
                <table align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 5px; margin: 30px auto;">
                    <tr>
                        <td align="center" style="padding: 40px;">
                            <img src="https://res.cloudinary.com/dvi9q02vy/image/upload/v1740586900/dxm0ezoemvryfcfl4eqt.png" alt="Baby Watcher Logo" width="200" height="200" style="display: block;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px; font-size: 16px; line-height: 1.6;">
                            <h2 style="color: #2e7d32; margin-bottom: 20px;">Hi,</h2>
                            <p>You recently requested to reset your password for your Baby Watcher account. Please use the following one-time code:</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <strong style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; border-radius: 5px; font-size: 20px;">${values.otp}</strong>
                            </div>
                            <p>This code is valid for 3 minutes. Please enter it on the password reset page.</p>
                            <p>If you did not request a password reset, please ignore this email.</p>
                        </td>
                    </tr>
                   <tr>
                    <td style="padding: 25px 40px; border-top: 1px solid #ddd; font-size: 13px; color: #777; text-align: center;">
                     &copy; {new Date().getFullYear()} Baby Watcher. All rights reserved.
                 </td>
            </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`,
  };
  return data;
};

export const emailTemplate = {
  createAccount,
  resetPassword,
};
