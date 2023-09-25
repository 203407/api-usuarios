// import { config as dotEnvConfig } from "dotenv";
// dotEnvConfig();

import bodyParser from "body-parser";
import cors from "cors"; // I
import express from "express";
import path from "path";

import { config } from "./config";
import { healthRouter } from "./health/health-router";
import { usuarioRouter } from "./paciente/infraestructure/usuario-router";

function boostrap() {
  const app = express();
  app.use(express.static("uploads"));

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(bodyParser.json());
  app.use("/health", healthRouter);
  app.use("/", usuarioRouter);

  app.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "uploads", filename);
    res.sendFile(imagePath);
  });

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
