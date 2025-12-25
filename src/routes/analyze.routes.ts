import { Router } from "express";
import { analyzeFileController } from "../controllers/analyze.controller";

const router = Router();

router.post("/analyze", analyzeFileController);

export default router;
