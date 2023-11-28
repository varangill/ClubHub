import express from "express";
import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(process.env.DATABASE);
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
