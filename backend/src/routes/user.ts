import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { body } from "express-validator";
import { createUser, signin } from "../handlers/user";

const router = Router();

/**
 * @feature User sign up
 * @route   POST /api/user
 * @access  Public
 */
router.post(
  "/",
  body("username")
    .isString()
    .isLength({ min: 4, max: 32 })
    .withMessage("Username must be between 4 and 32 characters"),
  body("password")
    .isString()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_]{6,32}$/)
    .withMessage(
      `Please enter a password at least 6 character and contain At least one uppercase. At least one lower case.
       At least one number. At least one special character.`,
    ),
  handleInputErrors,
  createUser,
);

/**
 * @feature User sign in
 * @route   POST /api/user/signin
 * @access  Public
 */
router.post(
  "/signin",
  body("username").isString(),
  body("password").isString(),
  handleInputErrors,
  signin,
);

export default router;
