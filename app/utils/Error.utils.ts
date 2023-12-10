import express from "express";
import logger from "./Logger.utils";

const ErrorHandler = (status: number, message: string, res: express.Response) => {
   logger.info(message);
   res.status(status).json({ status: "Failed", code: status, message: message }).end();
   return;
};

export default ErrorHandler;
