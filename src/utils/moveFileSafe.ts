import fs from "fs";
import path from "path";

export const moveFileSafe = (
  sourcePath: string,
  destinationPath: string
) => {
  const destinationDir = path.dirname(destinationPath);

  // 1. Ensure category folder exists
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  // 2. Prevent overwrite
  if (fs.existsSync(destinationPath)) {
    throw new Error("File already exists at destination");
  }

  // 3. Move file
  fs.renameSync(sourcePath, destinationPath);

  return {
    moved: true,
    from: sourcePath,
    to: destinationPath
  };
};
