import type { AuthResponse } from "../../types/auth/AuthResponse";

/**
 * Interfejs za Auth API servis.
 */
export interface IAuthAPIService {
  // Login koristi email i lozinku
  prijava(email: string, lozinka: string): Promise<AuthResponse>;

  // Registracija prima ceo user objekat
  registracija(user: {
    email: string;
    lozinka: string;
    ime: string;
    prezime: string;
    datumR: string;
    telefon: string;
    imgSrc?: string;
    uloga: 'regular' | 'premium';
  }): Promise<AuthResponse>;
}
