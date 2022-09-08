import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AddBudgetRequest, BudgetHoursResponse, ResourceHour } from '../modal/budgeted';

@Injectable({
  providedIn: 'root'
})
export class BudgetedService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getBudgeteList(request:AddBudgetRequest): Observable<BudgetHoursResponse> {
        return this.http.get<BudgetHoursResponse>(this.baseUrl +"/api/BudgetedHours?projectId="+request.projectId);
    }

    addBudgete(request:AddBudgetRequest):Observable<BudgetHoursResponse>{
        return this.http.post<BudgetHoursResponse>(this.baseUrl +"/api/BudgetedHours/Add",request);
    }

    updateBudgete(request:AddBudgetRequest):Observable<BudgetHoursResponse>{
        return this.http.post<BudgetHoursResponse>(this.baseUrl +"/api/BudgetedHours/Update",request);
    }
 
    deleteBudgete(id):Observable<BudgetHoursResponse>{
        return this.http.delete<BudgetHoursResponse>(this.baseUrl +"/api/BudgetedHours/Delete?id="+id);
    }

    employeeByDesignation(id):Observable<BudgetHoursResponse>{
        return this.http.get<BudgetHoursResponse>(this.baseUrl +"/api/Employee/EmployeeByDesignation?designationId="+id);
    }

    getBudgetedHour(request:AddBudgetRequest):Observable<BudgetHoursResponse>{
        return this.http.get<BudgetHoursResponse>(this.baseUrl +"/api/BudgetedHours/GetBudgetedHour?projectId="+request.projectId+"&designationId="+request.designationId);
    }

    addBudgetedHour(request:ResourceHour):Observable<BudgetHoursResponse>{
        return this.http.post<BudgetHoursResponse>(this.baseUrl +"/api/ResourceHour/Add", request);
    }

    getListResource(projectId):Observable<BudgetHoursResponse>{
        return this.http.get<BudgetHoursResponse>(this.baseUrl +"/api/ResourceHour/GetAll?projectId="+projectId);
    }

    updateResourceHour(request:ResourceHour):Observable<BudgetHoursResponse>{
        return this.http.post<BudgetHoursResponse>(this.baseUrl +"/api/ResourceHour/Update", request);
    }

    deleteResourceCard(deleteId):Observable<BudgetHoursResponse>{
        return this.http.delete<BudgetHoursResponse>(this.baseUrl +"/api/ResourceHour/Delete?id="+deleteId);
    }



}
