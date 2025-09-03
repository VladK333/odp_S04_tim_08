export class MessageDto {
  public constructor(
    public id: number = 0,
    public text: string = '',
    public isSentByAI: boolean = false,
    public sentTime: number = Date.now(),
    public chatId: number = 0
  ) {}
}