import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  async getDB(): Promise<SQLiteObject> {
    console.log('getDB called');
    if (this.database) {
      console.log('database already exists');
      return Promise.resolve(this.database);
    } else {
      try {
        const db = await this.sqlite.create({
          name: 'tasks.db',
          location: 'default',
        });
        console.log('database created');
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
}
