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
      "Please enter a password at least 6 character and contain At least one uppercase. At least one lower case. At least one number. At least one special character.",
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
  body("username").exists().notEmpty().isString(),
  body("password").exists().notEmpty().isString(),
  handleInputErrors,
  signin,
);

export default router;
