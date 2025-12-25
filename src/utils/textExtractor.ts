import fs from "fs";
import path from "path";
// const pdfParse = require("pdf-parse");
import { PDFParse } from "pdf-parse";

import mammoth from "mammoth";
import Tesseract from "tesseract.js";

export const extractTextFromFile = async (filePath: string): Promise<string> => {
    const extension = path.extname(filePath).toLowerCase();

    switch (extension) {
        case ".pdf":
            return extractFromPDF(filePath);

        case ".docx":
            return extractFromDOCX(filePath);

        case ".txt":
            return extractFromTXT(filePath);

        case ".png":
        case ".jpg":
        case ".jpeg":
            return extractFromImage(filePath);

        default:
            return "";
    }
};
const extractFromPDF = async (filePath: string): Promise<string> => {
    const parser = new PDFParse({ url: filePath });

    const data = await parser.getText();

    await parser.destroy();

    return data.text || "";
}

const extractFromDOCX = async (filePath: string): Promise<string> => {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
};
const extractFromTXT = async (filePath: string): Promise<string> => {
    return fs.readFileSync(filePath, "utf-8");
};
const extractFromImage = async (filePath: string): Promise<string> => {
    const result = await Tesseract.recognize(filePath, "eng");
    return result.data.text || "";
};