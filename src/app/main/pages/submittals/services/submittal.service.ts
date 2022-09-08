import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submittal, SubmittalRequest, SubmittalResponse } from './model/submittal';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class SubmittalService {
  baseUrl = environment.apiUrl;
  userMonitorUrl = environment.userMonitorUrl;
  constructor(private http: HttpClient) { }

  getSubmittalData(request : SubmittalRequest ) : Observable<SubmittalResponse>{
    console.log("getsubmittalservice", request);
    return this.http.post<SubmittalResponse>(this.baseUrl + '/api/Project/GetProjectSubmital', {id:request.projectIds, riskCase: request.riskCase});
  }
}