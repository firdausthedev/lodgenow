import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Admin } from "@prisma/client";

interface UserReq {
  id: string;
  username: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: UserReq;
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const createJWT = (user: User | Admin, role: string) => {
  const token = jwt.sign(
    { id: user.id, username: user.username, role: role },
    process.env.JWT_SECRET!,
  );
  return token;
};

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

const protectedMiddleware = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing token", success: false });
    }

    const tokenParts = bearer.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Unauthorized: Invalid token format",
        success: false,
      });
    }

    const token = tokenParts[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserReq;
      req.user = payload;

      if (req.user.role === requiredRole) {
        next();
      } else {
        return res.status(403).json({
          message: "Forbidden: Insufficient privileges",
          success: false,
        });
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", success: false });
    }
  };
};

export const protectedUser = protectedMiddleware("user");
export const protectedAdmin = protectedMiddleware("admin");
