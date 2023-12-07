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
        where: { type: type },
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

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const property = await prisma.property.create({
      data: req.body,
    });
    res.json({ data: property, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedProperty = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ data: updatedProperty, success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedProperty = await prisma.property.delete({
      where: { id: req.params.id },
    });
    res.json({ data: deletedProperty, success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllPropertyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        agent: true,
        reviews: true,
        bookings: {
          include: {
            user: { select: { username: true, id: true } },
            payment: true,
          },
        },
      },
    });
    res.json({ data: properties, success: true });
  } catch (error) {
    next(error);
  }
};
