import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  async getDB(): Promise<SQLiteObject> {
    if (this.database) {
      return Promise.resolve(this.database);
    } else {
      try {
        const db = await this.sqlite.create({
          name: 'tasks.db',
          location: 'default',
        });
        this.database = db;
        return Promise.resolve(db);
      } catch (error) {
        console.error('unable to create database', error);
        return Promise.reject(error);
      }
    }
  }

  async initDB(): Promise<void> {
    const db = await this.getDB();
    await db.executeSql(
      `
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        complete INTEGER DEFAULT 0
      );
    `,
      []
    );
  }

  async addTask(name: string): Promise<any> {
    const db = await this.getDB();
    const data = [name];
    return await db.executeSql('INSERT INTO tasks (name) VALUES (?)', data);
  }

  async deleteTask(id: number): Promise<any> {
    const db = await this.getDB();
    const data = [id];
    return await db.executeSql('DELETE FROM tasks WHERE id = ?', data);
  }

  async getTasks(): Promise<any> {
    const db = await this.getDB();
    return await db.executeSql('SELECT * FROM tasks', []);
  }
}
