import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { UserLogin } from '../models/user-login';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticate(user: UserLogin): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(environment.apiUrl + '/api/auth/login', user);
  }

  isAuthenticated(): boolean{
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if(!token || token === undefined)
    return false;

    return !helper.isTokenExpired(token);

  }

}
