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
        properties: true,
      },
    });
    res.json({ data: agent, success: true });
  } catch (error) {
    next(error);
  }
};
