import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getEmbedding = async (text: string): Promise<number[]> => {
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: [
        {
            parts: [
                { text: text }
            ]
        }
    ],
    config: {
        taskType: 'RETRIEVAL_DOCUMENT', 
        outputDimensionality: 768,
    }
  });

  // --- THE FIX ---
  // We explicitly check if 'embeddings' exists before accessing index [0].
  // This satisfies TypeScript and prevents runtime crashes.
  if (!response.embeddings || response.embeddings.length === 0) {
      throw new Error("Gemini API returned no embeddings. The response was empty.");
  }

  const embeddingValues = response.embeddings[0].values;

  if (!embeddingValues) {
      throw new Error("Embedding vector data is missing.");
  }

  return embeddingValues;
};