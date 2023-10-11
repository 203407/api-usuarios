import { CreateClientesUsecase } from "../application/CreateUsuarioUsecase";
import { VerificarClientesUsecase } from "../application/VerificarUsuarioUsecase";
import { CreateClienteController } from "./controllers/CreateUsuarioController";
import { VerificarClienteController } from "./controllers/VerificarUsuarioController";
import { PostgresClienteRepository } from "./PostgresClienteRepository";

const postgresClienteRepository = new PostgresClienteRepository();

export const createClienteUseCase = new CreateClientesUsecase(
  postgresClienteRepository
);
export const createClienteController = new CreateClienteController(
  createClienteUseCase
);

export const verificarClienteUseCase = new VerificarClientesUsecase(
  postgresClienteRepository
);

export const verificarClienteController = new VerificarClienteController(
  verificarClienteUseCase
);
