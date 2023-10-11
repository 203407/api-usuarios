import { Cliente } from "../domain/usuario";
import { ClienteRepository } from "../domain/UsuarioRepository";

export class CreateClientesUsecase {
  constructor(readonly clienteRepository: ClienteRepository) {}

  async run(cliente: Cliente) {
    const createCliente = await this.clienteRepository.createCliente(cliente);
    return createCliente;
  }
}
