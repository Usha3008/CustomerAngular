import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private apiUrl = `https://authenticationapigroupb.azurewebsites.net/api/Accounts`;

  constructor(private http: HttpClient) {}

  changePassword(username: string, oldPassword: string, newPassword: string): Observable<any> {
    const changePasswordData = { Username: username, OldPassword: oldPassword, NewPassword: newPassword };
    return this.http.post<any>(`${this.apiUrl}/changePassword`, changePasswordData);
  }
}
