import { Pool } from "pg";

const config = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "user_wc_db",
  password: "casillas",
};

export const pool = new Pool(config);
