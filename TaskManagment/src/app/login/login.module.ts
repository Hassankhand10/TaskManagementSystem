import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { TasksModule } from '../tasks/tasks.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TasksModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
