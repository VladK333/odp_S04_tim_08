import { IChatRepository } from "../../../Domain/repositories/chats/IChatRepository";
import { Chat } from "../../../Domain/models/Chat";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";

export class ChatRepository implements IChatRepository {
  async create(chat: Chat): Promise<Chat> {
    try {
      const query = `
        INSERT INTO chats (name, userId)
        VALUES (?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        chat.name,
        chat.userId,
      ]);

      if (result.insertId) {
        return new Chat(result.insertId, chat.name, chat.userId);
      }
      return new Chat();
    } catch (error) {
      console.error("Error creating chat:", error);
      return new Chat();
    }
  }

  async getByUserId(userId: number): Promise<Chat[]> {
    try {
      const query = `SELECT * FROM chats WHERE userId = ? ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [userId]);

      return rows.map((row) => new Chat(row.id, row.name, row.userId));
    } catch {
      return [];
    }
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      const query = `DELETE FROM chats WHERE id = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
