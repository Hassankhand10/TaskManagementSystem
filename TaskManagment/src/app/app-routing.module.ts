import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomepageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),LoginModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
