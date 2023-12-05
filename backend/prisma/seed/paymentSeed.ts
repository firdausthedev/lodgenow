import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.payment.createMany({
    data: [
      {
        id: "6b23fb9c-22a2-461b-af72-c72a7a671234",
        amount: 500.0,
        bookingId: "6b23fb9c-22a2-461b-af72-c72a7a67x12c",
        status: "COMPLETED",
      },
    ],
  });
};

export default main;
