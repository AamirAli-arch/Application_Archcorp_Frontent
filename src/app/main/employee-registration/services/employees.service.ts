import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { RegisterUserRequest, RegisterUserResponse } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

register(request : RegisterUserRequest): Observable<RegisterUserResponse>{
  return this.http.post<RegisterUserResponse>(this.baseUrl + "/api/Auth/register", request);
}
  
}




