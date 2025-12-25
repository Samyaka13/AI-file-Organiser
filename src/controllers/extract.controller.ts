import { Request, Response } from "express";
import { extractTextFromFile } from "../utils/textExtractor";

export const extractTextController = async (req: Request, res: Response) => {
    const { filePath } = req.body;

    if (!filePath || typeof filePath !== "string") {
        return res.status(400).json({ error: "Valid filePath is required" });
    }

    try {
        const text = await extractTextFromFile(filePath);

        return res.json({
            filePath,
            preview: text.substring(0, 500) // avoid huge payload
        });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
