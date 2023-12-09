import winston from "winston";

const logger = winston.createLogger({
   level: "info",
   format: winston.format.combine(
      winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      winston.format.align(),
      winston.format.printf(
         (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
   ),
   transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "logs/server.log" }),
   ],
});

export default logger;
