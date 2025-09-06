import axios from "axios";
import type { MessageDto } from "../../models/messages/MessageDto";
import type { IMessageAPIService } from "./IMessageAPIService";

const API_URL: string = import.meta.env.VITE_API_URL + "messages";

export class MessageAPIService implements IMessageAPIService {
  async createMessage(
    text: string,
    isSentByAI: boolean,
    sentTime: number,
    chatId: number, token: string
  ): Promise<MessageDto | undefined> {
    try {
      const res = await axios.post<MessageDto>(
        API_URL,
        { text, isSentByAI, sentTime, chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Greška pri kreiranju poruke:", error);
      return undefined;
    }
  }

  async getMessagesByChatId(chatId: number, token: string): Promise<MessageDto[]> {
    try {
      const res = await axios.get<MessageDto[]>(
        `${API_URL}/${chatId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Greška pri dohvatanju poruka:", error);
      return [];
    }
  }

  async deleteMessagesByChatId(chatId: number, token: string): Promise<boolean> {
    try {
      const res = await axios.delete<{ success: boolean }>(
        `${API_URL}/${chatId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.success;
    } catch (error) {
      console.error("Greška pri brisanju poruka:", error);
      return false;
    }
  }
};
