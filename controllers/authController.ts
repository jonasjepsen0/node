import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma.js';

interface JwtPayload {
  exp: number;
  data: {
    id: number;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

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

  authorize = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token not accepted" });
      return;
    }

    const token = bearerHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_ACCESS_KEY!
      ) as JwtPayload;

      req.user = decoded.data;
      next();

    } catch (error: any) {
      res.status(403).json({ message: error.message });
    }
  };
}

export const authController = new AuthController();