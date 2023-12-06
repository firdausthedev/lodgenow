import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getOneReview,
  updateReview,
} from "../handlers/review";
import { body } from "express-validator";
import { protectedUser } from "../utils/auth";

const router = Router();

/**
 * @feature Get all reviews
 * @route   GET /api/reviews
 * @access  Public
 */
router.get("/", getAllReviews);

/**
 * @feature Get single review
 * @route   GET /api/review/:id
 * @access  Public
 */
router.get("/:id", getOneReview);

/**
 * @feature user create a review
 * @route   POST /api/review/
 * @access  Private
 */
router.post(
  "/",
  protectedUser,
  body("rating").isInt({ min: 0, max: 5 }),
  body("comment").optional().isString().isLength({ min: 5, max: 255 }),
  body("propertyId").isString(),
  handleInputErrors,
  createReview,
);

/**
 * @feature user update a review
 * @route   PUT /api/review/:id
 * @access  Private
 */
router.put(
  "/:id",
  protectedUser,
  body("rating").optional().isInt({ min: 0, max: 5 }),
  body("comment").optional().isString().isLength({ min: 5, max: 255 }),
  handleInputErrors,
  updateReview,
);

/**
 * @feature user delete a review
 * @route   DELETE /api/review/:id
 * @access  Private
 */
router.delete("/:id", protectedUser, deleteReview);

export default router;
