import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpResponse } from '../../reports/models/reportsRequest';
import { ProjectTaskSchedule, WorkLoadRequest, WorkloadResponse } from '../models/resources';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getWorkload(request: WorkLoadRequest): Observable<WorkloadResponse>{
    return this.http.post<WorkloadResponse>(this.baseUrl + '/api/ResourceTaskSchedule/EmployeeWorkload', {employeeIds: request.employeeIds, projectIds: request.projectIds})
  }

  getEmployees() : Observable<EmpResponse>{
    return this.http.get<EmpResponse>(this.baseUrl + '/api/Employee/EmployeesForAttendanceReport');
  }

  getAssignment(request: ProjectTaskSchedule): Observable<any>{
    return this.http.post<EmpResponse>(this.baseUrl + '/api/ResourceTaskSchedule/ProjectTaskSchedule', {employeeId: request.employeeId, projectId: request.projectId, start: request.start, end: request.end });
  }
}
