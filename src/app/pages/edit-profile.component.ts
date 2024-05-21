import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CustomersApiService } from './customer-api-service';
import { CustomerModel } from './view-profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [FormsModule, HttpClientModule, RouterModule,CommonModule] // Correct imports here
})
export class EditProfileComponent implements OnInit {
  customer: CustomerModel = new CustomerModel();
  message: string | null = null;
  messageType: string | null = null; // 'success' or 'error'

  constructor(
    private apiService: CustomersApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getDetails(+id).subscribe({
        next: (customer) => {
          this.customer = customer;
        },
        error: (error) => {
          console.error('Failed to load customer details:', error);
          this.message = 'Failed to load customer details';
          this.messageType = 'error';
        }
      });
    }
  }

  onSubmit() {
    this.apiService.update(this.customer).subscribe({
      next: () => {
        this.message = 'Profile updated successfully.';
        this.messageType = 'success';
        setTimeout(() => {
          this.router.navigate(['/view-profile']);
        }, 2000);
      },
      error: (error) => {
        console.error('Update failed:', error);
        this.message = 'Failed to update profile.';
        this.messageType = 'error';
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/view-profile']);
  }
}