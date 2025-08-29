import { pool } from '../Database/connection/DatabasePool';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {

    // Kreiranje korisnika
    async createUser(user: User): Promise<void> {
        const { email, password, type, firstName, lastName, dateOfBirth, phoneNumber, imgSrc} = user;

        // proveri da li već postoji
        const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if ((rows as any[]).length > 0) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (email, lozinka, tip, ime, prezime, datumR, telefon, imgPath) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, type, firstName, lastName, dateOfBirth, phoneNumber, imgSrc]
        );
    }

    // Dohvati korisnika po emailu
    async getUserByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if ((rows as any[]).length === 0) return null;

        const row = (rows as any[])[0];
        return {
            id: row.id,
            email: row.email,
            password: row.lozinka,
            type: row.tip,
            firstName: row.ime,
            lastName: row.prezime,
            dateOfBirth: row.datumR,
            phoneNumber: row.telefon,
            imgSrc: row.imgPath,
            messagesLeft: row.messages_left
        };
    }
}
