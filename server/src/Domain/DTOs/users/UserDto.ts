export class UserDto {
  public constructor(
    public id: number = 0,
    public fullname: string = '',
    public email: string = '',
    public password: string = '',
    public isPremium: boolean = false,
    public messagesLeft: number = 50,
    public firstMessageSentForPeriod: number = Date.now()
  ) {}
}