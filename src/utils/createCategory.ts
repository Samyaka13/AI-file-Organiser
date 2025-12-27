import { getEmbedding } from "./embedding.service";
import { Category } from "../repositories/category.repository";
import { v4 as uuidv4 } from "uuid";
import { generateCategoryName } from "./categoryName";

export const createNewCategory = async (
  description: string
): Promise<Category> => {
  const embedding = await getEmbedding(description);

  return {
    id: uuidv4(),
    name: generateCategoryName(description),
    description,
    embedding,
    createdAt: new Date().toISOString(),
    fileCount: 0
  };
};
