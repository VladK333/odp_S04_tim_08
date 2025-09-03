import { IUserRepository } from "../../../Domain/repositories/users/IUserRepository";
import { User } from "../../../Domain/models/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const query = `
        INSERT INTO users (fullname, email, password, isPremium, messagesLeft, firstMessageSentForPeriod)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.fullname,
        user.email,
        user.password,
        user.isPremium,
        user.messagesLeft,
        user.firstMessageSentForPeriod,
      ]);

      if (result.insertId) {
        return new User(
          result.insertId,
          user.fullname,
          user.email,
          user.password,
          user.isPremium,
          user.messagesLeft,
          user.firstMessageSentForPeriod
        );
      }
      return new User();
    } catch (error) {
      console.error("Error creating user:", error);
      return new User();
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const query = `SELECT * FROM users WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(
          row.id,
          row.fullname,
          row.email,
          row.password,
          row.isPremium,
          row.messagesLeft,
          row.firstMessageSentForPeriod
        );
      }
      return new User();
    } catch {
      return new User();
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(
          row.id,
          row.fullname,
          row.email,
          row.password,
          row.isPremium,
          row.messagesLeft,
          row.firstMessageSentForPeriod
        );
      }
      return new User();
    } catch {
      return new User();
    }
  }

  async update(user: User): Promise<User> {
    try {
      const query = `
        UPDATE users
        SET fullname = ?, email = ?, password = ?, isPremium = ?, messagesLeft = ?, firstMessageSentForPeriod = ?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.fullname,
        user.email,
        user.password,
        user.isPremium,
        user.messagesLeft,
        user.firstMessageSentForPeriod,
        user.id,
      ]);

      if (result.affectedRows > 0) {
        return user;
      }
      return new User();
    } catch {
      return new User();
    }
  }
}
