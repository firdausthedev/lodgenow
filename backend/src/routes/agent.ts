import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import {
  createAgent,
  deleteAgent,
  getAllAgents,
  getOneAgent,
  updateAgent,
} from "../handlers/agent";
import { body } from "express-validator";
import { protectedAdmin } from "../utils/auth";

const router = Router();

/**
 * @feature Get all agents
 * @route   GET /api/agent
 * @access  Public
 */
router.get("/", getAllAgents);

/**
 * @feature Get single agent
 * @route   GET /api/agent/:id
 * @access  Public
 */
router.get("/:id", getOneAgent);

/**
 * @feature admin create a new agent
 * @route   POST /api/agent/
 * @access  Private
 */
router.post(
  "/",
  protectedAdmin,
  body("name").isString(),
  body("email").isString().isEmail(),
  body("photo").isString().isURL(),
  handleInputErrors,
  createAgent,
);

/**
 * @feature admin update an agent
 * @route   PUT /api/agent/:id
 * @access  Private
 */
router.put(
  "/:id",
  protectedAdmin,
  body("name").optional().isString(),
  body("email").optional().isString().isEmail(),
  body("photo").optional().isString().isURL(),
  handleInputErrors,
  updateAgent,
);

/**
 * @feature admin delete an agent
 * @route   DELETE /api/agent/:id
 * @access  Private
 */
router.delete("/:id", protectedAdmin, deleteAgent);

export default router;
