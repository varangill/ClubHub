import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const dbPool = new Pool({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

const query = (text, params) => dbPool.query(text, params);

const db = {
  query,
};

export default db;
