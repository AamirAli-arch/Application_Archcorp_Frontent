import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Console } from 'console';
import { GetSubmissionStatusResponse,SubmissionStatusRequest} from './submission-status';
import { SubmissionOverdueResponse } from './submission.overdue';
@Injectable({
  providedIn: 'root'
})
export class SubmissionStatusService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  submissionsByStatus(request): Observable<GetSubmissionStatusResponse> {
  return this.http.get<any>(this.baseUrl + '/api/Submission/SubmissionsByStatus?request=' + request);
}

getOverdueSubmissions(): Observable<SubmissionOverdueResponse>{
  return this.http.get<any>(this.baseUrl +"/api/Submission/OverdueSubmissions");          
}
}




