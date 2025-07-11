import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_IS_MISSING" });

export async function generateDescription(courseName: string): Promise<string> {
  if (!process.env.API_KEY) {
      throw new Error("AI Service API key is not configured. Please set the API_KEY environment variable.");
  }
  
  try {
    const prompt = `Generate a short, professional-sounding course completion description for a certificate. The course is titled "${courseName}". The description should be one sentence, elegant, and concise, suitable for a formal certificate. Example: "has successfully completed all requirements of the comprehensive course on...".`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.5,
            topK: 32,
            topP: 1,
            maxOutputTokens: 100,
            thinkingConfig: { thinkingBudget: 0 } // Low latency for UI
        }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from the AI.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error generating description with AI Service:", error);
    throw new Error("Failed to generate description. The AI service may be unavailable.");
  }
}