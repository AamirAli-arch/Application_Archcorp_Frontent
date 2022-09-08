import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Observer } from 'rxjs';
import { AddDashboardRequest, AddDashboardResponse, AddDisciplineRequest, AddDisciplineResponse, AddEmployeeRequest, AddEmployeeResponse, DeleteEmployeeRequest, DeleteEmployeeResponse, GetAllDasboardDisciplineResponse, UpdateDashboardGroupRequest, UpdateDashboardRequest } from './dashboard';
import { UpdateDesciplineRequest } from './dashboard';
import { EmployeResponse } from './employee';

@Injectable({
  providedIn: 'root'
})
export class ProjectDashboardService {
  // getAllEmployee(): import("./employee").Employee[] {
  //   throw new Error('Method not implemented.');
  // }
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { } 
  

  getAllDashboardDisciplines() :Observable<GetAllDasboardDisciplineResponse>{
    return  this.http.get<any>(this.baseUrl +"/api/ProjectDashboard/GetAllDashboardDisciplines");          
  }

  updateDashboardDisciplines(request: UpdateDesciplineRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/ProjectDashboard/UpdateDashboardDisciplines', request);
  }


  updateProjectDashboard(request: UpdateDashboardRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/ProjectDashboard/UpdateProjectDashboard', request);
  }


  updateDashboardGroup(request: UpdateDashboardGroupRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/ProjectDashboard/UpdateDashboardGroup', request);
  }


  getEmployeeList(request): Observable<EmployeResponse> {
    return this.http.post<EmployeResponse>(this.baseUrl + "/api/Employee/EmployeeList", request);
  }

  addProjectDashboard(request : AddDashboardRequest):Observable<AddDashboardResponse> {
    return this.http.post<any>(this.baseUrl + "/api/ProjectDashboard/Add", request);
  }

  addProjectDiscipline(request : AddDisciplineRequest ):Observable<AddDisciplineResponse> {
    return this.http.post<any>(this.baseUrl + "/api/ProjectDashboard/AddDashboardDisciplines", request);
  }

  addDashboardEmployee(request : AddEmployeeRequest):Observable<AddEmployeeResponse> {
    return this.http.post<any>(this.baseUrl + "/api/ProjectDashboard/AddDashboardEmployee", request);
  }


  deleteDashboardEmployee(request : DeleteEmployeeRequest):Observable<DeleteEmployeeResponse> {
    return this.http.post<any>(this.baseUrl + "/api/ProjectDashboard/DeleteDashboardEmployee", request);
  }







}
