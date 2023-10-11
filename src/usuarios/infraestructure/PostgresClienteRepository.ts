import * as crypto from "crypto";

import { pool } from "../../database";
import { Cliente } from "../domain/usuario";
import { ClienteRepository } from "../domain/UsuarioRepository";

export class PostgresClienteRepository implements ClienteRepository {
  async createCliente(cliente: Cliente): Promise<Cliente | null | boolean> {
    const sql =
      "INSERT INTO usuarios (id,usuario,passw,confirm_passw) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
      cliente.id,
      cliente.usuario,
      cliente.passw,
      cliente.confirmPassw,
    ];

    try {
      const result = await pool.query(sql, values);

      if (result.rows.length > 0) {
        return true;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async verificarCliente(
    usuario: string,
    passw: string
  ): Promise<Cliente | null> {
    const sql = "SELECT * FROM usuarios";

    const salt = "a1b2c3d4e5";
    const hash = crypto.createHash("sha256");

    const contraseñaConSalt = passw + salt;
    hash.update(contraseñaConSalt);
    const hashFinal = hash.digest("hex");

    try {
      const result = await pool.query(sql);

      const matchedRow = result.rows.find(
        (row) => row.usuario === usuario && row.passw === hashFinal
      );

      if (matchedRow) {
        const createdCliente: Cliente = {
          id: matchedRow.id,
          usuario: matchedRow.usuario,
          passw: matchedRow.passw,
          confirmPassw: matchedRow.confirmpassw,
        };

        return createdCliente;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
}
