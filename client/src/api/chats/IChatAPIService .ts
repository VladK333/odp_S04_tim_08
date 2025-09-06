import type { ChatDto } from "../../models/chats/ChatDto";

export interface IChatAPIService {
  createChat(name: string, userId: number, token: string): Promise<ChatDto | undefined>;
  getUserChats(userId: number, token: string): Promise<ChatDto[]>;
  deleteChat(id: number, token: string): Promise<boolean>;
}
