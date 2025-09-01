import { UserRole } from "../enums/UserRole";

export class User {
  public constructor(
    public id: number = 0,
    public email: string = '',
    public lozinka: string = '',
    public uloga: UserRole = UserRole.Guest,
    public ime: string = '',
    public prezime : string = '',
    public datumR : string = '',
    public telefon : string = '',
    public imgSrc: string = '',
    public preostaloPoruka: number = 50,
    public prvaPorukaVreme: Date = new Date()
  ) {}
}