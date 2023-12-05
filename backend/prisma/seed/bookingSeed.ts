import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.booking.createMany({
    data: [
      {
        id: "6b23fb9c-22a2-461b-af72-c72a7a67x12c",
        checkIn: new Date(Date.now() - 4 * 86400000).toISOString(),
        checkOut: new Date(Date.now() - 2 * 86400000).toISOString(),
        propertyId: "1b23fb9c-22a2-461b-af72-c72a7a67b21d",
        userId: "vb23fb9c-22a2-461b-af72-c72a7a67b21d",
      },
    ],
  });
};

export default main;
