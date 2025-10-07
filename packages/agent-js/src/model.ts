/**
 * This module provides a function to get a model based on the configuration.
 */
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { AgentState } from "./state";
import { ChatGroq } from "@langchain/groq";


function getModel(state: AgentState): BaseChatModel {
  /**
   * Get a model based on the environment variable.
   */
  const stateModel = state.model;
  const model = process.env.MODEL || stateModel || "mixtral-8x7b-32768";

  console.log(`Using model: ${model}`);

  // Groq models - check if the model ID is a known Groq model
  if (model === "mixtral-8x7b-32768" || model === "llama2-70b-4096" ||
      model === "llama2-7b-4096" || model === "gemma-7b-it" ||
      model === "openai/gpt-oss-20b" || model.startsWith("groq")) {
    return new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: model,
      temperature: 0.1,
      maxTokens: 8192,
      topP: 1,
      streaming: true,
    });
  }

  if (model === "openai") {
    return new ChatOpenAI({ temperature: 0, model: "gpt-4o" });
  }

  if (model === "anthropic") {
    return new ChatAnthropic({
      temperature: 0,
      modelName: "claude-3-5-sonnet-20240620",
    });
  }

  if (model === "google_genai") {
    return new ChatGoogleGenerativeAI({
      temperature: 0,
      model: "gemini-1.5-pro",
      apiKey: process.env.GOOGLE_API_KEY || undefined,
    });
  }

  throw new Error(`Invalid model specified: ${model}`);
}

export { getModel };
