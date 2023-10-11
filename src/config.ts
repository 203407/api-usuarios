import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    port: process.env.PORTT || 3000,
  },
};
