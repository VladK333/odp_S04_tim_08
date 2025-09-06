import axios from "axios";
import type { ILLMChatAPIService } from "./ILLMChatAPIService";

const API_URL: string = import.meta.env.VITE_LM_API_URL as string;

export class LLMChatAPIService implements ILLMChatAPIService {
  async sendMessage(poruka: string): Promise<string> {
    try {
      const res = await axios.post(`${API_URL}`, {
        model: "gemma-3-1b-it",
        messages: [
          {
            role: "user",
            content: poruka,
          },
        ],
      });

      return res.data?.choices?.[0]?.message?.content ?? "Nema odgovora od modela.";
    } catch (error) {
      let message = "Greška prilikom slanja poruke.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      return message;
    }
  }
}
