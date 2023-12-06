import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { body } from "express-validator";
import { signin } from "../handlers/admin";

const router = Router();

/**
 * @feature admin sign in
 * @route   POST /api/admin
 * @access  Public
 */
router.post(
  "/",
  body("username").isString(),
  body("password").isString(),
  handleInputErrors,
  signin,
);

export default router;
