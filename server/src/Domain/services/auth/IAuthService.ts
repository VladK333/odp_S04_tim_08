import { UserAuthDataDto } from "../../DTOs/auth/UserAuthDataDto";

export interface IAuthService {
    /**
     * Prijavljuje korisnika sa datim korisničkim imenom i lozinkom.
     * @param email - Korisničko ime korisnika.
     * @param lozinka - Lozinka korisnika.
     * @returns Podatke o korisniku ako je prijava uspešna, ili prazan objekat ako nije.
     */
  prijava(email: string, lozinka: string): Promise<UserAuthDataDto>;

  /**
   * Registruje novog korisnika sa datim korisničkim imenom i lozinkom.
   * @param email - Korisničko ime korisnika.
   * @param lozinka - Lozinka korisnika.
   * @param uloga - Uloga korisnika u sistemu.
   * @returns Podatke o korisniku ako je registracija uspešna, ili prazan objekat ako nije.
  */
  registracija(email: string, lozinka: string,  uloga: string, ime : string, prezime : string, datumR : string, telefon : string,
                imgSrc: string, preostaloPoruka : number, prvaPorukaVreme : Date
  ): Promise<UserAuthDataDto>;
}
