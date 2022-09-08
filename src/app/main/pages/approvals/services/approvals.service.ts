import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApprovalReportRequest, ApprovalReportResponse, Approve, ApproveResponse } from '../models/approvals';

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getReportsData(request : ApprovalReportRequest) : Observable<ApprovalReportResponse>{
    return this.http.post<any>(this.baseUrl + '/api/ResourceTaskSchedule/TaskScheduleApprovals', { pageSize: request.pageSize, currentPage:request.currentPage , startDate:request.startDate , endDate:request.endDate , employees: request.employeeIds, status: request.status });
  }

  approveSchedule(request : Approve): Observable<ApproveResponse>{
    return this.http.post<any>(this.baseUrl + '/api/ResourceTaskSchedule/Approve', { taskScheduleIds: request.taskScheduleIds });
  }
}
