export interface ILLMChatAPIService {
  sendMessage(poruka: string): Promise<string>;
}
