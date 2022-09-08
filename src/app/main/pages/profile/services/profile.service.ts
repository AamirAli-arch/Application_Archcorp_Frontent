import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { departmentsResponse, designations, designationsResponse, educationInfomation, employeeProfileResponse, experienceInformation, personalInformation } from "../models/profile";

@Injectable({
    providedIn: "root",
})
export class ProfileService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    updateEducationInfomation(request:educationInfomation): Observable<employeeProfileResponse> {
        return this.http.post<employeeProfileResponse>(this.baseUrl + "/api/Employee/UpdateEducationInfo",request);
    }
    
    updateExperienceInfo(request:experienceInformation): Observable<employeeProfileResponse> {
        return this.http.post<employeeProfileResponse>(this.baseUrl + "/api/Employee/UpdateEducationInfo",request);
    }

    getEmployeeProfile(epmId): Observable<employeeProfileResponse> {
        return this.http.get<employeeProfileResponse>(this.baseUrl + "/api/Employee/Profile?employeeId="+epmId);
    }

    getDepartment(): Observable<departmentsResponse> {
        return this.http.get<departmentsResponse>(this.baseUrl + "/api/Department/Departments");
    }

    designationsByDepartmentId(request : designations): Observable<designationsResponse> {
        return this.http.get<designationsResponse>(
            this.baseUrl + "/api/Department/DesignationsByDepartmentId?departmentId="+request.id
        );
    }

    personalInfomationUpdate(request:personalInformation): Observable<employeeProfileResponse> {
        return this.http.post<employeeProfileResponse>(this.baseUrl + "/api/Employee/UpdateEducationInfo",request);
    }

}
