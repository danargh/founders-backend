import express from "express";
import logger from "./Logger.utils";

const ErrorHandler = (
   status: number,
   message: string,
   res: express.Response
) => {
   logger.info(message);
   res.json({ status: status, message: message }).end();
};

export default ErrorHandler;
