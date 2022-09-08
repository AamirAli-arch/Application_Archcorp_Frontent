import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { StaffRequest, StaffResponse } from '../modal/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffInfoService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
 

  addStaff(request:StaffRequest): Observable<StaffResponse> {
    return this.http.post<StaffResponse>(this.baseUrl + "/api/Employee/AddStaffInfo", request);
  }

  
  getStaffInformation():Observable<StaffResponse>{
    return  this.http.get<any>(this.baseUrl +"/api/Employee/GetStaffInformation");          
  }


}
