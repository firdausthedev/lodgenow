import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";

interface Pagination {
  next?: {
    page: number;
    limit: number;
  };
  prev?: {
    page: number;
    limit: number;
  };
}

export const getAllProperty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await prisma.property.count();

    const pagination: Pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

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
        skip: startIndex,
        take: limit,
      });

      const propertiesWithAggregate = propertiesByType.map(property => {
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
      });

      res.json({
        pagination,
        count: propertiesByType.length,
        data: propertiesWithAggregate,
        success: true,
      });
    } else {
      const properties = await prisma.property.findMany({
        orderBy: {
          type: "asc",
        },
        select: {
          _count: true,
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
        skip: startIndex,
        take: limit,
      });

      const propertiesWithAggregate = properties.map(property => {
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
      });

      res.json({
        pagination,
        count: properties.length,
        data: propertiesWithAggregate,
        success: true,
      });
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
