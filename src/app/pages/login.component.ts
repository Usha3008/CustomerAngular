import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  passwordFieldType: string = 'password';
  loading: boolean = false; // Track loading state

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.loading = true; // Set loading to true when login starts
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<LoginResponse>('https://authenticationapigroupb.azurewebsites.net/api/Accounts', loginData)
      .subscribe({
        next: (res) => {
          this.loading = false; // Reset loading state on success
          if (res.mustChangePassword) {
            this.message = "Password change required. Redirecting...";
            window.sessionStorage.setItem("username", this.username);

            // Delay navigation to allow the user to read the message
            setTimeout(() => {
              this.router.navigate(['/change-password']);
            }, 1000); // Delay for 1 seconds
          } else if (res.token) {
            window.sessionStorage.setItem("token", res.token);
            window.sessionStorage.setItem("customerId", this.username);
            
            window.sessionStorage.setItem("username", this.username);
            this.router.navigateByUrl('/dashboard');
          } else {
            this.message = "Login unsuccessful, please check and try again.";
          }
        },
        error: (error) => {
          this.loading = false; // Reset loading state on error
          this.message = "Error during login. Please try again.";
          console.error("Login error:", error);
        }
      });
  }
}
export class LoginResponse {
  constructor(
    public userId: number, 
    public fullName: string,
    public token: string,
    public mustChangePassword: boolean
  ) {}
}