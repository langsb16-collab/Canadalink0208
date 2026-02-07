
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async askSettlementExpert(question: string, lang: string = 'ko'): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `당신은 캐나다 정착 전문가입니다. 한인 이민자나 유학생을 돕기 위해 답변하세요. 현재 사용자의 언어는 '${lang}'입니다. 질문: ${question}`,
        config: {
          systemInstruction: `사용자의 언어(${lang})로 친절하고 전문적으로 답변해 주세요. 캐나다의 법규와 문화를 잘 알고 있는 전문가처럼 행동하십시오.`,
        }
      });
      return response.text || "Sorry, I cannot generate an answer right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Service temporarily unavailable.";
    }
  }

  async analyzeCommunityTrends(stats: any, lang: string = 'ko'): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze the following Canadian Korean community data and write a summary report in the language '${lang}': ${JSON.stringify(stats)}`,
        config: {
          systemInstruction: `Analyze the community impact and required support policies at an expert level. The final report MUST be written in the language associated with code '${lang}'. Keep it concise and insightful.`,
        }
      });
      return response.text || "Unable to retrieve analysis results.";
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "Analysis engine error.";
    }
  }
}

export const geminiService = new GeminiService();
