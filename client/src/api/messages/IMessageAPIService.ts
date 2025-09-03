
export interface IMessageAPIService {
  createMessage(
    text: string,
    isSentByAI: boolean,
    sentTime: string,
    chatId: number
  ): Promise<Message | undefined>;

  getMessagesByChatId(chatId: number): Promise<Message[]>;

  deleteMessagesByChatId(chatId: number): Promise<boolean>;
}
