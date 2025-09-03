import { ChatDto } from "../../DTOs/chats/ChatDto";

export interface IChatService {
  create(chatDto: ChatDto): Promise<ChatDto>;
  getByUserId(userId: number): Promise<ChatDto[]>;
  deleteById(id: number): Promise<boolean>;
}