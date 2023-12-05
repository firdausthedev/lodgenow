import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./../../src/utils/auth";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        id: "vb23fb9c-22a2-461b-af72-c72a7a67b21d",
        username: "mary_ann",
        password: await hashPassword(process.env.USER_DEFAULT_PASSWORD!),
      },
      {
        id: "lb23fb9c-22a2-461b-af72-c72a7a67b21d",
        username: "jerry_smith",
        password: await hashPassword(process.env.USER_DEFAULT_PASSWORD!),
      },
    ],
  });
};

export default main;
