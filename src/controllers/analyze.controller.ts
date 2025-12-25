import { Request, Response } from "express";
import { extractTextFromFile } from "../utils/textExtractor";
import { getEmbedding } from "../utils/embedding.service";

export const analyzeFileController = async (req: Request, res: Response) => {
    const { filePath } = req.body;

    if (!filePath) {
        return res.status(400).json({ error: "filePath required" });
    }

    const extractedText = await extractTextFromFile(filePath);

    const fileEmbedding = await getEmbedding(extractedText);

    return res.json({
        extractedPreview: extractedText.substring(0, 300),
        embeddingVectorSize: fileEmbedding.length
    });
};
