import * as crypto from "crypto";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { CreateClientesUsecase } from "../../application/CreateUsuarioUsecase";
import { Cliente } from "../../domain/usuario";

export class CreateClienteController {
  constructor(readonly createClienteUseCase: CreateClientesUsecase) {}

  async run(req: Request, res: Response) {
    const formData = req.body;

    const uniqueId = String(uuidv4());

    const salt = "a1b2c3d4e5";
    const hash = crypto.createHash("sha256");
    const contraseñaConSalt = formData.passw + salt;
    hash.update(contraseñaConSalt);
    const hashFinal = hash.digest("hex");

    try {
      const clienteData = await this.createClienteUseCase.run(
        new Cliente(uniqueId, formData.usuario, hashFinal, hashFinal)
      );
      res.status(200).json(clienteData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
