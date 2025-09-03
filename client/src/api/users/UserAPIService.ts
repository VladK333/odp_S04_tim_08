import axios from "axios";
import type { IUserAPIService } from "./IUserAPIService";
import type { User } from "../../types/User";

const API_URL: string = import.meta.env.VITE_API_URL + "users";

export const userApi: IUserAPIService = {
  async getUserById(id: number, token: string): Promise<User | undefined> {
    try {
      const res = await axios.get<{ success: boolean; data: User }>(
        `${API_URL}/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.data;
    } catch (error) {
      console.error("Greška pri dohvatanju korisnika:", error);
      return undefined;
    }
  },
};
