import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { createUser } from "./handlers/user";
import { handleInputErrors } from "./middlewares/handleInputsErrors";
import { body } from "express-validator";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});
app.post(
  "/user",
  body("username")
    .exists()
    .notEmpty()
    .withMessage("Please enter a username")
    .isString()
    .isLength({ min: 4, max: 32 })
    .withMessage("Username must be between 4 and 32 characters"),
  body("password")
    .exists()
    .notEmpty()
    .withMessage("Please enter a password")
    .isString()
    .isLength({ min: 6, max: 32 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_]/)
    .withMessage(
      "Please enter a password at least 6 character and contain At least one uppercase. At least one lower case. At least one special character.",
    ),
  handleInputErrors,
  createUser,
);

export default app;
