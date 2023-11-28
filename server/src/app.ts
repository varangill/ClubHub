import express from "express";

import dotenv from "dotenv";
import path from "path";
import getDatabaseConnection from "./database/database";

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const serverPort = 3000;

const databaseConnection = getDatabaseConnection();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(serverPort, () => {
  return console.log(`Express is listening at http://localhost:${serverPort}`);
});
