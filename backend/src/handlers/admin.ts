import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import { createJWT, comparePasswords } from "../utils/auth";

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: req.body.username },
    });
    console.log(admin);
    const isValid = await comparePasswords(req.body.password, admin!.password);

    if (!isValid) {
      res.status(401);
      res.json({
        message: "Password and username does not match",
        success: false,
      });
      return;
    }
    const token = createJWT(admin!, "admin");
    res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};
