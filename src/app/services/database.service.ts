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
      this.database = await this.sqlite.create({
        name: 'tasks.db',
        location: 'default',
      });
      return Promise.resolve(this.database);
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
}
