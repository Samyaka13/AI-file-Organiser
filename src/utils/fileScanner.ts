import fs from "fs";
import path from "path";
import { ScannedFile } from "../types/files.types";

export const scanFolder = (folderPath: string): ScannedFile[] => {
  const files = fs.readdirSync(folderPath);

  return files.map((file): ScannedFile => {
    const fullPath = path.join(folderPath, file);
    const stats = fs.statSync(fullPath);

    return {
      name: file,
      path: fullPath,
      extension: path.extname(file),
      size: stats.size,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    };
  });
};
