import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private sqlite: SQLite) {}

  async createTask(taskName: string): Promise<void> {
    try {
      const db = await this.sqlite.create({
        name: 'tasks.db',
        location: 'default',
      });
      await db.executeSql('INSERT INTO tasks (name) VALUES (?)', [taskName]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
