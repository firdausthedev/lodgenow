import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/user";
import agentRouter from "./routes/agent";
import propertyRouter from "./routes/property";
import reviewRouter from "./routes/review";
import paymentRouter from "./routes/payment";
import bookingRouter from "./routes/booking";
import adminRouter from "./routes/admin";

import { errorHandler } from "./middlewares/errors";
import config from "./config";

const app = express();

app.use(cors());

if (config.logging) {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello" });
});
app.use("/api/user", userRouter);
app.use("/api/agent", agentRouter);
app.use("/api/property", propertyRouter);
app.use("/api/review", reviewRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);

app.use(errorHandler);

export default app;
