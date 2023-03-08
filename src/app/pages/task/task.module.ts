import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';
import { TaskPage } from './task.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TaskPageRoutingModule],
  declarations: [TaskPage],
})
export class TaskPageModule {}
