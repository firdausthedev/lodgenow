import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import { AuthenticatedRequest } from "../utils/auth";

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

export const createReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const review = await prisma.review.create({
      data: {
        rating: req.body.rating,
        comment: req.body.comment,
        propertyId: req.body.propertyId,
        userId: req.user!.id,
      },
    });
    res.json({ data: review, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // checks if both rating and comment are undefined
    if (req.body.rating === undefined && req.body.comment === undefined) {
      return res.status(400).json({
        message: "Please provide updated rating or comment",
        success: false,
      });
    }
    const updatedReview = await prisma.review.update({
      where: { id: req.params.id, userId: req.user!.id },
      data: {
        rating: req.body.rating,
        comment: req.body.comment,
      },
    });
    res.json({ data: updatedReview, success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedReview = await prisma.review.delete({
      where: { id: req.params.id, userId: req.user!.id },
    });
    res.json({ data: deletedReview, success: true });
  } catch (error) {
    next(error);
  }
};
