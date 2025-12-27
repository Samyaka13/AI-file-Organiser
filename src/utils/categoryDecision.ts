interface Category {
    id: string;
    name: string;
    embedding: number[];
}

export const decideCategory = (
    similarityScore: number,
    bestCategory: Category | null,
    threshold = 0.75
) => {
    if (bestCategory && similarityScore >= threshold) {
        return {
            action: "USE_EXISTING",
            category: bestCategory,
            confidence: similarityScore
        };
    }

    return {
        action: "CREATE_NEW",
        category: null,
        confidence: similarityScore
    };
};
