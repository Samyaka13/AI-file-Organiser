import { Category } from "../repositories/category.repository";
import { cosineSimilarity } from "./similarity";


export const findBestCategory = (
    fileEmbedding: number[],
    categories: Category[]
) => {
    let bestCategory: Category | null = null;
    let bestScore = -1;

    for (const category of categories) {
        const score = cosineSimilarity(fileEmbedding, category.embedding);

        if (score > bestScore) {
            bestScore = score;
            bestCategory = category;
        }
    }

    return {
        bestCategory,
        similarityScore: Number(bestScore.toFixed(3))
    };
};
