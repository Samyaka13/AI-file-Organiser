export const cosineSimilarity = (
    vectorA: number[],
    vectorB: number[]
): number => {
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vector size mismatch");
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
        dotProduct += vectorA[i] * vectorB[i];
        normA += vectorA[i] * vectorA[i];
        normB += vectorB[i] * vectorB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};
