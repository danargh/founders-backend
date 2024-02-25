import * as http from "http";
import app from "./index";
import config from "./config";

// running server
const server = http.createServer(app);

server.listen(config.PORT, () => {
   console.log("Server running on http://localhost:8080/");
});
