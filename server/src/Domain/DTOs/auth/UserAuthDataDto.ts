import { UserRole } from "../../enums/UserRole";

export class UserAuthDataDto {
   public constructor(
        public id: number = 0,
        public email: string = '',
        public role: UserRole = UserRole.Guest,
    ) {}
}