import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DatabaseService } from '@services/database.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private database: SQLiteDBConnection | null = null;

  constructor(
    private platform: Platform,
    private databaseService: DatabaseService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      await this.platform.ready();
      // Initialise le plugin Capacitor SQLite
      const result = await this.databaseService.initDB();
      console.log('La base de données a été initialisée avec succès !');
    } catch (error) {
      console.log("Impossible d'initialiser la base de données.", error);
    }
  }
}
