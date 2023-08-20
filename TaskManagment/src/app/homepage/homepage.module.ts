import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { TaskFormModule } from '../task-form/task-form.module';
import { TasksModule } from '../tasks/tasks.module';



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    TaskFormModule,
    TasksModule
  ]
})
export class HomepageModule { }
