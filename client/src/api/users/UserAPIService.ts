import axios from "axios";
import type { IUserAPIService } from "./IUserAPIService";
import type { UserDto } from "../../models/users/UserDto";

const API_URL: string = import.meta.env.VITE_API_URL + "users";

export class UserAPIService implements IUserAPIService {
  async getUserById(id: number, token: string): Promise<UserDto | undefined> {
    try {
      const res = await axios.get<{ success: boolean; data: UserDto }>(
        `${API_URL}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (error) {
      console.error("Greška pri dohvatanju korisnika:", error);
      return undefined;
    }
  }
};
