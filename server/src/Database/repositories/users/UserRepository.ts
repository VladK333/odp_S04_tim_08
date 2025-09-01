import { IUserRepository } from "../../../Domain/repositories/users/IUserRepository";
import { User } from "../../../Domain/models/User";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import db from "../../connection/DbConnectionPool";

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const query = `
        INSERT INTO users (email, lozinka, uloga, ime, prezime, datumR, telefon, imgSrc, preostaloPoruka, prvaPorukaVreme) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.email,
        user.lozinka,
        user.uloga,
        user.ime,
        user.prezime,
        user.datumR,
        user.telefon,
        user.imgSrc,
        user.preostaloPoruka,
        user.prvaPorukaVreme
      ]);


      if (result.insertId) {
        // Vraćamo novog korisnika sa dodeljenim ID-om
        return new User(result.insertId, user.email, user.lozinka, user.uloga, user.ime, user.prezime, user.datumR, user.telefon,
                          user.imgSrc, user.preostaloPoruka, user.prvaPorukaVreme);
      }

      // Vraćamo prazan objekat ako kreiranje nije uspešno
      return new User();
    } catch (error) {
      console.error('Error creating user:', error);
      return new User();
    }
  }

  async getById(id: number): Promise<User> {
    try {
      const query = `SELECT *FROM users WHERE id = ?`;
      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.id, row.email, row.lozinka, row.uloga, row.ime, row.prezime, row.datumR, row.telefon, row.imgSrc,
           row.preostaloPoruka, row.prvaPorukaVreme);
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const query = `
        SELECT *
        FROM users 
        WHERE email = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [email]);

      if (rows.length > 0) {
        const row = rows[0];
        return new User(row.id, row.email, row.lozinka, row.uloga, row.ime, row.prezime, row.datumR, row.telefon, row.imgSrc,
                        row.preostaloPoruka, row.prvaPorukaVreme);
      }

      return new User();
    } catch (error) {
      console.log("user get by email: " + error);
      return new User();
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const query = `SELECT *FROM users ORDER BY id ASC`;
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) => new User(row.id, row.email, row.lozinka, row.uloga, row.ime, row.prezime, row.datumR, row.telefon, row.imgSrc, 
                        row.preostaloPoruka, row.prvaPorukaVreme)
      );
    } catch {
      return [];
    }
  }

  async update(user: User): Promise<User> {
    try {
      const query = `
        UPDATE users 
        SET email = ?, lozinka = ?, uloga = ?, ime = ?, prezime = ?, datumR = ?, 
            telefon = ?, imgSrc = ?, preostaloPoruka = ?, prvaPorukaVreme = ?
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [
        user.email,
        user.lozinka,
        user.uloga,
        user.ime,
        user.prezime,
        user.datumR,
        user.telefon,
        user.imgSrc,
        user.preostaloPoruka,
        user.prvaPorukaVreme,
        user.id
      ]);

      if (result.affectedRows > 0) {
        return user;
      }

      return new User();
    } catch {
      return new User();
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const query = `
        DELETE FROM users 
        WHERE id = ?
      `;

      const [result] = await db.execute<ResultSetHeader>(query, [id]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }

  async exists(id: number): Promise<boolean> {
    try {
      const query = `
        SELECT COUNT(*) as count 
        FROM users 
        WHERE id = ?
      `;

      const [rows] = await db.execute<RowDataPacket[]>(query, [id]);

      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}