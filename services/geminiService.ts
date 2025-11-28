import { GoogleGenAI } from "@google/genai";
import { CheckpointType } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const translatePrompt = async (
  prompt: string,
  checkpoint: CheckpointType,
  intelligenceMode: boolean
): Promise<string> => {
  if (!prompt.trim()) return "";

  try {
    let systemInstruction = "You are a specialized translator for Generative AI Art prompts. Your task is to translate the user's English prompt into Chinese.";

    if (intelligenceMode) {
      systemInstruction += `
      INTELLIGENCE MODE ENABLED.
      Target Checkpoint: ${checkpoint}
      
      Guidelines:
      1. Analyze the intent of the English prompt.
      2. Translate it into Chinese.
      3. Structure the Chinese translation to be optimal for the specified checkpoint model style.
      
      - If the checkpoint is "Pony" or "Anime", ensure terms map to common anime art tags/descriptions in Chinese where appropriate, or use "Tag (Chinese)" format if standard. 
      - If "SDXL" or "Flux", use descriptive natural language in Chinese.
      - If "Realistic", emphasize texture and lighting terms in the Chinese translation.
      
      Output ONLY the final Chinese prompt string. Do not add explanations.
      `;
    } else {
      systemInstruction += " Translate the text directly from English to Chinese. Maintain the comma-separated format if present. Output ONLY the translated text.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text?.trim() || "Translation failed.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Failed to connect to Gemini API. Please check your API key.";
  }
};