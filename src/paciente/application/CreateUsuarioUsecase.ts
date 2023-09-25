import { Cliente } from "../domain/usuario";
import { ClienteRepository } from "../domain/UsuarioRepository";

export class CreateClientesUsecase {
  constructor(readonly gameRepository: ClienteRepository) {}

  async run(cliente: Cliente) {
    const createCliente = await this.gameRepository.createCliente(cliente);
    return createCliente;
  }
}
