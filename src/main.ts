// import { config as dotEnvConfig } from "dotenv";
// dotEnvConfig();

import bodyParser from "body-parser";
import cors from "cors"; // I
import * as dotenv from "dotenv";
import express from "express";

import { config } from "./config";
import { healthRouter } from "./health/health-router";
import { usuarioRouter } from "./usuarios/infraestructure/usuario-router";

dotenv.config();

function boostrap() {
  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(bodyParser.json());
  app.use("/health", healthRouter);
  app.use("/", usuarioRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
