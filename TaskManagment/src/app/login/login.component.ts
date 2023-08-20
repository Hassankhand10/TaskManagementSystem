import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ApiServiceService } from '../api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  

  constructor(private router: Router , private apiService: ApiServiceService , private snackBar: MatSnackBar) {}

  login() {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.showSnackBar('Login successful', 'Dismiss', 'success-snackbar');
        this.router.navigate(['/home']);
      },
      error: error => {
        console.error(error);
        this.showSnackBar('Login failed', 'Dismiss', 'error-snackbar');
      }
    });
  }
  
  showSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }
  
}
