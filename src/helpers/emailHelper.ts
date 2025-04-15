import nodemailer from 'nodemailer';
import config from '../config';
import { errorLogger, logger } from '../shared/logger';
import { ISendEmail } from '../types/email';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: Number(config.email.port),
  secure: Number(config.email.port) === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
  tls: {
    rejectUnauthorized: false, // helps in development, set to true in production
  },
});

const sendEmail = async (values: ISendEmail) => {
  try {
    const info = await transporter.sendMail({
      from: `"BABY-WATCHER" <${config.email.from}>`,
      to: values.to,
      subject: values.subject,
      text: 'Please view the HTML version of this email.',
      html: values.html,
      replyTo: config.email.from,
    });

    logger.info('Mail sent successfully', info.accepted);
  } catch (error) {
    errorLogger.error('Email error', error);
  }
};

export const emailHelper = {
  sendEmail,
};
