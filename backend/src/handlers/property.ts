import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";

export const getAllProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.query.type) {
      const { type } = req.query;
      if (
        type !== "CITY" &&
        type !== "RURAL" &&
        type !== "MOUNTAIN" &&
        type !== "TROPICAL"
      ) {
        return res
          .status(400)
          .json({ message: "Invalid type", success: false });
      }
      const propertiesByType = await prisma.property.findMany({
        where: {
          type: type,
        },
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          location: true,
          price: true,
          photos: true,
          type: true,
          agent: {
            select: {
              id: true,
              photo: true,
            },
          },
          reviews: {
            select: {
              id: true,
              rating: true,
            },
          },
        },
      });
      return res.json({ data: propertiesByType, success: true });
    } else {
      const properties = await prisma.property.findMany({
        orderBy: {
          type: "asc",
        },
        select: {
          id: true,
          name: true,
          location: true,
          price: true,
          photos: true,
          type: true,
          agent: {
            select: {
              id: true,
              photo: true,
            },
          },
          reviews: {
            select: {
              id: true,
              rating: true,
            },
          },
        },
      });
      res.json({ data: properties, success: true });
    }
  } catch (error) {
    next(error);
  }
};

export const geOneProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        agent: true,
        reviews: true,
      },
    });
    res.json({ data: property, success: true });
  } catch (error) {
    next(error);
  }
};
