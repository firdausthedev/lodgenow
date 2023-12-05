import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { getAllReviews, getOneReview } from "../handlers/review";
// import { body } from "express-validator";

const router = Router();

/**
 * @feature Get all reviews
 * @route   POST /api/reviews
 * @access  Public
 */
router.get("/", handleInputErrors, getAllReviews);

/**
 * @feature Get single review
 * @route   POST /api/review/:id
 * @access  Public
 */
router.get("/:id", handleInputErrors, getOneReview);

export default router;
