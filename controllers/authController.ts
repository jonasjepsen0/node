import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma.js';

class AuthController {
  generateToken = (
    user: { id: number },
    type: "access" | "refresh"
  ) => {
    const key = process.env[`TOKEN_${type.toUpperCase()}_KEY`];
    const expiresIn = process.env[`TOKEN_${type.toUpperCase()}_EXPIRATION_SECS`];

    if (!key || !expiresIn) {
      throw new Error(`Mangler env vars for ${type} token`);
    }

    const exp = Math.floor(Date.now() / 1000) + Number(expiresIn);

    return jwt.sign(
      {
        exp,
        data: { id: user.id }
      },
      key
    );
  };

  authenticate = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "Missing credentials" });
      return;
    }

    try {
      const user = await prisma.user.findFirst({
        where: {
          email: username,
          isActive: true
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          password: true
        }
      });

      if (!user) {
        res.sendStatus(401);
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.sendStatus(401);
        return;
      }

      const accessToken = this.generateToken(user, "access");

      res.json({
        accessToken,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname
        }
      });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}

export const authController = new AuthController();