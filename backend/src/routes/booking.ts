import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { body, checkExact, CustomValidator, Meta } from "express-validator";
import { protectedUser } from "../utils/auth";
import {
  deleteBooking,
  getAllBookings,
  getOneBooking,
  updateBooking,
  createBooking,
} from "../handlers/booking";

const isBeforeCheckOut: CustomValidator = (value: string, { req }: Meta) => {
  const checkInDate = new Date(req.body.checkIn);
  const checkOutDate = new Date(value);

  if (checkOutDate.getTime() <= checkInDate.getTime()) {
    throw new Error("Check-out date must be after the check-in date");
  }

  return true;
};

const router = Router();

/**
 * @feature user get all bookings
 * @route   GET /api/booking
 * @access  Private
 */
router.get("/", protectedUser, getAllBookings);

/**
 * @feature user get single booking
 * @route   GET /api/booking/:id
 * @access  Private
 */
router.get("/:id", protectedUser, getOneBooking);

/**
 * @feature user create booking
 * @route   POST /api/booking
 * @access  Private
 */
router.post(
  "/",
  protectedUser,
  body("checkIn").isString(),
  body("checkOut").isString().custom(isBeforeCheckOut).toDate(),
  body("propertyId").isString(),
  handleInputErrors,
  createBooking,
);

/**
 * @feature user update booking
 * @route   PUT /api/booking/:id
 * @access  Private
 */
router.put(
  "/:id",
  protectedUser,
  checkExact([
    body("checkIn").isString(),
    body("checkOut").isString().custom(isBeforeCheckOut).toDate(),
    body("propertyId").isString(),
  ]),
  handleInputErrors,
  updateBooking,
);

/**
 * @feature user delete booking
 * @route   DELETE /api/booking/:id
 * @access  Private
 */
router.delete("/:id", protectedUser, deleteBooking);

export default router;
