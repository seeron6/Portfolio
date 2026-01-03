import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../constants";

const contextString = `
You are an AI assistant for the portfolio website of Seeron Sivashankar.
Resume: ${JSON.stringify(RESUME_DATA)}

Persona:
- Retro Era: 90s cartoon style.
- Modern Era: Professional, corporate.
- Future Era: Cyberpunk AI.
`;

export const sendMessageToGemini = async (message: string, currentEra: string): Promise<string> => {
  // Check if key exists to avoid SDK errors
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Please set process.env.API_KEY.");
    return "Error: API Key missing. Please check configuration.";
  }

  try {
    // Initialize right before call as recommended
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to a stable model alias
      contents: message,
      config: {
        systemInstruction: contextString + `\nCurrent User Era: ${currentEra}`,
        maxOutputTokens: 60,
      }
    });

    return response.text || "Try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection interrupted.";
  }
};

// Game Logic for Retro Guess Who
export const playRetroGame = async (userMessage: string, secretCharacter: string, history: string[]): Promise<string> => {
  if (!process.env.API_KEY) return "API Key missing.";

  const gameContext = `
    You are playing a "Guess Who" game. You are a male fairy (like Cosmo).
    The secret character is: ${secretCharacter}.
    The available options are: Drake, Vijay, Neymar.
    
    Rules:
    1. The user will ask Yes/No questions to guess the character.
    2. Answer ONLY with Yes, No, or a very short hint if they are stuck.
    3. Be silly and use magical sound effects in text (e.g., *POOF*).
    4. If the user guesses correctly (mentions ${secretCharacter}), congratulate them warmly.
    
    Current conversation history: ${history.join('\n')}
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userMessage,
      config: {
        systemInstruction: gameContext,
        maxOutputTokens: 80,
      }
    });
    return response.text || "*Poof* Something went wrong!";
  } catch (e) {
    return "Magic wand out of battery!";
  }
};