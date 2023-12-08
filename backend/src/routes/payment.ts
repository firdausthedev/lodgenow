import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { body, checkExact } from "express-validator";
import { protectedUser } from "./../utils/auth";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getOnePayment,
  updatePayment,
} from "../handlers/payment";

const router = Router();

/**
 * @feature user get all payment
 * @route   GET /api/payment
 * @access  Private
 */
router.get("/", protectedUser, getAllPayments);

/**
 * @feature user get single payment
 * @route   GET /api/payment/:id
 * @access  Private
 */
router.get("/:id", protectedUser, getOnePayment);

/**
 * @feature user create payment
 * @route   POST /api/payment
 * @access  Private
 */
router.post(
  "/",
  protectedUser,
  body("amount").isFloat({ min: 1 }),
  body("bookingId").isString(),
  handleInputErrors,
  createPayment,
);

/**
 * @feature user update payment
 * @route   PUT /api/payment/:id
 * @access  Private
 */
router.put(
  "/:id",
  protectedUser,
  checkExact([body("status").isIn(["COMPLETED", "FAILED"])]),
  handleInputErrors,
  updatePayment,
);

/**
 * @feature user delete payment
 * @route   DELETE /api/payment/:id
 * @access  Private
 */
router.delete("/:id", protectedUser, deletePayment);

export default router;
