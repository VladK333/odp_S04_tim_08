import axios from "axios";
import type { IUserAPIService } from "./IUserAPIService";

const API_URL: string = import.meta.env.VITE_API_URL + "users";

export const userApi: IUserAPIService = {
  async getUserById(id: number): Promise<User | undefined> {
    try {
      const res = await axios.get<{ success: boolean; data: User }>(
        `${API_URL}/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      return res.data.data;
    } catch (error) {
      console.error("Greška pri dohvatanju korisnika:", error);
      return undefined;
    }
  },
};
