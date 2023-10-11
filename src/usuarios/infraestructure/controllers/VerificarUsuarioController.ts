import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { VerificarClientesUsecase } from "../../application/VerificarUsuarioUsecase";

export class VerificarClienteController {
  constructor(readonly verificarClienteUseCase: VerificarClientesUsecase) {}

  async run(req: Request, res: Response) {
    const cliente = req.body;

    try {
      const verificacion = await this.verificarClienteUseCase.run(
        cliente.usuario,
        cliente.passw
      );

      if (verificacion != null) {
        const secretKey = "203407";
        const token = jwt.sign({ id: verificacion.id }, secretKey, {
          expiresIn: "10h",
        });

        res.send({ token });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
