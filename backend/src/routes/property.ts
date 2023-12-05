import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { getAllProperty, geOneProperty } from "../handlers/property";
// import { body } from "express-validator";

const router = Router();

/**
 * @feature Get all properties
 * @route   POST /api/property or /api/properties?type=
 * @access  Public
 */
router.get("/", handleInputErrors, getAllProperty);

/**
 * @feature Get single properties
 * @route   POST /api/properties/:id
 * @access  Public
 */
router.get("/:id", handleInputErrors, geOneProperty);

export default router;
