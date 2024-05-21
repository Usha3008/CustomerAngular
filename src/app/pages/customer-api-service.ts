import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from './view-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { DocumentModel } from './view-documents.component';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { throwError, catchError } from 'rxjs';
//import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {

  constructor(
    private http: HttpClient
    
  ) { }

  url = "https://customergroupbapi.azurewebsites.net/";

//   getProducts() : Observable<Product[]> { 
//     return this.http.get<Product[]>(this.url);
//   }
  
  getDetails(id:number) : Observable<CustomerModel> { 

    const token = window.sessionStorage.getItem("token"); // Example: Retrieve access token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CustomerModel>(`${this.url}/${id}`,{headers })
  }

//   createNew(model: ) : Observable<Product> { 
//     let options = { 
//       headers: {
//         "Content-Type" : "application/json"
//       }
//     }
//     return this.http.post<Product>(
//       this.url,
//       JSON.stringify(model),
//       options )
//   }
 // update(model: CustomerModel)  { 
  
  //  let options = {
  //    headers: {
   //     "Content-Type": "application/json"
   //   }
   // }
   // return this.http.post(`${this.url}`, JSON.stringify(model), options);
  //}
  update(model: CustomerModel): Observable<CustomerModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.sessionStorage.getItem("token")}` // Ensure the token is added correctly
    });

    // Using PUT and including the model ID in the URL is a common RESTful practice
    return this.http.put<CustomerModel>(`${this.url}/${model.customerId}`, model, { headers });
  }


  deleteCustomer(id: number): Observable<any> {
    const token = window.sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
  
//   delete(id:number) { 
//     return this.http.delete(`${this.url}/${id}`); 
//   }
// Fetch documents for a specific customer by ID
getDocuments(customerId: number): Observable<DocumentModel> {
  const token = window.sessionStorage.getItem("token");
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  return this.http.get<DocumentModel>(`${this.url}/api/Document/${customerId}`, { headers });
}
updateDocuments(customerId: number, formData: FormData): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
  });

  //console.log(`Sending update request for customer ID: ${customerId}`);
  
  return this.http.put<any>(`${this.url}/api/Document/${customerId}`, formData, { headers });
}

}


// Other methods can also be added here to handle create, update, delete operations for documents

  
