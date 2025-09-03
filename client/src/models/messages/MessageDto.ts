export interface MessageDto {
  id: number;
  text: string;
  isSentByAI: boolean;
  sentTime: number; 
  chatId: number;
}
