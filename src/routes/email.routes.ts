import { Router } from "express";
import { summarizeEmailController } from "../controllers/email.controller";

const router = Router();

/**
 * @swagger
 * /summarize:
 *   get:
 *     summary: Get summarized emails
 *     description: Fetches the latest emails from Gmail and returns Gemini-generated summaries.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 summaries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       summary:
 *                         type: string
 */
router.get("/summarize", summarizeEmailController);

export default router;