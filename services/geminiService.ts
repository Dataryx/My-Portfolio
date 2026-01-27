
import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "../types";

export const getProjectRecommendation = async (interests: string): Promise<AIRecommendation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Based on these interests: "${interests}", suggest a unique, challenging software development project. 
  Focus on modern technologies and full-stack implementation. Ensure the projectName sounds like a premium retail building set.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a 'Master Builder' software architect. You speak in metaphors related to construction bricks, modularity, and high-precision assembly. You provide professional but playful software project recommendations that feel like 'Master Build' LEGO sets.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING, description: "The name of the build set" },
          techStack: { 
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of technologies as 'building components'"
          },
          description: { type: Type.STRING, description: "Construction summary with builder metaphors" },
          difficulty: { type: Type.STRING, description: "Ages 8+, 12+, or 18+ (Expert)" }
        },
        required: ["projectName", "techStack", "description", "difficulty"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from Master Builder AI.");
  
  const result = JSON.parse(text.trim());
  return result as AIRecommendation;
};
