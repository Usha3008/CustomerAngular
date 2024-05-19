import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomersApiService } from './customer-api-service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
  standalone: true,
  imports: [CommonModule,RouterModule]
})
export class ViewDocumentsComponent implements OnInit {
  public photo?: string;
  public aadhar?: string;
  public panCard?: string;
  public customerId!: number;
  public photoFile: File | null = null;
  public aadharFile: File | null = null;
  public panCardFile: File | null = null;

  constructor(
    private apiService: CustomersApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.customerId = +id;
        this.loadDocuments(this.customerId);
      } else {
        console.error('No ID found in route parameters.');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private loadDocuments(customerId: number): void {
    this.apiService.getDocuments(customerId).subscribe({
      next: (doc) => {
        this.photo = `data:image/jpeg;base64,${doc.basePhoto}`;
        this.aadhar = `data:image/jpeg;base64,${doc.baseAadhar}`;
        this.panCard = `data:image/jpeg;base64,${doc.basePanCard}`;
      },
      error: (error) => {
        console.error('Failed to load documents', error);
        alert('Failed to load documents: ' + error.message);
      }
    });
  }

  onFileChange(event: Event, type: string): void {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (file) {
      switch (type) {
        case 'photo':
          this.photoFile = file;
          console.log('Photo file set:', file.name);
          break;
        case 'aadhar':
          this.aadharFile = file;
          console.log('Aadhar file set:', file.name);
          break;
        case 'panCard':
          this.panCardFile = file;
          console.log('PAN card file set:', file.name);
          break;
      }
    }
}

onUpdateDocument(): void {
  if (!this.customerId) {
    alert('Customer ID is undefined.');
    return;
  }

  const formData = new FormData();
  if (this.photoFile) formData.append('photo', this.photoFile);
  if (this.aadharFile) formData.append('aadhar', this.aadharFile);
  if (this.panCardFile) formData.append('panCard', this.panCardFile);

  this.apiService.updateDocuments(this.customerId, formData).subscribe({
    next: () => {
      alert('Documents updated successfully.');
      this.loadDocuments(this.customerId);
    },
    error: (error) => {
      console.error('Failed to update documents:', error);
      alert('Failed to update documents: ' + error.message);
    }
  });
}
onBack(): void {
  this.router.navigate(['/dashboard']);
}}



export class DocumentModel {
  basePhoto?: string | null;
  baseAadhar?: string | null;
  basePanCard?: string | null;

  constructor(photo?: string, aadhar?: string, panCard?: string) {
    this.basePhoto = photo || null;
    this.baseAadhar = aadhar || null;
    this.basePanCard = panCard || null;
  }
}