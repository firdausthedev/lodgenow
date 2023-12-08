import { Router } from "express";
import { getAllAgents, getOneAgent } from "../handlers/agent";

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

export default router;
