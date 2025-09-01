import { UserAuthDataDto } from "../../Domain/DTOs/auth/UserAuthDataDto";
import { UserRole } from "../../Domain/enums/UserRole";
import { User } from "../../Domain/models/User";
import { IUserRepository } from "../../Domain/repositories/users/IUserRepository";
import { IAuthService } from "../../Domain/services/auth/IAuthService";
import bcrypt from "bcryptjs";

export class AuthService implements IAuthService {
  private readonly saltRounds: number = parseInt(process.env.SALT_ROUNDS || "10", 10);

  public constructor(private userRepository: IUserRepository) {}

  async prijava(email: string, lozinka: string): Promise<UserAuthDataDto> {
    const user = await this.userRepository.getByEmail(email);

    if (user.id !== 0 && await bcrypt.compare(lozinka, user.lozinka)) {
      return new UserAuthDataDto(user.id, user.email, user.uloga);
    }

    return new UserAuthDataDto(); // Neispravno korisničko ime ili lozinka
  }

  async registracija(email: string, lozinka: string,  uloga: UserRole, ime : string, prezime : string, datumR : string, telefon : string,
                imgSrc: string, preostaloPoruka : number, prvaPorukaVreme : Date): Promise<UserAuthDataDto> {
    const existingUser = await this.userRepository.getByEmail(email);
    
    if (existingUser.id !== 0) {
      return new UserAuthDataDto(); // Korisnik već postoji
    }

    // Hash-ujemo lozinku pre čuvanja
    const hashedPassword = await bcrypt.hash(lozinka, this.saltRounds);

    const newUser = await this.userRepository.create(
      new User(0, email, hashedPassword, uloga, ime, prezime, datumR, telefon, imgSrc, preostaloPoruka, prvaPorukaVreme)
    );

    if (newUser.id !== 0) {
      return new UserAuthDataDto(newUser.id, newUser.email, newUser.uloga);
    }

    return new UserAuthDataDto(); // Registracija nije uspela
  }
}
