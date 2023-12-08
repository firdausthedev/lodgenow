import { Request, Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import { AuthenticatedRequest } from "../utils/auth";
import { isBookingClash } from "./../utils/booking";

export const getAllPayments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        booking: {
          userId: req.user!.id,
        },
      },
      include: {
        booking: true,
      },
    });

    res.json({ data: payments, success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllPaymentsAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        booking: true,
      },
    });

    res.json({ data: payments, success: true });
  } catch (error) {
    next(error);
  }
};

export const getOnePayment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payment = await prisma.payment.findFirst({
      where: {
        id: req.params.id,
        booking: {
          userId: req.user!.id,
        },
      },
    });
    res.json({ data: payment, success: true });
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payment = await prisma.payment.create({
      data: {
        amount: req.body.amount,
        status: "PENDING",
        bookingId: req.body.bookingId,
      },
    });
    res.json({ data: payment, success: true });
  } catch (error) {
    next(error);
  }
};

export const updatePayment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payment = await prisma.payment.findFirst({
      where: {
        id: req.params.id,
        booking: {
          userId: req.user!.id,
        },
      },
    });

    if (payment && payment.status === "COMPLETED") {
      return res.status(400).json({
        message: "Payment is already completed",
        success: false,
      });
    }

    const isClashed = await isBookingClash(req);

    if (isClashed) {
      return res.status(404).json({
        message:
          "Booking clash: There is already a booking for the specified dates",
        success: false,
      });
    }

    const updatedPayment = await prisma.payment.update({
      where: {
        id: req.params.id,
        booking: {
          userId: req.user!.id,
        },
      },
      data: {
        status: req.body.status,
      },
    });

    res.json({ data: updatedPayment, success: true });
  } catch (error) {
    next(error);
  }
};

export const deletePayment = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedPayment = await prisma.payment.delete({
      where: {
        id: req.params.id,
        booking: {
          userId: req.user!.id,
        },
      },
    });

    res.json({
      message: deletedPayment,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
