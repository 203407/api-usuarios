import express from "express";

import {
  createClienteController,
  verificarClienteController,
} from "./dependencies";

const usuarioRouter = express.Router();

usuarioRouter.post(
  "/usuario/create",

  createClienteController.run.bind(createClienteController)
);

usuarioRouter.post(
  "/usuario/login",
  verificarClienteController.run.bind(verificarClienteController)
);

export { usuarioRouter };
