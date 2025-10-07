import { GroqModelsAPI } from "@nlq-deepresearch/shared";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const groqModelsAPI = new GroqModelsAPI(process.env.GROQ_API_KEY);
    const models = await groqModelsAPI.getModelsForSwitcher();
    return NextResponse.json(models);
  } catch (error) {
    console.error("Failed to fetch models:", error);
    // Return fallback models
    const groqModelsAPI = new GroqModelsAPI();
    const fallbackModels = await groqModelsAPI.getFallbackModels();
    return NextResponse.json(fallbackModels);
  }
}
