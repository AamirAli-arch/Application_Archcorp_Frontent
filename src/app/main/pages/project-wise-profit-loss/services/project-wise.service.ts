import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ProjectRequest, ProjectResponse } from '../models/project-profitloss';

@Injectable({
  providedIn: 'root'
})
export class ProjectWiseService {
  baseUrl = environment.apiUrl;
  userMonitorUrl = environment.userMonitorUrl;
  constructor(private http: HttpClient) { }


  getProjectProfitLossList(request : ProjectRequest) : Observable<ProjectResponse>{
    return this.http.post<ProjectResponse>(this.baseUrl + '/api/Finance/ProjectWiseProfitLoss', request);
  }
}
