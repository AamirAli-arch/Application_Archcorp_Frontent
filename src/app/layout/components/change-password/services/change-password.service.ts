import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ChangePasswordRequest, ChangePasswordResponse } from '../models/changePassword';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  changePassword(request: ChangePasswordRequest) : Observable<ChangePasswordResponse>{
    return this.http.post<ChangePasswordResponse>(environment.apiUrl + '/api/auth/changepassword', request);
  }
}
