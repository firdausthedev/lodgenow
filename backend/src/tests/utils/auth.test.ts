import { hashPassword, createJWT, comparePasswords } from "../../utils/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("auth funntions", () => {
  describe("hashPassword", () => {
    it("should hash the password using bcrypt", async () => {
      const mockHash = "hashedPassword";
      (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

      const password = "myPassword";
      const result = await hashPassword(password);

      expect(result).toBe(mockHash);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    });
  });

  describe("createJWT", () => {
    it("should create a JWT token using jsonwebtoken", () => {
      const mockToken = "fakeToken";
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const user = { id: "1", username: "testUser", password: "testPassword" };
      const role = "user";
      const result = createJWT(user, role);

      expect(result).toBe(mockToken);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, username: user.username, role: role },
        process.env.JWT_SECRET!,
      );
    });
  });

  describe("comparePasswords", () => {
    it("should compare passwords using bcrypt", async () => {
      const mockComparison = true;
      (bcrypt.compare as jest.Mock).mockResolvedValue(mockComparison);

      const password = "myPassword";
      const hash = "hashedPassword";
      const result = await comparePasswords(password, hash);

      expect(result).toBe(mockComparison);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
  });
});
