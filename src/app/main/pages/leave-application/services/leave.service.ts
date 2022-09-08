import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ApproveLeavesRequest, EmpLeaveDetails, EmpLeaveDetailsResponse, EmployeeLeaveRequest, LeaveApply, LeaveRequest, ValidationResponse } from '../models/leave-application';
import { ReportsRequest } from '../../reports/models/reportsRequest';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
    leaveArray=[
        {leaveType:'Approved', id:1},
        {leaveType:'Rejected', id:2},
        {leaveType:'Cancelled', id:3},
        {leaveType:'Lead Approval Pending', id:4},
        {leaveType:'HR Approval Pending', id:5}
    ]
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getLeavesBank(type: number, empId: number) : Observable<any>{
    let params = new HttpParams()
                    .set('leaveType', type.toString())
                    .set('employeeId', empId.toString());
    return this.http.get(this.baseUrl + '/api/LeaveBank/LeaveBalance', { params: params });
  }
  
  getValidations(start : string, end : string, empId: number) : Observable<ValidationResponse>{
    return this.http.post<ValidationResponse>(this.baseUrl  + '/api/ResourceTaskSchedule/ScheduleByDates', {start : start, end : end, employeeId: empId})
  }

  applyLeave(request: LeaveApply) : Observable<any>{
    return this.http.post<LeaveApply>(this.baseUrl + '/api/Leave/Apply', request)
  }
  applyTimeoffLeave(request: LeaveApply) : Observable<any>{
    return this.http.post<LeaveApply>(this.baseUrl + '/api/Leave/TimeOff', {start: request.start, end: request.end, reason: request.reason, date: request.date})
  }

  getEmployeeLeaveRequest(request: EmployeeLeaveRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/EmployeeLeaveApplications', request);
  }

  getLeaveDetails(id: number) : Observable<EmpLeaveDetailsResponse>{
    let params = new HttpParams()
    .set('leaveId', id.toString())
    return this.http.get<EmpLeaveDetailsResponse>(this.baseUrl + '/api/Leave/Detail', { params: params });
  }

  approveLeave(request:ApproveLeavesRequest) : Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/Approve',request);
  }
  declineLeave(request:ApproveLeavesRequest) : Observable<any>{
      return this.http.post<any>(this.baseUrl + '/api/Leave/Reject', request)
  }
  getTimeEmployees(request: LeaveRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/EmployeeTimeOffApplications', request);
  }

  employeesLeaveRequest(request: LeaveRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/MyLeaveApplications', request);
  }

  timeOffLeaveRequest(request: LeaveRequest):Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/MyTimeOffApplications', request);
  }

  approveTimeLeave(request) : Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/ApproveTimeOff', request);
  }

  rejectTimeLeave(request) : Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/RejectTimeOff', request);
  }

  cancelTimeOff(request) : Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/CancelTimeOff', request);
  }

  cancelLeave(request) : Observable<any>{
    return this.http.post<any>(this.baseUrl + '/api/Leave/CancelLeave', request);
  }

  getLeaveBalanceDetails(id): Observable<any>{
    console.log("getleaveBalance", id)
    let params = new HttpParams()
                    .set('employeeId', id.toString());
    return this.http.get<any>(this.baseUrl + '/api/LeaveBank/LeaveBalanceDetails/', { params: params });
  }


}
