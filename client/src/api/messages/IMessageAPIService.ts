import type { MessageDto } from "../../models/messages/MessageDto";

export interface IMessageAPIService {
  createMessage(
    text: string,
    isSentByAI: boolean,
    sentTime: number,
    chatId: number, token: string
  ): Promise<MessageDto | undefined>;

  getMessagesByChatId(chatId: number, token: string): Promise<MessageDto[]>;

  deleteMessagesByChatId(chatId: number, token: string): Promise<boolean>;
}
