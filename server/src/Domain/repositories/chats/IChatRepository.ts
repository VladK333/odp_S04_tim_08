import { Chat } from "../../models/Chat";

export interface IChatRepository {
  create(chat: Chat): Promise<Chat>;
  getByUserId(userId: number): Promise<Chat[]>;
  deleteById(id: number): Promise<boolean>;
}