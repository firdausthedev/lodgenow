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
      res.status(401);
      return res.json({
        message: `There is a unique constraint violation on ${err.meta?.target}`,
        errCode: err.code,
        success: false,
      });
    } else {
      res.status(404);
      return res.json({ message: err.meta, errCode: err.code, success: false });
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(401);
    return res.json({ message: "Unknown field", success: false });
  } else {
    // uncaught errors
    res.status(500);
    return res.json({ message: "server error", success: false });
  }
};
