import prisma from "./connectDb";
import { Request } from "express";
export const isBookingClash = async (req: Request) => {
  const bookings = await prisma.booking.findMany({
    where: {
      propertyId: req.body.propertyId,
      OR: [
        {
          AND: [
            { checkIn: { lte: req.body.checkIn } },
            { checkOut: { gte: req.body.checkIn } },
          ],
        },
        {
          AND: [
            { checkIn: { lte: req.body.checkOut } },
            { checkOut: { gte: req.body.checkOut } },
          ],
        },
        {
          AND: [
            { checkIn: { gte: req.body.checkIn } },
            { checkOut: { lte: req.body.checkOut } },
          ],
        },
      ],
      payment: {
        status: "COMPLETED",
      },
    },
  });
  if (bookings.length > 0) {
    return true;
  }
  return false;
};
