import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
  ],
  providers: [
    TasksService
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
