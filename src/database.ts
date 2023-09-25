import { Pool } from "pg";

const config = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "integrador",
  password: "carrera10",
};

export const pool = new Pool(config);
