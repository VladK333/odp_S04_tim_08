
export interface IUserAPIService {
  getUserById(id: number): Promise<User | undefined>;
}
