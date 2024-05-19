import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  customerId?: number;  // Declare customerId as an optional number

  constructor(private router: Router) {
    this.initializeCustomerId();
  }

  initializeCustomerId() {
    const storedId = window.sessionStorage.getItem("customerId");
    console.log("Retrieved customer ID:", storedId); // Check what is actually retrieved
    if (storedId) {
      this.customerId = parseInt(storedId);
      console.log("Parsed customer ID:", this.customerId); // Verify it parses correctly
    } else {
      console.error("No customer ID found in session storage.");
      this.router.navigateByUrl('/login'); // Redirect to login if ID not found
    }
  }

  onViewProfile() {
    this.router.navigateByUrl('/view-profile');
  }

  onViewDocuments() {
    if (this.customerId) {
      this.router.navigate(['/view-documents', this.customerId]);
    } else {
      alert("No customer ID available. Please log in again.");
      this.router.navigateByUrl('/login');
    }
  }

  isAuthenticated(): boolean {
    return !!window.sessionStorage.getItem("token");
  }

  onSubmitSignOut() {
    window.sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
