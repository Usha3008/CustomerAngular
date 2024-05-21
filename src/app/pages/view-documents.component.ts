import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CustomersApiService } from './customer-api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.component.html',
  styleUrls: ['./view-documents.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ViewDocumentsComponent implements OnInit {
  public photo?: string;
  public aadhar?: string;
  public panCard?: string;
  public customerId!: number;
  public photoFile: File | null = null;
  public aadharFile: File | null = null;
  public panCardFile: File | null = null;
  public message: string = '';
  public loading: boolean = false;

  constructor(
    private apiService: CustomersApiService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.customerId = +id;
        this.loadDocuments(this.customerId);
      } else {
        this.showMessage('No ID found in route parameters.');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private loadDocuments(customerId: number): void {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache, no-store, must-revalidate');
    this.apiService.getDocuments(customerId).subscribe({
      next: (doc) => {
        this.photo = `data:image/jpeg;base64,${doc.basePhoto}`;
        this.aadhar = `data:image/jpeg;base64,${doc.baseAadhar}`;
        this.panCard = `data:image/jpeg;base64,${doc.basePanCard}`;
        this.changeDetector.detectChanges();  // Force change detection
      },
      error: (error) => {
        console.error('Failed to load documents', error);
        this.showMessage('Failed to load documents: ' + error.message);
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
          break;
        case 'aadhar':
          this.aadharFile = file;
          break;
        case 'panCard':
          this.panCardFile = file;
          break;
      }
      this.showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} file set: ${file.name}`);
    }
  }

  onUpdateDocument(): void {
    if (!this.customerId) {
      this.showMessage('Customer ID is undefined.');
      return;
    }

    this.loading = true;

    const formData = new FormData();
    if (this.photoFile) formData.append('photo', this.photoFile);
    if (this.aadharFile) formData.append('aadhar', this.aadharFile);
    if (this.panCardFile) formData.append('panCard', this.panCardFile);

    this.apiService.updateDocuments(this.customerId, formData).subscribe({
      next: (response) => {
        
        console.log('Update successful, response:', response);
        this.showMessage('Documents updated successfully.');
        this.loadDocuments(this.customerId); // Force reload of documents
        this.loading = false;
        this.changeDetector.detectChanges();
       
      },
      error: (error) => {

        console.error('Failed to update documents:', error); 
        this.showMessage('Failed to update documents: ' + error.message); this.loading = false;
       
       }
      
      }); 
    
      }
        showMessage(msg: string): void { this.message = msg; setTimeout(() => this.message = '', 1000); // Clear message after 3 seconds 

        }
        onBack(): void { this.router.navigate(['/dashboard']); }// Optionally, force a component reload 

      }
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