import { Message } from "../../models/Message";

export interface IMessageRepository {
  create(message: Message): Promise<Message>;
  getByChatId(chatId: number): Promise<Message[]>;
  deleteByChatId(chatId: number): Promise<boolean>;
}