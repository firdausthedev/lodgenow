import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
  );
  return token;
};
