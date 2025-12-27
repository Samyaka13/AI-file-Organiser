import { GoogleGenAI } from "@google/genai";

// 1. Initialize using the new SDK
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateCategoryNameWithAI = async (
    description: string
): Promise<string> => {
    try {
        // 2. Call the Generate Content method
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    parts: [
                        {
                            text: `
                You are helping organize files on a computer.
                Based on the description below, suggest a SHORT, CLEAR, folder name.

                Rules:
                - 2 to 4 words only
                - Title Case
                - No punctuation
                - No emojis
                - No explanations

                Description:
                """${description.slice(0, 1000)}"""
              `,
                        },
                    ],
                },
            ],
            config: {
                // Lower temperature makes the model more deterministic/focused
                temperature: 0.3,
            },
        });

        // 3. Extract text using the new SDK helper
        const name = response.text;

        if (!name) return "New Category";

        return sanitizeCategoryName(name);

    } catch (error) {
        console.error("AI Naming Error:", error);
        // Fallback if AI fails (e.g. internet issues)
        return "New Folder";
    }
};

// 4. Helper to remove unwanted characters (e.g., if AI adds quotes)
const sanitizeCategoryName = (name: string): string => {
    return name
        .replace(/["']/g, "")   // Remove quotes
        .replace(/\n/g, "")     // Remove newlines
        .trim();
};