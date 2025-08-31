
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const API_URL = "http://127.0.0.1:1234/v1/chat/completions"; // LM Studio server

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
  } catch (err: any) {
    return `Greška: ${err.message}`;
  }
}
