import express from "express";
import logger from "./Logger.utils";

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
