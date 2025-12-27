import path from "path";

export const getDestinationPath = (
  baseDir: string,
  categoryName: string,
  originalFilePath: string
) => {
  const fileName = path.basename(originalFilePath);

  const categoryDir = path.join(baseDir, categoryName);

  const destinationPath = path.join(categoryDir, fileName);

  return {
    categoryDir,
    destinationPath
  };
};
