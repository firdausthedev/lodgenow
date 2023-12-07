import { Router } from "express";
import {
  getAllProperty,
  geOneProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getAllPropertyAdmin,
} from "../handlers/property";
import { protectedAdmin } from "../utils/auth";
import { body, checkExact } from "express-validator";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
const router = Router();

/**
 * @feature Get all properties
 * @route   GET /api/property or /api/property?type=
 * @access  Public
 */
router.get("/", getAllProperty);

/**
 * @feature admin get all property
 * @route   GET /api/property/admin
 * @access  Private
 */
router.get("/admin", protectedAdmin, getAllPropertyAdmin);

/**
 * @feature Get single properties
 * @route   GET /api/property/:id
 * @access  Public
 */
router.get("/:id", geOneProperty);

/**
 * @feature admin create property
 * @route   POST /api/property/admin
 * @access  Private
 */
router.post(
  "/admin",
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
 * @route   PUT /api/property/admin/:id
 * @access  Private
 */
router.put(
  "/admin/:id",
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
 * @route   DELETE /api/property/admin/:id
 * @access  Private
 */
router.delete("/admin/:id", protectedAdmin, deleteProperty);

export default router;
