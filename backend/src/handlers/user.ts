import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import { hashPassword, createJWT, comparePasswords } from "../utils/auth";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });

    const token = createJWT(user, "user");
    res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (!user) {
      res.status(404);
      res.json({
        message: "User does not exist",
        success: false,
      });
      return;
    }

    const isValid = await comparePasswords(req.body.password, user!.password);

    if (!isValid) {
      res.status(401);
      res.json({
        message: "Password and username does not match",
        success: false,
      });
      return;
    }
    const token = createJWT(user!, "user");
    res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};
