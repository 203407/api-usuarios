import { Cliente } from "./usuario";

export interface ClienteRepository {
  createCliente(cliente: Cliente): Promise<Cliente | null | boolean>;
  verificarCliente(usuario: string, passw: string): Promise<Cliente | null>;
}
