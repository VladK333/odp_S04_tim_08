import type { AuthResponse } from "../../types/auth/AuthResponse";


export interface IAuthAPIService {
  prijava(email: string, password: string): Promise<AuthResponse>;
  registracija(fullname: string, email: string, password: string, isPremium: boolean): Promise<AuthResponse>;
}
