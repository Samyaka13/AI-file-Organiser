export const generateCategoryName = (description: string): string => {
  const words = description
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(" ")
    .filter(w => w.length > 3);

  const uniqueWords = Array.from(new Set(words));

  return uniqueWords.slice(0, 3).join(" ").toUpperCase();
};
