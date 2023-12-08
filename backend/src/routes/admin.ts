import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { body, checkExact } from "express-validator";
import { signin } from "../handlers/admin";
import { getAllBookingsAdmin } from "../handlers/booking";
import { protectedAdmin } from "../utils/auth";
import { getAllPaymentsAdmin } from "../handlers/payment";
import {
  createProperty,
  deleteProperty,
  getAllPropertyAdmin,
  updateProperty,
} from "../handlers/property";
import { createAgent, deleteAgent, updateAgent } from "../handlers/agent";

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

/**
 * @feature admin get all bookings
 * @route   GET /api/admin/booking
 * @access  Private
 */
router.get("/booking", protectedAdmin, getAllBookingsAdmin);

/**
 * @feature admin get all payment
 * @route   GET /api/admin/payment
 * @access  Private
 */
router.get("/payment", protectedAdmin, getAllPaymentsAdmin);

/**
 * @feature admin get all property
 * @route   GET /api/admin/property
 * @access  Private
 */
router.get("/property", protectedAdmin, getAllPropertyAdmin);

/**
 * @feature admin create property
 * @route   POST /api/admin/property/
 * @access  Private
 */
router.post(
  "/property",
  protectedAdmin,
  body("name").isString().isLength({ min: 5, max: 255 }),
  body("location").isString().isLength({ min: 5, max: 255 }),
  body("price").isFloat({ min: 1 }),
  body("bedrooms").isInt({ min: 0 }),
  body("bathrooms").isInt({ min: 0 }),
  body("photos").isArray({ min: 1, max: 5 }),
  body("type").isIn(["CITY", "RURAL", "MOUNTAIN", "TROPICAL"]),
  body("agentId").isString(),
  handleInputErrors,
  createProperty,
);

/**
 * @feature admin update property
 * @route   PUT /api/admin/property/:id
 * @access  Private
 */
router.put(
  "/property/:id",
  protectedAdmin,
  checkExact([
    body("name").isString().isLength({ min: 5, max: 255 }),
    body("location").isString().isLength({ min: 5, max: 255 }),
    body("price").isFloat({ min: 1 }),
    body("bedrooms").isInt({ min: 0 }),
    body("bathrooms").isInt({ min: 0 }),
    body("photos").isArray({ min: 1, max: 5 }),
    body("type").isIn(["CITY", "RURAL", "MOUNTAIN", "TROPICAL"]),
    body("agentId").isString(),
  ]),
  handleInputErrors,
  updateProperty,
);

/**
 * @feature admin delete property
 * @route   DELETE /api/admin/property/:id
 * @access  Private
 */
router.delete("/property/:id", protectedAdmin, deleteProperty);

/**
 * @feature admin create a new agent
 * @route   POST /api/admin
 * @access  Private
 */
router.post(
  "/agent",
  protectedAdmin,
  body("name").isString(),
  body("email").isString().isEmail(),
  body("photo").isString().isURL(),
  handleInputErrors,
  createAgent,
);

/**
 * @feature admin update an agent
 * @route   PUT /api/admin/agent/:id
 * @access  Private
 */
router.put(
  "/agent/:id",
  protectedAdmin,
  checkExact([
    body("name").optional().isString(),
    body("email").optional().isString().isEmail(),
    body("photo").optional().isString().isURL(),
  ]),
  handleInputErrors,
  updateAgent,
);

/**
 * @feature admin delete an agent
 * @route   DELETE /api/admin/agent/:id
 * @access  Private
 */
router.delete("/agent/:id", protectedAdmin, deleteAgent);

export default router;
