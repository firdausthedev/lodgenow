import { Router } from "express";
import { getAllProperty, geOneProperty } from "../handlers/property";

const router = Router();

/**
 * @feature Get all properties
 * @route   GET /api/property or /api/property?type=
 * @access  Public
 */
router.get("/", getAllProperty);

/**
 * @feature Get single properties
 * @route   GET /api/property/:id
 * @access  Public
 */
router.get("/:id", geOneProperty);

export default router;
