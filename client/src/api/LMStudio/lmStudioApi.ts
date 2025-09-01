import type { ChatMessage } from "./IlmStudioApi";

const API_URL = import.meta.env.VITE_LM_API_URL as string; // LM Studio server

export async function sendChatCompletion(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma-3-1b-it", // koristi model koji LM Studio pokreće
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`LM Studio error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "⚠️ Nema odgovora od modela";
  } catch {
    return "⚠️ Greška: došlo je do problema prilikom komunikacije sa LM Studio.";
  }
}
