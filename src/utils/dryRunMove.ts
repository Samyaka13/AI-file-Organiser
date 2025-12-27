import fs from "fs";
import path from "path";

export const dryRunMove = (
  sourcePath: string,
  destinationPath: string
) => {
  const exists = fs.existsSync(destinationPath);

  return {
    source: sourcePath,
    destination: destinationPath,
    willOverwrite: exists,
    safeToMove: !exists
  };
};
