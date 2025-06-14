import { Router } from "express";
import { summarizeEmailController } from "../controllers/email.controller";

const router = Router();

router.get("/summarize", summarizeEmailController);

export default router;