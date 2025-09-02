import { UserRole } from "../../enums/UserRole";

export class UserDto {
  public constructor(
    public id: number = 0,
    public email: string = "",
    public role: UserRole = UserRole.Guest,

    public name?: string,
    public surname?: string,
    public imgSrc?: string,

  ) { }
}
