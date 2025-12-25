import { Request, Response } from "express";
import { scanFolder } from "../utils/fileScanner";

export const scanController = (req: Request, res: Response) => {
    const { folderPath } = req.body;

    if (!folderPath || typeof folderPath !== "string") {
        return res.status(400).json({ error: "Valid folderPath is required" });
    }

    try {
        const files = scanFolder(folderPath);
        return res.json({
            count: files.length,
            files
        });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
};
