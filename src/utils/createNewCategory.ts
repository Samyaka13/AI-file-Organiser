import { getEmbedding } from "./embedding.service";
import { Category } from "../repositories/category.repository";
import { v4 as uuidv4 } from "uuid";
import { generateCategoryNameWithAI } from "./categoryNameAI";

export const createNewCategory = async (
  description: string
): Promise<Category> => {
  const embedding = await getEmbedding(description);

  const name = await generateCategoryNameWithAI(description);

  return {
    id: uuidv4(),
    name,
    description,
    embedding,
    createdAt: new Date().toISOString(),
    fileCount: 0
  };
};
