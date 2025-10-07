// Groq API models utility
export interface GroqModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
}

export interface GroqModelsResponse {
  object: string;
  data: GroqModel[];
}

export class GroqModelsAPI {
  private apiKey: string;
  private baseUrl = 'https://api.groq.com/openai/v1';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.GROQ_API_KEY || '';
  }

  async fetchModels(): Promise<GroqModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status} ${response.statusText}`);
      }

      const data: GroqModelsResponse = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching Groq models:', error);
      throw error;
    }
  }

  // Get models formatted for the UI switcher
  async getModelsForSwitcher(): Promise<{ id: string; name: string; description?: string }[]> {
    try {
      const models = await this.fetchModels();

      return models.map(model => ({
        id: model.id,
        name: this.formatModelName(model.id),
        description: this.getModelDescription(model.id),
      }));
    } catch (error) {
      console.error('Error getting models for switcher:', error);
      // Return fallback models if API fails
      return this.getFallbackModels();
    }
  }

  private formatModelName(modelId: string): string {
    // Convert model IDs to human-readable names
    const nameMap: Record<string, string> = {
      'mixtral-8x7b-32768': 'Mixtral 8x7B',
      'llama2-70b-4096': 'Llama 2 70B',
      'llama2-7b-4096': 'Llama 2 7B',
      'gemma-7b-it': 'Gemma 7B',
      'openai/gpt-oss-20b': 'GPT-OSS 20B',
      // Add more as they become available
    };

    return nameMap[modelId] || modelId.replace(/-/g, ' ').replace(/_/g, ' ');
  }

  private getModelDescription(modelId: string): string {
    const descriptionMap: Record<string, string> = {
      'mixtral-8x7b-32768': 'Mixture of Experts model, excellent for complex reasoning',
      'llama2-70b-4096': 'Large Llama 2 model, fast and capable',
      'llama2-7b-4096': 'Smaller Llama 2 model, efficient and quick',
      'gemma-7b-it': 'Google\'s Gemma model, instruction-tuned',
      'openai/gpt-oss-20b': 'Open-source GPT-style model',
    };

    return descriptionMap[modelId] || 'Groq-hosted model';
  }

  private getFallbackModels(): { id: string; name: string; description?: string }[] {
    // Fallback models when API is unavailable
    return [
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        description: 'Mixture of Experts model, excellent for complex reasoning',
      },
      {
        id: 'llama2-70b-4096',
        name: 'Llama 2 70B',
        description: 'Large Llama 2 model, fast and capable',
      },
      {
        id: 'llama2-7b-4096',
        name: 'Llama 2 7B',
        description: 'Smaller Llama 2 model, efficient and quick',
      },
      {
        id: 'gemma-7b-it',
        name: 'Gemma 7B',
        description: 'Google\'s Gemma model, instruction-tuned',
      },
    ];
  }
}

// Export singleton instance
export const groqModelsAPI = new GroqModelsAPI();
