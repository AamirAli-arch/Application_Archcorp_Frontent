import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Console } from 'console';
import { GetSubmissionResponse } from './submissions';
import { SubmissionCountResponse } from './submission.count';
import { SubmissionOverdueResponse } from '../../submissions-by-status/services/submission.overdue';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUpcomingSubmissions() : Observable<GetSubmissionResponse>{
    return this.http.get<any>(this.baseUrl +"/api/Submission/UpcomingSubmissions");          
  }


  getSubmissionCount() : Observable<SubmissionCountResponse>{
    return this.http.get<any>(this.baseUrl +"/api/Submission/GetSubmissionCount");          
  }


  getOverdueSubmissions(): Observable<SubmissionOverdueResponse>{
    return this.http.get<any>(this.baseUrl +"/api/Submission/OverdueSubmissions");          
  }
  
}
