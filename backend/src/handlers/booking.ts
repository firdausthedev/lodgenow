import { Response, NextFunction } from "express";
import prisma from "../utils/connectDb";
import { AuthenticatedRequest } from "../utils/auth";
import { isBookingClash } from "../utils/booking";

export const getAllBookings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.user!.id,
      },
      select: {
        id: true,
        property: {
          select: {
            name: true,
          },
        },
        payment: {
          select: {
            status: true,
          },
        },
      },
    });

    res.json({ data: bookings, success: true });
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        payment: true,
      },
    });

    res.json({ data: bookings, success: true });
  } catch (error) {
    next(error);
  }
};

export const getOneBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const booking = await prisma.booking.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
      include: {
        payment: true,
        property: true,
      },
    });
    res.json({ data: booking, success: true });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isClashed = await isBookingClash(req);

    if (isClashed) {
      res.status(404);
      return res.json({
        message:
          "Booking clash: There is already a booking for the specified dates",
        success: false,
      });
    }

    const pendingBookings = await prisma.booking.findMany({
      where: {
        userId: req.user!.id,
        propertyId: req.body.propertyId,
        payment: null,
      },
    });

    if (pendingBookings.length > 0) {
      res.status(404);
      return res.json({
        message: "You have a pending booking for this property",
        success: false,
      });
    }

    const booking = await prisma.booking.create({
      data: {
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        propertyId: req.body.propertyId,
        userId: req.user!.id,
      },
    });

    res.json({ message: booking, success: true });
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isClashed = await isBookingClash(req);

    if (isClashed) {
      return res.status(404).json({
        message:
          "Booking clash: There is already a booking for the specified dates",
        success: false,
      });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
      data: req.body,
    });

    res.json({ data: updatedBooking, success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedBooking = await prisma.booking.delete({
      where: {
        id: req.params.id,
        userId: req.user!.id,
      },
    });

    res.json({
      message: deletedBooking,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
