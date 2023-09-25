import express from "express";
import multer from "multer";
import path from "path";

// import { authorize } from './controllers/verificacion';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

import {
  createClienteController,
  verificarClienteController,
} from "./dependencies";

const usuarioRouter = express.Router();

usuarioRouter.post(
  "/usuario/create",
  upload.any(),
  createClienteController.run.bind(createClienteController)
);

usuarioRouter.post(
  "/usuario/login",
  verificarClienteController.run.bind(verificarClienteController)
);

export { usuarioRouter };
