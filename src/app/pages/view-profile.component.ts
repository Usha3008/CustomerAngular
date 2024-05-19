import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomersApiService } from './customer-api-service';
import {  HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.css'
})
export class ViewProfileComponent {
  CustomerDetails: CustomerModel = new CustomerModel();
  showDeleteConfirmation = false;

  constructor(private http: HttpClient, private router: Router, private apiService: CustomersApiService) {
    this.loadCustomerDetails();
  }

  loadCustomerDetails(): void {
    const customerId = window.sessionStorage.getItem("customerId");
    if (customerId) {
      this.apiService.getDetails(+customerId).subscribe(
        data => {
          this.CustomerDetails = data;
        },
        error => {
          console.error('Failed to load customer details', error);
          alert('Failed to load customer details');
        }
      );
    } else {
      alert('Customer ID not found. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  
  onEdit() {
    // Navigate to the Edit Profile page
    this.router.navigate(['/edit-profile',this.CustomerDetails.customerId]);
  }
  
  onDelete(): void {
    this.showDeleteConfirmation = true;
  }

  confirmDelete(): void {
    this.apiService.deleteCustomer(this.CustomerDetails.customerId).subscribe({
      next: () => {
        alert('Customer deleted successfully');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Failed to delete customer');
        this.showDeleteConfirmation = false;
      }
    });
  }

  onCancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  onBack(): void {
    this.router.navigate(['/dashboard']);
  }}


export class CustomerModel {
  constructor(
      public customerId: number = 0, // default value if not known
      public firstName: string = '',
      public lastName: string = '',
      public addressLine1: string = '',
      public addressLine2: string = '',
      public addressLine3: string = '',
      public phoneNumber: string = '',
      public pincode: number = 0,
      public emailAddress: string = '',
      public dateOfBirth: Date = new Date(), // Default to current date or set a fixed date
      public city: string = '',
      public country: string = ''
  ) {}
} 