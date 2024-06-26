import express from "express";

import authentication from "./authentication";
import users from "./users";
import invitation from "./invitation";

const router = express.Router();

export default (): express.Router => {
   authentication(router);
   users(router);
   invitation(router);

   return router;
};
