// import fs from "fs";
// import path from "path";
// import { organizeSingleFile } from "./organizeFile.service";

// export const batchOrganizeFolder = async (
//   folderPath: string
// ) => {
//   const entries = fs.readdirSync(folderPath);

//   for (const entry of entries) {
//     const fullPath = path.join(folderPath, entry);
//     const stats = fs.statSync(fullPath);

//     // Skip directories
//     if (stats.isDirectory()) continue;

//     // Skip hidden/system files
//     if (entry.startsWith(".")) continue;

//     await organizeSingleFile(fullPath);
//   }

//   console.log("✅ Batch organization completed");
// };


import fs from "fs";
import path from "path";
import { organizeSingleFile } from "./organizeFile.service";

// 1. Add a simple delay helper function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const batchOrganizeFolder = async (folderPath: string) => {
  const entries = fs.readdirSync(folderPath);

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) continue;
    if (entry.startsWith(".")) continue;

    // 2. Add the delay BEFORE or AFTER processing the file
    // 4000ms = 4 seconds. This keeps you safely under the 15 RPM limit.
    await organizeSingleFile(fullPath);
    console.log("Waiting for rate limit...");
    await delay(4000); 
  }

  console.log("✅ Batch organization completed");
};