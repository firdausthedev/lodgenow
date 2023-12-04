import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res
        .json({
          message: `There is a unique constraint violation on ${err.meta?.target}`,
          success: false,
        })
        .status(401);
    }
  } else {
    // uncaught errors
    return res.json({ message: "server error", success: false }).status(500);
  }
};