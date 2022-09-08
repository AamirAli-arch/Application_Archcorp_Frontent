import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { request } from "http";
import { Observable } from "rxjs";
import {   EmployeRegister, EmployeResponse,  UpdateEmployeeRequest, UploadImageResponse } from "../modal/employee";

@Injectable({
    providedIn: "root",
})
export class EmployeeService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getEmployeeTimeOff(): Observable<any> {
        return this.http.get<any>(
            this.baseUrl + "/api/Employee/EmployeeAbsentLateTimeOff"
        );
    }
    getEmployeeList(request): Observable<EmployeResponse> {
        return this.http.post<EmployeResponse>(this.baseUrl + "/api/Employee/EmployeeList", request);
    }

    employeeRegister(request:EmployeRegister): Observable<EmployeResponse> {
        return this.http.post<EmployeResponse>(this.baseUrl + "/api/Auth/register", request);
    }

    getDesignationsList(): Observable<EmployeResponse> {
        return this.http.get<EmployeResponse>(this.baseUrl + "/api/Department/Designations");
    }

    uploadImage(request): Observable<any> {        
        return this.http.post<any>(this.baseUrl + "/api/Employee/UploadImage", request)
    }

    updateEmployee(request: UpdateEmployeeRequest): Observable<any> {
        return this.http.post<any>(this.baseUrl + '/api/Employee/UpdatePersonalInfo', request);
    }

    getEmployeeDetail(employeeId): Observable<any> {
        return this.http.get<any>(this.baseUrl + "/api/Employee/EmployeeDetail?employeeId="+employeeId);
    }


    // uploadImage(request): Observable<UploadImageResponse> {        
    //     return this.http.post<any>(this.baseUrl + "/api/Employee/UploadImage", request)
    // }

}
