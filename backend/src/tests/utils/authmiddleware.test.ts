import request from "supertest";
import express, { Express, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { protectedAdmin, protectedUser } from "../../utils/auth";

const app: Express = express();

// mocking a procted user route
app.get("/user-protected", protectedUser, (req: Request, res: Response) => {
  res.status(200).json({ message: "User route protected", success: true });
});

// mocking a procted admin route
app.get("/admin-protected", protectedAdmin, (req: Request, res: Response) => {
  res.status(200).json({ message: "Admin route protected", success: true });
});

process.env.JWT_SECRET = "test-secret";

describe("Authentication Middleware Tests", () => {
  it("should allow access to user-protected route with a valid user token", async () => {
    const userToken = jwt.sign(
      { id: "1", username: "user_test", role: "user" },
      "test-secret",
    );

    await request(app)
      .get("/user-protected")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(200)
      .expect({
        message: "User route protected",
        success: true,
      });
  });

  it("should deny access to user-protected route with an invalid token", async () => {
    await request(app)
      .get("/user-protected")
      .set("Authorization", "Bearer invalid-token")
      .expect(401)
      .expect({ message: "Unauthorized: Invalid token", success: false });
  });

  it("should deny access to admin-protected route with a valid user token", async () => {
    const userToken = jwt.sign(
      { id: "1", username: "user_test", role: "user" },
      "test-secret",
    );

    await request(app)
      .get("/admin-protected")
      .set("Authorization", `Bearer ${userToken}`)
      .expect(403)
      .expect({
        message: "Forbidden: Insufficient privileges",
        success: false,
      });
  });

  it("should allow access to admin-protected route with a valid admin token", async () => {
    const adminToken = jwt.sign(
      { id: "2", username: "admin_test", role: "admin" },
      "test-secret",
    );

    await request(app)
      .get("/admin-protected")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200)
      .expect({
        message: "Admin route protected",
        success: true,
      });
  });
});
