import { Pool } from "pg";

const getDatabaseConnection = () => {
  const databasePool = new Pool({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
  });

  return databasePool;
};

export default getDatabaseConnection;
