import express from "express";
import logger from "./Logger.utils";

// const ErrorHandler = (status: number, message: string, res: express.Response) => {
//    logger.info(message);
//    res.status(status).json({ status: "Failed", code: status, message: message }).end();
//    return;
// };

// export default ErrorHandler;

export class ErrorException extends Error {
   public status: number;
   public message: string;
   public userMessage: string;

   constructor(status: number, message: string, userMessage?: string) {
      super(message);
      this.status = status;
      this.message = message;
      this.userMessage = userMessage;
   }
}
