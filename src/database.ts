import * as dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();

const config = {
  host: process.env.HOSTDB,
  port: 5432,
  user: process.env.USERDB,
  database: process.env.DATABASEDB,
  password: process.env.PASSWORDDB,
};

export const pool = new Pool(config);
