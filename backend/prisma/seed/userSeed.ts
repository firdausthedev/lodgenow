import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./../../src/utils/auth";

import config from "../../src/config";
const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
        id: "vb23fb9c-22a2-461b-af72-c72a7a67b21d",
        username: "username_1",
        password: await hashPassword(config.user_default_password),
      },
      {
        id: "lb23fb9c-22a2-461b-af72-c72a7a67b21d",
        username: "username_2",
        password: await hashPassword(config.user_default_password),
      },
    ],
  });
};

export default main;
