import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./../../src/utils/auth";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.admin.create({
    data: {
      id: "1b23fb9c-22a2-461b-af72-c72a7a67156",
      password: await hashPassword(process.env.ADMIN_DEFAULT_PASSWORD!),
      username: process.env.ADMIN_DEFAULT_USERNAME!,
    },
  });
};

export default main;
