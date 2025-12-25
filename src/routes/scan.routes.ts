import { Router } from "express";
import { scanController } from "../controllers/scan.controller";

const router = Router();

router.post("/scan", scanController);

export default router;
