import fs from "fs";
import path from "path";
import { organizeSingleFile } from "./organizeFile.service";

export const batchOrganizeFolder = async (
  folderPath: string
) => {
  const entries = fs.readdirSync(folderPath);

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry);
    const stats = fs.statSync(fullPath);

    // Skip directories
    if (stats.isDirectory()) continue;

    // Skip hidden/system files
    if (entry.startsWith(".")) continue;

    await organizeSingleFile(fullPath);
  }

  console.log("✅ Batch organization completed");
};
