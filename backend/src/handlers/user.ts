import { Request, Response } from "express";
import prisma from "../utils/connectDb";
import { hashPassword, createJWT } from "../utils/auth";

export const createUser = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token });
};
