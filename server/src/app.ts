import express from "express";

import dotenv from "dotenv";
import path from "path";

import routes from "./routes";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
app.use(express.json());
const serverPort = 3000;

app.use("/api", routes);

//Serve static front-end
const clientBuild = path.join(__dirname, "../../client/dist");
app.use(express.static(clientBuild));

app.listen(serverPort, () => {
  return console.log(`Express is listening at http://localhost:${serverPort}`);
});
