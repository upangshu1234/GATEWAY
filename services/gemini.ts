import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, ChoiceItem, PredictionResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check key
const checkKey = () => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Features will return mock data or fail.");
    return false;
  }
  return true;
};

export const getAdmissionPrediction = async (profile: UserProfile): Promise<PredictionResult[]> => {
  if (!checkKey()) {
    // Fallback mock
    return [
      { college: 'IIT Bombay', program: 'CSE', probability: 'Low', cutoffTrend: 'Increasing', comment: 'Requires score > 850 usually.' },
      { college: 'NIT Trichy', program: 'CSE', probability: 'Medium', cutoffTrend: 'Stable', comment: 'Good chance in later rounds.' },
    ];
  }

  const model = "gemini-3-flash-preview";
  const prompt = `
    Act as a GATE Admissions Expert.
    User Profile:
    - GATE Score: ${profile.gateScore}
    - Rank: ${profile.gateRank}
    - Category: ${profile.category}
    - Branch: ${profile.branch}
    - PwD: ${profile.isPwd ? 'Yes' : 'No'}

    Predict admission chances for M.Tech programs in IITs, NITs, and IIITs.
    Return a list of 5-7 most relevant colleges/programs with probability (High/Medium/Low).
    Focus on accuracy based on historical trends for this specific category and score.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              college: { type: Type.STRING },
              program: { type: Type.STRING },
              probability: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              cutoffTrend: { type: Type.STRING },
              comment: { type: Type.STRING }
            }
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Prediction error:", error);
    return [];
  }
};

export const analyzeChoices = async (choices: ChoiceItem[], profile: UserProfile): Promise<ChoiceItem[]> => {
  if (!checkKey()) return choices.map(c => ({ ...c, type: 'Ambitious' }));

  const model = "gemini-3-flash-preview";
  const prompt = `
    Analyze this preference list for CCMT/COAP.
    User Score: ${profile.gateScore}, Category: ${profile.category}, Branch: ${profile.branch}.
    
    Current List Order:
    ${choices.map((c, i) => `${i + 1}. ${c.college} - ${c.program}`).join('\n')}

    For each item, classify the risk as 'Safe', 'Moderate', or 'Ambitious' based on the user's score.
    Return the same list with updated 'type'.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING }, // Use index or match by name logic if ID not persistent in prompt, but for simplicity we rely on array order mapping or explicit passing
              college: { type: Type.STRING },
              program: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['Safe', 'Moderate', 'Ambitious', 'Unknown'] }
            }
          }
        }
      }
    });

    const analyzed = JSON.parse(response.text || '[]');
    
    // Map back to original IDs if possible, or just return analyzed
    // Since LLM might not preserve IDs perfectly, we'll map by index assuming order preservation or just use the data
    return choices.map((choice, index) => {
        const found = analyzed[index];
        return found ? { ...choice, type: found.type as any } : choice;
    });

  } catch (error) {
    console.error("Analysis error:", error);
    return choices;
  }
};
