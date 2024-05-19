import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CustomersApiService } from './customer-api-service';
import { CustomerModel } from './view-profile.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [FormsModule, HttpClientModule, RouterModule] // Correct imports here
})
export class EditProfileComponent implements OnInit {
  customer: CustomerModel = new CustomerModel();

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
          alert('Failed to load customer details');
        }
      });
    }
  }

  onSubmit() {
    this.apiService.update(this.customer).subscribe({
      next: () => {
        alert('Profile updated successfully.');
        this.router.navigate(['/view-profile']);
      },
      error: (error) => {
        console.error('Update failed:', error);
        alert('Failed to update profile.');
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/view-profile']);
  }
}