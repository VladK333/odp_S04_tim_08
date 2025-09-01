import { UserRole } from "../../enums/UserRole";

export class UserDto {
  public constructor(
    public id: number = 0,
    public email: string = "",
    public uloga: UserRole = UserRole.Guest,
  ) {}
}
