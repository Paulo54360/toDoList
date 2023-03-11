import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private database?: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {}

  async initDB(): Promise<boolean> {
    // Vérifie si le plugin Capacitor SQLite est disponible sur le dispositif
    const isAvailable = this.platform.is('capacitor');
    if (!isAvailable) {
      return false;
    }

    // Crée ou ouvre une base de données SQLite
    this.database = await this.sqlite.create({
      name: 'mydb.db',
      location: 'default',
      iosDatabaseLocation: 'Library',
    });

    // Crée la table "tasks"
    const createTableQuery =
      'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, name TEXT)';
    try {
      await this.database.executeSql(createTableQuery);
      return true;
    } catch (error) {
      console.error('Error during table creation', error);
      return false;
    }
  }

  async executeSQL(query: string, params?: any[] | undefined): Promise<any> {
    try {
      const result = await this.database?.executeSql(query, params);
      return result;
    } catch (error) {
      console.error('Error during SQL execution', error);
      return null;
    }
  }
}
