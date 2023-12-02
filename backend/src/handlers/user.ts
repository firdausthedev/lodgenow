import { Request, Response } from "express";
import prisma from "../utils/connectDb";
import { hashPassword, createJWT, comparePasswords } from "../utils/auth";

export const createUser = async (req: Request, res: Response) => {
  const hash = await hashPassword(req.body.password);

  const findUser = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (findUser) {
    res.status(400);
    res.json({ message: "User already exists", success: false });
    return;
  }

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });

  const token = createJWT(user);
  res.json({ token, success: true });
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user) {
    res.status(401);
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

  const token = createJWT(user!);
  res.json({ token, success: true });
};
