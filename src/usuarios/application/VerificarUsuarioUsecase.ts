import { ClienteRepository } from "../domain/UsuarioRepository";

export class VerificarClientesUsecase {
  constructor(readonly clienteRepository: ClienteRepository) {}

  async run(usuario: string, passw: string) {
    const verificacion = await this.clienteRepository.verificarCliente(
      usuario,
      passw
    );
    return verificacion;
  }
}
