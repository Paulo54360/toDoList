import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  db!: SQLiteObject;

  constructor(private sqlite: SQLite) {}

  async createDatabase() {
    try {
      if (!this.db) {
        this.db = await this.sqlite.create({
          name: 'data.db',
          location: 'default',
        });
        await this.createTaskTable(); // Ajoutez cette ligne pour créer la table des tâches
        console.log('Database created');
      }
    } catch (error) {
      console.error('Error opening database', error);
    }
    return this.db;
  }

  createTaskTable() {
    this.sqlite
      .create({
        name: 'data.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.db = db;
        if (this.db) {
          this.db
            .executeSql(
              'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, isChecked INTEGER)',
              []
            )
            .then(() => console.log('Table created'))
            .catch(error => console.error('Error creating table', error));
        }
      })
      .catch(error => console.error('Error opening database', error));
  }

  async addTask(taskName: string) {
    const db = await this.getDB();
    return db.executeSql(`INSERT INTO tasks (name) VALUES (?)`, [taskName]);
  }

  async getTasks() {
    const db = await this.getDB();
    return db.executeSql(`SELECT * FROM tasks`, []).then(res => {
      const tasks = [];
      for (let i = 0; i < res.rows.length; i++) {
        tasks.push(res.rows.item(i));
      }
      return tasks;
    });
  }

  async deleteTask(taskId: number): Promise<void> {
    try {
      const db = await this.getDB();
      await db.executeSql('DELETE FROM tasks WHERE id = ?', [taskId]);
    } catch (e) {
      console.error(e);
    }
  }
}
