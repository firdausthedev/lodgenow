import { Router } from "express";
import { handleInputErrors } from "../middlewares/handleInputsErrors";
import { getAllAgents, getOneAgent } from "../handlers/agent";
// import { body } from "express-validator";

const router = Router();

/**
 * @feature Get all agents
 * @route   POST /api/agent
 * @access  Public
 */
router.get("/", handleInputErrors, getAllAgents);

/**
 * @feature Get single agent
 * @route   POST /api/agent/:id
 * @access  Public
 */
router.get("/:id", handleInputErrors, getOneAgent);

export default router;
