import { IMessageRepository } from "../../../Domain/repositories/messages/IMessageRepository";
import { Message } from "../../../Domain/models/Message";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";

export class MessageRepository implements IMessageRepository {
  async create(message: Message): Promise<Message> {
    try {
      const query = `
        INSERT INTO messages (text, isSentByAI, sentTime, chatId)
        VALUES (?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        message.text,
        message.isSentByAI,
        message.sentTime,
        message.chatId,
      ]);

      if (result.insertId) {
        return new Message(
          result.insertId,
          message.text,
          message.isSentByAI,
          message.sentTime,
          message.chatId
        );
      }
      return new Message();
    } catch (error) {
      console.error("Error creating message:", error);
      return new Message();
    }
  }

  async getByChatId(chatId: number): Promise<Message[]> {
    try {
      const query = `SELECT * FROM messages WHERE chatId = ? ORDER BY sentTime ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [chatId]);

      return rows.map(
        (row) =>
          new Message(row.id, row.text, row.isSentByAI, row.sentTime, row.chatId)
      );
    } catch {
      return [];
    }
  }

  async deleteByChatId(chatId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM messages WHERE chatId = ?`;
      const [result] = await db.execute<ResultSetHeader>(query, [chatId]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
