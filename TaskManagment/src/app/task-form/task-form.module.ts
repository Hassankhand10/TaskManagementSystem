import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './task-form.component';
import { TasksModule } from '../tasks/tasks.module';

@NgModule({
  declarations: [
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksModule
  ],
  exports: [
    TaskFormComponent
  ]
})
export class TaskFormModule { }
