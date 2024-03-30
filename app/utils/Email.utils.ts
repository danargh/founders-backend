import nodemailer from "nodemailer";
import config from "../config/index";
import { ErrorException } from "./Error.utils";
import logger from "./Logger.utils";

const sendMail = async (email: string, subject: string, message: string) => {
   try {
      const transporter = nodemailer.createTransport({
         host: config.EMAIL_HOST,
         port: 587,
         service: config.EMAIL_SERVICE,
         secure: true,
         auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS,
         },
      });

      await transporter.sendMail({
         from: config.EMAIL_USER,
         to: email,
         subject: subject,
         text: message,
      });

      logger.info(`Email successfully sent to ${email}`);
   } catch (error) {
      logger.info(`Email failed to send to ${email}`);
   }
};

export default sendMail;
