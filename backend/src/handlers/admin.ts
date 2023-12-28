import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import {
  createJWT,
  comparePasswords,
  AuthenticatedRequest,
} from "../utils/auth";

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { username: req.body.username },
    });
    if (!admin) {
      res.status(404);
      res.json({
        message: "Password and username does not match",
        success: false,
      });
      return;
    }
    const isValid = await comparePasswords(req.body.password, admin.password);

    if (!isValid) {
      res.status(401);
      res.json({
        message: "Password and username does not match",
        success: false,
      });
      return;
    }
    const token = createJWT(admin, "admin");
    res.json({ token, success: true });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const properties = await prisma.property.findMany({});
    const agents = await prisma.agent.findMany({});
    const bookings = await prisma.booking.findMany({});
    const payments = await prisma.payment.findMany({});
    const reviews = await prisma.review.findMany({});
    const users = await prisma.user.findMany({});

    const data = {
      properties: properties.length,
      agents: agents.length,
      bookings: bookings.length,
      payments: payments.length,
      reviews: reviews.length,
      users: users.length,
      admin_username: req.user!.username,
    };

    res.json({ data, success: true });
  } catch (error) {
    next(error);
  }
};
