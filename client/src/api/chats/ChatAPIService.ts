import axios from "axios";
import type { ChatDto } from "../../models/chats/ChatDto";
import type { IChatAPIService } from "./IChatAPIService ";

const API_URL: string = import.meta.env.VITE_API_URL + "chats";

export const chatApi: IChatAPIService = {
  async createChat(name: string, userId: number, token: string): Promise<ChatDto | undefined> {
    try {
      const res = await axios.post<ChatDto>(
        API_URL,
        { name, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Greška pri kreiranju četa:", error);
      return undefined;
    }
  },

  async getUserChats(userId: number, token: string): Promise<ChatDto[]> {
    try {
      const res = await axios.get<ChatDto[]>(
        `${API_URL}/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      console.error("Greška pri dohvatanju čatova:", error);
      return [];
    }
  },

  async deleteChat(id: number, token: string): Promise<boolean> {
    try {
      const res = await axios.delete<{ success: boolean }>(
        `${API_URL}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.success;
    } catch (error) {
      console.error("Greška pri brisanju četa:", error);
      return false;
    }
  },
};
