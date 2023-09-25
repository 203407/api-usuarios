import { NextFunction, Request, Response } from "express";
import jwts from "jsonwebtoken";

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedAccessTypes list of allowed access types of a specific endpoint
 */
export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    // console.log(token)
    // verify request has token
    if (!token) {
      return res.status(401).json({ message: "Invalid token " });
    }

    const decodedToken = await jwts.verify(token, "203407");

    if (decodedToken) {
      next();
    } else {
      res.status(403).send({ error: "Error de inicio de sesión" });
    }

    // next();
  } catch (error) {
    res.status(500).json({ message: "Failed to authenticate user" });
  }
};
