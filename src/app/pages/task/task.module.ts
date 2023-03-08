import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { DatabaseService } from '@services/database.service';
import { TaskService } from '@services/task.service';

import { TaskPageRoutingModule } from './task-routing.module';
import { TaskPage } from './task.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TaskPageRoutingModule],
  declarations: [TaskPage],
  providers: [TaskService, SQLite, DatabaseService],
})
export class TaskPageModule {}
