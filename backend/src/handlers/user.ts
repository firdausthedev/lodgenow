import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import {
  hashPassword,
  createJWT,
  comparePasswords,
  AuthenticatedRequest,
} from "../utils/auth";

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
        message: "Password and username does not match",
        success: false,
      });
      return;
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401);
      res.json({
        message: "Password and username does not match",
        success: false,
      });
      return;
    }
    const token = createJWT(user, "user");
    res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        username: true,
        id: true,
        bookings: true,
        Review: true,
      },
    });

    res.json({ message: users, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.new_password) {
      if (!req.body.old_password) {
        res.status(400);
        res.json({
          message: "Please provide old password",
          success: false,
        });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
      });

      if (!user) {
        res.status(404);
        res.json({
          message: "User does not exist",
          success: false,
        });
        return;
      }

      const isValid = await comparePasswords(
        req.body.old_password,
        user.password,
      );

      if (!isValid) {
        res.status(401);
        res.json({
          message: "Password and username does not match",
          success: false,
        });
        return;
      }

      const hashedPassword = await hashPassword(req.body.new_password);
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          username: req.body.username,
          password: hashedPassword,
        },
        select: {
          username: true,
        },
      });
      res.json({ message: updatedUser, success: true });
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          username: req.body.username,
        },
      });

      res.json({ message: updatedUser, success: true });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: req.user!.id },
      select: {
        username: true,
      },
    });

    res.json({ message: deletedUser, success: true });
  } catch (error) {
    next(error);
  }
};
