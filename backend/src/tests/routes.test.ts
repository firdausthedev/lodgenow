import app from "../app";
import request from "supertest";

describe("GET /", function () {
  it("say hello", async () => {
    const res = await request(app).get("/");

    expect(res.body.message).toBe("hello");
  });
});
