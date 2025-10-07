"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModelSelectorContext } from "@/lib/model-selector-provider";

interface ModelOption {
  id: string;
  name: string;
  description?: string;
}

export function ModelSelector() {
  const { model, setModel } = useModelSelectorContext();
  const [models, setModels] = useState<ModelOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        if (!response.ok) {
          throw new Error(`Failed to fetch models: ${response.status}`);
        }
        const groqModels = await response.json();
        const allModels: ModelOption[] = [
          // Static models (non-Groq)
          { id: "openai", name: "OpenAI", description: "GPT-4 and other OpenAI models" },
          { id: "anthropic", name: "Anthropic", description: "Claude models" },
          { id: "google_genai", name: "Google Generative AI", description: "Gemini models" },
          { id: "crewai", name: "CrewAI", description: "Multi-agent framework" },
          // Dynamic Groq models
          ...groqModels,
        ];
        setModels(allModels);
      } catch (error) {
        console.error("Failed to fetch Groq models:", error);
        // Fallback to basic models
        setModels([
          { id: "openai", name: "OpenAI" },
          { id: "anthropic", name: "Anthropic" },
          { id: "google_genai", name: "Google Generative AI" },
          { id: "crewai", name: "CrewAI" },
          { id: "groq", name: "Groq (Mixtral)" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="fixed bottom-0 left-0 p-4 z-50">
      <Select value={model} onValueChange={(v) => setModel(v)} disabled={loading}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder={loading ? "Loading models..." : "Select model"} />
        </SelectTrigger>
        <SelectContent>
          {models.map((modelOption) => (
            <SelectItem key={modelOption.id} value={modelOption.id}>
              <div className="flex flex-col">
                <span>{modelOption.name}</span>
                {modelOption.description && (
                  <span className="text-xs text-muted-foreground">
                    {modelOption.description}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
