import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  newPasswordConfirm: string = '';
  oldPasswordFieldType: string = 'password';
  newPasswordFieldType: string = 'password';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private changePasswordService: ChangePasswordService, private router: Router) {}

  onChangePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword !== this.newPasswordConfirm) {
      this.errorMessage = 'New passwords do not match';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'New password must be at least 6 characters long';
      return;
    }

    const username = window.sessionStorage.getItem('username');
    if (!username) {
      this.errorMessage = 'Username not found. Please log in again.';
      this.router.navigateByUrl('/login');
      return;
    }

    this.changePasswordService.changePassword(username, this.oldPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.successMessage = 'Password changed successfully';
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error: (error) => {
          const message = error.error?.message || error.message || 'Unknown error occurred';
          this.errorMessage = 'Failed to update password: ' + message;
          console.error('Failed to update password:', error);
        }
      });
  }
}

export class PasswordChangeModel {
  constructor(
    public username: string,
    public oldPassword: string,
    public newPassword: string
  ) {}
}