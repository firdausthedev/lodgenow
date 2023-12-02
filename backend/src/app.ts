import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { createUser } from "./handlers/user";

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

app.post("/user", createUser);

export default app;
