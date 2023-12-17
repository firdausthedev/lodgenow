import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";

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
      return res.status(404).json({ error: "Agent not found" });
    }

    // Calculate total and average reviews from all the properties the agent owns
    const allProperties = agent.properties;
    const totalReviews = allProperties.reduce(
      (total, property) => total + property.reviews.length,
      0,
    );
    const averageRating =
      totalReviews > 0
        ? allProperties.reduce(
            (total, property) =>
              total +
              property.reviews.reduce((sum, review) => sum + review.rating, 0),
            0,
          ) / totalReviews
        : 0;

    const agentWithAggregate = {
      ...agent,
      totalReviews,
      averageRating,
      properties: allProperties.map(property => {
        const totalReviews = property.reviews.length;
        const averageRating =
          totalReviews > 0
            ? property.reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            : 0;

        return {
          ...property,
          totalReviews,
          averageRating,
        };
      }),
    };

    res.json({
      data: agentWithAggregate,
      success: true,
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
