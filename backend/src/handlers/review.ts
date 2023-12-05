import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";

export const getAllReviews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json({ data: reviews, success: true });
  } catch (error) {
    next(error);
  }
};

export const getOneReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: review, success: true });
  } catch (error) {
    next(error);
  }
};
