import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.agent.createMany({
    data: [
      {
        id: "6b23fb9c-22a2-461b-af72-c72a7a67b21d",
        name: "Peter Doe",
        email: "peterdoe@example.com",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      },
      {
        id: "adf2939b-8283-4694-9621-93b141f07a23",
        name: "Mary Doe",
        email: "marydoe@example.com",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
      {
        id: "c9d6ba46-a907-4dea-a503-b93153046099",
        name: "Alice Smith",
        email: "alice@example.com",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      },
      {
        id: "d6d53280-bb84-4e6f-838b-b9e1d4b13d26",
        name: "Bob Johnson",
        email: "bob@example.com",
        photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      },
      {
        id: "ff2f0c0f-750d-460e-bb7e-4ebec8135380",
        name: "Eve Anderson",
        email: "eve@example.com",
        photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
      },
    ],
  });
};

export default main;
