import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import { calculateAverageRating } from "../utils/reviews";

export const getAllAgents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        properties: false,
      },
    });
    res.json({ data: agents, success: true });
  } catch (error) {
    next(error);
  }
};

export const getOneAgent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const agent = await prisma.agent.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        properties: {
          include: {
            reviews: true,
          },
        },
      },
    });

    if (!agent) {
      return res.status(404).json({
        message: "Invalid agentId",
        success: false,
      });
    }
    const totalRatings = agent.properties.flatMap(property =>
      property.reviews.map(review => review.rating),
    );

    const avgRating = calculateAverageRating(totalRatings);

    res.json({
      data: agent,
      success: true,
      averageRating: avgRating,
      totalReviews: totalRatings.length,
    });
  } catch (error) {
    next(error);
  }
};

export const createAgent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const agent = await prisma.agent.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
      },
    });
    res.json({ data: agent, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateAgent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedAgent = await prisma.agent.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ data: updatedAgent, success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteAgent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedAgent = await prisma.agent.delete({
      where: { id: req.params.id },
    });

    return res.json({ data: deletedAgent, success: true });
  } catch (error) {
    next(error);
  }
};
