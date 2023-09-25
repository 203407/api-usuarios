import * as crypto from "crypto";

import { pool } from "../../database";
import { Cliente } from "../domain/usuario";
import { ClienteRepository } from "../domain/UsuarioRepository";
// const jwt = require("jsonwebtoken")

// import jwt from "jsonwebtoken";

// const secret = "203407"

export class PostgresClienteRepository implements ClienteRepository {
  async createCliente(cliente: Cliente): Promise<Cliente | null | boolean> {
    const sql1 = "SELECT * FROM usuarios";

    try {
      const result = await pool.query(sql1);

      const matchedRow = result.rows.find(
        (row) => row.correo === cliente.usuario
      );

      if (matchedRow) {
        return false;
      } else {
        const sql =
          "INSERT INTO usuarios (id,usuario,passw) VALUES ($1, $2, $3) RETURNING *";
        const values = [cliente.id, cliente.usuario, cliente.passw];

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
        };

        return createdCliente;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }
}
