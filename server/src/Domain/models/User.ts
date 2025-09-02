import { UserRole } from "../enums/UserRole";

export class User {
  public constructor(
    public id: number = 0,
    public email: string = '',
    public password: string = '',
    public role: UserRole = UserRole.Guest, // guest, regular, premium
    public firstName: string = '',
    public lastName: string = '',
    public dateOfBirth: string = '', // YYYY-MM-DD
    public phoneNumber: string = '',
    public imgSrc: string = '/images/user.png',
    public messagesLeft: number | null = 50, // početni broj poruka
    public firstMessageTime: Date | null = null, // vreme prve poruke za 24h limit
    public createdAt: Date = new Date() // vreme kreiranja naloga
  ) {}
}
