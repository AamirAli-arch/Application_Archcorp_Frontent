import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetailReportResponse, EmpResponse, MonthlyReportResponse, ReportsRequest, ReportsResponse } from '../models/reportsRequest';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl = environment.apiUrl;
  userMonitorUrl = environment.userMonitorUrl;
  constructor(private http: HttpClient) { }

  getReportsData(request : ReportsRequest) : Observable<ReportsResponse>{
    return this.http.post<any>(this.baseUrl + '/api/TaskTimeSheet/EmployeeAttendance', { pageSize: request.pageSize, currentPage:request.currentPage , startDate:request.startDate , endDate:request.endDate , employeeIds: request.employeeIds });
  }

  getDetailedReportsData(request : ReportsRequest) : Observable<DetailReportResponse>{
    return this.http.post<any>(this.baseUrl + '/api/TaskTimeSheet/EmployeeCheckInOutDetails', request);
  }
  gantMonthlyReport(request: ReportsRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Employee/MonthlyReport', request);
  }
  getEmployees() : Observable<EmpResponse>{
    return this.http.get<EmpResponse>(this.baseUrl + '/api/Employee/EmployeesForAttendanceReport');
  }

  getMonthlyReport(request :ReportsRequest): Observable<MonthlyReportResponse>{
    return this.http.post<MonthlyReportResponse>(this.baseUrl + '/api/TaskTimeSheet/EmployeeWorkedHours', { pageSize: request.pageSize, currentPage:request.currentPage , startDate:request.startDate , endDate:request.endDate , employeeIds: request.employeeIds });
  }
  
  getUserMonitor(from: string, to: string): Observable<any>{
    let params = new HttpParams()
                    .set('from', from)
                    .set('to', to);
    return this.http.get<any>(this.userMonitorUrl + '/api/search', { params: params });
  }

  getRevitTracking(from: string, to: string): Observable<any>{
    let params = new HttpParams()
                    .set('from', from)
                    .set('to', to);
    return this.http.get<any>(this.userMonitorUrl + '/api/revit', { params: params });
  }

  getRevitCalculation(id: string): Observable<any>{
    let params = new HttpParams()
                     .set('id', id);
    return this.http.get<any>(this.userMonitorUrl + '/api/Calculation/' + id);
  }



  checkInTime(request){
    return this.http.post<any>(this.baseUrl + '/api/TaskTimeSheet/UpdateCheckIn', request);
  }


}
