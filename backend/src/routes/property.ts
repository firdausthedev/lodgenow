import { Router } from "express";
// import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { getAllProperty, geOneProperty } from "../handlers/property";
// import { body } from "express-validator";

const router = Router();

/**
 * @feature Get all properties
 * @route   GET /api/property or /api/properties?type=
 * @access  Public
 */
router.get("/", getAllProperty);

/**
 * @feature Get single properties
 * @route   GET /api/properties/:id
 * @access  Public
 */
router.get("/:id", geOneProperty);

export default router;
