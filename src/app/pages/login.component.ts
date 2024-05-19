import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule], // Ensure CommonModule is imported
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  passwordFieldType: string = 'password'; // Add this line

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<LoginResponse>('http://localhost:5029/api/Accounts', loginData)
      .subscribe({
        next: (res) => {
          if (res.mustChangePassword) {
            alert("Password change required.");
            window.sessionStorage.setItem("username", this.username); // Store the username
            this.router.navigate(['/change-password']); // Redirect to password change page
          } else if (res.token) {
            alert("Login successful");
            window.sessionStorage.setItem("token", res.token);
            window.sessionStorage.setItem("customerId", res.userId.toString());
            window.sessionStorage.setItem("username", this.username); // Store the username
            this.router.navigateByUrl('/dashboard');
          } else {
            alert("Login Unsuccessful, Please check and try again.");
          }
        },
        error: (error) => {
          console.error("Login error:", error);
          alert("Error during login. Please try again.");
        }
      });
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}

export class LoginResponse {
  constructor(
    public userId: number, 
    public fullName: string,
    public token: string,
    public mustChangePassword: boolean // Add this property
  ) {}
}
