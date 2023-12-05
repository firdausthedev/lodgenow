import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.review.createMany({
    data: [
      {
        id: "6b23fb9c-22a2-461b-af72-c72a7a67b22c",
        rating: 5,
        comment: "It was good!",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), //minus 2 days from current date
        propertyId: "1b23fb9c-22a2-461b-af72-c72a7a67b21d",
        userId: "vb23fb9c-22a2-461b-af72-c72a7a67b21d",
      },
      {
        id: "6b23fb9c-22a2-461b-af72-c72a7a67b41d",
        rating: 3,
        comment: "It was okay!",
        createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        propertyId: "1b23fb9c-22a2-461b-af72-c72a7a67b21d",
        userId: "lb23fb9c-22a2-461b-af72-c72a7a67b21d",
      },
      {
        id: "6b23fb9c-22a2-461b-af72-c72a7a67b225",
        rating: 4,
        comment: "It was awesome!",
        createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
        propertyId: "b9d6ba46-a907-4dea-a503-b93153046099",
        userId: "vb23fb9c-22a2-461b-af72-c72a7a67b21d",
      },
    ],
  });
};

export default main;
