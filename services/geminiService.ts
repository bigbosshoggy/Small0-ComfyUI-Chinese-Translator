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
      
      CHECKPOINT SPECIFIC RULES:
      
      If "Z-Image-Turbo (Tongyi-MAI)":
      - **Structure**: Follow the pattern: [Subject & Action] + [Modifiers] + [Context/Environment] + [Style Cues] + [Lighting/Mood] + [Quality Tags].
      - **Phrasing**: Use descriptive, natural sentences (1-3 sentences) rather than just comma-separated tags. The model has high instruction adherence.
      - **Implicit Negatives**: This model runs at Guidance Scale 0, so traditional negative prompts don't work well. You MUST phrase the positive prompt to exclude unwanted elements (e.g., use "empty street" instead of "no people", or "clean background").
      - **Text Rendering**: If the prompt implies text (signs, posters), keep the specific text in "quotes".
      - **Style Tokens**: Use specific Chinese terms for better effect where applicable:
        - "唯美" (aesthetic/romantic)
        - "震撼" (epic/shocking)
        - "写实" (realistic)
        - "国风" (National/Traditional Chinese style)
        - "赛博朋克" (Cyberpunk)
      - **Defaults**: The model defaults to Photorealistic. If the user wants "Illustration", "Oil Painting", or "Anime", explicitly state it in the style section.

      If "Pony" or "Anime":
      - Ensure terms map to common anime art tags/descriptions in Chinese where appropriate, or use "Tag (Chinese)" format if standard.
      
      If "SDXL" or "Flux":
      - Use descriptive natural language in Chinese.
      
      If "Realistic":
      - Emphasize texture and lighting terms in the Chinese translation.
      
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