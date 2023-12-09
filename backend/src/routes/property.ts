import { Router } from "express";
import { getAllProperty, geOneProperty } from "../handlers/property";
import { query } from "express-validator";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
const router = Router();

/**
 * @feature Get all properties
 * @route   GET /api/property
 * @access  Public
 */
router.get(
  "/",
  query("type").optional().isIn(["CITY", "RURAL", "MOUNTAIN", "TROPICAL"]),
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1 }),
  handleInputErrors,
  getAllProperty,
);

/**
 * @feature Get single properties
 * @route   GET /api/property/:id
 * @access  Public
 */
router.get("/:id", geOneProperty);

export default router;
