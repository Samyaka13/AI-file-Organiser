import { Router } from "express";
import { extractTextController } from "../controllers/extract.controller";

const router = Router();

router.post("/extract", extractTextController);

export default router;
