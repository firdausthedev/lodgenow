import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { body, checkExact } from "express-validator";
import {
  createUser,
  deleteUser,
  getAllUsers,
  signin,
  updateUser,
} from "../handlers/user";
import { protectedAdmin, protectedUser } from "../utils/auth";

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

/**
 * @feature User update
 * @route   PUT /api/user
 * @access  Private
 */
router.put(
  "/",
  protectedUser,
  checkExact([
    body("username")
      .optional()
      .isString()
      .isLength({ min: 4, max: 32 })
      .withMessage("Username must be between 4 and 32 characters"),
    body("old_password").optional().isString(),
    body("new_password")
      .optional()
      .isString()
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&_]{6,255}$/)
      .withMessage(
        `Please enter a password at least 6 character and contain At least one uppercase. At least one lower case.
       At least one number. At least one special character.`,
      ),
  ]),
  handleInputErrors,
  updateUser,
);

/**
 * @feature User delete
 * @route   DELETE /api/user
 * @access  Private
 */
router.delete("/", protectedUser, deleteUser);

/**
 * @feature admin get all users
 * @route   GET /api/user/admin
 * @access  Private
 */
router.get("/admin", protectedAdmin, getAllUsers);

export default router;
