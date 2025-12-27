import fs from "fs";
import path from "path";

const CATEGORY_FILE = path.join(
  __dirname,
  "../data/categories.json"
);

export interface Category {
  id: string;
  name: string;
  description: string;
  embedding: number[];
  createdAt: string;
  fileCount: number;
}

export const loadCategories = (): Category[] => {
  if (!fs.existsSync(CATEGORY_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(CATEGORY_FILE, "utf-8");
  return JSON.parse(raw);
};

export const saveCategories = (categories: Category[]) => {
  fs.writeFileSync(
    CATEGORY_FILE,
    JSON.stringify(categories, null, 2)
  );
};
