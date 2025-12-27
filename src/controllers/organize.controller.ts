import { Request, Response } from "express";
import { extractTextFromFile } from "../utils/textExtractor";
import { getEmbedding } from "../utils/embedding.service";
import {
  loadCategories,
  saveCategories,
  Category
} from "../repositories/category.repository";
import { findBestCategory } from "../utils/findBestCategory";
import { decideCategory } from "../utils/categoryDecision";
import { createNewCategory } from "../utils/createNewCategory";
import { getDestinationPath } from "../utils/getDestinationPath";
import { dryRunMove } from "../utils/dryRunMove";
import { moveFileSafe } from "../utils/moveFileSafe";
import { logUndo } from "../utils/undoLogger";
const BASE_DIR =
  "C:/Organised Downloads"
export const organizeFileController = async (
  req: Request,
  res: Response
) => {
  try {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({
        error: "filePath is required"
      });
    }
    const extractedText = await extractTextFromFile(filePath);
    const fileEmbedding = await getEmbedding(extractedText);
    const categories: Category[] = loadCategories();
    const { bestCategory, similarityScore } =
      findBestCategory(fileEmbedding, categories);

    const decision = decideCategory(
      similarityScore,
      bestCategory
    );

    let finalCategory: Category;

    if (
      decision.action === "USE_EXISTING" &&
      bestCategory
    ) {
      bestCategory.fileCount += 1;
      finalCategory = bestCategory;
    } else {
      const newCategory = await createNewCategory(
        extractedText
      );
      newCategory.fileCount = 1;
      categories.push(newCategory);
      finalCategory = newCategory;
    }


    saveCategories(categories);


    const { categoryDir, destinationPath } =
      getDestinationPath(
        BASE_DIR,
        finalCategory.name,
        filePath
      );
    const dryRun = dryRunMove(
      filePath,
      destinationPath
    );
    if (!dryRun.safeToMove) {
      return res.status(409).json({
        error: "Unsafe to move file",
        dryRun
      });
    }

    const moveResult = moveFileSafe(
      dryRun.source,
      dryRun.destination
    );
    logUndo(dryRun.source, dryRun.destination);
    return res.json({
      category: finalCategory.name,
      confidence: decision.confidence,
      action: decision.action,
      moved: true,
      moveResult
    });
  } catch (error: any) {
    console.error("Organize Error:", error);
    return res.status(500).json({
      error: error.message
    });
  }
};

